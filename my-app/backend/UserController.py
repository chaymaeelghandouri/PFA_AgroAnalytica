from flask import Flask, request, jsonify
from database import get_db_connection, insert_user, get_user, insert_message, get_user_by_email, insert_commande
import logging
from prediction import train_and_predict, predicted_crop, prediction_plots

app = Flask(__name__, static_url_path='/plot', static_folder='../plot')

logging.basicConfig(level=logging.DEBUG)

@app.route('/createUser', methods=['POST'])
def create_user():
    logging.debug('create_user endpoint called')
    data = request.json
    if not data:
        logging.debug('No data provided')
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['organisation', 'prenom', 'nom', 'email', 'password']
    if not all(field in data for field in required_fields):
        logging.debug(f'Missing data: {data}')
        return jsonify({'message': 'Missing data'}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({'message': 'Database connection failed'}), 500
    try:
        insert_user(connection, data)
        return jsonify({'message': 'User created successfully'})
    except Exception as err:
        logging.error(f"Error creating user: {err}")
        connection.rollback()
        return jsonify({'message': 'Error creating user', 'error': str(err)}), 500
    finally:
        connection.close()

@app.route('/checkUser', methods=['POST'])
def check_user():
    logging.debug('check_user endpoint called')
    data = request.json
    if not data:
        logging.debug('No data provided')
        return jsonify({'message': 'No data provided'}), 400

    email = data.get('email')
    password = data.get('password')

    connection = get_db_connection()
    if connection is None:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        user = get_user(connection, email, password)
        if not user:
            return jsonify({'message': 'Incorrect email or password'}), 401
        else:
            return jsonify({'message': 'User authenticated successfully'}), 200
    except Exception as err:
        logging.error(f"Error checking user: {err}")
        return jsonify({'message': 'Error checking user', 'error': str(err)}), 500
    finally:
        connection.close()

@app.route('/createMessage', methods=['POST'])
def create_message():
    logging.debug('create_message endpoint called')
    data = request.json
    if not data:
        logging.debug('No data provided')
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['firstName', 'lastName', 'email', 'message']
    if not all(field in data for field in required_fields):
        logging.debug(f'Missing data: {data}')
        return jsonify({'message': 'Missing data'}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        insert_message(connection, data)
        return jsonify({'message': 'Contact created successfully'})
    except Exception as err:
        logging.error(f"Error creating contact: {err}")
        connection.rollback()
        return jsonify({'message': 'Error creating contact', 'error': str(err)}), 500
    finally:
        connection.close()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if not data:
            logging.debug('No data provided')
            return jsonify({'message': 'No data provided'}), 400
        result = train_and_predict(data)
        prediction_plots(result)
        return result 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getuser/<email>', methods=['GET'])
def user_existe(email):
    logging.debug('check_user endpoint called')

    email = email

    connection = get_db_connection()
    if connection is None:
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        user = get_user_by_email(connection, email)
        print("user existe = ", user)
        return jsonify(user)
    except Exception as err:
        logging.error(f"Error checking user: {err}")
        return jsonify({'message': 'Error checking user', 'error': str(err)}), 500
    finally:
        connection.close()

@app.route('/getdashboard')
def get_dashboard():
    plot_files =[]
    plot_files = [
        'nitrogen_plot.png', 'phosphorus_plot.png', 'potassium_plot.png',
        'temperature_plot.png', 'humidity_plot.png', 'rainfall_plot.png',
        'rainfall_vs_temperature_plot.png', 'pairplot.png',
        'box_temperature_plot.png', 'box_humidity_plot.png',
        'box_nitrogen_plot.png', 'box_ph_plot.png',
        'box_phosphorus_plot.png', 'box_potassium_plot.png'
    ]
    return plot_files

@app.route('/createCommande', methods=['POST'])
def create_commande():
    logging.debug('create_commande endpoint called')
    data = request.json
    if not data:
        logging.debug('No data provided')
        return jsonify({'message': 'No data provided'}), 400

    required_fields = ['firstName', 'lastName', 'email', 'Adresse', 'produits']
    if not all(field in data for field in required_fields):
        logging.debug(f'Missing data: {data}')
        return jsonify({'message': 'Missing data'}), 400

    connection = get_db_connection()
    if connection is None:
        logging.error('Database connection failed')
        return jsonify({'message': 'Database connection failed'}), 500

    try:
        insert_commande(connection, data)
        return jsonify({'message': 'Commande created successfully'})
    except Exception as err:
        logging.error(f"Error creating commande: {err}")
        connection.rollback()
        return jsonify({'message': 'Error creating commande', 'error': str(err)}), 500
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)