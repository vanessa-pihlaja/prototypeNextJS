import requests
from bs4 import BeautifulSoup

base_url = "https://www.anninuunissa.fi"

category_paths = [
    "/category/suolaiset-leivat-sampylat-pizza/",
    "/category/arkiruoka/",
    "/category/gluteeniton/",
    "/category/vegaaninen/",
    "/category/nopeat-ja-helpot/"
]

unique_recipe_urls = set()

for path in category_paths:
    full_url = base_url + path
    response = requests.get(full_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    recipe_links = soup.select('h2.entry-title a')
    
    for link in recipe_links:
        href = link['href']
        full_recipe_url = href
        
        if (full_recipe_url.startswith(base_url) and
            not any(excluded in full_recipe_url for excluded in ["/category", "#", "/lifestyle", "/media", "/kirjat", "/kaikki-reseptit", "/blogin-takana", "/viides-haapaiva-puuhaat", "/tallinna-lasten-kanssa", "/douron-laakso-portugali", "/bistro-bardot", "/keittion-pintaremppa-ja-unelmien-keittiotaso", "/herkkujen-turku"])):
            unique_recipe_urls.add(full_recipe_url)

for recipe_url in unique_recipe_urls:
    print(f'"{recipe_url}",')
