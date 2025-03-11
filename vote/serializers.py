from rest_framework import serializers
from .models import Web3User, Connect, Voting

class Web3UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Web3User
        fields = ['id', 'address']

class ConnectSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True)  # Accept address as input

    class Meta:
        model = Connect
        fields = ['id', 'web3user', 'connect', 'address']
        read_only_fields = ['web3user', 'connect']

    def create(self, validated_data):
        address = validated_data.pop('address')
        web3user, _ = Web3User.objects.get_or_create(address=address)
        connect = Connect.objects.create(web3user=web3user, **validated_data)
        return connect

class VotingSerializer(serializers.ModelSerializer):
    address = serializers.CharField(write_only=True)  # Accept address as input

    class Meta:
        model = Voting
        fields = ['id', 'voice', 'web3user', 'create', 'address']
        read_only_fields = ['web3user', 'create']

    def create(self, validated_data):
        address = validated_data.pop('address')
        web3user, _ = Web3User.objects.get_or_create(address=address)
        voting = Voting.objects.create(web3user=web3user, **validated_data)
        return voting