from rest_framework import viewsets
from .models import Rutina, Ejercicio
from .serializers import RutinaSerializer, EjercicioSerializer


class RutinaViewSet(viewsets.ModelViewSet):
    queryset = Rutina.objects.all()
    serializer_class = RutinaSerializer

class EjercicioViewSet(viewsets.ModelViewSet):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer