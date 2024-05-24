from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load the data from CSV
data = pd.read_csv('/home/Ceesar1703/mysite/processed_data.csv')

# Convert the data to a dictionary for easy access
data_dict = data.to_dict(orient='records')

@app.route('/')
def home():
    return "Welcome to the UNGRD Events API!"

# Endpoint to get all events data
@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(data_dict)

# Endpoint to get events filtered by year
@app.route('/events/year/<int:year>', methods=['GET'])
def get_events_by_year(year):
    filtered_data = [event for event in data_dict if event['Año'] == year]
    return jsonify(filtered_data)

# Endpoint to get the event with the maximum affected families in a given year
@app.route('/events/max-affected-families/<int:year>', methods=['GET'])
def get_max_affected_families(year):
    filtered_data = [event for event in data_dict if event['Año'] == year]
    if not filtered_data:
        return jsonify({"error": "No data for the given year"}), 404

    max_event = max(filtered_data, key=lambda x: x['Familias Afectadas'])
    return jsonify(max_event)

# Endpoint to get the total resources executed in 2019 excluding certain types of aid
@app.route('/resources/excluding', methods=['GET'])
def get_resources_excluding():
    excluded_aids = request.args.getlist('exclude')
    filtered_data = [event for event in data_dict if event['Año'] == 2019 and event['Tipo de Ayuda'] not in excluded_aids]
    total_resources = sum(event['Recurso Ejecutado'] for event in filtered_data)
    return jsonify({"total_resources_excluding": total_resources})

@app.route('/consulta4/<int:year>', methods=['GET'])
def consulta5(year):
    events_year = [event for event in data_dict if event['Año'] == year]
    if not events_year:
        return jsonify({"error": "No hay datos para el año proporcionado"}), 404

    event_data_2019 = pd.DataFrame(events_year)

    # Consulta 4: Eventos con mayor repercusión en el año especificado
    # Tipo de evento con más fallecidos
    event_max_fallecidos = event_data_2019.groupby('Evento')['Fallecidos'].sum().idxmax()

    # Tipo de evento con más heridos
    event_max_heridos = event_data_2019.groupby('Evento')['Heridos'].sum().idxmax()

    # Tipo de evento con mayor cantidad de hectáreas afectadas
    event_max_hectareas = event_data_2019.groupby('Evento')['Hectareas'].sum().idxmax()

    return jsonify({
        "tipo_evento_max_fallecidos": event_max_fallecidos,
        "tipo_evento_max_hectareas": event_max_hectareas,
        "tipo_evento_max_heridos": event_max_heridos
    })

@app.route('/consulta7/<int:year>', methods=['GET'])
def consulta7(year):
    events_year = [event for event in data_dict if event['Año'] == year]
    if not events_year:
        return jsonify({"error": "No hay datos para el año proporcionado"}), 404

    event_data_year = pd.DataFrame(events_year)

    # Agrupar por tipo de evento y sumar los recursos ejecutados
    recursos_por_evento = event_data_year.groupby('Evento')['Recursos Ejecutados'].sum()

    # Encontrar el evento con más recursos ejecutados
    evento_max_recursos = recursos_por_evento.idxmax()
    max_recursos = recursos_por_evento.max()

    return jsonify({
        "evento_max_recursos": evento_max_recursos,
        "max_recursos": max_recursos
    })

# CONSULTA 9
@app.route('/consulta9/<int:year>', methods=['GET'])
def consulta9(year):
    # Filtrar los datos para el año proporcionado
    events_year = [event for event in data_dict if event['Año'] == year]

    if not events_year:
        return jsonify({"error": "No hay datos para el año proporcionado"}), 404

    # Convertir los datos filtrados a un DataFrame de pandas
    event_data_year = pd.DataFrame(events_year)

    # Encontrar el registro con la mayor cantidad de familias afectadas
    max_familias_affected_row = event_data_year.loc[event_data_year['Familias'].idxmax()]

    # Extraer la información del municipio y departamento
    municipio_max_familias = max_familias_affected_row['Municipio']
    departamento_max_familias = max_familias_affected_row['Departamento']
    max_familias_affected = max_familias_affected_row['Familias']

    # Convertir los valores a tipos de datos nativos de Python
    municipio_max_familias = str(municipio_max_familias)
    departamento_max_familias = str(departamento_max_familias)
    max_familias_affected = int(max_familias_affected)

    return jsonify({
        "municipio_max_familias": municipio_max_familias,
        "departamento_max_familias": departamento_max_familias,
        "max_familias_affected": max_familias_affected
    })

