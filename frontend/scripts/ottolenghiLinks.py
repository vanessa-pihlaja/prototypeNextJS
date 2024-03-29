import requests
from bs4 import BeautifulSoup

base_url = "https://ottolenghi.co.uk"

category_paths = [
    "/recipes/ottolenghi-20",
    "/recipes/vegetarian-recipes",
    "/recipes/aubergine-recipes",
    "/recipes/pasta-rice-grains",
    "/recipes/salad-recipes",
    "/recipes/soup-recipes",
    "/recipes/meat",
    "/recipes/chicken-recipes",
    "/recipes/fish-seafood",
    "/recipes/cakes-desserts",
    "/recipes/ottolenghi-test-kitchen",
    "/recipes/summer-recipes",
    "/recipes/ottolenghi-classics",
    "/recipes/winter-recipes",
]

unique_recipe_urls = set()

for path in category_paths:
    full_url = base_url + path
    response = requests.get(full_url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Target the specific div and ul containing the recipe links
    target_div = soup.find('div', class_="page-products page-layout-category-default block widget contents-grid grid ct-view ct-listing-recipes")
    if target_div:
        recipe_links = target_div.find_all('a', href=True)
    
        for link in recipe_links:
            href = link['href']
            full_recipe_url = href if href.startswith('http') else base_url + href
            if ("/recipes/" in full_recipe_url and
                not any(excluded in full_recipe_url for excluded in ["?category=", "/category", "/kysymys", "spotify.com"]) and
                full_recipe_url.startswith(base_url)):
                unique_recipe_urls.add(full_recipe_url)

for recipe_url in unique_recipe_urls:
     print(f'"{recipe_url}",')

print(f"Total unique recipe links scraped: {len(unique_recipe_urls)}")
