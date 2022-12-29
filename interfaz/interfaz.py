# pip install tkinter
from tkinter import *
from tkinter import ttk

class Ventana(Frame):
	def __init__(self, master, *args):
		super().__init__( master,*args)

		self.menu = True
		self.color = True

		# Variables
		self.ruta_aperitivos = StringVar()
		self.ruta_carne = StringVar()
		self.ruta_pasta = StringVar()
		self.ruta_pescado = StringVar()
		self.ruta_verdura = StringVar()

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
		Label(self.frame_top,text='Bienvenido a Ready Recipes', bg='#061a2b', fg='#4077a6', font=('Imprint MT Shadow', 25, 'bold')).pack(expand=1, pady=12,)
		Label(self.frame_inicio ,image= self.logo, bg='white').pack(expand=1, pady=0)
		Label(self.frame_inicio, anchor=CENTER, text= 'Para empezar, seleccione el segundo icono (entrenamiento) del navegador', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

		# Página 1 - Entrenamiento
		self.grid_rowconfigure(5, weight=1)
		self.grid_columnconfigure(3, weight=1)

		Label(self.frame_uno, text='ENTRENAMIENTO', bg='white', fg= 'black', font= ('Imprint MT Shadow', 13)).grid(column=1, row=0, pady=12)
		Label(self.frame_uno, width=12, text='Textos Aperitivos', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=1, pady=12, padx=100)
		Label(self.frame_uno, width=12, text='Textos Carne', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=2, pady=12, padx=100)
		Label(self.frame_uno, width=12, text='Textos Pasta', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0 ,row=3, pady=12, padx=100)
		Label(self.frame_uno, width=12, text='Textos Pesacado', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=4, pady=12, padx=100)
		Label(self.frame_uno, width=12, text='Textos Verdura', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=5, pady=12, padx=100)

		Entry(self.frame_uno, width=80, textvariable=self.ruta_aperitivos, font=('Imprint MT Shadow', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=1, padx=180)
		Entry(self.frame_uno, width=80, textvariable=self.ruta_carne, font=('Imprint MT Shadow', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=2, padx=180)
		Entry(self.frame_uno, width=80, textvariable=self.ruta_pasta, font=('Imprint MT Shadow', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=3, padx=180)
		Entry(self.frame_uno, width=80, textvariable=self.ruta_pescado, font=('Imprint MT Shadow', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=4, padx=180)
		Entry(self.frame_uno, width=80, textvariable=self.ruta_verdura, font=('Imprint MT Shadow', 10), highlightbackground = "#061a2b", highlightthickness=3).grid(column=1,row=5, padx=180)

		Button(self.frame_uno, anchor=CENTER, width=12, text='Abrir').grid(column=2, row=1, padx=50)
		Button(self.frame_uno, anchor=CENTER, width=12, text='Abrir').grid(column=2, row=2, padx=50)
		Button(self.frame_uno, anchor=CENTER, width=12, text='Abrir').grid(column=2, row=3, padx=50)
		Button(self.frame_uno, anchor=CENTER, width=12, text='Abrir').grid(column=2, row=4, padx=50)
		Button(self.frame_uno, anchor=CENTER, width=12, text='Abrir').grid(column=2, row=5, padx=50)

		# Página 2 - Clasificación
		Label(self.frame_dos, text= 'CLASIFICACIÓN', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

		# Página 3 - Web Scraping
		Label(self.frame_tres, text= 'WEB SCRAPING', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

# Settings ventana
if __name__ == "__main__":
    ventana = Tk()
    ventana.title("Rady Recipes")
    ventana.resizable(True, True)
    ventana.attributes('-fullscreen',True)
    ventana.call('wm', 'iconphoto', ventana._w, PhotoImage(file='./interfaz/readyrecipes_logo.png'))

    app = Ventana(ventana)
    ventana.mainloop()