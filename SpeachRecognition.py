#pip install SpeechRecognition

# Importar libreria
import speech_recognition as sr
print( f'La version de speech recognition es: {sr.__version__}')
audio = "video.avi"

#iniciamos reconocimiento de voz
re = sr.Recognizer();

#conversion audio-texto
with sr.AudioFile(audio) as source:
    info_audio = re.record(source)
    texto = re.recognize_google(info_audio, language="es-ES")
    print (texto)

