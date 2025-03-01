from flask import Flask, request, jsonify
import numpy as np
import joblib
import tensorflow as tf
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

# Load trained model and preprocessing utilities
model = tf.keras.models.load_model("depression_model.h5")
scaler = joblib.load("scaler.pkl")
label_encoders = joblib.load("label_encoders.pkl")

# Define feature order
FEATURES = ["Age", "Academic Pressure", "Study Satisfaction", "Work/Study Hours", 
            "Financial Stress", "Sleep Duration", "Dietary Habits", 
            "Have you ever had suicidal thoughts ?"]

@app.route('/')
def home():
    return "Welcome to the Depression Prediction API!", 200

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        # Convert JSON to DataFrame
        df = pd.DataFrame([data], columns=FEATURES)

        # Encode categorical features
        for col in ['Sleep Duration', 'Dietary Habits', 'Have you ever had suicidal thoughts ?']:
            df[col] = label_encoders[col].transform(df[col])

        # Normalize numerical features
        df[['Age', 'Academic Pressure', 'Study Satisfaction', 'Work/Study Hours', 'Financial Stress']] = \
            scaler.transform(df[['Age', 'Academic Pressure', 'Study Satisfaction', 'Work/Study Hours', 'Financial Stress']])

        # Make prediction (Get probability score)
        probability = model.predict(df)[0][0]  # Extract probability

        # Convert probability to percentage
        depression_chance = round(probability * 100, 2)
        depression_chance = "{:.3f}%".format(depression_chance)

        # Generate response message
        response_message = f"You have {depression_chance}% chances of falling into depression."

        return jsonify({"prediction": response_message})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
