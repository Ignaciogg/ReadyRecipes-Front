import Descarga.YoutubeDownloader as YoutubeDownloader
import os

listaLinks = ["aperitivos.txt","carnes.txt","pastas.txt","pescados.txt", "verduras.txt"]
listaCategorías = ["Aperitivos","Carne","Pasta","Pescado", "Verdura", "Otros"]

with open(listaLinks[2],'r') as file:
    for linea in file:
        print(linea)
        YoutubeDownloader.descargarVideo(linea, listaCategorías[2])

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')
contenido = os.listdir('./Textos/Verdura')

print(len(contenido))

keywords_postres=['postres','postre','helado','tarta','galletas']
keywords_verdura=['ensaladas','ensalada']
keywords_pescado=['pescado']
keywords_carne=['carne']
keywords_pasta=['pasta','espaguetti','carbonara','fideos']