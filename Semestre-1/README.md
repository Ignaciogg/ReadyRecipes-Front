# ReadyRecipes
Proyecto de la asignatura Proyecto de Computación I

--------------------------------------------------------

Para utilizar Ready Recipes, es necesario primero instalar Python en nuestra máquina y contar
con un IDE o un editor de texto para correr nuestro código, nosotros recomendamos Visual
Studio Code.
En el apartado de extensiones de Visual Studio Code, buscaremos e instalaremos la extensión
Python.
Lo siguiente será cambiar al explorador de archivos de Visual Studio Code y arrastrar la carpeta
de Ready Recipes.
Para instalar las librerías que utilizamos en nuestra aplicación, basta con abrir una ventana de
terminal (segundo icono arriba a la izquierda) y ejecutar estos comandos uno a uno:
```
py -m pip
pip install -r requirements.txt
```
Para la conversión de vídeo a audio, es necesario instalar un framework, este no se incluye en
el proyecto porque una vez instalado ocupa más de 300MB. Para descargarlo hay que hacerlo
desde el siguiente enlace https://ffmpeg.org/download.html y posteriormente extraerlo y
mover la carpeta a C:\. Si se desea almacenar en otra ubicación, en la carpeta Descarga de
nuestro proyecto encontramos el fichero AudioConverter.py y en su interior en la línea 13 se
puede cambiar la ruta.
Con esto terminaríamos la instalación de Ready Recipes y podremos ejecutar Main.py.

Nuestra aplicación cuenta con cinco ventanas por las que el usuario se puede desplazar utilizando 
el menú superior.
1. Menú principal
2. Descarga de vídeos de Youtube
3. Entrenamientos de algoritmos de clasificación
4. Clasificación de recetas
5. Web Scraping
