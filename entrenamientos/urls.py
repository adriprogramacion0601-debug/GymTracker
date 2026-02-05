from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RutinaViewSet, EjercicioViewSet

router = DefaultRouter()
router.register(r'rutinas', RutinaViewSet)
router.register(r'ejercicios', EjercicioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
