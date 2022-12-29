class Receta:
    titulo = ''
    url = ''
    texto = ''
    autor = ''

    def __init__(self,title,link,author):
        self.titulo = title
        self.autor = author
        self.url = link