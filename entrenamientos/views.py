from rest_framework import viewsets, generics
from .models import Rutina, Ejercicio, Entrenamiento
from .serializers import RutinaSerializer, EjercicioSerializer, EntrenamientoSerializer, UserSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserSerializer


class RutinaViewSet(viewsets.ModelViewSet):
    serializer_class = RutinaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rutina.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class EjercicioViewSet(viewsets.ModelViewSet):
    queryset = Ejercicio.objects.all()
    serializer_class = EjercicioSerializer
    permission_classes = [IsAuthenticated]

class EntrenamientoViewSet(viewsets.ModelViewSet):
    serializer_class = EntrenamientoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Entrenamiento.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


    