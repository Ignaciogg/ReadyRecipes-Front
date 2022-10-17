#pip install pytube

from pytube import YouTube
import os
from ffmpy import FFmpeg
from pathlib import Path

url='https://www.youtube.com/watch?v=THsNkkN75f8'
pathVideos=Path().absolute() / 'videos'
pathAudios=Path().absolute() / 'audios'

yt = YouTube(url)
titulo=yt.title
t=yt.streams.filter(only_audio=True).first()
t.download(pathVideos)
numeroRecetas = os.listdir(pathAudios)

archivos = Path(pathVideos).glob('*.mp4')

for a in archivos:
    os.rename(a,'videos/video1.mp4')
    numeroRecetas = os.listdir(pathAudios)
    rutaSalida='audios/'+str(len(numeroRecetas))+'.wav'
    print(rutaSalida)
    ff = FFmpeg(executable='C:\\ffmpeg\\bin\\ffmpeg.exe',
        inputs={'videos/video1.mp4': None},
        outputs={rutaSalida: None}
    )
    ff.run()
    os.remove('videos/video1.mp4')
