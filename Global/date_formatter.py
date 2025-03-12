from datetime import datetime

def obtener_fecha_y_hora():
    # Obtener la fecha y hora actual
    now = datetime.now()
    # Formatear la fecha y hora
    fecha = f"{now.day:02}/{now.month:02}/{now.year}"
    hora = f"{now.hour:02}:{now.minute:02}"
    return fecha, hora

if __name__ == "__main__":
    # Imprimir la fecha y hora formateadas como una sola línea
    fecha, hora = obtener_fecha_y_hora()
    print(f"{fecha},{hora}")
