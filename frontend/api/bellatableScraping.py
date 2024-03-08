import requests
from bs4 import BeautifulSoup
import json

# List of recipe URLs
recipe_urls = [
"https://www.bellatable.fi/reseptit/paahdettua-graavilohta-amp-beurre-blancia",
"https://www.bellatable.fi/reseptit/pasta-alla-norma",
"https://www.bellatable.fi/reseptit/muikkuboquerones-herushinki-cocktail",
"https://www.bellatable.fi/reseptit/kylmakurkkukeitto",
"https://www.bellatable.fi/reseptit/siskonmakkara-kikhernepata",
"https://www.bellatable.fi/reseptit/tapaksia",
"https://www.bellatable.fi/reseptit/gron-copycat-munat",
"https://www.bellatable.fi/reseptit/britarulla",
"https://www.bellatable.fi/reseptit/Minestrone",
"https://www.bellatable.fi/reseptit/suklaakakku-kahvi",
"https://www.bellatable.fi/reseptit/Pannarit-ja-hunajakennovoi",
"https://www.bellatable.fi/reseptit/majoneesi",
"https://www.bellatable.fi/reseptit/vadelmavispipuuro",
"https://www.bellatable.fi/reseptit/teriyakilohi",
"https://www.bellatable.fi/reseptit/ihanat-aamiaismuffinssit",
"https://www.bellatable.fi/reseptit/kurkku-melonisalaatti",
"https://www.bellatable.fi/reseptit/romescoa-ja-paahdettua-purjoa",
"https://www.bellatable.fi/reseptit/kukkakaaligrattiini",
"https://www.bellatable.fi/reseptit/smetanasilli",
"https://www.bellatable.fi/reseptit/markun-kreikkalainen-salaatti",
"https://www.bellatable.fi/reseptit/chevresalaatti",
"https://www.bellatable.fi/reseptit/annan-shanghai-taco",
"https://www.bellatable.fi/reseptit/zataar-porkkanat",
"https://www.bellatable.fi/reseptit/puolukkakohokas",
"https://www.bellatable.fi/reseptit/hot-honey-ruusukaalit",
"https://www.bellatable.fi/reseptit/raejuustopannari",
"https://www.bellatable.fi/reseptit/punajuuripasta",
"https://www.bellatable.fi/reseptit/skonssit",
"https://www.bellatable.fi/reseptit/rigatoni-alla-salsiccia",
"https://www.bellatable.fi/reseptit/5im245f4gmjgjfk3fowsn46wpnbwv4-ffcz3",
"https://www.bellatable.fi/reseptit/joulusalaatti",
"https://www.bellatable.fi/reseptit/tarte-tatin",
"https://www.bellatable.fi/reseptit/Koulouri-seesamirinkilä",
"https://www.bellatable.fi/reseptit/petit-farci-clafoutis-vihersalaatti",
"https://www.bellatable.fi/reseptit/fattoush",
"https://www.bellatable.fi/reseptit/naminamastensampylat",
"https://www.bellatable.fi/reseptit/punajuuri-sinihome-tarte-tatin-savusrkitahnaa-juuresrieskalla-amp-mausteinen-omenamocktail",
"https://www.bellatable.fi/reseptit/mansikka-raparperiviinerit",
"https://www.bellatable.fi/reseptit/Tattarikrokantti",
"https://www.bellatable.fi/reseptit/hapanjuurifocaccia",
"https://www.bellatable.fi/reseptit/paahdettuja-punajuuria",
"https://www.bellatable.fi/reseptit/deviled-eggs",
"https://www.bellatable.fi/reseptit/markun-riitta-idin-joulusinappi",
"https://www.bellatable.fi/reseptit/egg-salad-briossit",
"https://www.bellatable.fi/reseptit/vitellotonnato",
"https://www.bellatable.fi/reseptit/Bagnacauda",
"https://www.bellatable.fi/reseptit/kylmsavulohipasta-ruusukaalilla",
"https://www.bellatable.fi/reseptit/halloumipasta",
"https://www.bellatable.fi/reseptit/mansikka-raparperigalette",
"https://www.bellatable.fi/reseptit/pika-melanzane",
"https://www.bellatable.fi/reseptit/bearnaise",
"https://www.bellatable.fi/reseptit/pissaladiere",
"https://www.bellatable.fi/reseptit/mimmin-lihapullat-ruskeakastike-muusi-ja-siirappiporkkanat",
"https://www.bellatable.fi/reseptit/Kurpitsagnocchi-cacioepepe",
"https://www.bellatable.fi/reseptit/kalaa-en-papilotte",
"https://www.bellatable.fi/reseptit/vatruskat",
"https://www.bellatable.fi/reseptit/sitruunamuffinssit",
"https://www.bellatable.fi/reseptit/Spicytunatoast",
"https://www.bellatable.fi/reseptit/enzoni",
"https://www.bellatable.fi/reseptit/valurautapannu-cookie",
"https://www.bellatable.fi/reseptit/nelja-reseptia-sailyketomaateista",
"https://www.bellatable.fi/reseptit/paras-brownie",
"https://www.bellatable.fi/reseptit/vihrea-pastasalaatti",
"https://www.bellatable.fi/reseptit/sitruunarisotto-ja-arancinit",
"https://www.bellatable.fi/reseptit/paasiaisfeast",
"https://www.bellatable.fi/reseptit/luonnonkalapihvit",
"https://www.bellatable.fi/reseptit/magnolia-bakeryn-banaanivanukas",
"https://www.bellatable.fi/reseptit/bellan-babybel-sampylat",
"https://www.bellatable.fi/reseptit/kesakeitto",
"https://www.bellatable.fi/reseptit/perunarieskat",
"https://www.bellatable.fi/reseptit/sienikastike",
"https://www.bellatable.fi/reseptit/pistaasi-sitruunakakku",
"https://www.bellatable.fi/reseptit/keskurpitsapasta",
"https://www.bellatable.fi/reseptit/sitruunamuffinsit",
"https://www.bellatable.fi/reseptit/5jvo28mpa04gctiwdobtawrsj2enys-d3ygl-z2fye-6ct54-exe85-azncj-exhy7-k7azf-9pxt9-at884-g2tlw-gkege-2tnt8-xlb5d",
"https://www.bellatable.fi/reseptit/punajuuricarpaccio",
"https://www.bellatable.fi/reseptit/antiboise-kastike-ja-siikaa",
"https://www.bellatable.fi/reseptit/karamellisoitusipulidippi",
"https://www.bellatable.fi/reseptit/villivattugalette",
"https://www.bellatable.fi/reseptit/maalaispata-yrttioljylla",
"https://www.bellatable.fi/reseptit/simpukoita-ja-kasviksia-kermaisessa-valkoviini-sahramikastikkeessa",
"https://www.bellatable.fi/reseptit/spicy-tuna-tlt",
"https://www.bellatable.fi/reseptit/kanagyros",
"https://www.bellatable.fi/reseptit/maissichowder",
"https://www.bellatable.fi/reseptit/spicy-cashew-soosi",
"https://www.bellatable.fi/reseptit/purjo-parsa-galetet",
"https://www.bellatable.fi/reseptit/parsarisotto",
"https://www.bellatable.fi/reseptit/paahdetut-misojuurekset-ja-paarynat",
"https://www.bellatable.fi/reseptit/taydellinen-tiramisu",
"https://www.bellatable.fi/reseptit/toscakakku",
"https://www.bellatable.fi/reseptit/Vietnamilaiset-salaattiveneet",
"https://www.bellatable.fi/reseptit/friteerattuja-simpukoita-sahramiaioli",
"https://www.bellatable.fi/reseptit/sheivattu-parsa-fenkoli-salaatti",
"https://www.bellatable.fi/reseptit/unelmien-kurpitsapasta",
"https://www.bellatable.fi/reseptit/spelttivispipuuro",
"https://www.bellatable.fi/reseptit/latket",
"https://www.bellatable.fi/reseptit/Viacarotanvinaigrette",
"https://www.bellatable.fi/reseptit/friteerattu-silken-tofu",
"https://www.bellatable.fi/reseptit/juustokumina-lammasnuudelit",
"https://www.bellatable.fi/reseptit/sitruuna-ricotta-pannukakut",
"https://www.bellatable.fi/reseptit/mustikkapiirakka",
"https://www.bellatable.fi/reseptit/gnocchivuoka",
"https://www.bellatable.fi/reseptit/misomunakoiso",
"https://www.bellatable.fi/reseptit/helppo-ricottakakku",
"https://www.bellatable.fi/reseptit/raputacot-ja-mangosalsa",
"https://www.bellatable.fi/reseptit/panzanella",
"https://www.bellatable.fi/reseptit/Kesäkurpitsahillo",
"https://www.bellatable.fi/reseptit/raakamakkarapottusalde",
"https://www.bellatable.fi/reseptit/juuriselleri-omenakeitto-amp-rakuunaljy",
"https://www.bellatable.fi/reseptit/kevn-pikkuherkut",
"https://www.bellatable.fi/reseptit/kylmasavulohitartar",
"https://www.bellatable.fi/reseptit/herne-sitruuna-orzo",
"https://www.bellatable.fi/reseptit/aglio-olio-e-peperoncino-1",
"https://www.bellatable.fi/reseptit/931m7zok1azwe3mbof5avelgjlpr7a",
"https://www.bellatable.fi/reseptit/bruschettapasta",
"https://www.bellatable.fi/reseptit/trio-dippi",
"https://www.bellatable.fi/reseptit/retiisikasvimaa",
"https://www.bellatable.fi/reseptit/poronsisapaisti",
"https://www.bellatable.fi/reseptit/Toscanankana",
"https://www.bellatable.fi/reseptit/coulibiac-lohipiirakka",
"https://www.bellatable.fi/reseptit/markun-riitta-idin-omenaglgi",
"https://www.bellatable.fi/reseptit/munakasrulla",
"https://www.bellatable.fi/reseptit/Joulupannarit",
"https://www.bellatable.fi/reseptit/ceasarkastike",
"https://www.bellatable.fi/reseptit/omenakinuski",
"https://www.bellatable.fi/reseptit/paistettua-siika",
"https://www.bellatable.fi/reseptit/linssikeitto",
"https://www.bellatable.fi/reseptit/gremolata-voi",
"https://www.bellatable.fi/reseptit/metssieniwonton",
"https://www.bellatable.fi/reseptit/kesa-porkkanat",
"https://www.bellatable.fi/reseptit/ranskalaiset-sipulitoastit",
"https://www.bellatable.fi/reseptit/kirsikka-suklaahippujtel",
"https://www.bellatable.fi/reseptit/hernepasta",
"https://www.bellatable.fi/reseptit/savulohikiusaus",
"https://www.bellatable.fi/reseptit/markun-nakkisoosi",
"https://www.bellatable.fi/reseptit/kimchiriisimunakas",
"https://www.bellatable.fi/reseptit/arkibolognese",
"https://www.bellatable.fi/reseptit/kookospannacotta",
"https://www.bellatable.fi/reseptit/mustajuurta-kylmasavulohta-ja-veriappelsiini-hollandaise",
"https://www.bellatable.fi/reseptit/sitruuna-marenkitorttu",
"https://www.bellatable.fi/reseptit/edyzj8vdifjz2ng2r4locxmry614ka",
"https://www.bellatable.fi/reseptit/chicken-piccata",
"https://www.bellatable.fi/reseptit/Crepecomplete",
"https://www.bellatable.fi/reseptit/lahi-idan-kurpitsasalaatti",
"https://www.bellatable.fi/reseptit/kolme-ihanaa-juhannusresepti-vihre-dukkah-lohipastrami-siikaa-amp-perunasalaattia-amp-tiramisujdekakku",
"https://www.bellatable.fi/reseptit/pots-de-creme",
"https://www.bellatable.fi/reseptit/Uunimunat",
"https://www.bellatable.fi/reseptit/Chermoula",
"https://www.bellatable.fi/reseptit/ranskalaiset-linssit-confitankka",
"https://www.bellatable.fi/reseptit/butterchickpea",
"https://www.bellatable.fi/reseptit/paras-pottumuusi",
"https://www.bellatable.fi/reseptit/Mansikkakakku",
"https://www.bellatable.fi/reseptit/persimonia-burrataa-ja-pistaasivinegrettia",
"https://www.bellatable.fi/reseptit/suolasitruunaskagen",
"https://www.bellatable.fi/reseptit/ruskistettuvoi-piparigranola",
"https://www.bellatable.fi/reseptit/chili-sin-carne",
"https://www.bellatable.fi/reseptit/banaanikakku-chai-murulla",
"https://www.bellatable.fi/reseptit/kantarellirisotto",
"https://www.bellatable.fi/reseptit/kanelikierre-pannarit",
"https://www.bellatable.fi/reseptit/skagenpiirakka",
"https://www.bellatable.fi/reseptit/pauliinan-karjalanpiirakat-ja-kukkoset",
"https://www.bellatable.fi/reseptit/rapeita-seesamilyttypottuja-ja-spicy-skagenia",
"https://www.bellatable.fi/reseptit/bellojen-gianduja-eli-itsetehty-nutella",
"https://www.bellatable.fi/reseptit/nokkosgnocchit-nokkospesto",
"https://www.bellatable.fi/reseptit/voileipakaaretorttu",
"https://www.bellatable.fi/reseptit/Pikkeloidytjalapenot",
"https://www.bellatable.fi/reseptit/chocolate-chip-cookies",
]


