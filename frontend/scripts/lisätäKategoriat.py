from pymongo import MongoClient
import certifi
from bson import ObjectId

# Your MongoDB connection details
mongo_uri = 'mongodb+srv://vanessapihlaja:0N0hvWBixwP6PQGO@cluster0.hum04qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
database_name = 'test'
collection_name = 'recipes'

# Connect to MongoDB
client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
collection = db[collection_name]

# Recipes and their categories to be updated
recipes_to_update = {
    'Pääsiäinen': [
        "65f2ef9880e28358636a9247", "65f2ef9880e28358636a9259", "65f2ef9880e28358636a928b", 
        "65f2ef9980e28358636a92b9", "65f2ef9980e28358636a92c9", "65f2ef9980e28358636a92eb", 
        "65f2ef9a80e28358636a9305", "65f2ef9a80e28358636a934d", "65f2ef9b80e28358636a9381", 
        "65f2ef9b80e28358636a939f", "65f2ef9c80e28358636a93d1", "65f2ef9d80e28358636a9409", 
        "65f2ef9e80e28358636a9489", "65f2efa080e28358636a952b", "65f2efa080e28358636a9569", 
        "65f2efa180e28358636a9581", "65f2efa480e28358636a96db"
    ],
    'Vappu': [
        "65f2ef9380e28358636a9133", "65f2ef9880e28358636a925d", "65f2ef9880e28358636a928f", 
        "65f2ef9b80e28358636a9359", "65f2ef9b80e28358636a938f", "65f2ef9e80e28358636a948b", 
        "65f2ef9e80e28358636a948d", "65f2ef9e80e28358636a948f", "65f2ef9f80e28358636a94e5", 
        "65f2ef9f80e28358636a9513", "65f2efa080e28358636a952b", "65f2efa480e28358636a96f5", 
        "65f2efa580e28358636a971f", "65f2efa580e28358636a972b", "65f2efa880e28358636a9867", 
        "65f2efa980e28358636a9887", "65f2efab80e28358636a9973"
    ]
}

# Update each recipe with its new category
for category, ids in recipes_to_update.items():
    for recipe_id in ids:
        collection.update_one({'_id': ObjectId(recipe_id)}, {'$set': {'category': category}})

print("Finished updating recipe categories.")
