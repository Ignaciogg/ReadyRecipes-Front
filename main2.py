import Descarga.YoutubeDownloader as YoutubeDownloader
import os
from Descarga.Receta import Receta

import ETL.TratamientoDatos as TratamientoDatos


#print('knn:  {:.2f}'.format(TratamientoDatos.entrenarModelo(0, './Modelos/')*100))
#print('GradientBoostedTree: {:.2f}'.format(TratamientoDatos.entrenarModelo(1, './Modelos/')*100))
#print('RandomForest: {:.2f}'.format(TratamientoDatos.entrenarModelo(2, './Modelos/')*100))

print('KNN')
TratamientoDatos.categorizar('./Modelos/KNN.sav')
print('\nGradientBoostedTree')
TratamientoDatos.categorizar('./Modelos/GradientBoostedTree.sav')
print('\nRandomForest')
TratamientoDatos.categorizar('./Modelos/RandomForest.sav')

#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=CqBOygiSnuk')
