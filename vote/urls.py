from django.contrib import admin
from django.urls import path, re_path, include, reverse
from django.conf import settings
from django.conf.urls.static import static
from vote import views

app_name = 'vote'


urlpatterns = [
    path('', views.index, name = 'index'),
    path('about/', views.about, name = 'about'),
    path('howwas/', views.howwas, name = 'howwas'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
