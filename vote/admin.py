from django.contrib import admin
from django.template.loader import get_template
from django.db import models
from django.utils.translation import gettext_lazy as _
from .models import Web3User, Voting

@admin.register(Web3User)
class Web3UserAdmin(admin.ModelAdmin):
	list_display = ['address']
	readonly_fields = ['address']



@admin.register(Voting)
class VotingAdmin(admin.ModelAdmin):
	list_display = ['voice', 'web3user', 'create']
	readonly_fields = ['voice', 'create']