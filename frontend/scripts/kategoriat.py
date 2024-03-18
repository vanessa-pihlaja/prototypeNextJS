from pymongo import MongoClient
import certifi

categories_keywords = {
    'Nopeat': ['nopea', '15 minuuttia', 'pikainen'],
    'Pastat ja risotot': ['pasta', 'spagetti', 'penne', 'tagliatelle', 'ragu', 'tortelliini', 'gnocchi', 'risotto', ],
    'Vege': ['kasvis', 'tofu', 'kasvisruoka', 'linssit', 'linssi', 'pavut', 'papu', 'quorn', 'härkis', 'soijarouhe'],
    'Kauden reseptit': ['hauki', 'särki', 'muikku', 'turska', 'banaani', 'piparjuuri', 'purppurabataatti', 'peruna', 'maa-artisokka', 'maniokki', 'bataatti', 'veriappelsiini', 'pitaija', 'puoliveriappelsiini', 'papaija', 'passiohedelmä', 'parsakaali', 'pimientos de padron', 'mandariini', 'mango', 'limetti', 'lime', 'kookospähkinä', 'avokado', 'greippi'],
    'Aasialainen': ['aasialainen', 'soijakastike', 'mirin', 'nuudeli', 'curry', 'kiinalainen', 'intialainen', 'thaimaalainen', 'korealainen'],
    'Brunssi': ['brunssi', 'aamiainen', 'muna', 'pannukakku', 'kananmuna', 'piirakka', 'munakas', 'lettu', 'letut', 'tuorepuuro', 'chia', 'vohvelit', 'granola', 'smoothie'],
    'Pääsiäinen': ['pääsiäinen', 'pääsiäis'],
    'Vappu': ['vappu', 'simaa', 'sima', 'munkki'],
    'Jälkiruoat': ['jälkiruoka', 'kakku', 'piirakka', 'sorbetti', 'makea', 'jäätelö', 'keksit', 'leivinjauhe', ],
    'Keitot': ['keitto', 'liemi'],
    'Salaatit': ['salaatti'],
    'Alkupala': ['alkupala', 'snack', 'starter'],
    'Pääruoka': ['pääruoka', 'kala', 'liha' ],
}

paaruoka_keywords = {
    'Nopeat': ['nopea', '15 min', 'arkiruoka'],
    'Vege': ['kasvis', 'tofu', 'kasvisruoka', 'linssit', 'linssi', 'pavut', 'papu', 'quorn', 'härkis', 'soijarouhe'],
    'Pääruoka': ['pääruoka', 'kala', 'liha' ],
}


def categorize_recipe(title, content, paaruoka_keywords):
    # Combine title and content and convert to lowercase
    text_to_search = (title.lower() + " " + content.lower()).split()
    
    matched_categories = []
    for category, keywords in paaruoka_keywords.items():
        # Check if any keyword is a substring of the words in the recipe
        if any(keyword.lower() in word for word in text_to_search for keyword in keywords):
            matched_categories.append(category)
    
    # Return 'Uncategorized' if no categories matched, else return all matched categories
    return matched_categories if matched_categories else ['Uncategorized']



# MongoDB connection string
mongo_uri = 'mongodb+srv://vanessapihlaja:0N0hvWBixwP6PQGO@cluster0.hum04qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
database_name = 'test'
collection_name = 'recipes'

# Connect to MongoDB
client = MongoClient(mongo_uri, tlsCAFile=certifi.where())
db = client[database_name]
collection = db[collection_name]

recipes = collection.find({}, {'title': 1, 'content': 1, '_id': 1})

# Categorize recipes and organize by category
categorized_recipes = {category: [] for category in paaruoka_keywords}
categorized_recipes['Uncategorized'] = []

for recipe in recipes:
    categories = categorize_recipe(recipe['title'], recipe['content'], paaruoka_keywords)
    for category in categories:
        categorized_recipes[category].append((recipe['_id'], recipe['title']))

# Write categorized recipes to a file, sorted by category
output_file_path = 'categorized_pääruoka.txt'
with open(output_file_path, 'w', encoding='utf-8') as file:
    for category, recipes in categorized_recipes.items():
        file.write(f"Category: {category}\n")
        for recipe_id, title in recipes:
            file.write(f"ID: {recipe_id}, Title: {title}\n")
        file.write("\n")

print(f"Finished categorizing recipes and writing results to {output_file_path}")