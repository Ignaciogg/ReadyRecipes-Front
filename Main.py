import YoutubeDownloader

with open('apertivos.txt','r') as file:
    for linea in file:
        YoutubeDownloader.descargarVideo(linea)


lista_parada_postres=['postres','postre','helado','tarta','galletas']
lista_parada_verdura=['ensaladas','ensalada']
lista_parada_pescado=['pescado']
lista_parada_carne=['carne']
lsita_parada_pasta=['pasta','espaguetti','carbonara','fideos']