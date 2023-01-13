from Descarga.Receta import Receta as receta
import Descarga.YoutubeDownloader as yt
import Descarga.SpeechRecognition as sr
import Descarga.AudioConverter as ac
import Descarga.Receta as receta
import ETL.TratamientoDatos as td
import WebScraping.webscraping as ws

''' 	
	pip install tkinter
	pip install pandas
	pip install pandastable
'''
from tkinter import *
from tkinter import ttk, filedialog

import pandas as pd
from pandastable import Table

import os
from pathlib import Path
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

ROOT_DIR = os.path.abspath(os.curdir)

class Ventana(Frame):
	def __init__(self, master, *args):
		super().__init__( master,*args)

		# Declaración de variables
		self.menu = True
		self.color = True

		self.ruta_aperitivos, self.ruta_carne, self.ruta_pasta, self.ruta_pescado, self.ruta_verdura, self.ruta_otros, self.ruta_modelo = StringVar(), StringVar(), StringVar(), StringVar(), StringVar(), StringVar(), StringVar()
		self.pathAperitivos = Path().absolute() / 'Textos' / 'Aperitivos'
		self.pathCarne = Path().absolute() / 'Textos' / 'Carne'
		self.pathVerduras = Path().absolute() / 'Textos' / 'Verdura'
		self.pathPasta = Path().absolute() / 'Textos' / 'Pasta'
		self.pathPescado = Path().absolute() / 'Textos' / 'Pescado'
		self.pathOtros = Path().absolute() / 'Textos' / 'Otros'
		self.otros = StringVar()
		filename = '/Otros ' + str(len(os.listdir(self.pathOtros))) + '.txt'
		self.otros = os.path.join(self.pathOtros, filename)
		self.path_modelo = Path().absolute() / 'Modelos'
		self.ruta_aperitivos.set(self.pathAperitivos)
		self.ruta_carne.set(self.pathCarne)
		self.ruta_pasta.set(self.pathPasta)
		self.ruta_pescado.set(self.pathPescado)
		self.ruta_verdura.set(self.pathVerduras)
		self.ruta_otros.set(self.pathOtros)
		self.ruta_modelo.set(self.path_modelo)

		self.seleccion = StringVar()
		self.aperitivos, self.carnes, self.pastas, self.pescados, self.verduras, self.total = IntVar(), IntVar(), IntVar(), IntVar(), IntVar(), IntVar()

		# Settings frame principal
		self.frame_top = Frame(self.master, bg='#061a2b', height = 50)
		self.frame_top.grid(column = 1, row = 0, sticky='nsew')
		self.frame_principal = Frame(self.master, bg='#061a2b')
		self.frame_principal.grid(column=1, row=1, sticky='nsew')
		self.master.columnconfigure(1, weight=1)
		self.master.rowconfigure(1, weight=1)
		self.frame_principal.columnconfigure(0, weight=1)
		self.frame_principal.rowconfigure(0, weight=1)
		self.nav()		

	def pantalla_inicio(self):
		self.paginas.select([self.frame_principal])
		self.frame_uno.columnconfigure(0, weight=1)
		self.frame_uno.columnconfigure(1, weight=1)

	def pantalla_youtube(self):
		self.paginas.select([self.frame_cero])
		self.frame_cero.columnconfigure(0, weight=1)
		self.frame_cero.columnconfigure(1, weight=1)
		
	def pantalla_entrenamiento(self):
		self.paginas.select([self.frame_uno])
		self.frame_uno.columnconfigure(0, weight=1)
		self.frame_uno.columnconfigure(1, weight=1)

	def pantalla_clasificacion(self):
		self.paginas.select([self.frame_dos])
		self.frame_dos.columnconfigure(0, weight=1)
		self.frame_dos.columnconfigure(1, weight=1)

	def pantalla_webscraping(self):
		self.paginas.select([self.frame_tres])	
		self.frame_tres.columnconfigure(0, weight=1)
		self.frame_tres.columnconfigure(1, weight=1)

	def abrirExplorador(self, ruta):
		ruta.set(filedialog.askdirectory())

	def nav(self):
		self.imagen_youtube = PhotoImage(file ='./interfaz/youtube.png')
		self.imagen_entrenamiento = PhotoImage(file ='./interfaz/entrenamiento.png')
		self.imagen_clasificacion = PhotoImage(file ='./interfaz/clasifiacion.png')
		self.imagen_webscraping = PhotoImage(file ='./interfaz/webscraping.png')
		self.imagen_home = PhotoImage(file ='./interfaz/home.png')
		self.logo = PhotoImage(file ='./interfaz/logo.png')

		self.paginas = ttk.Notebook(self.frame_principal, style= 'TNotebook')
		self.paginas.grid(column=0, row=0, sticky='nsew')
		self.frame_inicio = Frame(self.paginas, bg='white')
		self.frame_cero = Frame(self.paginas, bg='white')
		self.frame_uno = Frame(self.paginas, bg='white')
		self.frame_dos = Frame(self.paginas, bg='white')
		self.frame_tres = Frame(self.paginas, bg='white')
		self.paginas.add(self.frame_inicio, image = self.imagen_home)
		self.paginas.add(self.frame_cero, image = self.imagen_youtube)
		self.paginas.add(self.frame_uno, image = self.imagen_entrenamiento)
		self.paginas.add(self.frame_dos, image = self.imagen_clasificacion)
		self.paginas.add(self.frame_tres, image = self.imagen_webscraping)

		# Inicio
		cl = Button(self.frame_top, text="Exit",width=5, height=2, bg='red2', fg='white', font= ('Arial', 8, 'bold'), command=self.quit)
		cl.place(relx=0.965, rely=0.10)
		Label(self.frame_top,text='Bienvenido a Ready Recipes', bg='#061a2b', fg='#4077a6', font=('Arial', 25, 'bold')).pack(expand=1, pady=12)
		Label(self.frame_inicio, image= self.logo, bg='white').pack(expand=1, pady=0)
		Label(self.frame_inicio, text= 'Para empezar, seleccione un icono del navegador', bg='white', fg= 'black', font= ('Arial', 15)).pack(expand=1)

		# Página 0 - Youtube
		#0.1 - Entrada de descarga
		Label(self.frame_cero, text= 'DESCARGA DE VÍDEOS CON YOUTUBE', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).place(relx=0.38, rely=0.03)
		self.labelFrame0 = Label(self.frame_cero, text= 'Inserte la url del vídeo que desea descargar:', bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		self.labelFrame0.place(relx=0.39, rely=0.13)
		url = StringVar()
		def showurl(*args):
			print (url.get())

		url.trace("w", showurl)
		Entry(self.frame_cero,  width=80, textvariable=url, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.32, rely=0.2)
		
		def comienzaDescarga (url):
			yt.descargarVideo(url)
			b0.place(relx=0.437, rely=0.33)

		def pasarReceta():
			food = pd.read_csv('./WebScraping/food.csv')
			receta = td.leerReceta(self.otros)
			lista_ingredientes = ws.buscar_ingredientes(receta.texto, food)
			data = ws.buscador_precios_por_supermercado(lista_ingredientes, "mercadona")
			df = pd.DataFrame(data, columns=['Nombre', 'Precio (€)', 'Supermercado'])
			self.labelFrame3.place_forget()
			self.pt = Table(self.frame_tres, width=900, height=420, dataframe=df)
			self.pt.show()
			self.pt.place(relx=0.25, rely=0.2)
		

		Button(self.frame_cero, width=12, command= lambda : comienzaDescarga(url.get()), text='DESCARGAR!', bg='red2', fg='white', font= ('Arial', 13, 'bold')).place(relx=0.465, rely=0.26)
		b0 = Button(self.frame_cero, width=20, command= lambda : pasarReceta(), text='LISTAR INGREDIENTES!', bg='red2', fg='white', font= ('Arial', 13, 'bold'))
		
		# Página 1 - Entrenamiento
		#1.1 - Selección de textos
		Label(self.frame_uno, text='ENTRENAMIENTO', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).place(relx=0.458, rely=0.03)
		Label(self.frame_uno, width=15, text='Textos Aperitivos', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.25, rely=0.1)
		Label(self.frame_uno, width=15, text='Textos Carne', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.25, rely=0.14)
		Label(self.frame_uno, width=15, text='Textos Pasta', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.25, rely=0.18)
		Label(self.frame_uno, width=15, text='Textos Pesacado', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.25, rely=0.22)
		Label(self.frame_uno, width=15, text='Textos Verdura', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.25, rely=0.26)

		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_aperitivos, textvariable=self.ruta_aperitivos, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.40, rely=0.1)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_carne, textvariable=self.ruta_carne, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.40, rely=0.14)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_pasta, textvariable=self.ruta_pasta, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.40, rely=0.18)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_pescado, textvariable=self.ruta_pescado, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.40, rely=0.22)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_verdura, textvariable=self.ruta_verdura, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.40, rely=0.26)

		#1.2 - Selección de algoritmos y vista previa
		seleccion = IntVar()
		def seleccionaAlgoritmo(seleccion):
			print(seleccion)

		self.radio1 = Radiobutton(self.frame_uno, justify=LEFT, command= lambda : seleccionaAlgoritmo(1), variable=seleccion, value=1, text="KNN").place(relx=0.2, rely=0.48)
		self.radio2 = Radiobutton(self.frame_uno, justify=LEFT, command= lambda : seleccionaAlgoritmo(2), variable=seleccion, value=2, text="Gradient Boosted Tree").place(relx=0.2, rely=0.51)
		self.radio3 = Radiobutton(self.frame_uno, justify=LEFT, command= lambda : seleccionaAlgoritmo(3), variable=seleccion, value=3, text="Random Forest").place(relx=0.2, rely=0.54)

		Label(self.frame_uno, justify=LEFT, text='VISTA PREVIA:', bg='white', fg= 'black', font= ('Arial', 13, 'bold')).place(relx=0.477, rely=0.35)
		Label(self.frame_uno, justify=LEFT, text='Aperitivos encontrados - ' + str(len(os.listdir(self.pathAperitivos))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.45)
		Label(self.frame_uno, justify=LEFT, text='Carnes encontradas - ' + str(len(os.listdir(self.pathCarne))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.48)
		Label(self.frame_uno, justify=LEFT, text='Pastas encontradas - ' + str(len(os.listdir(self.pathPasta))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.51)
		Label(self.frame_uno, justify=LEFT, text='Pescados encontrados - ' + str(len(os.listdir(self.pathPescado))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.54)
		Label(self.frame_uno, justify=LEFT, text='Verduras encontrados - ' + str(len(os.listdir(self.pathVerduras))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.57)
		Label(self.frame_uno, justify=LEFT, text='Total: ' + str(len(os.listdir(self.pathAperitivos)) + len(os.listdir(self.pathCarne)) + len(os.listdir(self.pathPasta)) + len(os.listdir(self.pathPescado)) + len(os.listdir(self.pathVerduras))), bg='white', fg= 'black', font= ('Arial', 13)).place(relx=0.35, rely=0.63)
		
		values = [len(os.listdir(self.pathAperitivos)), len(os.listdir(self.pathCarne)), len(os.listdir(self.pathPasta)), len(os.listdir(self.pathPescado)), len(os.listdir(self.pathVerduras))]
		labels = ['Aperitivos', 'Carnes', 'Pastas', 'Pescados', 'Verduras']
		colors = ['#66b3ff','#ff9999','#ffcc99','#333333','#99ff99']
		plt.rcParams['font.size'] = 8
		fig1 = Figure(figsize=(3,3))
		ax1 = fig1.add_subplot(111)
		ax1.pie(values, labels=labels, colors=colors, startangle=90)
		def verEntreno(seleccion, pathModelo):
			print(str(pathModelo))
			td.entrenarModelo(seleccion, str(pathModelo))
		
		Button(self.frame_uno, width=12, command=lambda : verEntreno(seleccion.get(), self.path_modelo), text='ENTRENAR!', bg='red2', fg='white', font= ('Arial', 13, 'bold')).place(relx=0.48, rely=0.90)
		canvas1 = FigureCanvasTkAgg(fig1, master=self.frame_uno)
		canvas1.draw()
		canvas1.get_tk_widget().grid(column=0, row=0, padx=900, pady=250)

		#1.3 - Guardar modelo
		Label(self.frame_uno, width=15, text='Guardar modelo:', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.20, rely=0.78)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_modelo, textvariable=self.ruta_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.35, rely=0.78)
		Button(self.frame_uno, width=12, text='Seleccionar', command= lambda : self.abrirExplorador(self.ruta_modelo)).place(relx=0.75, rely=0.78)

		# Página 2 - Clasificación
		#2.1 - Selección de modelo
		Label(self.frame_dos, text= 'CLASIFICACIÓN', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).place(relx=0.458, rely=0.03)
		Label(self.frame_dos, width=15, text='Textos a clasificar:', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.2, rely=0.1)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_otros, textvariable=self.ruta_otros, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.35, rely=0.1)
		Button(self.frame_dos, width=12, command=lambda : self.abrirExplorador(self.ruta_otros), text='Seleccionar').place(relx=0.75, rely=0.10)
		Label(self.frame_dos, width=18, text='Modelo clasificador:', bg='white', fg= 'black', font=('Arial', 13)).place(relx=0.2, rely=0.14)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_modelo, textvariable=self.ruta_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).place(relx=0.35, rely=0.14)
		Button(self.frame_dos, width=12, command=lambda : self.abrirExplorador(self.ruta_modelo), text='Seleccionar').place(relx=0.75, rely=0.14)

		#2.2 - Tablas
		treeview = ttk.Treeview(self.frame_dos)
		treeview["columns"] = ("Texto", "Tipo", "Ver texto")
		treeview.column("Texto", width=150, anchor=W)
		treeview.column("Tipo", width=150, anchor=W)
		treeview.column("Ver texto", width=150, anchor=W)
		treeview.heading("Texto", text="Texto")
		treeview.heading("Tipo", text="Tipo")
		treeview.heading("Ver texto", text="Ver texto")
		treeview['show'] = 'headings'

		#2.3 - Insertar datos
		treeview.insert("", "end", values=("ejemplo1.txt", "Carne", "ejemplo1.txt"))
		treeview.insert("", "end", values=("ejemplo2.txt", "Verdura", "ejemplo2.txt"))
		treeview.insert("", "end", values=("ejemplo3.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo4.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo5.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo6.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo7.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo8.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo9.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo10.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo11.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo12.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo13.txt", "Aperitivo", "ejemplo3.txt"))
		treeview.insert("", "end", values=("ejemplo14.txt", "Aperitivo", "ejemplo3.txt"))
		sb1 = ttk.Scrollbar(treeview, orient=VERTICAL, command=treeview.yview)
		treeview.configure(yscrollcommand=sb1.set)

		#2.4 - Resumen
		lb1 = Label(self.frame_dos, justify=LEFT, text='RESUMEN:', bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		lb2 = Label(self.frame_dos, justify=LEFT, text='Aperitivos: ' + str(len(os.listdir(self.pathAperitivos))), bg='white', fg= 'black', font= ('Arial', 13))
		lb3 = Label(self.frame_dos, justify=LEFT, text='Carnes: ' + str(len(os.listdir(self.pathCarne))), bg='white', fg= 'black', font= ('Arial', 13))
		lb4 = Label(self.frame_dos, justify=LEFT, text='Pastas: ' + str(len(os.listdir(self.pathPasta))), bg='white', fg= 'black', font= ('Arial', 13))
		lb5 = Label(self.frame_dos, justify=LEFT, text='Pescados: ' + str(len(os.listdir(self.pathPescado))), bg='white', fg= 'black', font= ('Arial', 13))
		lb6 = Label(self.frame_dos, justify=LEFT, text='Verduras: ' + str(len(os.listdir(self.pathVerduras))), bg='white', fg= 'black', font= ('Arial', 13))
		lb7 = Label(self.frame_dos, justify=LEFT, text='Total: ' + str(len(os.listdir(self.pathAperitivos)) + len(os.listdir(self.pathCarne)) + len(os.listdir(self.pathPasta)) + len(os.listdir(self.pathPescado)) + len(os.listdir(self.pathVerduras))), bg='white', fg= 'black', font= ('Arial', 13))
		lb8 = Label(self.frame_dos, justify=LEFT, text='Tiempo: ', bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		
		fig2 = Figure(figsize=(4,4))
		ax2 = fig2.add_subplot(111)
		ax2.pie(values, labels=labels, colors=colors, startangle=90)

		#2.5 - Guardar resultado
		lb9 = Label(self.frame_dos, width=15, text='Guardar resultado:', bg='white', fg= 'black', font=('Arial', 13))
		e10 = Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_modelo, textvariable=self.ruta_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3)
		b11 = Button(self.frame_dos, width=12, text='Guardar')

		self.labelFrame3 = Label(self.frame_tres, text= 'Descargue un vídeo y liste sus ingredientes para utilizar esta función', bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		self.labelFrame3.place(relx=0.33, rely=0.30)

		def verResumen():
			treeview.place(relx=0.38, rely= 0.4)
			sb1.place(relx=0.975, rely= 0.00, relheight=0.99, relwidth=0.02)

			lb1.place(relx=0.475, rely=0.30)
			lb2.place(relx=0.25, rely= 0.40)
			lb3.place(relx=0.25, rely= 0.44)
			lb4.place(relx=0.25, rely= 0.48)
			lb5.place(relx=0.25, rely= 0.52)
			lb6.place(relx=0.25, rely= 0.56)
			lb7.place(relx=0.25, rely= 0.62)
			lb8.place(relx=0.25, rely= 0.68)

			lb9.place(relx=0.20, rely=0.90)
			e10.place(relx=0.35, rely= 0.90)
			b11.place(relx=0.75, rely=0.90)
			canvas2 = FigureCanvasTkAgg(fig2, master=self.frame_dos)
			canvas2.draw()
			canvas2.get_tk_widget().grid(column=0, row=0, padx=1070, pady=210)

		Button(self.frame_dos, width=12, command=lambda : verResumen(), text='CLASIFICAR!', bg='red2', fg='white', font= ('Arial', 13, 'bold')).place(relx=0.465, rely=0.20)

		# Página 3 - Web Scraping
		Label(self.frame_tres, text= 'WEB SCRAPING', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).place(relx=0.458, rely=0.07)

# Settings ventana
if __name__ == "__main__":
    ventana = Tk()
    ventana.title("Ready Recipes")
    ventana.resizable(True, True)
    ventana.attributes('-fullscreen',True)
    
    app = Ventana(ventana)
    ventana.mainloop()