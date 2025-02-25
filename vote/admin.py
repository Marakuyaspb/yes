from django.contrib import admin
from .models import Voting
from django.template.loader import get_template
from django.db import models

@admin.register(Voting)
class VotingAdmin(admin.ModelAdmin):
	list_display = ['voice', 'profile', 'create']
	readonly_fields = ['voice', 'create']