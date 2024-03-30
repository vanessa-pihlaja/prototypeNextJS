from pymongo import MongoClient
import re
import certifi
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# MongoDB connection string
mongo_uri = os.getenv('MONGODB_URI')
database_name = 'test'
collection_name = 'recipes'

# Connect to MongoDB
client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
recipes_collection = db[collection_name]

# Define a mapping of URL patterns to owner names, now only for Yotam Ottolenghi
url_to_owner_mapping = {
    'https://ottolenghi.co.uk/': 'Ottolenghi',
}

# Iterate through the mapping and update the documents for Ottolenghi only
for url_pattern, owner_name in url_to_owner_mapping.items():
    # Update all recipes matching the URL pattern with the new owner property
    result = recipes_collection.update_many(
        {'url': {'$regex': re.escape(url_pattern), '$options': 'i'}},  # Escape the pattern and make case insensitive
        {'$set': {'owner': owner_name}}
    )
    
    # Update the document with the new content
    recipes_collection.update_one(
        {'_id': recipe['_id']},
        {'$set': {'content': updated_content}}
    )

print("Completed updating recipes for Yotam Ottolenghi.")
