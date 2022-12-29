#pip install pytube

from pytube import YouTube
import os
from pathlib import Path
import Descarga.SpeachRecognition as SpeachRecognition
import Descarga.AudioConverter as AudioConverter

pathDescargas=Path().absolute() / 'descargas'
pathVideos=Path().absolute() / 'videos'
pathAudios=Path().absolute() / 'audios'
pathTextos=Path().absolute() / 'Textos'
listaCategorías = ["Aperitivos","Carnes","Pastas","Pescados", "Verduras", "Otros"]

#Comprobar que existen los directorios
try:
    os.stat(pathDescargas)
    os.stat(pathVideos)
    os.stat(pathAudios)
    os.stat(pathTextos)
except:
    os.mkdir(pathDescargas)
    os.mkdir(pathVideos)
    os.mkdir(pathAudios)
    os.mkdir(pathTextos)

def descargarVideo(url, categoria):
    yt = YouTube(url)
    titulo = yt.title
    t = yt.streams.filter(only_audio=True).first()
    t.download(pathDescargas)
    archivos = Path(pathDescargas).glob('*.mp4')

    for a in archivos:
        try:
            os.rename(a, str(pathVideos) +"\\"+ titulo+'.mp4')
        except:
            os.remove(a)
            print('Error. Ya existe el video')
            continue
        AudioConverter.convertirAudio(titulo)
        try:
            SpeachRecognition.transcribirAudio(titulo)
        except:
            print('ERROR. Audio mayor 10MB')

def comprobarNuevo(url){
    nuevo = True
    i = 0
    while (nuevo and ):
    for categoria in listaCategorías:
        for
}