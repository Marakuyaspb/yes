from rest_framework import serializers
from .models import Voting

class VotesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student 
        fields = ('id', 'voice', 'web3user', 'create')