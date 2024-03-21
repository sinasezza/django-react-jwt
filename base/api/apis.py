from django.http import JsonResponse


def get_routes_api(request):
    routes = [
        '/api/token',
        '/api/token/refresh/',
        'api/user/register/',
        'api/user/login/'
    ]
    return JsonResponse(routes, safe=False)