from django.contrib import admin
from django.urls import path, include, reverse
from django.conf import settings
from django.conf.urls.static import static
from vote import views

from rest_framework.routers import DefaultRouter
from .views import Web3UserListCreate, ConnectListCreate, VotingListCreate

app_name = 'vote'



urlpatterns = [
    path('', views.index, name = 'index'),
    path('about/', views.about, name = 'about'),
    path('howwas/', views.howwas, name = 'howwas'),
    
    path('web3users/', Web3UserListCreate.as_view(), name='web3user-list-create'),
    path('connects/', ConnectListCreate.as_view(), name='connect-list-create'),
    path('votings/', VotingListCreate.as_view(), name='voting-list-create'),
]