from pymongo import MongoClient
import certifi

# MongoDB connection string
mongo_uri = 'mongodb+srv://vanessapihlaja:0N0hvWBixwP6PQGO@cluster0.hum04qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
database_name = 'test'
collection_name = 'recipes'

# Connect to MongoDB
client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
collection = db[collection_name]

# Fetch titles of all recipes
recipe_titles = collection.find({}, {'title': 1, '_id': 1, 'content': 1})

# Write titles to a file
with open('recipe_titles_ids_content.txt', 'w', encoding='utf-8') as file:
    for recipe in recipe_titles:
        _id = recipe.get('_id', 'No ID') 
        title = recipe.get('title', 'No Title')
        content = recipe.get('content', 'No content')
        file.write(f"{_id}, {title}, {content}\n")

print("Finished writing recipe titles to recipe_titles.txt")