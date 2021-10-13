# CompaniesHouseAPI

This is a full-stack application that handles get requests to the companies house API from a backend (python-flask) server and renders updates to a simple react web interface. The project serves as example code for interacting with the companies house API; functionality has been kept to a minimum so as to keep the solution as simple and clear as possible but can be expanded to accomodate many use cases.


To make your own requests, you'll need to generate an API key and store locally on your server host machine as an environment variable named 'CompaniesHouseApiKey'. Flask will read this variable into the project during runtime and use it for authentication when retrieving information through http request. To create a free account and generate API keys for companies house, follow this link: https://developer.company-information.service.gov.uk/


To run the backend flask server, install all dependencies into your environment from the requirements.txt file and navigate to the root directory of the project, then run command: "flask run".


To run the frontend, after installing all node modules and dependencies from package.json file, navigate to the 'frontend' directory and run: 'npm start'.


Once the react frontend has been built, the flask server instance has been configured to access the resulting index.html file from the frontend build directory. Therefore, the user only need to run the server and navigate to 'http://127.0.0.1:5000/' in a browser to run the entire application locally.



### Useful commands -->


Create a new python environment: 
`python3 -m venv venv`

Activate the environment (change 'bin' to 'Scripts' or 'Source' directory depending on which OS you are using): 
`. venv/bin/activate`

Install python dependancies: 
`pip install -r requirements.txt`

Install node modules and dependancies: 
`cd frontend`, `npm install package.json`

Run react.js frontend during development and testing: 
`cd frontend`, `npm start`

Build react frontend for production: 
`cd frontend`, `npm run build`