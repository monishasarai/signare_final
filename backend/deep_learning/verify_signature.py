import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.preprocessing import image
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

# Load the pre-trained model
trained_model = load_model("E:/Sweety Sarai/Monisha Saraiadvanced_compare_modelmain.h5")

# Create Flask app
app = Flask(__name__)
CORS(app)

# Feature extraction model
def create_advanced_embedding_model(trained_model):
    feature_extractor = Model(inputs=trained_model.input, outputs=trained_model.layers[-8].output)
    return feature_extractor

feature_extractor = create_advanced_embedding_model(trained_model)

# Image preprocessing function
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

# Signature verification endpoint
@app.route('/api/signature/verify', methods=['POST'])
def verify_signature():
    try:
        # Get the uploaded files
        stored_signature_path = request.files['stored_signature']
        verifying_signature_path = request.files['verifying_signature']

        # Save the uploaded files temporarily
        stored_signature_temp = "stored_signature.jpg"
        verifying_signature_temp = "verifying_signature.jpg"
        stored_signature_path.save(stored_signature_temp)
        verifying_signature_path.save(verifying_signature_temp)

        # Preprocess images
        stored_image = preprocess_image(stored_signature_temp)
        verifying_image = preprocess_image(verifying_signature_temp)

        # Get embeddings
        stored_embedding = feature_extractor.predict(stored_image).flatten()
        verifying_embedding = feature_extractor.predict(verifying_image).flatten()

        # Calculate cosine similarity
        similarity = cosine_similarity([stored_embedding], [verifying_embedding])[0][0]

        # Threshold for decision
        threshold = 0.8
        result = "Genuine" if similarity > threshold else "Forged"

        return jsonify({"similarity": float(similarity), "result": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

for rule in app.url_map.iter_rules():
    print(f"Endpoint: {rule.endpoint}, Route: {rule.rule}")


if __name__ == '__main__':
    app.run(port=5000,debug=True)
