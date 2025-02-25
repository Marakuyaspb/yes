from django.contrib import admin
from humsters.models import *

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'address']