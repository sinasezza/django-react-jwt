from django.contrib.auth import get_user_model
from django.db import models


class Note(models.Model):
    user = models.ForeignKey(to=get_user_model(), on_delete=models.CASCADE, related_name='notes')
    body = models.TextField(max_length=1024)  