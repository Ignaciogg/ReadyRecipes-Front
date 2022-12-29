#pip install pytube

from pytube import YouTube
import os
from pathlib import Path
import Descarga.Receta as Receta
import Descarga.SpeachRecognition as SpeachRecognition
import Descarga.AudioConverter as AudioConverter

pathVideos=Path().absolute() / 'videos'
pathAudios=Path().absolute() / 'audios'
pathTextos=Path().absolute() / 'Textos'
listaCategorías = ["Aperitivos","Carnes","Pastas","Pescados", "Verduras", "Otros"]

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
        autor = yt.channel_id
        t = yt.streams.filter(only_audio=True).first()
        nombre = categoria+str(len(os.listdir(pathTextos+'/'+categoria))+1)
        t.download(pathVideos, nombre+'.mp4')
        AudioConverter.convertirAudio(nombre)
        try:
            texto = SpeachRecognition.transcribirAudio(nombre)
            Receta(titulo, url, autor, texto).guardarTexto(pathTextos+nombre+'.txt')
        except:
            print('ERROR. Audio mayor 10MB')
        
        
        '''
            archivos = Path(pathDescargas).glob('*.mp4')

            for a in archivos:
                try:
                    os.rename(a, str(pathVideos) +"\\"+ titulo+'.mp4')
                except:
                    os.remove(a)
                    print('Error. Ya existe el video')
                    continue
        '''
        
            


def comprobarNuevo(url):
    nuevo = True
    i = 0
    while nuevo and i < len(listaCategorías):
        ruta = pathTextos+'/'+listaCategorías[i]
        listaTextos = os.listdir(ruta)
        j = 0
        while nuevo and j < len(listaTextos):
            enlaceReceta = ruta+'/'+listaTextos[j]
            if url == leerReceta(enlaceReceta):
                nuevo = False
            j += 1
        i += 1
    return nuevo


def leerReceta(ruta):
    f = open(ruta, 'r', encoding="Latin-1")
    url = f.readline()
    return url
