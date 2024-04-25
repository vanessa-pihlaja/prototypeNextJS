from pymongo import MongoClient
import re
import certifi
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv('MONGODB_URI')
database_name = 'test'
collection_name = 'recipes'

client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
recipes_collection = db[collection_name]

url_to_owner_mapping = {
    'https://ottolenghi.co.uk/': 'Ottolenghi',
}

for url_pattern, owner_name in url_to_owner_mapping.items():
    result = recipes_collection.update_many(
        {'url': {'$regex': re.escape(url_pattern), '$options': 'i'}},
        {'$set': {'owner': owner_name}}
    )
    
    recipes_collection.update_one(
        {'_id': recipe['_id']},
        {'$set': {'content': updated_content}}
    )

print("Completed updating recipes for Yotam Ottolenghi.")
