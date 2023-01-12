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
listaCategorías = ["aperitivos","carne","pasta","pescado", "verdura"]
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

#Metodo para generar el diccionario
def generarDiccionario():
    diccionario = []
    ficherosTratados = []
    #matriz = []
    if os.path.isfile(rutaDiccionario): #Compruebo si existe el fichero
        diccionario = leerFichero(rutaDiccionario).splitlines()
    if os.path.isfile(rutaTextosTratados): #Compruebo si existe el fichero
        ficherosTratados = leerFichero(rutaTextosTratados).splitlines()
    #Recorro todas las categorías
    for categoría in listaCategorías:
        rutaCategoría = './textos/'+categoría+'/'
        listaRecetas= os.listdir(rutaCategoría)
        #Recorro todas las recetas de cada categoría
        for receta in listaRecetas:
            #Compruebo si la receta no la había tratado ya
            recetaActual = '/textos/'+categoría+'/'+receta
            if recetaActual not in ficherosTratados:
                print(recetaActual)
                #Tratamiento de la receta
                tokens = tokenizacion(leerReceta('.'+recetaActual).texto)
                tokens = tratamientoBasico(tokens)
                tokens = listaParada(tokens)
                tokens = lematizacion(tokens)
                #tokens = stemming(tokens)
                
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

#Metodo para generar la matriz
def generarMatriz():
    #leo el diccionario
    diccionario = leerFichero(rutaDiccionario).splitlines()
    #leo el fichero de las recetas tratadas
    recetas = leerFichero(rutaTextosTratados).splitlines()
    #print("Numero de recetas: " + str(len(recetas)))
    if os.path.isfile(rutaMatriz): #Compruebo si existe el fichero
        matriz = np.loadtxt(rutaMatriz)
        matrizNueva = np.zeros((len(recetas),len(diccionario)),dtype=int)
        #print("Numero de filas en la matriz inicialmente: "+str(len(matriz)))
        #print("Numero de palabras en el diccionario: "+str(len(diccionario)))
        #print("Numero de palabras en la primera columna de la matriz antes de rellenar de ceros: "+str(len(matriz[0])))
        dicCols = len(diccionario)
        nFila = 0
        #Rellenamos de ceros las filas antiguas
        for fila in matriz:
            filaCols = len(fila)
            difCols = dicCols - filaCols
            for i in range(difCols):
                fila = np.append(fila,0)
            matrizNueva[nFila] = fila
            nFila +=1
        #Guardamos las nuevas filas
        filasMatrizInicial = len(matriz)
        filasMatrizFinal = len(recetas)
        diferenciaFilas = filasMatrizFinal-filasMatrizInicial
        for i in range(diferenciaFilas):
            filaNueva = np.zeros(dicCols)
            tokens = tokenizacion(leerReceta(os.getcwd()+recetas[filasMatrizInicial+i]).texto )
            tokens = tratamientoBasico(tokens)
            tokens = listaParada(tokens)
            tokens = lematizacion(tokens)
            #tokens = stemming(tokens)
            for token in tokens:
                filaNueva[diccionario.index(token)] +=1
            matrizNueva[filasMatrizInicial+i] = filaNueva
        np.savetxt(rutaMatriz,matrizNueva,fmt='%i')
        return matrizNueva
    else:
        matriz = np.zeros( (len(recetas), dicCols ) ,dtype=int)
        i=0
        for receta in recetas:
            tokens = tokenizacion(leerReceta(os.getcwd()+receta).texto)
            tokens = tratamientoBasico(tokens)
            tokens = listaParada(tokens)
            tokens = lematizacion(tokens)
            #tokens = stemming(tokens)
            for token in tokens:
                matriz[i][diccionario.index(token)] +=1
            i+=1
        np.savetxt(rutaMatriz,matriz,fmt='%i')
        return matriz

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
    Categorias = ["Aperitivos","Carne","Pasta","Pescado", "Verdura", "Otros"]

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
    X_train, X_test, y_train, y_test = prepararDatos()
    
    if elegido==0:
        modelo = KNN()
        nombre= 'KNN'
    elif elegido==1:
        modelo = GradientBoostedTree()
        nombre= 'GradientBoostedTree'
    else:
        modelo = RandomForest()
        nombre= 'RandomForest'

    modelo.fit(X_train, y_train)
    fichero = ruta + nombre + '.sav'
    guardarModelo(modelo,fichero)
    print('Modelo1:  {:.2f}'.format(modelo.score(X_test, y_test)*100))
    modelo2 = cargarModelo('./Modelos/'+nombre+'.sav')
    print('Modelo2:  {:.2f}'.format(modelo2.score(X_test, y_test)*100))
    
    return modelo.score(X_test, y_test)

#Método para exportar un modelo 
def guardarModelo(modelo,fichero):
    pickle.dump(modelo, open(fichero, 'wb'))

#Método para importar un modelo
def cargarModelo(fichero):
    return pickle.load(open(fichero, 'rb'))

#Método para categorizar recetas nuevas
def categorizar(fichero):
    modelo = cargarModelo(fichero)
    diccionario = leerFichero(rutaDiccionario).splitlines()
    for elemento in os.listdir('./Textos/Otros'):
        filaNueva = np.zeros(len(diccionario))
        tokens = tokenizacion(leerReceta('./Textos/Otros/'+elemento).texto )
        tokens = tratamientoBasico(tokens)
        tokens = listaParada(tokens)
        tokens = lematizacion(tokens)
        #tokens = stemming(tokens)
        for token in tokens:
            if token in diccionario:
                filaNueva[diccionario.index(token)] +=1
            else:
                diccionario.append(token)
                filaNueva.insert(1)
        print(modelo.predict(filaNueva))