def scrape_recipe(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Scrape the title of the recipe
    title_tag = soup.find('h1', class_='entry-title entry-title--large p-name')
    title = title_tag.get_text(strip=True) if title_tag else 'No Title Found'
    
    # Scrape the content paragraphs
    content_paragraphs = soup.find_all('p', style="white-space:pre-wrap;")
    all_content_text = "\n\n".join(p.get_text(separator='\n', strip=True) for p in content_paragraphs)
    
    # Scrape the image URLs, excluding a specific image if found
    excluded_image_filename = "bellatable_red.png"
    image_blocks = soup.find_all('div', class_='image-block-wrapper')
    image_urls = [img['src'] for block in image_blocks for img in block.find_all('img', src=True) if excluded_image_filename not in img['src']]
    
    return {
        'url': url,
        'title': title,
        'content': all_content_text.strip(),
        'images': image_urls  # Direct URLs of the images, excluding the specified one
    }

# List to store the content of each recipe
recipes_content = []

# Iterate through URLs and scrape content, title, and images for each, excluding specific images
for url in recipe_urls:
    print(f"Scraping content from {url}")
    recipe_data = scrape_recipe(url)
    recipes_content.append(recipe_data)

# Convert the list of recipe data to JSON
json_content = json.dumps(recipes_content, indent=4, ensure_ascii=False)

# Optionally, save the JSON to a file
with open('recipes_content.json', 'w', encoding='utf-8') as f:
    f.write(json_content)
