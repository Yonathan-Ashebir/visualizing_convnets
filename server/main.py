from flask import Flask, jsonify, send_from_directory
import os
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)

import json
import time

from flask import Flask, jsonify, request, g
from flask_cors import CORS
# from flask_jwt_extended import JWTManager, decode_token
# from jwt import ExpiredSignatureError, InvalidTokenError
# from werkzeug.exceptions import RequestEntityTooLarge


from threading import Thread
# import requests
import time
app = Flask(__name__, static_url_path='/static', static_folder='/static')
# app.config.from_object(Config)
# db.init_app(app)
# JWTManager(app)
CORS(app)

# Configuration
IMAGE_DIR = 'images'  # All images go directly here

@app.route('/images', methods=['GET'])
def list_images():
    """List all images in the /images directory"""
    images = []
    for filename in os.listdir(IMAGE_DIR):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            images.append({
                "name": filename,
                "url": f"/image/{filename}"
            })
    response = jsonify(images)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route('/image/<path:filename>')
def serve_image(filename):
    """Serve an individual image file"""
    response = send_from_directory(IMAGE_DIR, filename)
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

if __name__ == '__main__':
    os.makedirs(IMAGE_DIR, exist_ok=True)
    app.run(debug=True)