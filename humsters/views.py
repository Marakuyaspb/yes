import datetime
import secrets
import names
import string
import shortuuid
from django.contrib import messages
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import reverse
from eth_account.messages import defunct_hash_message
from web3.auto import w3
from user_profile.models import UserProfile # TODO измените на свою модель


def auth_web3(request):

    public_address = request.POST["accountAddress"]
    signature = request.POST["signature"]
    csrf_token = request.POST["csrfmiddlewaretoken"]

    original_message = f"Sign to auth {csrf_token}"
    message_hash = defunct_hash_message(text=original_message)
    signer = w3.eth.account.recoverHash(message_hash, signature=signature)
    short_uuid = shortuuid.uuid()

    if signer == public_address:

        user_profile = UserProfile.objects.filter(eth_account_address=public_address).first()
        if user_profile:
            try:
                user = user_profile.user
            except:
                messages.add_message(request, messages.WARNING, _("Can't find profile"))
                return HttpResponseRedirect(
                    reverse(
                        "main:user_login",  # TODO измените на свой адрес
                    )
                )
            user.backend = "django.contrib.auth.backends.ModelBackend"
            login(request, user)
            return HttpResponseRedirect(reverse("main:dashboard")) # TODO измените на свой адрес

        else:
            alphabet = string.ascii_letters + string.digits
            password = "".join(secrets.choice(alphabet) for i in range(20))
            
            first_name = names.get_first_name()
            last_name = names.get_last_name()
            email = f"{short_uuid}@{HOST}"
            
            user = User.objects.create_user(email=email, username=short_uuid, first_name=first_name, last_name=last_name, password=password)

            user_profile = UserProfile()
            user_profile.user = user
            user_profile.eth_account_address = public_address
            user_profile.save()

            user.backend = "django.contrib.auth.backends.ModelBackend"
            login(request, user)

            messages.success(request, _("Успешная регистрация."))
            return HttpResponseRedirect(reverse("main:dashboard")) # TODO измените на свой адрес

    else:
        messages.add_message(request, messages.WARNING, _("Обновите страницу и попробуйте еще раз"))
        return HttpResponseRedirect(
            reverse(
                "main:user_login",  # TODO измените на свой адрес
            )
        )