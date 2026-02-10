from rest_framework import viewsets
from .models import Rutina, Ejercicio
from .serializers import RutinaSerializer, EjercicioSerializer
from rest_framework.permissions import IsAuthenticated

class RutinaViewSet(viewsets.ModelViewSet):
    queryset = Rutina.objects.all()
    serializer_class = RutinaSerializer
    permission_classes = [IsAuthenticated]

class EjercicioViewSet(viewsets.ModelViewSet):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer
    permission_classes = [IsAuthenticated]

    