from rest_framework import serializers
from .models import Web3User, Connect, Voting


class Web3UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Web3User
        fields = ['id', 'address']

class ConnectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connect
        fields = ['id', 'web3user', 'connect']

class VotingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voting
        fields = ['id', 'voice', 'web3user', 'create']