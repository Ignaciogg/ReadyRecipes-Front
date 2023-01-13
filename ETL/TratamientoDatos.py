#pip install -U spacy
#python -m spacy download es
#pip install nltk

from nltk.stem import SnowballStemmer
import spacy 
import re
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.ensemble import RandomForestRegressor
import pickle
import warnings
warnings.filterwarnings('once')

from Descarga.Receta import Receta


#Variables globales
Categorias = ["Aperitivos", "Carne", "Pasta", "Pescado", "Verdura"]
rutaListaParada = "ETL\ListaParada.txt"
rutaDiccionario = "ETL\DiccionarioL.txt"
rutaMatriz = "ETL\MatrizL.txt"
rutaTextosTratados = "ETL\TextosLeidosL.txt"

#Metodos para lectura de ficheros
def leerFichero(rutaFichero):
    f = open(rutaFichero, 'r', encoding="utf-8")
    texto = f.read()
    f.close()
    return texto

def leerReceta(rutaReceta):
    f = open(rutaReceta, 'r', encoding="utf-8")
    url = f.readline()
    titulo = f.readline()
    autor = f.readline()
    texto = f.readline()
    f.close()
    return Receta(titulo,url,autor,texto)

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

def stemming(tokens):
    spanishstemmer=SnowballStemmer('spanish')
    stems = [spanishstemmer.stem(token) for token in tokens]
    return stems

def tratarFichero(rutaReceta):
    tokens = tokenizacion(leerReceta(rutaReceta).texto)
    tokens = tratamientoBasico(tokens)
    tokens = listaParada(tokens)
    tokens = lematizacion(tokens)
    #tokens = stemming(tokens)
    return tokens

#Metodo para generar el diccionario
def generarDiccionario():
    diccionario = []
    ficherosTratados = []
    if os.path.isfile(rutaDiccionario): #Compruebo si existe el fichero
        diccionario = leerFichero(rutaDiccionario).splitlines()
    if os.path.isfile(rutaTextosTratados): #Compruebo si existe el fichero
        ficherosTratados = leerFichero(rutaTextosTratados).splitlines()
    #Recorro todas las categorías
    for categoría in Categorias:
        rutaCategoría = './textos/'+categoría+'/'
        listaRecetas= os.listdir(rutaCategoría)
        #Recorro todas las recetas de cada categoría
        for receta in listaRecetas:
            #Compruebo si la receta no la había tratado ya
            recetaActual = '/textos/'+categoría+'/'+receta
            if recetaActual not in ficherosTratados:
                print(recetaActual)
                #Tratamiento de la receta
                tokens = tratarFichero('.'+recetaActual)
                #Compruebo si existe el token en la lista y sino lo añado al diccionario
                for token in tokens:
                    if token not in diccionario:
                        diccionario.append(token)
                    
                #Guardo la receta en los ficheros tratados para no volver a analizarla           
                ficherosTratados.append(recetaActual)
    #Guardo en ficheros el diccionaro y las noticias tratadas
    #Diccionario
    f = open(rutaDiccionario, "w", encoding="utf-8")
    for elemento in diccionario:
        f.write(elemento+"\n")
    f.close()

    #Noticias tratadas
    f = open(rutaTextosTratados, "w", encoding="utf-8")
    for elemento in ficherosTratados:
        f.write(elemento+"\n")
    f.close()
    
    return diccionario

#Metodos para generar la matriz
def generarFila(diccionario,rutaReceta):
    filaNueva = np.zeros(len(diccionario))
    tokens = tratarFichero(rutaReceta)
    for token in tokens:
        filaNueva[diccionario.index(token)] += 1
    return filaNueva

