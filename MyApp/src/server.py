from flask import Flask, request, jsonify
from AgricultureML import best_param  

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    if not isinstance(data, dict):
        return jsonify({"error": "Invalid data format"}), 400
    
    N, P, K, temperature, humidity, ph, rainfall = (
        data.get('N'), data.get('P'), data.get('K'), 
        data.get('temperature'), data.get('humidity'), 
        data.get('ph'), data.get('rainfall')
    )
    
    if None in [N, P, K, temperature, humidity, ph, rainfall]:
        return jsonify({"error": "Missing required fields"}), 400
    
    try:
        prediction = best_param['random_forest'].predict([[N, P, K, temperature, humidity, ph, rainfall]])
        return jsonify({"prediction": prediction.tolist()}), 200
    except Exception as e:
        print("Prediction error:", e)  
        return jsonify({"error": "Prediction failed"}), 500

if __name__ == '__main__':
    app.run(debug=True)
