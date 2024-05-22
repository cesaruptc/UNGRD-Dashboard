import pandas as pd
import matplotlib.pyplot as plt

# Leer archivo Excel
file_path = 'Emergencias_UNGRD.xlsx'
df = pd.read_excel(file_path)

# Mostrar nombres de las columnas originales
print("Columnas originales del DataFrame:", df.columns)

# Convertir nombres de columnas a "Title Case" (Primera letra mayúscula y el resto minúsculas)
df.columns = df.columns.str.title()

# Mostrar nombres de las columnas convertidas
print("Columnas convertidas del DataFrame:", df.columns)
# Consulta 1: Top 5 Departamentos con mayor cantidad de eventos

# Asegurarse de que la columna Fecha es de tipo datetime
df['Fecha'] = pd.to_datetime(df['Fecha'], format='%m/%d/%Y %I:%M:%S %p')

# Extraer el año de la columna Fecha
df['Año'] = df['Fecha'].dt.year

# Extraer el mes de la columna Fecha
df['Mes'] = df['Fecha'].dt.month

# Consulta 1: Top 5 Departamentos con mayor cantidad de eventos
top_departments = df['Departamento'].value_counts().head(5)
print("Top 5 Departamentos con mayor cantidad de eventos:\n", top_departments)

# Consulta 2: Cantidad de eventos por año
events_per_year = df['Año'].value_counts()
print("Cantidad de eventos por año:\n", events_per_year)

# Consulta 3: Top 5 categorías de eventos naturales reportados en 2019
events_2019 = df[df['Año'] == 2019]
top_natural_events_2019 = events_2019['Evento'].value_counts().head(6)
print("Top 5 categorías de eventos naturales en 2019:\n", top_natural_events_2019)

# Consulta 4: Eventos con mayor repercusión en 2019
# Tipo de evento con más fallecidos
event_max_fallecidos = events_2019.groupby('Evento')['Fallecidos'].sum().idxmax()
print("Tipo de evento con más fallecidos en 2019:", event_max_fallecidos)

# Tipo de evento con más heridos
event_max_heridos = events_2019.groupby('Evento')['Heridos'].sum().idxmax()
print("Tipo de evento con más heridos en 2019:", event_max_heridos)

# Tipo de evento con mayor cantidad de hectáreas afectadas
event_max_hectareas = events_2019.groupby('Evento')['Hectareas'].sum().idxmax()
print("Tipo de evento con mayor cantidad de hectáreas afectadas en 2019:", event_max_hectareas)

# Consulta 5: Departamento con más “movimientos en masa” reportados en el periodo 2019-2021
movimientos_en_masa = df[(df['Año'] >= 2019) & (df['Año'] <= 2021)]
dept_movimientos_masa = movimientos_en_masa[movimientos_en_masa['Evento'] == 'MOVIMIENTO EN MASA']['Departamento'].value_counts().idxmax()
print("Departamento con más movimientos en masa reportados (2019-2021):", dept_movimientos_masa)

# Consulta 6: Porcentaje de recursos ejecutados por la UNGRD en el año 2019 en "kits de alimentos" y "materiales de construcción"
print("\n CONSULTA-----6=============D  \n")
df['Recursos Ejecutados'] = df['Recursos Ejecutados'].str.replace(r'[\$,]', '', regex=True).str.strip()
df['Valor Kit De Alimento'] = df['Valor Kit De Alimento'].str.replace(r'[\$,]', '', regex=True).str.strip()
df['Valor Materiales De Construccion'] = df['Valor Materiales De Construccion'].str.replace(r'[\$,]', '', regex=True).str.strip()

df['Recursos Ejecutados'] = pd.to_numeric(df['Recursos Ejecutados'], errors='coerce').fillna(0)
df['Valor Kit De Alimento'] = pd.to_numeric(df['Valor Kit De Alimento'], errors='coerce').fillna(0)
df['Valor Materiales De Construccion'] = pd.to_numeric(df['Valor Materiales De Construccion'], errors='coerce').fillna(0)

