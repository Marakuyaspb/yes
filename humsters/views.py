from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Profile, Voting
from vote.models import Voting
from django.utils import timezone

@csrf_exempt 
def connect_wallet(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        address = data.get('address')

        profile, created = Profile.objects.get_or_create(address=address)


        if created:
            profile.session_count = 1
        else:
            profile.session_count += 1
        profile.save()

        voted_count = profile.votings.count()
        
        return JsonResponse({
            'voted': voted_count > 0,
            'vote_count': voted_count,
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)