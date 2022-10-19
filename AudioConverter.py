from ffmpy import FFmpeg

def convertirAudio(titulo):
    rutaEntrada='videos/'+titulo+'.mp4'
    rutaSalida='audios/'+titulo+'.wav'

    ff = FFmpeg(executable='C:\\ffmpeg\\bin\\ffmpeg.exe',
        inputs={rutaEntrada: None},
        outputs={rutaSalida: None}
    )
    ff.run()
