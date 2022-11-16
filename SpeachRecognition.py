#pip install SpeechRecognition

# Importar libreria
import speech_recognition as sr
import YoutubeDownloader as yt
import os




def transcribirAudio(titulo):
    #iniciamos reconocimiento de voz
    re = sr.Recognizer()
    #conversion audio-texto
    ruta=str(yt.pathAudios)+ '\\'+titulo+'.wav'
    with sr.AudioFile(ruta) as source:
        info_audio = re.record(source)
        try:
            texto = re.recognize_google(info_audio, language="es-ES")
        except:
            print('Error')
    guardarTexto(texto,titulo)

    try:
        os.remove(ruta)
    except:
        print("No se puede borrar")

def guardarTexto (texto,titulo):
    rutaSalida=str(yt.pathTextos)+'\\'+titulo+'.txt'
    try:
        with open(rutaSalida, 'w', encoding="utf-8") as f:
            f.write(texto)
            f.close()
    except:
        print('No se puede guardar el texto')