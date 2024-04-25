import requests
from bs4 import BeautifulSoup

base_url = "https://www.bellatable.fi"

category_paths = [
    "/reseptit?category=Aamiainen",
    "/reseptit?category=Alkuruoat",
    "/reseptit?category=J%C3%A4lkiruoat",
    "/reseptit?category=Kala%20ja%20%C3%A4yri%C3%A4iset",
    "/reseptit?category=Kastikkeet",
    "/reseptit?category=Kasvis",
    "/reseptit?category=Keitot",
    "/reseptit?category=Leivonta",
    "/reseptit?category=Liha",
    "/reseptit?category=Lisukkeet",
    "/reseptit?category=Pasta%20ja%20risotto",
    "/reseptit?category=Salaatit",
    "/reseptit?category=Viini%20ja%20juoma",
    "/reseptit/category/Aamiainen",
    "/reseptit/category/Keitto",
    "/reseptit/category/Lisuke",
    "/reseptit/category/Pienet",
    "/reseptit/category/Salaatti",
    "/reseptit/category/Snacks"
]

unique_recipe_urls = set()

for path in category_paths:
    full_url = base_url + path
    response = requests.get(full_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    recipe_links = soup.find_all('a', href=True)
    
    for link in recipe_links:
        href = link['href']
        full_recipe_url = href if href.startswith('http') else base_url + href
        if ("/reseptit/" in full_recipe_url and
            not any(excluded in full_recipe_url for excluded in ["?category=", "/category", "/kysymys", "spotify.com"]) and
            full_recipe_url.startswith(base_url)):
            unique_recipe_urls.add(full_recipe_url)

for recipe_url in unique_recipe_urls:
    print(recipe_url)