class Receta():
    url = ''
    titulo = ''
    texto = ''
    autor = ''

    def __init__(self,title,link,author,text):
        self.titulo = title
        self.autor = author
        self.url = link
        self.texto = text
    
    def guardarTexto(self,ruta):
        try:
            with open(ruta, 'a', encoding="utf-8") as f:
                f.writelines([self.url, self.titulo, '\n'+self.autor, '\n'+self.texto])
                f.close()
        except:
            print('No se puede guardar el texto')
