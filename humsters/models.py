from django.db import models

class Profile(models.Model):
	id = models.AutoField(primary_key=True)
	address = models.CharField(max_length=44, default='0x0000000000000000000000000000000000000000')
	session_count = models.IntegerField(default=0)  

	def __str__(self):
		return self.address