import Descarga.YoutubeDownloader as YoutubeDownloader
import os
from Descarga.Receta import Receta

import ETL.TratamientoDatos as TratamientoDatos


#print('knn:  {:.2f}'.format(TratamientoDatos.entrenarModelo(0, './Modelos/')*100))
#print('GradientBoostedTree: {:.2f}'.format(TratamientoDatos.entrenarModelo(1)*100))
#print('RandomForest: {:.2f}'.format(TratamientoDatos.entrenarModelo(2)*100))
TratamientoDatos.categorizar('./Modelos/KNN.sav')


#YoutubeDownloader.descargarVideo('https://www.youtube.com/watch?v=wi052l4QRX8&list=PLJvertvohrU3KnCxd9OZpYjvp8M5LK6uV&index=42')
