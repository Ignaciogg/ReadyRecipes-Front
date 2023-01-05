#pip install pytube

from pytube import YouTube
import os
from pathlib import Path
from Descarga.Receta import Receta
import Descarga.SpeachRecognition as SpeachRecognition
import Descarga.AudioConverter as AudioConverter

pathVideos=Path().absolute() / 'Videos'
pathAudios=Path().absolute() / 'Audios'
pathTextos=Path().absolute() / 'Textos'
listaCategorías = ["Aperitivos","Carne","Pasta","Pescado", "Verdura", "Otros"]

#Comprobar que existen los directorios
try:
    os.stat(pathVideos)
    os.stat(pathAudios)
    os.stat(pathTextos)
except:
    os.mkdir(pathVideos)
    os.mkdir(pathAudios)
    os.mkdir(pathTextos)

def descargarVideo(url, categoria):
    if comprobarNuevo(url):
        yt = YouTube(url)
        titulo = yt.title
        autor = yt.author
        t = yt.streams.filter(only_audio=True).first()
        nombre = categoria+str(len(os.listdir(str(pathTextos) + '\\' + categoria))+1)
        t.download(pathVideos, nombre+'.mp4')
        AudioConverter.convertirAudio(nombre)
        try:
            texto = SpeachRecognition.transcribirAudio(nombre)
            receta = Receta(titulo, url, autor, texto).guardarTexto(str(pathTextos)+'\\'+categoria+'\\'+nombre+'.txt')
        except:
            print('ERROR. Audio mayor 10MB')
            os.remove(str(pathAudios) + '\\'+nombre+'.wav')

def comprobarNuevo(url):
    nuevo = True
    i = 0
    while nuevo and i < len(listaCategorías):
        ruta = str(pathTextos) + '\\' + listaCategorías[i]
        listaTextos = os.listdir(ruta)
        j = 0
        while nuevo and j < len(listaTextos):
            enlaceReceta = ruta + '\\' + listaTextos[j]
            if url == Receta(enlaceReceta).url:
                nuevo = False
            j += 1
        i += 1
    return nuevo