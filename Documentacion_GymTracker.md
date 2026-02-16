# Guía Definitiva del Proyecto GymTracker (Explicación Sencilla)

Este documento está escrito para que **CUALQUIER PERSONA** entienda cómo funciona esta aplicación web, sin necesidad de ser programador. Si dentro de un mes se te olvida todo, lee esto.

---

## 1. ¿Cómo funciona la aplicación a grandes rasgos?

Imagínate un **Restaurante**:

1.  **El Frontend (La Sala)**: Es lo que ve el cliente (tú). Las mesas, la decoración, el menú. En nuestro caso, son las pantallas de React (Login, Dashboard, Rutinas).
2.  **El Backend (La Cocina)**: Es donde se cocina todo. Nadie lo ve, pero es donde están los ingredientes (Datos) y los cocineros (Lógica). En nuestro caso, es Django.
3.  **La API (El Camarero)**: Es el mensajero. Tú (Frontend) le pides "Tráeme mis rutinas" y el Camarero (API) va a la cocina, las busca y te las trae.

---

## 2. El Frontend (La Cara Bonita / React)

Aquí es donde interactúas. Está hecho con **React**.

### Conceptos Clave para entender el código:
*   **Componente (`.jsx`)**: Piensa en ellos como piezas de LEGO. `Login.jsx` es una pieza, `Home.jsx` es otra. Construimos la web juntando estas piezas.
*   **Estado (`useState`)**: Es la **MEMORIA A CORTO PLAZO** de la página.
    *   *Ejemplo*: Si escribes tu nombre en un formulario, la página necesita "recordar" qué letras has puesto mientras escribes. Eso se guarda en un estado. Si recargas la página, se olvida (como Dory de Buscando a Nemo).
*   **Efecto (`useEffect`)**: Es una **ACCIÓN AUTOMÁTICA**.
    *   *Ejemplo*: "CUANDO cargue la página, AUTOMÁTICAMENTE llama al camarero y pídele las rutinas".

### Explicación de cada Pantalla (Explicado para tontos):

#### 📜 `Login.jsx` (La Puerta de Entrada)
*   **¿Qué hace?**: Te pide usuario y contraseña para dejarte pasar.
*   **Sus "Memorias" (`useState`)**:
    *   `username`: Guarda lo que escribes en la cajita de usuario.
    *   `password`: Guarda lo que escribes en la cajita de contraseña.
    *   `error`: Si te equivocas, aquí guarda el mensaje "Contraseña incorrecta" para pintártelo en rojo.
*   **El Truco**: Cuando le das al botón, si todo va bien, el backend le da un "Pase VIP" (Token). La página guarda ese pase en el bolsillo del navegador (`localStorage`) para que no tengas que identificarte en cada puerta.

#### 📝 `Register.jsx` (Darse de Alta)
*   **¿Qué hace?**: Te permite crear un usuario nuevo si no tienes.
*   **Sus "Memorias"**: Igual que el Login, pero añade `email`.
*   **El Truco**: Si el registro funciona, te manda de una patada (`navigate`) a la pantalla de Login para que entres.

#### 🏠 `Home.jsx` (El Panel Principal)
*   **¿Qué hace?**: Es tu resumen. Te dice "Hola" y te muestra tus estadísticas.
*   **Sus "Memorias"**:
    *   `stats`: Apunta cuántos entrenamientos llevas en total.
    *   `recentWorkouts`: Apunta los últimos 5 días que fuiste al gym.
*   **Su "Acción Automática" (`useEffect`)**: En cuanto entras, llama al backend: *"¡Oye! ¿Qué ha hecho este tío últimamente? Dame datos"*.
*   **Cálculo de Racha**: Mira la fecha de tu último entreno. ¿Fue hace menos de 7 días? -> ¡Racha Activa! ¿Más? -> ¡Racha Perdida!

