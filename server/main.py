from flask import Flask, jsonify, send_from_directory
import os
from flask_cors import CORS
from constants import HOST, IMAGES_FOLDER, BASE_URL, PORT

app = Flask(__name__)
CORS(app)


@app.route('/images', methods=['GET'])
def list_images():
    """List all images in the /images directory"""
    images = []
    for filename in os.listdir(IMAGES_FOLDER):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            images.append({
                "name": filename,
                "url": f"{BASE_URL}/images/{filename}"
            })
    response = jsonify(images)
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    # response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@app.route('/images/<path:filename>')
def serve_image(filename):
    """Serve an individual image file"""
    response = send_from_directory(IMAGES_FOLDER, filename)
    # response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

if __name__ == '__main__':
    os.makedirs(IMAGES_FOLDER, exist_ok=True)
    app.run(debug=True, port=PORT, host=HOST)