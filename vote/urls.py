from django.contrib import admin
from django.urls import path, include, reverse
from django.conf import settings
from django.conf.urls.static import static
from vote import views

from rest_framework.routers import DefaultRouter
from vote.views import Web3UserViewSet, VotingViewSet

app_name = 'vote'


router = DefaultRouter()
router.register(r'web3users', Web3UserViewSet)
router.register(r'votings', VotingViewSet)


urlpatterns = [
    path('', views.index, name = 'index'),
    path('about/', views.about, name = 'about'),
    path('howwas/', views.howwas, name = 'howwas'),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
