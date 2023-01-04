''' 	
	pip install tkinter
 	python -m pip install ttkbootstrap
'''
from tkinter import *
from tkinter import ttk, filedialog
import os
import pathlib
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

		self.ruta_aperitivos, self.ruta_carne, self.ruta_pasta, self.ruta_pescado, self.ruta_verdura, self.ruta_otros, self.ruta_modelo, self.ruta_guardar_modelo = StringVar(), StringVar(), StringVar(), StringVar(), StringVar(), StringVar(), StringVar(), StringVar()
		self.ruta_aperitivos.set("./ReadyRecipes/Textos/Aperitivos")
		self.ruta_carne.set("./ReadyRecipes/Textos/Carnes")
		self.ruta_pasta.set("./ReadyRecipes/Textos/Pastas")
		self.ruta_pescado.set("./ReadyRecipes/Textos/Pescados")
		self.ruta_verdura.set("C:/Users/Nacho/git//ReadyRecipes/Textos/Verduras")
		self.ruta_otros.set("./ReadyRecipes/Textos/otros")
		self.ruta_modelo.set("./ReadyRecipes/Textos/modelo")
		self.ruta_guardar_modelo.set("./ReadyRecipes/Textos/modelo/modelo1.txt")
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
	
	def seleccionaAlgoritmo(self, seleccion):
		self.seleccion.set(seleccion)

	def abrirExplorador(self, ruta):
		ruta.set(filedialog.askdirectory())
		print(self.ruta_aperitivos.get())

	def nav(self):

		# Contar cuantos textos hay en una carpeta
		def contarTextos(self, folder, count):
			i = 0
			for root, dirs, files in os.walk(folder):
				for file in files:
					if file.endswith(".txt"):
						i += 1
			count.set(i)

		contarTextos(self, self.ruta_verdura.get(), self.verduras)

		self.imagen_entrenamiento = PhotoImage(file ='./interfaz/entrenamiento.png')
		self.imagen_clasificacion = PhotoImage(file ='./interfaz/clasifiacion.png')
		self.imagen_webscraping = PhotoImage(file ='./interfaz/webscraping.png')
		self.imagen_home = PhotoImage(file ='./interfaz/home.png')
		self.logo = PhotoImage(file ='./interfaz/logo.png')

		self.paginas = ttk.Notebook(self.frame_principal, style= 'TNotebook')
		self.paginas.grid(column=0, row=0, sticky='nsew')
		self.frame_inicio = Frame(self.paginas, bg='white')
		self.frame_uno = Canvas(self.paginas, bg='white')

		sb1 = ttk.Scrollbar(self.frame_uno, orient=VERTICAL, command=self.frame_uno.yview)
		sb1.place(relx=0.98, rely= 0.00, relheight=0.99, relwidth=0.02)
		self.frame_uno.configure(yscrollcommand=sb1.set)

		self.frame_dos = Canvas(self.paginas, bg='white')
		self.frame_tres = Canvas(self.paginas, bg='white')
		self.paginas.add(self.frame_inicio, image = self.imagen_home)
		self.paginas.add(self.frame_uno, image = self.imagen_entrenamiento)
		self.paginas.add(self.frame_dos, image = self.imagen_clasificacion)
		self.paginas.add(self.frame_tres, image = self.imagen_webscraping)

		# Inicio
		Label(self.frame_top,text='Bienvenido a Ready Recipes', bg='#061a2b', fg='#4077a6', font=('Arial', 25, 'bold')).pack(expand=1, pady=12)
		Label(self.frame_inicio, image= self.logo, bg='white').pack(expand=1, pady=0)
		Label(self.frame_inicio, text= 'Para empezar, seleccione el segundo icono (entrenamiento) del navegador', bg='white', fg= 'black', font= ('Arial', 15)).pack(expand=1)

		# Página 1 - Entrenamiento
		#1.1 - Selección de textos
		Label(self.frame_uno, text='ENTRENAMIENTO', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).grid(column=1, row=0, pady=20)
		Label(self.frame_uno, width=15, text='Textos Aperitivos', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=1, pady=12, padx=100)
		Label(self.frame_uno, width=15, text='Textos Carne', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=2, pady=12, padx=100)
		Label(self.frame_uno, width=15, text='Textos Pasta', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0 ,row=3, pady=12, padx=100)
		Label(self.frame_uno, width=15, text='Textos Pesacado', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=4, pady=12, padx=100)
		Label(self.frame_uno, width=15, text='Textos Verdura', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=5, pady=12, padx=100)

		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_aperitivos, textvariable=self.ruta_aperitivos, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=1, padx=140)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_carne, textvariable=self.ruta_carne, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=2, padx=140)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_pasta, textvariable=self.ruta_pasta, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=3, padx=140)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_pescado, textvariable=self.ruta_pescado, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=4, padx=140)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_verdura, textvariable=self.ruta_verdura, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=5, padx=140)

		Button(self.frame_uno, width=12, text='Cambiar', command= lambda : self.abrirExplorador(self.ruta_aperitivos)).grid(column=2, row=1, padx=50)
		Button(self.frame_uno, width=12, text='Cambiar', command= lambda : self.abrirExplorador(self.ruta_carne)).grid(column=2, row=2, padx=50)
		Button(self.frame_uno, width=12, text='Cambiar', command= lambda : self.abrirExplorador(self.ruta_pasta)).grid(column=2, row=3, padx=50)
		Button(self.frame_uno, width=12, text='Cambiar', command= lambda : self.abrirExplorador(self.ruta_pescado)).grid(column=2, row=4, padx=50)
		Button(self.frame_uno, width=12, text='Cambiar', command= lambda : self.abrirExplorador(self.ruta_verdura)).grid(column=2, row=5, padx=50)

		#1.2 - Selección de algoritmos y vista previa
		self.radio1 = Radiobutton(self.frame_uno, justify=LEFT, command=self.seleccionaAlgoritmo("KNN"), text="KNN", variable=self.seleccion, value="KNN").grid(column=0, row=8)
		self.radio2 = Radiobutton(self.frame_uno, justify=LEFT, command=self.seleccionaAlgoritmo("GBT"), text="Gradient Boosted Tree", variable=self.seleccion, value="GBT").grid(column=0, row=9)
		self.radio3 = Radiobutton(self.frame_uno, justify=LEFT, command=self.seleccionaAlgoritmo("Random Forest"), text="Random Forest", variable=self.seleccion, value="Random Forest").grid(column=0, row=10)

		Label(self.frame_uno, justify=LEFT, text='VISTA PREVIA:', bg='white', fg= 'black', font= ('Arial', 13, 'bold')).grid(column=1, row=6, pady=70)
		Label(self.frame_uno, justify=LEFT, text='Aperitivos encontrados     - ' + str(self.aperitivos.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=7)
		Label(self.frame_uno, justify=LEFT, text='Carnes encontradas         - ' + str(self.carnes.get()) + '                                  Modelo Seleccionado:', bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=8)
		Label(self.frame_uno, justify=LEFT, text='Pastas encontradas          - ' + str(self.pastas.get()) + '                                      ' + str(self.seleccion.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=9)
		Label(self.frame_uno, justify=LEFT, text='Pescados encontrados     - ' + str(self.pescados.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=10)
		Label(self.frame_uno, justify=LEFT, text='Verduras encontrados      - ' + str(self.verduras.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=11)
		Label(self.frame_uno, justify=LEFT, text='Total: ' + str(self.total.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=12, pady=10)
		Button(self.frame_uno, width=12, text='ENTRENAR!', bg='red2', fg='white', font= ('Arial', 13, 'bold')).grid(column=2, row=9)

		#1.3 - Guardar modelo
		Label(self.frame_uno, width=15, text='Guardar modelo:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=17, pady=50)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_guardar_modelo, textvariable=self.ruta_guardar_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=17, padx=130)
		Button(self.frame_uno, width=12, text='Seleccionar').grid(column=2, row=17, padx=50)

		# Página 2 - Clasificación
		#2.1 - Selección de modelo
		Label(self.frame_dos, text= 'CLASIFICACIÓN', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).grid(column=1, row=0, pady=20)
		Label(self.frame_dos, width=15, text='Textos a clasificar:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=1, pady=12, padx=100)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_otros, textvariable=self.ruta_otros, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=1, padx=115)
		Button(self.frame_dos, width=12, text='Seleccionar').grid(column=2, row=1, padx=50)
		Label(self.frame_dos, width=18, text='Modelo clasificador:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=2, pady=12, padx=100)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_modelo, textvariable=self.ruta_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=2, padx=115)
		Button(self.frame_dos, width=12, text='Seleccionar').grid(column=2, row=2, padx=50)

		#2.2 - Tabla
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
		sb2 = ttk.Scrollbar(treeview, orient=VERTICAL, command=treeview.yview)
		treeview.configure(yscrollcommand=sb2.set)

		#2.4 - Resumen
		lb1 = Label(self.frame_dos, justify=LEFT, text='RESUMEN:', bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		lb2 = Label(self.frame_dos, justify=LEFT, text='Aperitivos     - ' + str(self.aperitivos.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb3 = Label(self.frame_dos, justify=LEFT, text='Carnes         - ' + str(self.carnes.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb4 = Label(self.frame_dos, justify=LEFT, text='Pastas          - ' + str(self.pastas.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb5 = Label(self.frame_dos, justify=LEFT, text='Pescados     - ' + str(self.pescados.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb6 = Label(self.frame_dos, justify=LEFT, text='Verduras      - ' + str(self.verduras.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb7 = Label(self.frame_dos, justify=LEFT, text='Total: ' + str(self.total.get()), bg='white', fg= 'black', font= ('Arial', 13))
		lb8 = Label(self.frame_dos, justify=LEFT, text='Tiempo: ' + str(self.total.get()), bg='white', fg= 'black', font= ('Arial', 13, 'bold'))
		
		values = [10, 20, 30, 40, 25]
		labels = ['Aperitivos', 'Carnes', 'Pastas', 'Pescados', 'Verduras']
		colors = ['#ff9999','#66b3ff','#99ff99','#ffcc99','#ffffff']
		fig = Figure(figsize=(3,3))
		ax = fig.add_subplot(111)
		ax.pie(values, labels=labels, colors=colors, startangle=90)

		#2.5 - Guardar resultado
		lb9 = Label(self.frame_dos, width=15, text='Guardar resultado:', bg='white', fg= 'black', font=('Arial', 13))
		e10 = Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_guardar_modelo, textvariable=self.ruta_guardar_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3)
		b11 = Button(self.frame_dos, width=12, text='Guardar')

		def verResumen():
			treeview.grid(column=1, row=5, padx=0)
			sb2.place(relx=0.98, rely= 0.00, relheight=0.99, relwidth=0.02)
			lb1.grid(column=1, row=4, pady=10)
			lb2.place(relx=0.15, rely= 0.40)
			lb3.place(relx=0.15, rely= 0.44)
			lb4.place(relx=0.15, rely= 0.48)
			lb5.place(relx=0.15, rely= 0.52)
			lb6.place(relx=0.15, rely= 0.56)
			lb7.place(relx=0.15, rely= 0.62)
			lb8.place(relx=0.15, rely= 0.68)

			lb9.place(relx=0.08, rely= 0.80)
			e10.place(relx=0.31, rely= 0.80)
			b11.place(relx=0.79, rely= 0.80)
			canvas = FigureCanvasTkAgg(fig, master=self.frame_dos)
			canvas.draw()
			canvas.place(relx=0.75, rely= 0.52)

		Button(self.frame_dos, width=12, command=lambda : verResumen(), text='CLASIFICAR!', bg='red2', fg='white', font= ('Arial', 13, 'bold')).grid(column=1, row=3, pady=20)

		# Página 3 - Web Scraping
		Label(self.frame_tres, text= 'WEB SCRAPING', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).pack(expand=1)

# Settings ventana
if __name__ == "__main__":
    ventana = Tk()
    ventana.title("Rady Recipes")
    ventana.resizable(True, True)
    ventana.attributes('-fullscreen',True)
    
    app = Ventana(ventana)
    ventana.mainloop()