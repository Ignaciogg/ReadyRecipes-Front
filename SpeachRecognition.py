#pip install SpeechRecognition

# Importar libreria
import speech_recognition as sr

def transcribirAudio(titulo):
    #iniciamos reconocimiento de voz
    re = sr.Recognizer();
    #conversion audio-texto
    ruta='audios/'+titulo+'.wav'
    with sr.AudioFile(ruta) as source:
        info_audio = re.record(source)
        texto = re.recognize_google(info_audio, language="es-ES")
    guardarTexto(texto,titulo)

def guardarTexto (texto,titulo):
    rutaSalida='textos/'+titulo+'.txt'
    with open(rutaSalida, 'w', encoding="utf-8") as f:
        f.write(texto)
        f.close()