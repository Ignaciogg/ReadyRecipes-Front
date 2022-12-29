# pip install tkinter
from tkinter import *
from tkinter import ttk
import pathlib

class Ventana(Frame):
	def __init__(self, master, *args):
		super().__init__( master,*args)

		# Declaración de variables
		self.menu = True
		self.color = True
		self.ruta_aperitivos = StringVar()
		self.ruta_aperitivos.set(".\ReadyRecipes\Textos\Aperitivos")
		self.ruta_carne = StringVar()
		self.ruta_carne.set(".\ReadyRecipes\Textos\Carnes")
		self.ruta_pasta = StringVar()
		self.ruta_pasta.set(".\ReadyRecipes\Textos\Pastas")
		self.ruta_pescado = StringVar()
		self.ruta_pescado.set(".\ReadyRecipes\Textos\Pescados")
		self.ruta_verdura = StringVar()
		self.ruta_verdura.set(".\ReadyRecipes\Textos\Verduras")
		self.ruta_otros = StringVar()
		self.ruta_otros.set(".\ReadyRecipes\Textos\otros")
		self.ruta_modelo = StringVar()
		self.ruta_modelo.set(".\ReadyRecipes\Textos\modelo")
		self.ruta_guardar_modelo = StringVar()
		self.ruta_guardar_modelo.set(".\ReadyRecipes\Textos\modelo\modelo1.txt")
		self.seleccion = IntVar()
		self.seleccion.set(1)
		self.aperitivos, self.carnes, self.pastas, self.pescados, self.verduras, self.total = 0,0,0,0,0,0

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

	def nav(self):
		self.imagen_entrenamiento = PhotoImage(file ='./interfaz/entrenamiento.png')
		self.imagen_clasificacion = PhotoImage(file ='./interfaz/clasifiacion.png')
		self.imagen_webscraping = PhotoImage(file ='./interfaz/webscraping.png')
		self.imagen_home = PhotoImage(file ='./interfaz/home.png')
		self.logo = PhotoImage(file ='./interfaz/readyrecipes_logo.png')

		self.paginas = ttk.Notebook(self.frame_principal, style= 'TNotebook')
		self.paginas.grid(column=0, row=0, sticky='nsew')
		self.frame_inicio = Frame(self.paginas, bg='white')
		self.frame_uno = Frame(self.paginas, bg='white')
		self.frame_dos = Frame(self.paginas, bg='white')
		self.frame_tres = Frame(self.paginas, bg='white')
		self.paginas.add(self.frame_inicio, image = self.imagen_home)
		self.paginas.add(self.frame_uno, image = self.imagen_entrenamiento)
		self.paginas.add(self.frame_dos, image = self.imagen_clasificacion)
		self.paginas.add(self.frame_tres, image = self.imagen_webscraping)

		# Inicio
		Label(self.frame_top,text='Bienvenido a Ready Recipes', bg='#061a2b', fg='#4077a6', font=('Arial', 25, 'bold')).pack(expand=1, pady=12,)
		Label(self.frame_inicio ,image= self.logo, bg='white').pack(expand=1, pady=0)
		Label(self.frame_inicio, text= 'Para empezar, seleccione el segundo icono (entrenamiento) del navegador', bg='white', fg= 'black', font= ('Arial', 15)).pack(expand=1)

		# Página 1 - Entrenamiento
		#1.1 - Selección de textos
		Label(self.frame_uno, text='ENTRENAMIENTO', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).grid(column=1, row=0, pady=12)
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

		Button(self.frame_uno, width=12, text='Abrir').grid(column=2, row=1, padx=50)
		Button(self.frame_uno, width=12, text='Abrir').grid(column=2, row=2, padx=50)
		Button(self.frame_uno, width=12, text='Abrir').grid(column=2, row=3, padx=50)
		Button(self.frame_uno, width=12, text='Abrir').grid(column=2, row=4, padx=50)
		Button(self.frame_uno, width=12, text='Abrir').grid(column=2, row=5, padx=50)

		#1.2 - Selección de algoritmos y vista previa
		Label(self.frame_uno, text='Seleccionar algoritmo:', bg='white', fg= 'black', font= ('Arial', 13)).grid(column=1, row=6, pady=50)
		self.radio1 = Radiobutton(self.frame_uno,text="KNN", variable=self.seleccion, value=1).grid(column=1, row=7)
		self.radio2 = Radiobutton(self.frame_uno,text="Arbol", variable=self.seleccion, value=2).grid(column=1, row=8)
		self.radio3 = Radiobutton(self.frame_uno,text="Varon", variable=self.seleccion, value=3).grid(column=1, row=9)
		Label(self.frame_uno, text='Seleccionar algoritmo:', bg='white', fg= 'black', font= ('Arial', 13)).grid(column=1, row=6, pady=50)

		Label(self.frame_uno, justify=LEFT, text='VISTA PREVIA:', bg='white', fg= 'black', font= ('Arial', 13, 'bold')).grid(column=1, row=10, pady=50)
		Label(self.frame_uno, justify=LEFT, text='Aperitivos encontrados     - ' + str(self.aperitivos), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=11)
		Label(self.frame_uno, justify=LEFT, text='Carnes encontradas         - ' + str(self.carnes) + '                                  Modelo Seleccionado', bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=12)
		Label(self.frame_uno, justify=LEFT, text='Pastas encontradas          - ' + str(self.pastas) + '                                                ' + str(self.seleccion.get()), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=13)
		Label(self.frame_uno, justify=LEFT, text='Pescados encontrados     - ' + str(self.pescados), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=14)
		Label(self.frame_uno, justify=LEFT, text='Verduras encontrados      - ' + str(self.verduras), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=15)
		Label(self.frame_uno, justify=LEFT, text='Total: ' + str(self.total), bg='white', fg= 'black', font= ('Arial', 13)).grid(sticky = W, column=1, row=16, pady=10)
		Button(self.frame_uno, width=12, text='ENTRENAR!').grid(column=2, row=13, padx=0)

		#1.3 - Guardar modelo
		Label(self.frame_uno, width=15, text='Guardar modelo:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=17, pady=50)
		Entry(self.frame_uno, state= "disabled", width=80, text=self.ruta_guardar_modelo, textvariable=self.ruta_guardar_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=17, padx=130)
		Button(self.frame_uno, width=12, text='Seleccionar').grid(column=2, row=17, padx=50)

		# Página 2 - Clasificación
		Label(self.frame_dos, text= 'CLASIFICACIÓN', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).grid(column=1, row=0, pady=12)
		Label(self.frame_dos, width=15, text='Textos a clasificar:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=1, pady=12, padx=100)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_otros, textvariable=self.ruta_otros, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=1, padx=140)
		Button(self.frame_dos, width=12, text='Seleccionar').grid(column=2, row=1, padx=50)
		Label(self.frame_dos, width=18, text='Modelo clasificador:', bg='white', fg= 'black', font=('Arial', 13)).grid(column=0, row=2, pady=12, padx=100)
		Entry(self.frame_dos, state= "disabled", width=80, text=self.ruta_modelo, textvariable=self.ruta_modelo, font=('Arial', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=2, padx=140)
		Button(self.frame_dos, width=12, text='Seleccionar').grid(column=2, row=2, padx=50)

		# Página 3 - Web Scraping
		Label(self.frame_tres, text= 'WEB SCRAPING', bg='white', fg= 'black', font= ('Arial', 15, 'bold')).pack(expand=1)

# Contar cuantos textos hay en una carpeta
def cuentaTextos(ruta, tipo):
	for ruta in pathlib.Path(".").iterdir():
		if ruta.is_file():
			tipo += 1
	return tipo

# Settings ventana
if __name__ == "__main__":
    ventana = Tk()
    ventana.title("Rady Recipes")
    ventana.resizable(True, True)
    ventana.attributes('-fullscreen',True)
    ventana.call('wm', 'iconphoto', ventana._w, PhotoImage(file='./interfaz/readyrecipes_logo.png'))

    app = Ventana(ventana)
    ventana.mainloop()