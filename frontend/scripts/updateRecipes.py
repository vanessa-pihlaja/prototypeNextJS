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

list_pattern = re.compile(r'(<ul>|<ol>)')

# Find recipes from "Viimeistä Murua Myöten" blog
viimeista_recipes = recipes_collection.find({'url': {'$regex': 'https://viimeistamuruamyoten.com/'}})

for recipe in viimeista_recipes:
    # Insert <br> before each <ul> and <ol>
    updated_content = re.sub(list_pattern, r'<br>\1', recipe['content'])
    
    # Update the document with the new content
    recipes_collection.update_one(
        {'_id': recipe['_id']},
        {'$set': {'content': updated_content}}
    )

print("Completed inserting <br> tags before list elements in Viimeistä Murua Myöten blog recipes.")