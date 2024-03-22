from django.urls import path
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from . import apis

app_name = 'base-apis'

urlpatterns = [
    path('', apis.get_routes_api, name='get-routes'),
    path('notes/', apis.get_notes_api, name='get-notes'),
    path('token/', apis.MyTokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
