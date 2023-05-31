import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
from mongodb_client import insert_test_documets

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
UNSPLASH_URL = "https://api.unsplash.com//photos/random"
DEBUG = bool(os.environ.get("DEBUG", True)) # If DEBUG in .env.local has no value, its considered as empty string. And bool("") is False

if not UNSPLASH_KEY:
    raise EnvironmentError("Please create a .env.local file and add the unsplash key")

app = Flask(__name__)

CORS(app)

# This is done to enable the Debug mode. To disable it, add a  variable called DEBUG in .env.local without value. i.e empty string. DEBUG=
app.config["DEBUG"] = DEBUG 

insert_test_documets()

@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {
        "Accept-version": "v1",
        "Authorization": "Client-ID " + UNSPLASH_KEY,
        "Access-Control-Allow-Origin": "*"
    }
    params = {
        "query" : word
    }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

