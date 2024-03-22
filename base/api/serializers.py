from  rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Note


class NoteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Note
        fields = '__all__'