@app.route('/consulta10', methods=['GET'])
def consulta10():
    # Convertir los datos a un DataFrame de pandas
    df = pd.DataFrame(data_dict)

    # Asegurarse de que la columna Fecha es de tipo datetime con un formato específico
    df['Fecha'] = pd.to_datetime(df['Fecha'], format='%Y-%m-%d')

    # Extraer el año de la columna Fecha
    df['Año'] = df['Fecha'].dt.year

    # Contar la cantidad de eventos por año
    eventos_por_ano = df['Año'].value_counts()

    # Calcular el porcentaje de eventos por año
    porcentaje_eventos = (eventos_por_ano / eventos_por_ano.sum()) * 100

    # Preparar los datos para el gráfico
    data = {
        "years": porcentaje_eventos.index.tolist(),
        "percentages": porcentaje_eventos.tolist()
    }

    return jsonify(data)

@app.route('/consulta1',methods=['GET'])
def get_top_5_events():
  # Sort the department counts in descending order (highest to lowest)
  top_departments = data['Departamento'].value_counts().head(5)
  sorted_dict = top_departments.to_dict()
  return jsonify(sorted_dict)

@app.route('/consulta5', methods=['GET'])
def get_departemnts_by_mass_movements():
    movimientos_en_masa = data[(data['Año'] >= 2019) & (data['Año'] <= 2021)]
    dept_movimientos_masa = movimientos_en_masa[movimientos_en_masa['Evento'] == 'MOVIMIENTO EN MASA']['Departamento'].value_counts().idxmax()
    print("Departamento con más movimientos en masa reportados (2019-2021):", dept_movimientos_masa)
    return jsonify(dept_movimientos_masa)

@app.route('/consulta6', methods=['GET'])
def get_total_resources_minus_foodand_mats():
    data['Recursos Ejecutados'] = pd.to_numeric(data['Recursos Ejecutados'], errors='coerce').fillna(0)
    data['Valor Kit De Alimento'] = pd.to_numeric(data['Valor Kit De Alimento'], errors='coerce').fillna(0)
    data['Valor Materiales De Construccion'] = pd.to_numeric(data['Valor Materiales De Construccion'], errors='coerce').fillna(0)

    df_2019 = data[data['Año'] == 2019]
    total_recursos_2019 = df_2019['Recursos Ejecutados'].sum()
    print(" \n\n\n\n TOTAL RTECURSOS EJECUTADOS 2019 XDD" + str(total_recursos_2019))

    # Calcular los recursos específicos para cada categoría en 2019
    recursos_kits_2019 = df_2019['Valor Kit De Alimento'].sum()
    recursos_materiales_2019 = df_2019['Valor Materiales De Construccion'].sum()
    recursos_minus_foodand_mats = total_recursos_2019 - recursos_kits_2019 - recursos_materiales_2019

    return jsonify({"otros_recursos": recursos_minus_foodand_mats,
                    "materiales":recursos_materiales_2019,
                    "kits":recursos_kits_2019})

@app.route('/consulta8',methods=['GET'])
def get_events_per_month():
    data['Fecha'] = pd.to_datetime(data['Fecha'])  # Assuming 'Fecha' has date strings
    events_per_month = data['Fecha'].dt.to_period('M').dt.strftime('%Y-%m').value_counts().sort_index()
    return jsonify(events_per_month.to_dict())
# Nota: No incluir app.run() aquí

if __name__ == '__main__':
    app.run(debug=True)