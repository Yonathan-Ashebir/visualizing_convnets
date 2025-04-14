from flask import Flask, jsonify, send_from_directory
import os

app = Flask(__name__)

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
    return jsonify(images)

@app.route('/image/<path:filename>')
def serve_image(filename):
    """Serve an individual image file"""
    return send_from_directory(IMAGE_DIR, filename)

if __name__ == '__main__':
    os.makedirs(IMAGE_DIR, exist_ok=True)
    app.run(debug=True)