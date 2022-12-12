#pip install -U spacy
#python -m spacy download es
#pip install nltk
from nltk import text
import spacy 

import os
from pathlib import Path
import numpy
import ast
import TransformTFIDF


#Variables globales
listaTextos = ["/textos/aperitivos/","/textos/carne/","/textos/pasta/","/textos/pescado/", "/textos/verdura/"]
rutaListaParada = "/filtrado/ListaParada.txt"
rutaDiccionario = "Diccionario.txt"
rutaMatriz = "matriz.txt"
rutaTextosTratados = "TextosLeidos.txt"


#Metodo de lectura de receta
def leerReceta(rutaFichero):
    f = open (rutaFichero,'r')
    receta = f.read()
    return receta

#Metodos para lectura de ficheros
def leerFichero(rutaFichero):
    if rutaFichero==rutaListaParada or rutaFichero==rutaDiccionario:
        f = open (rutaFichero,'r')
        texto = f.read() 
    else:
        texto = leerReceta(rutaFichero)
    return texto

def leerFicheros(rutaFichero):
    f = open (rutaFichero,'r')
    texto = f.read()
    fichero = texto.splitlines()
    return fichero


#Metodos de Tratamiento de ficheros
def tokenizacion(texto):
    nlp = spacy.load('es_core_news_sm')
    doc = nlp(texto) # Crea un objeto de spacy tipo nlp
    tokens = [t.orth_ for t in doc] # Crea una lista con las palabras del texto
    return tokens

def tratamientoBasico(tokens):
    caracteres = "0123456789ºª!·$%&/()=|@#~€¬'?¡¿`+^*[]´¨}{,.-;:_<>\n \""
    listaTratada = []
    for token in tokens :
        for i in range (len(caracteres)):
            token = token.replace(caracteres[i],"")
        if(token != ""):
            listaTratada.append(token.lower())
    return listaTratada

def listaParada(tokens):
    listaParada = tratamientoBasico(tokenizacion(leerFichero(rutaListaParada)))
    listaDepurada = []
    for token in tokens:
        encontrado = False
        i=0
        while (encontrado==False and i<len(listaParada)):
            if (token==listaParada[i]):
                encontrado=True
            i+=1
        if encontrado==False and len(token)>2:
            listaDepurada.append(token)
    return listaDepurada

def lematizacion(tokens):
    nlp = spacy.load('es_core_news_sm')
    texto = ""
    for token in tokens:
        texto += token + " "
    doc = nlp(texto)
    lemmas = [tok.lemma_ for tok in doc]
    return lemmas

#Metodo para generar el diccionario
def generarDiccionario():
    diccionario = []
    ficherosTratados = []
    matriz = []
    if os.path.isfile(rutaDiccionario): #Compruebo si existe el fichero
        diccionario = leerFicheros(rutaDiccionario)
    if os.path.isfile(rutaFicherosTratados): #Compruebo si existe el fichero
        ficherosTratados = leerFicheros(rutaFicherosTratados)
    #Recorro todos los periodicos
    for periodico in listaPeriodicos:
        rutaPeriodico = os.getcwd() + periodico
        listaTemas = os.listdir(rutaPeriodico)
        #Recorro todos los temas de cada periodico
        for tema in listaTemas:
            rutaTema = rutaPeriodico + tema + "/"
            noticias = os.listdir(rutaTema)
            #Recorro todas las noticias de cada tema
            for noticia in noticias:
                #Compruebo si la noticia no la había tratado ya
                noticiaActual = periodico + tema + "/" + noticia
                if noticiaActual not in ficherosTratados:
                    #Tratamiento de la noticia
                    tokens = tokenizacion(leerFichero(rutaTema+noticia))
                    tokens = tratamientoBasico(tokens)
                    tokens = listaParada(tokens)
                    tokens = lematizacion(tokens)
                    
                    #Compruebo si existe el token en la lista y sino lo añado al diccionario
                    for token in tokens:
                        if token not in diccionario:
                            diccionario.append(token)
                        
                    #Guardo la noticia en los ficheros tratados para no volver a analizarlo           
                    ficherosTratados.append(noticiaActual)
    #Guardo en ficheros el diccionaro y las noticias tratadas
    #Diccionario
    f = open(rutaDiccionario, "w")
    for elemento in diccionario:
        f.write(elemento+"\n")
    f.close()

    #Noticias tratadas
    f = open(rutaFicherosTratados, "w")
    for elemento in ficherosTratados:
        f.write(elemento+"\n")
    f.close()
    
    return diccionario

#Metodo para generar la matriz
def generarMatriz():
    #leo el diccionario
    diccionario = leerFicheros(rutaDiccionario)
    #leo el fichero de las noticias tratadas
    noticias = leerFicheros(rutaFicherosTratados)
    print("Numero de noticias: " + str(len(noticias)))
    if os.path.isfile(rutaMatriz): #Compruebo si existe el fichero
        matriz = numpy.loadtxt(rutaMatriz)
        matrizNueva = numpy.zeros((len(noticias),len(diccionario)),dtype=int)
        print("Numero de filas en la matriz inicialmente: "+str(len(matriz)))
        print("Numero de palabras en el diccionario: "+str(len(diccionario)))
        print("Numero de palabras en la primera columna de la matriz antes de rellenar de ceros: "+str(len(matriz[0])))
        dicCols = len(diccionario)
        nFila = 0
        #Rellenamos de ceros las filas antiguas
        for fila in matriz:
            filaCols = len(fila)
            difCols = dicCols - filaCols
            for i in range(difCols):
                fila = numpy.append(fila,0)
            matrizNueva[nFila] = fila
            nFila +=1
        #Guardamos las nuevas filas
        filasMatrizInicial = len(matriz)
        filasMatrizFinal = len(noticias)
        diferenciaFilas = filasMatrizFinal-filasMatrizInicial
        for i in range(diferenciaFilas):
            filaNueva = numpy.zeros(len(diccionario))
            tokens = tokenizacion(leerFichero(os.getcwd()+noticias[filasMatrizInicial+i]) )
            tokens = tratamientoBasico(tokens)
            tokens = listaParada(tokens)
            tokens = lematizacion(tokens)
            for token in tokens:
                filaNueva[diccionario.index(token)] +=1
            matrizNueva[filasMatrizInicial+i] = filaNueva
        numpy.savetxt(rutaMatriz,matrizNueva,fmt='%i')
        return matrizNueva
    else:
        matriz = numpy.zeros((len(noticias),len(diccionario)),dtype=int)
        i=0
        for noticia in noticias:
            tokens = tokenizacion(leerFichero(os.getcwd()+noticia))
            tokens = tratamientoBasico(tokens)
            tokens = listaParada(tokens)
            tokens = lematizacion(tokens)
            for token in tokens:
                matriz[i][diccionario.index(token)] +=1
            i+=1
        numpy.savetxt(rutaMatriz,matriz,fmt='%i')
        return matriz
    
#Main
#generarDiccionario()
#matriz = generarMatriz()
#print( coseno(matriz[0], matriz[1]) )
#matrizNueva = TransformTFIDF.matrixToTFIDF(matriz)
#print(matrizNueva)
#print(len(buscadorFrase("")))