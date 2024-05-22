from flask import Flask, jsonify, request
import pandas as pd

app = Flask(__name__)

# Load the data from CSV
data = pd.read_csv('processed_data.csv')

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

if __name__ == '__main__':
    app.run(debug=True)