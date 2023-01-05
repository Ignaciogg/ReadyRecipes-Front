import Descarga.YoutubeDownloader as YoutubeDownloader
import os

import ETL.TratamientoDatos as TratamientoDatos

listaLinks = ["aperitivos.txt","carnes.txt","pastas.txt","pescados.txt", "verduras.txt"]
listaCategorías = ["Aperitivos","Carne","Pasta","Pescado", "Verdura", "Otros"]

#1 Aperitivos
#2 Carne
#3 Pasta
#4 Pescado
#5 Verdura
categoria = 1 

with open(listaLinks[categoria], 'r') as file:
    for linea in file:
        print(linea)
        YoutubeDownloader.descargarVideo(linea, listaCategorías[categoria])

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')

TratamientoDatos.generarDiccionario()
