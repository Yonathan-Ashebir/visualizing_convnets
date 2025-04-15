import dotenv
dotenv.load_dotenv()
import os

BASE_URL = os.environ.get('BASE_URL') or 'http://localhost:5000'
IMAGES_FOLDER = os.environ.get('IMAGES_FOLDER') or os.path.join(os.getcwd(), 'images')
STATIC_FOLDER = os.environ.get('STATIC_FOLDER') or os.path.join(os.getcwd(), 'static')
HOST = os.getenv('HOST', '0.0.0.0')
PORT = os.getenv('PORT', '5000')