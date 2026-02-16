from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Rutina, Ejercicio, Entrenamiento


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user



class EjercicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ejercicio
        fields = '__all__'

class RutinaSerializer(serializers.ModelSerializer):
    ejercicios = EjercicioSerializer(many=True, read_only=True)
    usuario = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Rutina
        fields = '__all__'


class EntrenamientoSerializer(serializers.ModelSerializer):
    rutina_nombre = serializers.ReadOnlyField(source='rutina.nombre')
    usuario = serializers.ReadOnlyField(source='usuario.username')
    
    class Meta:
        model = Entrenamiento
        fields = '__all__'

