import os
from flask import Flask, render_template, request
from flask.helpers import send_from_directory

import json
from flask_cors import CORS

def create_app(test_config=None):
    # create and configure the app
    app = Flask(
        __name__, 
        instance_relative_config=True,
        static_url_path="",
        static_folder="../frontend/build" #for extracting static resources from react frontend
    )

    CORS(app)

    # a simple route that returns a test message
    @app.route('/hello', methods=('GET', 'POST'))
    def hello():
        print(request.get_json())
        print("Hello API has been called!")
        return json.dumps({'message': 'Hello, from Flask!'})

    @app.route('/')
    def index():
        return send_from_directory(app.static_folder, 'index.html') #for using react frontend

    from . import routes
    app.register_blueprint(routes.bp)

    return app