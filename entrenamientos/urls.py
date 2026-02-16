from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RutinaViewSet, EjercicioViewSet, EntrenamientoViewSet
from .user_api import UserAPI



router = DefaultRouter()
router.register(r'rutinas', RutinaViewSet, basename='rutina')
router.register(r'ejercicios', EjercicioViewSet)
router.register(r'entrenamientos', EntrenamientoViewSet, basename='entrenamiento')



urlpatterns = [
    path('', include(router.urls)),
    path('me/', UserAPI.as_view(), name='user-info'),
]
