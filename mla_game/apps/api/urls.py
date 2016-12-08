from django.conf.urls import url, include
from rest_framework import routers

from .views import (
    TranscriptViewSet, TranscriptPhraseDownvoteViewSet,
    TranscriptPhraseCorrectionViewSet, SourceViewSet,
    TopicViewSet, ProfileViewSet, ScoreViewSet
)

router = routers.DefaultRouter()
router.register(r'transcript', TranscriptViewSet)
router.register(r'transcriptphrasedownvote', TranscriptPhraseDownvoteViewSet)
router.register(r'transcriptphrasecorrection', TranscriptPhraseCorrectionViewSet)
router.register(r'source', SourceViewSet)
router.register(r'topic', TopicViewSet)
router.register(r'profile', ProfileViewSet)
router.register(r'score', ScoreViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
]
