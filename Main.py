import Descarga.YoutubeDownloader as YoutubeDownloader
import os

#import ETL.TratamientoDatos as TratamientoDatos

listaLinks = ["aperitivos.txt","carnes.txt","pastas.txt","pescados.txt", "verduras.txt"]
listaCategorías = ["Aperitivos","Carne","Pasta","Pescado", "Verdura"]
contador=0

while contador<len(listaCategorías):
    with open(listaLinks[contador], 'r') as file:
        for linea in file:
            print(linea)
            YoutubeDownloader.descargarVideo(linea, listaCategorías[contador])
    contador+=1

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')

#TratamientoDatos.generarDiccionario()
