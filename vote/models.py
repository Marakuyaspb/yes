from django.db import models
from django.conf import settings
from django.utils import timezone
from humsters.models import *


class Voting(models.Model):
	id = models.AutoField(primary_key=True)
	voice = models.BooleanField(verbose_name = 'YES/NO')
	profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='votings', default='1')
	create = models.DateTimeField(default=timezone.now)

	class Meta:
		verbose_name = 'Voice'
		verbose_name_plural = 'Voices'

	def __str__(self):
		return  f"{self.profile}"