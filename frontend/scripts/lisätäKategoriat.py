from pymongo import MongoClient
import certifi
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv('MONGODB_URI')
database_name = 'test'
collection_name = 'recipes'

client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
collection = db[collection_name]


file_path = 'recipes.txt'

def parse_recipe_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file: 
        lines = file.readlines()
    
    recipe_ids = []
    for line in lines:
        if line.startswith("ID: "):
            recipe_id = line.split(", ")[0].replace("ID: ", "").strip()
            recipe_ids.append(recipe_id)
    return recipe_ids

recipe_ids = parse_recipe_file(file_path)

category_name = 'Vappu'

for recipe_id in recipe_ids:
    collection.update_one(
        {'_id': ObjectId(recipe_id)}, 
        {'$addToSet': {'category': category_name}}  
    )

print("Finished updating recipe categories.")
