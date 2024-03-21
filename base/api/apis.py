from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import rest_framework.status as rest_statuses

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


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
        'api/user/register/',
        'api/user/login/'
    ]
    return Response(data=routes, status=rest_statuses.HTTP_200_OK)