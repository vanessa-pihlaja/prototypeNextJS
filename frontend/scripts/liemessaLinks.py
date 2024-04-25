import requests
from bs4 import BeautifulSoup

base_url = "https://liemessa.fi"

category_paths = [
    "/category/arki/",
    "/category/pastat/",
    "/category/kasvis/",
    "/category/juhlat/brunssi/",
    "/category/leivonta/",
    "/category/suomilove/",
]

unique_recipe_urls = set()

def scrape_category(category_path, page=1):
    full_url = f"{base_url}{category_path}page/{page}/"
    response = requests.get(full_url)
    if response.status_code != 200:
        return

    soup = BeautifulSoup(response.text, 'html.parser')
    recipe_links = soup.find_all('a', class_='entire-meta-link')

    for link in recipe_links:
        href = link.get('href')
        if href:
            unique_recipe_urls.add(href)

    next_page = soup.find('a', class_='next')
    if next_page:
        scrape_category(category_path, page + 1)

for path in category_paths:
    scrape_category(path)

for recipe_url in unique_recipe_urls:
    print(f'"{recipe_url}",')

print(f"Total unique recipe URLs found: {len(unique_recipe_urls)}")
