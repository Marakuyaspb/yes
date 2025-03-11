import os
import sqlite3
import json
from django.conf import settings
from django.utils import timezone
from django.shortcuts import render
from django.shortcuts import render
from django.db import connection
from django.db.models import Count

from rest_framework import generics

from .models import Web3User, Connect, Voting
from .serializers import Web3UserSerializer, ConnectSerializer, VotingSerializer



class Web3UserListCreate(generics.ListCreateAPIView):
    queryset = Web3User.objects.all()
    serializer_class = Web3UserSerializer

class ConnectListCreate(generics.ListCreateAPIView):
    queryset = Connect.objects.all()
    serializer_class = ConnectSerializer

class VotingListCreate(generics.ListCreateAPIView):
    queryset = Voting.objects.all()
    serializer_class = VotingSerializer
    


	
def index(request):
	return render(request, 'vote/index.html')


def about(request):
	return render(request, 'vote/about.html')


def howwas(request):
    db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    conn = sqlite3.connect(db_path)
    
    query = "SELECT voice FROM vote_voting"
    cursor = conn.cursor()
    cursor.execute(query)
    
    votes = cursor.fetchall()
    conn.close()

    vote_counts = {
        'Yes': sum(1 for v in votes if v[0] == True),
        'No': sum(1 for v in votes if v[0] == False)
    }

    data = json.dumps(vote_counts)

    return render(request, 'vote/howwas.html', {'data': data})