from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Load the data from CSV
data = pd.read_csv('processed_data.csv')

#SE REALIZA UNA LIMPIEZA PARA LA CONSULTA 6
data['Recursos Ejecutados'] = data['Recursos Ejecutados'].str.replace(r'[\$,]', '', regex=True).str.strip()
data['Valor Kit De Alimento'] = data['Valor Kit De Alimento'].str.replace(r'[\$,]', '', regex=True).str.strip()
data['Valor Materiales De Construccion'] = data['Valor Materiales De Construccion'].str.replace(r'[\$,]', '', regex=True).str.strip()
# Convert the data to a dictionary for easy access
print(data)


data_dict = data.to_dict(orient='records')

@app.route('/')
def home():
    return "Welcome to the UNGRD Events API!"

# Endpoint to get all events data
@app.route('/events', methods=['GET'])
@cross_origin()
def get_events():
    return jsonify(data_dict)

# departamento que más “movimientos en masa” reportó en el periodo 2019, 2020 
# y 2021
@app.route('/events/movimientos_en_masa', methods=['GET'])
@cross_origin()
def get_departemnts_by_mass_movements():
    movimientos_en_masa = data[(data['Año'] >= 2019) & (data['Año'] <= 2021)]
    dept_movimientos_masa = movimientos_en_masa[movimientos_en_masa['Evento'] == 'MOVIMIENTO EN MASA']['Departamento'].value_counts().idxmax()
    print("Departamento con más movimientos en masa reportados (2019-2021):", dept_movimientos_masa)
    return jsonify(dept_movimientos_masa)


@app.route('/events/', methods=['GET'])
    data['Recursos Ejecutados'] = pd.to_numeric(data['Recursos Ejecutados'], errors='coerce').fillna(0)
    data['Valor Kit De Alimento'] = pd.to_numeric(data['Valor Kit De Alimento'], errors='coerce').fillna(0)
    data['Valor Materiales De Construccion'] = pd.to_numeric(data['Valor Materiales De Construccion'], errors='coerce').fillna(0)
    return jsonify()

@app.route('/events/top5',methods=['GET'])
@cross_origin()
def get_top_5_events():
  # Sort the department counts in descending order (highest to lowest)
  top_departments = data['Departamento'].value_counts().head(5)
  sorted_dict = top_departments.to_dict()
  return jsonify(sorted_dict)

# Endpoint to get events filtered by year
@app.route('/events/year/<int:year>', methods=['GET'])
@cross_origin()
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

if __name__ == '__main__':
    app.run(debug=True)