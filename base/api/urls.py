from django.urls import path
from . import apis

app_name = 'base-apis'

urlpatterns = [
    path('', apis.get_routes_api, name='get-routes'),
    
]
