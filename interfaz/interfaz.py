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

		self.frame_inicio = Frame(self.master, bg='#061a2b', width=50, height=30)
		self.frame_inicio.grid_propagate(0)
		self.frame_inicio.grid(column=0, row = 0, sticky='nsew')
		self.frame_menu = Frame(self.master, bg='#061a2b', width = 55)
		self.frame_menu.grid_propagate(0)
		self.frame_menu.grid(column=0, row = 1, sticky='nsew')
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
		self.paginas.select([self.frame_inicio])
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

		Button(self.frame_menu, image= self.imagen_home, bd=0, command = self.pantalla_inicio).grid(column=0, row=1, pady=20,padx=10)
		Button(self.frame_menu, image= self.imagen_entrenamiento, bd=0, command = self.pantalla_entrenamiento).grid(column=0, row=2, pady=20,padx=10)
		Button(self.frame_menu, image= self.imagen_clasificacion, bd=0, command =self.pantalla_clasificacion).grid(column=0, row=3, pady=20,padx=10)
		Button(self.frame_menu, image= self.imagen_webscraping, bd=0, command = self.pantalla_webscraping).grid(column=0, row=4, pady=20,padx=10)
        
		estilo_paginas = ttk.Style()
		estilo_paginas.configure("TNotebook", background='#061a2b', foreground='#061a2b', padding=0, borderwidth=0)
		estilo_paginas.theme_use('default')
		estilo_paginas.configure("TNotebook", background='#061a2b', borderwidth=0)
		estilo_paginas.configure("TNotebook.Tab", background="#061a2b", borderwidth=0)
		estilo_paginas.map("TNotebook", background=[("selected", '#061a2b')])
		estilo_paginas.map("TNotebook.Tab", background=[("selected", '#061a2b')], foreground=[("selected", '#061a2b')]);

		self.paginas = ttk.Notebook(self.frame_principal , style= 'TNotebook')
		self.paginas.grid(column=0,row=0, sticky='nsew')
		self.frame_inicio = Frame(self.paginas, bg='white')
		self.frame_uno = Frame(self.paginas, bg='white')
		self.frame_dos = Frame(self.paginas, bg='white')
		self.frame_tres = Frame(self.paginas, bg='white')
		self.paginas.add(self.frame_inicio)
		self.paginas.add(self.frame_uno)
		self.paginas.add(self.frame_dos)
		self.paginas.add(self.frame_tres)

		# Inicio
		Label(self.frame_top,text='Bienvenido a Ready Recipes', bg='#061a2b', fg='#4077a6', font=('Imprint MT Shadow', 25, 'bold')).pack(expand=1)
		Label(self.frame_inicio ,image= self.logo, bg='white').pack(expand=1)
		Label(self.frame_inicio, text= 'Para empezar, seleccione el segundo icono (entrenamiento) del menú lateral', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

		# Página 1 - Entrenamiento
		Label(self.frame_uno, text='ENTRENAMIENTO', bg='white', fg= 'black', font= ('Imprint MT Shadow', 13)).grid(column=1, row=0, pady=15, padx=5)
		Label(self.frame_uno, text='Textos Aperitivos', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=1, pady=15, padx=5)
		Label(self.frame_uno, text='Textos Carne', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=2, pady=15)
		Label(self.frame_uno, text='Textos Pasta', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0 ,row=3, pady=15)
		Label(self.frame_uno, text='Textos Pesacado', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=4, pady=15)
		Label(self.frame_uno, text='Textos Verdura', bg='white', fg= 'black', font=('Imprint MT Shadow', 13)).grid(column=0, row=5, pady=15)

		Entry(self.frame_uno, textvariable=self.ruta_aperitivos, font=('Imprint MT Shadow', 12), highlightbackground = "#061a2b", highlightcolor= "green2", highlightthickness=3).grid(column=1,row=1)
		Entry(self.frame_uno, textvariable=self.ruta_carne, font=('Imprint MT Shadow', 12), highlightbackground = "#061a2b", highlightcolor= "green2", highlightthickness=3).grid(column=1,row=2)
		Entry(self.frame_uno, textvariable=self.ruta_pasta, font=('Imprint MT Shadow', 12), highlightbackground = "#061a2b", highlightcolor= "green2", highlightthickness=3).grid(column=1,row=3)
		Entry(self.frame_uno, textvariable=self.ruta_pescado, font=('Imprint MT Shadow', 12), highlightbackground = "#061a2b", highlightcolor= "green2", highlightthickness=3).grid(column=1,row=4)
		Entry(self.frame_uno, textvariable=self.ruta_verdura, font=('Imprint MT Shadow', 12), highlightbackground = "#061a2b", highlightcolor= "green2", highlightthickness=3).grid(column=1,row=5)

		Button(self.frame_uno, text='Abrir').grid(column=2,row=1)
		Button(self.frame_uno, text='Abrir').grid(column=2,row=2)
		Button(self.frame_uno, text='Abrir').grid(column=2,row=3)
		Button(self.frame_uno, text='Abrir').grid(column=2,row=4)
		Button(self.frame_uno, text='Abrir').grid(column=2,row=5)

		# Página 2 - Clasificación
		Label(self.frame_dos, text= 'CLASIFICACIÓN', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

		# Página 3 - Web Scraping
		Label(self.frame_tres, text= 'WEB SCRAPING', bg='white', fg= 'black', font= ('Imprint MT Shadow', 15)).pack(expand=1)

# Settings ventana
if __name__ == "__main__":
    ventana = Tk()
    ventana.title("Rady Recipes")
    ventana.resizable(True, True)
    ventana.minsize(height= 475, width=795)
    ventana.geometry('1200x600')
    ventana.call('wm', 'iconphoto', ventana._w, PhotoImage(file='./interfaz/readyrecipes_logo.png'))

    app = Ventana(ventana)
    ventana.mainloop()