# Filtrar datos para el año 2019
df_2019 = df[df['Año'] == 2019]

# Calcular el total de recursos ejecutados en 2019

total_recursos_2019 = df_2019['Recursos Ejecutados'].sum()
print(" \n\n\n\n TOTAL RTECURSOS EJECUTADOS 2019 XDD" + str(total_recursos_2019))

# Calcular los recursos específicos para cada categoría en 2019
recursos_kits_2019 = df_2019['Valor Kit De Alimento'].sum()
recursos_materiales_2019 = df_2019['Valor Materiales De Construccion'].sum()

# Calcular los porcentajes
porcentaje_kits_2019 = (recursos_kits_2019 / total_recursos_2019) * 100
porcentaje_materiales_2019 = (recursos_materiales_2019 / total_recursos_2019) * 100

# Imprimir los resultados
print(f"Porcentaje de recursos para kits de alimentos en 2019: {porcentaje_kits_2019:.2f}%")
print(f"Porcentaje de recursos para materiales de construcción en 2019: {porcentaje_materiales_2019:.2f}%")

# CONSULTICA 7 (SIETE)
# Agrupar por tipo de evento y sumar los recursos ejecutados
recursos_por_evento = df_2019.groupby('Evento')['Recursos Ejecutados'].sum()

# Encontrar el evento con más recursos ejecutados
evento_max_recursos = recursos_por_evento.idxmax()
max_recursos = recursos_por_evento.max()

# Imprimir el resultado
print(f"El evento en el que la UNGRD ejecutó más recursos en 2019 fue '{evento_max_recursos}' con un total de {max_recursos:.2f} recursos ejecutados.")

# Generar CSV con datos procesados
processed_file_path = 'processed_data.csv'
df.to_csv(processed_file_path, index=False)

# Gráfico de cantidad de eventos por mes (Consulta 8)
df['Periodo'] = df['Fecha'].dt.to_period('M')
events_per_month = df['Periodo'].value_counts().sort_index()
events_per_month.plot(kind='bar')
plt.title('Cantidad de Eventos por Mes (2019-2021)')
plt.xlabel('Mes')
plt.ylabel('Cantidad de Eventos')
plt.show()

# CONSULTA 9
# Encontrar el registro con la mayor cantidad de familias afectadas
max_familias_affected_row = df_2019.loc[df_2019['Familias'].idxmax()]

# Extraer la información del municipio y departamento
municipio_max_familias = max_familias_affected_row['Municipio']
departamento_max_familias = max_familias_affected_row['Departamento']
max_familias_affected = max_familias_affected_row['Familias']

# Imprimir el resultado
print(f"En 2019, el evento con mayor cantidad de familias afectadas ocurrió en el municipio de {municipio_max_familias}, departamento de {departamento_max_familias}, con un total de {max_familias_affected} familias afectadas.")
#CONSULTA 10

df.columns = df.columns.str.title()

# Asegurarse de que la columna Fecha es de tipo datetime con un formato específico
df['Fecha'] = pd.to_datetime(df['Fecha'], format='%m/%d/%Y %I:%M:%S %p')

# Extraer el año de la columna Fecha
df['Año'] = df['Fecha'].dt.year

# Contar la cantidad de eventos por año
eventos_por_ano = df['Año'].value_counts()

# Calcular el porcentaje de eventos por año
porcentaje_eventos = (eventos_por_ano / eventos_por_ano.sum()) * 100

# Crear el gráfico de pastel
plt.figure(figsize=(10, 7))
plt.pie(porcentaje_eventos, labels=porcentaje_eventos.index, autopct='%1.1f%%', startangle=140, colors=plt.cm.Paired(range(len(porcentaje_eventos))))
plt.title('Porcentaje de Eventos por Año Reportados por la UNGRD')
plt.axis('equal')  # Asegura que el gráfico sea un círculo

# Mostrar el gráfico
plt.show()
