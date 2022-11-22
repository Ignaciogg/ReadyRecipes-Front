import YoutubeDownloader
import os

'''with open('pescado.txt','r') as file:
    for linea in file:
        YoutubeDownloader.descargarVideo(linea)'''

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')
contenido = os.listdir('./textos/pescado')

print(len(contenido))

keywords_postres=['postres','postre','helado','tarta','galletas']
keywords_verdura=['ensaladas','ensalada']
keywords_pescado=['pescado']
keywords_carne=['carne']
keywords_pasta=['pasta','espaguetti','carbonara','fideos']