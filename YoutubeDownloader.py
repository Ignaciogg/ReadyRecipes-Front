#pip install pytube

import imp
from pytube import YouTube
import os
from ffmpy import FFmpeg
from pathlib import Path
import SpeachRecognition

pathVideos=Path().absolute() / 'videos'
pathAudios=Path().absolute() / 'audios'
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
        rutaEntrada='videos/'+titulo+'.mp4'
        os.rename(a,rutaEntrada)

        rutaSalida='audios/'+titulo+'.wav'

        ff = FFmpeg(executable='C:\\ffmpeg\\bin\\ffmpeg.exe',
            inputs={rutaEntrada: None},
            outputs={rutaSalida: None}
        )
        ff.run()
        #os.remove('videos/video1.mp4')
        SpeachRecognition.transcribirAudio(titulo)
    
