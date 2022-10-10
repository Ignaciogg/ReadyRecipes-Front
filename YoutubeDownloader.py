from pytube import YouTube

yt = YouTube('https://www.youtube.com/watch?v=BKrOHIMltW4')
print('Titulo: ',yt.title)

listado_streaming = yt.streams

solo_progressive = listado_streaming.filter(resolution='360p', mime_type="video/mp4").desc()

print("SOLO PROGRESIVO: ")
for streaming in solo_progressive:
    print(streaming)

bajar_video = solo_progressive.last()
print("Bajar ultimo video: ")
print(bajar_video)

file_size = bajar_video.filesize
print("VIDEO SELECT: ", bajar_video)
print("filesize: ", file_size)

print("iniciando descarga...")
bajar_video.download()

print("Fin descarga")