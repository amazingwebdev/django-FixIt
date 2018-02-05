# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-02 20:09
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
        ('transcript', '0027_transcriptphrase_active'),
    ]

    operations = [
        migrations.CreateModel(
            name='TranscriptPhraseInteraction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preclude_from_game', models.IntegerField(choices=[(1, 'one'), (2, 'two'), (3, 'three')])),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.ContentType')),
                ('transcript_phrase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transcript.TranscriptPhrase')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]