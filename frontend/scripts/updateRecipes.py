from pymongo import MongoClient
import re
import certifi

# MongoDB connection string
mongo_uri = 'mongodb+srv://vanessapihlaja:0N0hvWBixwP6PQGO@cluster0.hum04qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
database_name = 'test'
collection_name = 'recipes'

# Connect to MongoDB
client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
recipes_collection = db[collection_name]
# Define a mapping of URL patterns to owner names

url_to_owner_mapping = {
    'https://www.anninuunissa.fi': 'Annin Uunissa',
    'https://www.bellatable.fi/': 'Bella Table',
    'https://liemessa.fi/': 'Liemessä',
    'https://viimeistamuruamyoten.com/': 'Viimeistä Murua Myöten'
}

# Iterate through the mapping and update the documents
for url_pattern, owner_name in url_to_owner_mapping.items():
    # Update all recipes matching the URL pattern with the new owner property
    result = recipes_collection.update_many(
        {'url': {'$regex': url_pattern}},
        {'$set': {'owner': owner_name}}
    )
    
    print(f"Updated {result.modified_count} recipes with owner '{owner_name}'.")

print("Completed updating all recipes with their respective owners.")