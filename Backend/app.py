from flask import Flask, jsonify
import pandas as pd
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta del archivo Excel
file_path = os.path.join(os.getcwd(), 'data', 'Emergencias_UNGRD.xlsx')
df = pd.read_excel(file_path)

# Convertir nombres de columnas a "Title Case"
df.columns = df.columns.str.title()

# Convertir la columna 'Fecha' a tipo datetime
df['Fecha'] = pd.to_datetime(df['Fecha'], format='%m/%d/%Y %I:%M:%S %p')

# Extraer el año y mes de la columna Fecha
df['Año'] = df['Fecha'].dt.year
df['Mes'] = df['Fecha'].dt.month

@app.route('/top_departments', methods=['GET'])
def top_departments():
    top_departments = df['Departamento'].value_counts().head(5).to_dict()
    return jsonify(top_departments)

@app.route('/events_per_year', methods=['GET'])
def events_per_year():
    events_per_year = df['Año'].value_counts().to_dict()
    return jsonify(events_per_year)

@app.route('/top_natural_events_2019', methods=['GET'])
def top_natural_events_2019():
    events_2019 = df[df['Año'] == 2019]
    top_natural_events_2019 = events_2019['Evento'].value_counts().head(5).to_dict()
    return jsonify(top_natural_events_2019)

@app.route('/impactful_events_2019', methods=['GET'])
def impactful_events_2019():
    events_2019 = df[df['Año'] == 2019]
    result = {
        "max_fallecidos": events_2019.groupby('Evento')['Fallecidos'].sum().idxmax(),
        "max_heridos": events_2019.groupby('Evento')['Heridos'].sum().idxmax(),
        "max_hectareas": events_2019.groupby('Evento')['Hectareas'].sum().idxmax()
    }
    return jsonify(result)

@app.route('/movimientos_en_masa', methods=['GET'])
def movimientos_en_masa():
    movimientos_en_masa = df[(df['Año'] >= 2019) & (df['Año'] <= 2021)]
    dept_movimientos_masa = movimientos_en_masa[movimientos_en_masa['Evento'] == 'MOVIMIENTO EN MASA']['Departamento'].value_counts().idxmax()
    return jsonify({"department": dept_movimientos_masa})

@app.route('/resource_distribution_2019', methods=['GET'])
def resource_distribution_2019():
    df['Recursos Ejecutados'] = pd.to_numeric(df['Recursos Ejecutados'].str.replace(r'[\$,]', '', regex=True).str.strip(), errors='coerce').fillna(0)
    df['Valor Kit De Alimento'] = pd.to_numeric(df['Valor Kit De Alimento'].str.replace(r'[\$,]', '', regex=True).str.strip(), errors='coerce').fillna(0)
    df['Valor Materiales De Construccion'] = pd.to_numeric(df['Valor Materiales De Construccion'].str.replace(r'[\$,]', '', regex=True).str.strip(), errors='coerce').fillna(0)

    df_2019 = df[df['Año'] == 2019]
    total_recursos_2019 = df_2019['Recursos Ejecutados'].sum()
    recursos_kits_2019 = df_2019['Valor Kit De Alimento'].sum()
    recursos_materiales_2019 = df_2019['Valor Materiales De Construccion'].sum()

    porcentaje_kits_2019 = (recursos_kits_2019 / total_recursos_2019) * 100
    porcentaje_materiales_2019 = (recursos_materiales_2019 / total_recursos_2019) * 100

    return jsonify({
        "porcentaje_kits": porcentaje_kits_2019,
        "porcentaje_materiales": porcentaje_materiales_2019
    })

@app.route('/event_with_max_resources_2019', methods=['GET'])
def event_with_max_resources_2019():
    df_2019 = df[df['Año'] == 2019]
    recursos_por_evento = df_2019.groupby('Evento')['Recursos Ejecutados'].sum()
    evento_max_recursos = recursos_por_evento.idxmax()
    max_recursos = recursos_por_evento.max()
    return jsonify({
        "evento": evento_max_recursos,
        "recursos": max_recursos
    })

@app.route('/families_affected_2019', methods=['GET'])
def families_affected_2019():
    df_2019 = df[df['Año'] == 2019]
    max_familias_affected_row = df_2019.loc[df_2019['Familias'].idxmax()]
    result = {
        "municipio": max_familias_affected_row['Municipio'],
        "departamento": max_familias_affected_row['Departamento'],
        "familias": max_familias_affected_row['Familias']
    }
    return jsonify(result)

@app.route('/events_percentage_by_year', methods=['GET'])
def events_percentage_by_year():
    eventos_por_ano = df['Año'].value_counts()
    porcentaje_eventos = (eventos_por_ano / eventos_por_ano.sum()) * 100
    return jsonify(porcentaje_eventos.to_dict())

if __name__ == '__main__':
    app.run(debug=True)
