from django.db import models
from django.contrib.auth.models import User

class Rutina(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    creada_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre

class Ejercicio(models.Model):
    rutina = models.ForeignKey(
        Rutina,
        related_name="ejercicios",
        on_delete=models.CASCADE
    )
    nombre = models.CharField(max_length=200)
    series = models.PositiveIntegerField()
    repeticiones = models.PositiveIntegerField()
    peso = models.FloatField()

class Entrenamiento(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    rutina = models.ForeignKey(Rutina, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
