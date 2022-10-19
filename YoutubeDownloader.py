#pip install pytube

from pytube import YouTube
import os
from pathlib import Path
import SpeachRecognition
import AudioConverter

pathDescargas=Path().absolute() / 'descargas'

def descargarVideo(url):
    yt = YouTube(url)
    titulo=yt.title
    titulo2 = titulo.replace(' ', '-')
    titulo = titulo2.replace('|','')
    t=yt.streams.filter(only_audio=True).first()
    t.download(pathDescargas)

    archivos = Path(pathDescargas).glob('*.mp4')

    for a in archivos:
        os.rename(a,'videos/'+titulo+'.mp4')
        AudioConverter.convertirAudio(titulo)
        SpeachRecognition.transcribirAudio(titulo)
    
