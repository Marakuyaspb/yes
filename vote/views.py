import os
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.http import JsonResponse
from django.shortcuts import render
from .models import Web3User, Voting

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *





# from .forms import VotingForm


# def web3_back(request):
# 	if request.method == 'POST':
# 		address = request.POST.get('address')
# 		if address:
# 			user, created = Web3User.objects.get_or_create(address=address)
# 			user.last_login = timezone.now()
# 			user.save()
# 			return JsonResponse({'status': 'success', 'message': 'User logged in'})
# 		return JsonResponse({'status': 'error', 'message': 'Address not provided'}, status=400)
# 	return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)


# def dapp(request):
# 	if request.method == 'POST' and 'address' in request.POST:
# 		return web3_back(request)


# 	if request.method == 'POST' and 'voice' in request.POST:
# 		voice = request.POST.get('voice')
# 		address = request.POST.get('address')
# 		if address:
# 			user = Web3User.objects.get(address=address)
# 			create = timezone.now()

# 			voting_form = VotingForm({
# 				'voice': voice,
# 				'web3user': user.id,
# 				'create': create,
# 			})

# 			if voting_form.is_valid():
# 				instance = voting_form.save(commit=False)
# 				instance.voice = voice
# 				instance.web3user = user
# 				instance.create = create
# 				instance.save()
# 				return JsonResponse({'status': 'success', 'message': 'Vote recorded'})
# 			else:
# 				return JsonResponse({'status': 'error', 'message': 'Form validation errors', 'errors': voting_form.errors}, status=400)
# 		return JsonResponse({'status': 'error', 'message': 'Address not provided'}, status=400)

# 	return render(request, 'vote/dapp.html')


def about(request):
	return render(request, 'vote/about.html')
	
def howwas(request):
	return render(request, 'vote/howwas.html')

def index(request):
	return render(request, 'vote/index.html')