def generarMatriz():
    #leo el diccionario
    diccionario = leerFichero(rutaDiccionario).splitlines()
    #leo el fichero de las recetas tratadas
    recetas = leerFichero(rutaTextosTratados).splitlines()
    #Genero la nueva matriz
    matrizNueva = np.zeros((len(recetas), len(diccionario)), dtype=int)

    nFila = 0
    if os.path.isfile(rutaMatriz): #Si ya existe una matriz previa
        #Cargo la matriz antigua
        matriz = np.loadtxt(rutaMatriz)
        #Diferencia de longitud de cada fila entre la matriz antigua y nueva
        difLenRow = len(diccionario) - len(matriz[nFila])
        
        #Rellenamos de ceros las filas antiguas
        for fila in matriz:
            for i in range(difLenRow):
                fila = np.append(fila,0)
            matrizNueva[nFila] = fila
            nFila += 1

        #Guardamos las nuevas filas
        for i in range(len(recetas)-len(matriz)):
            filaNueva = generarFila(diccionario, os.getcwd()+recetas[len(matriz)+i])
            matrizNueva[len(matriz)+i] = filaNueva
    
    else:  # Si no existe una matriz previa
        #Guardamos las nuevas filas
        for receta in recetas:
            filaNueva=generarFila(diccionario, os.getcwd()+receta)
            matrizNueva[nFila] = filaNueva
            nFila += 1

    np.savetxt(rutaMatriz, matrizNueva, fmt='%i')
    return matrizNueva

#Métodos para generar modelos l
def KNN():
    return KNeighborsClassifier(
        n_neighbors=16
    )
    
def GradientBoostedTree():    
    return GradientBoostingRegressor(
        n_estimators = 506,
        random_state = 37
    )
    
def RandomForest():
    return RandomForestRegressor(
        n_estimators = 4,
        criterion    = 'absolute_error',#'squared_error',
        max_depth    = None,
        max_features = 'auto',
        oob_score    = False,
        n_jobs       = -1,
        random_state = 27
    )

#Método para preparar los datos que usa el modelo
def prepararDatos():

    generarDiccionario()
    textosLeidos = leerFichero(rutaTextosTratados).splitlines()
    listaCategorias = []
    for ruta in textosLeidos:
        fichero = ruta.split('.')[0].split('/')[-1]
        categoria = re.sub("\d+", "", fichero)
        listaCategorias.append(Categorias.index(categoria))

    resultados = pd.DataFrame(listaCategorias)
    matriz = pd.DataFrame(generarMatriz())    

    X = matriz.values
    y = resultados.values.ravel()
    
    return train_test_split(X, y, test_size=0.1, random_state=10)

#Método para entrenar el modelo elegido
def entrenarModelo(elegido,ruta):
    #Preparar los datos que se utilizan para entrenar el modelo
    X_train, X_test, y_train, y_test = prepararDatos()
    
    #Eleccion del modelo que se entrena
    if elegido==1:
        modelo = KNN()
        nombre= 'KNN'
    elif elegido==2:
        modelo = GradientBoostedTree()
        nombre= 'GradientBoostedTree'
    else:
        modelo = RandomForest()
        nombre= 'RandomForest'
    
    #Generar nombre del modelo
    contador = 0
    for elemento in os.listdir(ruta):
        categoria = re.sub("\d+", "", str(elemento).split('.')[0])
        if categoria == nombre:
            contador+=1
    nombre+=str(contador+1)

    #Entrenamos el modelo elegido
    modelo.fit(X_train, y_train)

    #Guardamos el modelo
    fichero = ruta + '/' +nombre + '.sav'
    guardarModelo(modelo,fichero)
    
    return modelo.score(X_test, y_test)

#Método para exportar un modelo 
def guardarModelo(modelo,fichero):
    with open(fichero, 'wb') as f:
        pickle.dump(modelo, f)
        f.close()

#Método para importar un modelo
def cargarModelo(fichero):
    with open(fichero, 'rb') as f:
        modelo = pickle.load(f)
        f.close()
    return modelo

#Método para categorizar recetas nuevas
def categorizar(fichero):
    modelo = cargarModelo(fichero)
    diccionario = leerFichero(rutaDiccionario).splitlines()
    for elemento in os.listdir('./Textos/Otros'):
        rutaReceta = './Textos/Otros/'+elemento
        filaNueva = np.zeros(len(diccionario))
        tokens = tratarFichero(rutaReceta)
        for token in tokens:
            if token in diccionario:
                filaNueva[diccionario.index(token)] += 1

        print(Categorias[round(modelo.predict([filaNueva])[0])]+';'+leerReceta('./Textos/Otros/'+elemento).titulo[:-1]+';'+str(elemento))
