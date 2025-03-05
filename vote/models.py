from django.db import models
from django.conf import settings
from django.utils import timezone



class Web3User(models.Model):
	id = models.AutoField(primary_key=True)
	address = models.CharField(max_length=44, unique=True, default='0x0000000000000000000000000000000000000000')

	def __str__(self):
		return self.address

	def get_vote_history(self):
		return self.votings.all()

	def get_vote_count(self):
		return self.votings.count()

	def get_connects_count(self):
		return self.who_connect.count()

	def get_yes_votes(self):
		return self.votings.filter(voice=True).count()

	def get_no_votes(self):
		return self.votings.filter(voice=False).count()



class Connect(models.Model):
	id = models.AutoField(primary_key=True)
	web3user = models.ForeignKey(Web3User, on_delete=models.CASCADE, related_name='who_connect', default='1')
	connect = models.DateTimeField(default=timezone.now)

	def __str__(self):
		return f"{self.web3user}"



class Voting(models.Model):
	id = models.AutoField(primary_key=True)
	voice = models.BooleanField(verbose_name = 'YES/NO')
	web3user = models.ForeignKey(Web3User, on_delete=models.CASCADE, related_name='votings', default='1')
	create = models.DateTimeField(default=timezone.now)

	class Meta:
		verbose_name = 'Voice'
		verbose_name_plural = 'Voices'

	def __str__(self):
		return f"{self.web3user} - {'YES' if self.voice else 'NO'} at {self.create}"