#### 📋 `Routines.jsx` (El Catálogo)
*   **¿Qué hace?**: Muestra todas las rutinas que te has inventado (ej: "Día de Pierna", "Pecho y Espalda").
*   **Sus "Memorias"**:
    *   `rutinas`: Una lista de todas tus rutinas.
*   **Visualización**: Usa un bucle (`.map`) que dice: "Por cada rutina que tenga en la lista, dibuja una tarjeta bonita".

#### 🔍 `RoutineDetail.jsx` (La Lupa)
*   **¿Qué hace?**: Cuando entras en una rutina específica, te enseña los ejercicios de ESA rutina.
*   **Sus "Memorias"**:
    *   `newExercise`: Es un formulario invisible. Cuando le das a "Añadir ejercicio", aquí se guardan los datos (series, repeticiones) antes de guardarlos de verdad.
    *   `logging`: Se pone en `true` (verdadero) cuando le das a "Empezar". Sirve para que el botón se ponga gris y no le des 20 veces seguidas por impaciente.
*   **Su Acción Automática**: Lee la dirección de internet (URL). Si dice `/routines/5`, sabe que tiene que pedirle al backend SOLO la información de la rutina número 5.

#### 👤 `Profile.jsx` (Tu Carnet)
*   **¿Qué hace?**: Te dice quién eres y te deja salir.
*   **Botón Salir (`handleLogout`)**: Lo que hace es muy simple: Tira a la basura el "Pase VIP" (borra el token del `localStorage`). Sin pase, la aplicación te echa automáticamente a la calle (Login).

---

## 3. El Backend (El Cerebro / Django)

Aquí no hay dibujitos, solo lógica pura y dura y datos guardados.

### 📚 `models.py` (Los Planos de la Base de Datos)
Aquí definimos "QUÉ COSAS EXISTEN" en nuestro mundo.
*   **Rutina**: Es como una carpeta. Tiene un nombre y un dueño (`Usuario`).
*   **Ejercicio**: Es una hoja dentro de la carpeta Rutina. Si tiras la carpeta (borras rutina), se tiran las hojas (se borran los ejercicios).
*   **Entrenamiento**: Es un "Fichaje". Solo guarda: "Fulanito hizo la rutina X el día Y".

### 🗣️ `serializers.py` (El Traductor)
El Frontend habla Javascript (JSON) y el Backend habla Python (Objetos).
*   **¿Para qué sirve?**: Un *Serializer* coge tus datos de la base de datos y los convierte en texto ordenado (JSON) para enviárselos a React. Y al revés: coge el texto que envía React y lo convierte en datos para guardar.

### 🚦 `views.py` (El Controlador de Tráfico)
Aquí es donde se decide quién puede hacer qué.
*   **El Guardaespaldas (`IsAuthenticated`)**: Casi todas las vistas tienen esto. Significa: "Si no tienes el Pase VIP (Token), no pasas".
*   **El Filtro Mágico (`get_queryset`)**:
    *   Esto es lo más importante de todo.
    *   Cuando pides "Dame las rutinas", este código dice: *"Espera, ¿quién eres? ¿Juan? Pues toma SOLO las rutinas de Juan"*.
    *   **¿Por qué?**: Para que Pepe no vea las rutinas de Juan. Seguridad básica.

### 🔗 `urls.py` (La Guía Telefónica)
*   Es una lista que dice: "Si llaman al número `/api/rutinas/`, pásales con el departamento `RutinaViewSet`". Organiza a dónde va cada petición.

---

## Resumen para sobrevivir dentro de 1 mes:

1.  **¿La web no carga datos?** -> Mira si el backend (ventana negra de comandos) está encendido.
2.  **¿No puedes entrar?** -> Mira si tienes usuario creado. O crea uno nuevo.
3.  **¿Quieres cambiar un color?** -> Vete a `Frontend` -> `src` -> `index.css` o busca el archivo `.jsx` de esa página.
4.  **¿Quieres cambiar qué datos se guardan?** -> Vete a `Backend` -> `entrenamientos` -> `models.py`.

¡Suerte, tú del futuro!
