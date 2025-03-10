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
    


def dapp(request):
	if request.method == 'POST':
		voice = request.POST.get('voice')
		create = timezone.now()

		voting_form = VotingForm({'voice': voice, 'create': create})

		if voting_form.is_valid():
			instance = voting_form.save(commit=False)
			instance.voice = voice
			instance.create = create
			instance.save()
			print("Form saved successfully!")
		else:
			print("Form validation errors:", voting_form.errors)
	else:
		voting_form = VotingForm()
	
	return render(request, 'vote/dapp.html', {'voting_form': voting_form})


def about(request):
	return render(request, 'vote/about.html')
	



def howwas(request):
    # Путь к базе данных SQLite
    db_path = os.path.join(settings.BASE_DIR, 'db.sqlite3')
    
    # Подключение к базе данных
    conn = sqlite3.connect(db_path)
    
    # Чтение данных из таблицы vote_voting
    query = "SELECT voice FROM vote_voting"
    cursor = conn.cursor()
    cursor.execute(query)
    
    # Получение всех голосов
    votes = cursor.fetchall()
    conn.close()

    # Подсчет голосов
    vote_counts = {
        'Yes': sum(1 for v in votes if v[0] == True),
        'No': sum(1 for v in votes if v[0] == False)
    }

    # Преобразование данных в формат JSON для передачи в шаблон
    data = json.dumps(vote_counts)

    return render(request, 'vote/howwas.html', {'data': data})

  

def index(request):
	return render(request, 'vote/index.html')

	