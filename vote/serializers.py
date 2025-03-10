from rest_framework import serializers
from .models import Web3User, Voting



class Web3UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Web3User 
        fields = '__all__'


class VotingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voting 
        fields = '__all__'