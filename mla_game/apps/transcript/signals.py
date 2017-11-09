import logging

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import (
    TranscriptPhraseCorrection, TranscriptPhraseCorrectionVote,
    TranscriptPhraseVote, TranscriptPhrase
)
from .tasks import (
    calculate_phrase_confidence, calculate_correction_confidence,
    update_transcripts_awaiting_stats,
)

django_log = logging.getLogger('django')

min_samples = settings.MINIMUM_SAMPLE_SIZE


@receiver(post_save, sender=TranscriptPhraseCorrection)
def correction_submitted(sender, instance, **kwargs):
    '''
    When a user submits a correction, we assume they'd vote for their own
    correction. So, we create a correction vote for the user.
    Also, add the corresponding transcript to the pool of transcripts that need
    their stats updated.
    '''
    TranscriptPhraseVote.objects.get_or_create(
        transcript_phrase=instance.transcript_phrase,
        user=instance.user,
        upvote=False
    )
    TranscriptPhraseCorrectionVote.objects.get_or_create(
        transcript_phrase_correction=instance,
        user=instance.user,
        upvote=None
    )
    if instance.transcript_phrase.current_game != 3:
        instance.transcript_phrase.current_game = 3
        instance.transcript_phrase.save(update_fields=['current_game'])
    update_transcripts_awaiting_stats(instance)


@receiver(post_save)
def update_phrase_confidence(sender, instance, **kwargs):
    if sender.__name__ in ('TranscriptPhraseVote', 'TranscriptPhraseCorrection'):
        sample_size = TranscriptPhraseVote.objects.filter(
            transcript_phrase=instance.transcript_phrase.pk,
            upvote__in=[True, False]
        ).count()
        if sample_size != instance.transcript_phrase.num_votes:
            this_pk = instance.transcript_phrase.pk
            TranscriptPhrase.objects.filter(pk=this_pk).update(num_votes=sample_size)
        if sample_size >= min_samples:
            calculate_phrase_confidence(instance.transcript_phrase)


@receiver(post_save, sender=TranscriptPhraseCorrection)
def update_num_corrections(sender, instance, **kwargs):
    if TranscriptPhraseCorrection.objects.filter(
        correction=instance.correction
    ).count() >= 2:
        identical_corrections = TranscriptPhraseCorrection.objects.filter(
            correction=instance.correction
        ).only('pk')
        first_instance = min(
            [correction.pk for correction in identical_corrections]
        )
        TranscriptPhraseCorrectionVote.objects.create(
            transcript_phrase_correction=TranscriptPhraseCorrection.objects.get(
                pk=first_instance
            ),
            upvote=True,
            user=instance.user
        )
        instance.delete()
        return

    corrections = TranscriptPhraseCorrection.objects.filter(
        transcript_phrase=instance.transcript_phrase,
    ).count()
    TranscriptPhrase.objects.filter(
        pk=instance.transcript_phrase.pk).update(num_corrections=corrections)


@receiver(post_save, sender=TranscriptPhraseCorrectionVote)
def update_correction_confidence(sender, instance, **kwargs):
    sample_size = TranscriptPhraseCorrectionVote.objects.filter(
        transcript_phrase_correction=instance.transcript_phrase_correction
    ).count()
    if sample_size > min_samples:
        calculate_correction_confidence(instance.transcript_phrase_correction)
    update_transcripts_awaiting_stats(instance.transcript_phrase_correction)
