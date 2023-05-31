import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongodb_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

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

@app.route("/images", methods=["GET", "POST"])
def images():
    if request.method == "GET":
        # read images from the db
        images = images_collection.find({})
        return jsonify([img for img in images])
    if request.method == "POST":
        # save image in the db
        images = request.get_json()
        images["_id"] = images.get("id")
        result = images_collection.insert_one(images)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

