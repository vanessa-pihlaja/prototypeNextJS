from pymongo import MongoClient
import certifi
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv('MONGODB_URI')
database_name = 'test'
collection_name = 'recipes'

client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
collection = db[collection_name]

recipe_titles = collection.find({}, {'title': 1, '_id': 1, 'content': 1})

with open('recipe_titles_ids_content.txt', 'w', encoding='utf-8') as file:
    for recipe in recipe_titles:
        _id = recipe.get('_id', 'No ID') 
        title = recipe.get('title', 'No Title')
        content = recipe.get('content', 'No Content')
        file.write(f"{_id}, {title}, {content}\n")

print("Finished writing recipe titles to recipe_titles_ids_content.txt")
