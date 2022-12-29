import YoutubeDownloader
import os





with open('otros.txt','r') as file:
    for linea in file:
        YoutubeDownloader.descargarVideo(linea)

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')
contenido = os.listdir('./textos/otros')

print(len(contenido))

keywords_postres=['postres','postre','helado','tarta','galletas']
keywords_verdura=['ensaladas','ensalada']
keywords_pescado=['pescado']
keywords_carne=['carne']
keywords_pasta=['pasta','espaguetti','carbonara','fideos']


"""
listaCategorías = ["aperitivos","carne","pasta","pescado", "verdura"]
for categoría in listaCategorías:
    rutaCategoría = os.getcwd() + '/textos/'+categoría+'/'
    listaRecetas= os.listdir(rutaCategoría)
    #Recorro todas las recetas de cada categoría
    i = 1
    for receta in listaRecetas:
        oldname = os.getcwd() +'/textos/'+categoría+'/'+receta
        newname = os.getcwd() +'/textos/'+categoría+'/'+categoría+str(i)+'.txt'
        os.rename(oldname, newname)
        i+=1
'''