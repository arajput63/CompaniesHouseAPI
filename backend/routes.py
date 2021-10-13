import os
from flask import (Blueprint, request)
import json
import requests

# stored Companies House API_Key locally - accessed from backend. 
# This can be passed to frontend through API call rather then storing on .env for use on client side
# Note: for production or real use cases, this should also be encrypted for network transport
CH_API_KEY = os.getenv('CompaniesHouseApiKey')

bp = Blueprint('app_pages', __name__, url_prefix='/')

@bp.route('/test', methods=('GET', 'POST')) # test comms with routes blueprint
def test():
    return json.dumps({'message': 'Bonjour, from flask routes!'})

@bp.route('/api_key', methods=('GET', 'POST'))
def test_api_key():
    return json.dumps({'CH_API_KEY': CH_API_KEY})

@bp.route('/search_ch', methods=('GET', 'POST'))
def search_CH():
    response = requests.get(
        "https://api.company-information.service.gov.uk/search",
        headers = {'Authorization': CH_API_KEY},
        params={'q': request.get_json()['search_criteria']}
    )
    return response.json()

@bp.route('/search_company', methods=('GET', 'POST'))
def search_company():
    client_vars = request.get_json()
    company_number = client_vars['company_number'].strip() # remove whitespace

    response_company = requests.get(
        f"https://api.company-information.service.gov.uk/company/{company_number}",
        headers = {'Authorization': CH_API_KEY},
    ).json()

    response_officers = requests.get(
        f"https://api.company-information.service.gov.uk/company/{company_number}/officers",
        headers = {'Authorization': CH_API_KEY},
    ).json()

    # Some easy to extract information available in the payload
    incorporation_date = response_company['date_of_creation']
    registered_address = response_company['registered_office_address']
    company_directors = []

    for item in response_officers['items']:
        try:
            if item['occupation'] == 'Company Director':
                company_directors.append(item['name'])
        except: # do something more sophisticated later when handling responses...
            continue

    client_payload = json.dumps({
        'incorporationDate': incorporation_date,
        'registeredAdress': registered_address,
        'companyDirectors': company_directors
    })

    return client_payload
