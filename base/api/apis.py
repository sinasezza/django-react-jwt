from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
import rest_framework.status as rest_statuses
import rest_framework.permissions as rest_permissions

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer
from ..models import Note


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(http_method_names=['GET',])
def get_routes_api(request: HttpRequest) -> HttpResponse:
    routes = [
        '/api/token',
        '/api/token/refresh/',
        '/api/notes/',
    ]
    return Response(data=routes, status=rest_statuses.HTTP_200_OK)


@api_view(http_method_names=['GET',])
@permission_classes([rest_permissions.IsAuthenticated, ])
def get_notes_api(request):
    user = request.user
    notes = user.notes.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(data=serializer.data, status=rest_statuses.HTTP_200_OK)