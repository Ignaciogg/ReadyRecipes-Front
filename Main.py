import Descarga.YoutubeDownloader as YoutubeDownloader
import os
from Descarga.Receta import Receta

import ETL.TratamientoDatos as TratamientoDatos

#TratamientoDatos.KNN()
#TratamientoDatos.GradientBoostedTree()
TratamientoDatos.RandomForest()
#TratamientoDatos.generarDiccionario()
#TratamientoDatos.generarMatriz()

'''
listaLinks = ["aperitivos.txt","carnes.txt","pastas.txt","pescados.txt", "verduras.txt"]
listaCategorías = ["Aperitivos","Carne","Pasta","Pescado", "Verdura"]
contador=0

while contador<len(listaCategorías):
    with open(listaLinks[contador], 'r') as file:
        for linea in file:
            print(linea)
            YoutubeDownloader.descargarVideo(linea, listaCategorías[contador])
    contador+=1s
'''


#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=U1JXE7o6Z8g')

#Convertir textos de otro grupo
'''
rutaCategoría = './Textos/recetastextos/Carpeta Pasta/'

listaRecetas= os.listdir(rutaCategoría)
for receta in listaRecetas:
    print(receta)
    with open(rutaCategoría+receta, 'r') as f:
        titulo =f.readline().replace('Titulo:','').replace('\n','') #Titulo
        autor =f.readline().replace('Autor:','').replace('\n','') #Autor
        f.readline() #Fecha
        url = f.readline().replace('Enlace: ','').replace('\n','') #Url
        texto = f.readline().replace('Entradilla:','').replace('\n','') #Texto

        if YoutubeDownloader.comprobarNuevo(url):
            nombre = './Textos/Pasta/Pasta'+str(len(os.listdir('./Textos/Pasta'))+1)+'.txt'
            print(nombre)
            Receta(titulo, url, autor, texto).guardarTexto(nombre)
'''