import requests
from bs4 import BeautifulSoup
import json
import re

recipe_urls = [
    "https://www.anninuunissa.fi/puolukka-kinuskikakku-g/",
    "https://www.anninuunissa.fi/vegaaninen-mansikka-raparperijuustokakku-g/",
    "https://www.anninuunissa.fi/rapea-mansikkapaistos/",
    "https://www.anninuunissa.fi/banh-mi-eli-vietnamilainen-taytetty-leipa/",
    "https://www.anninuunissa.fi/arkiruokavinkki-helppo-meze-lautanen/",
    "https://www.anninuunissa.fi/taaperon-smoothie-jaatelopuikot/",
    "https://www.anninuunissa.fi/helppo-marja-rahkatorttu/",
    "https://www.anninuunissa.fi/raparperi-myslikeikaus-paahdetulla-voilla/",
    "https://www.anninuunissa.fi/kinuski-suklaajaatelokakku-m/",
    "https://www.anninuunissa.fi/sampyloita-ja-patonkeja-helppo-leipa-ohje/",
    "https://www.anninuunissa.fi/omenainen-glogijuustokakku-g/",
    "https://www.anninuunissa.fi/muhkeat-mustikkamunkit-ve/",
    "https://www.anninuunissa.fi/nutella-pizza-ihana-jalkiruoka/",
    "https://www.anninuunissa.fi/taydelliset-taytetyt-munkit/",
    "https://www.anninuunissa.fi/croissant-paiva-ihanimmat-taytteet/",
    "https://www.anninuunissa.fi/herkullinen-juhannusmenu/",
    "https://www.anninuunissa.fi/mustikka-sitruunamutakakku/",
    "https://www.anninuunissa.fi/hedelmainen-kesasalaatti/",
    "https://www.anninuunissa.fi/arkiruokavinkki-lohi-spagettimunakas/",
    "https://www.anninuunissa.fi/vauvan-oma-pizza-10-kk/",
    "https://www.anninuunissa.fi/juhlava-parsapiirakka-g/",
    "https://www.anninuunissa.fi/vegaaninen-kondensoitu-maito/",
    "https://www.anninuunissa.fi/maidoton-mansikkakakku-g/",
    "https://www.anninuunissa.fi/sokeriton-suklaavanukas-ja-kattausvinkkeja-kevaaseen-arvonta/",
    "https://www.anninuunissa.fi/chocolate-chip-pannarit/",
    "https://www.anninuunissa.fi/makumuistoja-lohigalette/",
    "https://www.anninuunissa.fi/key-lime-pie-helppo-limepiiras-g/",
    "https://www.anninuunissa.fi/vadelmanlehtitee-teeta-puutarhasta/",
    "https://www.anninuunissa.fi/aidin-meheva-sampylakuusi/",
    "https://www.anninuunissa.fi/oton-japanilainen-maitoleipa/",
    "https://www.anninuunissa.fi/kuorrutettu-suklaa-punajuurikakku-g/",
    "https://www.anninuunissa.fi/arkiruokavinkki-perunapizza/",
    "https://www.anninuunissa.fi/helpot-ruisleivat-eli-ruispalat-kotona/",
    "https://www.anninuunissa.fi/taydellinen-tomaattipasta/",
    "https://www.anninuunissa.fi/arkiruokavinkki-kevainen-parsa-mansikkasalaatti/",
    "https://www.anninuunissa.fi/kesakurpitsarieskat/",
    "https://www.anninuunissa.fi/helppo-tuulihattutorni-croquembouche/",
    "https://www.anninuunissa.fi/parhaimmat-ricottapannukakut/",
    "https://www.anninuunissa.fi/tahmean-meheva-marmeladikakku/",
    "https://www.anninuunissa.fi/helppo-rahkavoitaikina-g/",
    "https://www.anninuunissa.fi/rapea-raparperipiirakka-kauramannasta/",
    "https://www.anninuunissa.fi/paras-vegaaninen-suklaakakku/",
    "https://www.anninuunissa.fi/suklaa-kaurapannukakut-g/",
    "https://www.anninuunissa.fi/gnocchi-allamatriciana/",
    "https://www.anninuunissa.fi/itse-tehty-ricotta-pala-taivasta/",
    "https://www.anninuunissa.fi/nopeat-ja-helpot-kanaquesadillat/",
    "https://www.anninuunissa.fi/bruchetta-margherita-pizzaperjantaiksi/",
    "https://www.anninuunissa.fi/herkullinen-hernehummus-m/",
    "https://www.anninuunissa.fi/samettinen-kukkakaalikeitto/",
    "https://www.anninuunissa.fi/sinappivinegretti-maailman-paras-salaatinkastike/",
    "https://www.anninuunissa.fi/omenagalette/",
    "https://www.anninuunissa.fi/rapeat-ja-nopeat-jaakaappisampylat/",
    "https://www.anninuunissa.fi/helpot-ja-nopeat-tomaattipiiraat-v/",
    "https://www.anninuunissa.fi/helppo-vegaaninen-suklaapiirakka/",
    "https://www.anninuunissa.fi/vaniljakreemi-eli-creme-patissere/",
    "https://www.anninuunissa.fi/vegaaninen-voikreemi/",
    "https://www.anninuunissa.fi/tomaatti-pestogalette-ricottajuustolla/",
    "https://www.anninuunissa.fi/helppo-piparkakku-fresitatrifle/",
    "https://www.anninuunissa.fi/mansikka-tomaattisalaatti-burrataa/",
    "https://www.anninuunissa.fi/ihana-mustikkakakku/",
    "https://www.anninuunissa.fi/pasteis-de-nata-kermaleivokset-mustikoilla/",
    "https://www.anninuunissa.fi/suklaakuppikakut-ilman-lisattya-sokeria-g/",
    "https://www.anninuunissa.fi/tiramisu-semifreddo/",
    "https://www.anninuunissa.fi/suklaa-kinuskibrownie-isalle-ve/",
    "https://www.anninuunissa.fi/vastustamaton-mansikkasalsa/",
    "https://www.anninuunissa.fi/meheva-kesakurpitsakakku-g/",
    "https://www.anninuunissa.fi/ihanan-rapea-granola-g/",
    "https://www.anninuunissa.fi/uunijaatelokakku-baked-alaska-g/",
    "https://www.anninuunissa.fi/tahmaiset-uuniomenat-g/",
    "https://www.anninuunissa.fi/sokeriton-banaanileipa-6-kk/",
    "https://www.anninuunissa.fi/spelttisuolakeksit-juustoille-ja-hilloille/",
    "https://www.anninuunissa.fi/suklaa-vadelmakakut-lasissa-ve/",
    "https://www.anninuunissa.fi/runebergin-ruudut-ilman-lisattya-sokeria-g/",
    "https://www.anninuunissa.fi/kurpitsarieskat/",
    "https://www.anninuunissa.fi/fantastiset-gourmet-hodarit/",
    "https://www.anninuunissa.fi/vauvan-jaakaappisampylat-6-kk/",
    "https://www.anninuunissa.fi/paneer-porkkanavohvelit-g/",
    "https://www.anninuunissa.fi/helppo-sokeriton-suklaakakku-g/",
    "https://www.anninuunissa.fi/helpot-omenataskut-eli-omenapasteijat/",
    "https://www.anninuunissa.fi/nopeat-minipizzat-grillissa-5-taytevinkkia/",
    "https://www.anninuunissa.fi/dipattava-croissantkranssi/",
    "https://www.anninuunissa.fi/tomaattikeitto-basilikalla-ja-mascarponella/",
    "https://www.anninuunissa.fi/paahdettu-mansikka-bruchetta-ve/",
    "https://www.anninuunissa.fi/juusto-makaronilaatikko/",
    "https://www.anninuunissa.fi/taydellinen-suklaakakku/",
    "https://www.anninuunissa.fi/ihanat-blinit-ja-skagenrora/",
    "https://www.anninuunissa.fi/tulisen-lempea-kurpitsakeitto/",
    "https://www.anninuunissa.fi/uunidonitsit-ilman-donitsipeltia/",
    "https://www.anninuunissa.fi/vauvan-porkkanamuffinssit-ei-lisattya-sokeria/",
    "https://www.anninuunissa.fi/tomaatti-halloumisalaatti-balsamicolla/",
    "https://www.anninuunissa.fi/mustikka-blondie-g/",
    "https://www.anninuunissa.fi/vegaaninen-skagenrora-tarjoiluehdotus/",
    "https://www.anninuunissa.fi/omenajuustokakku-g/",
    "https://www.anninuunissa.fi/taydellinen-focaccia/",
    "https://www.anninuunissa.fi/paistettu-pohjaton-kurpitsajuustokakku/",
    "https://www.anninuunissa.fi/maidoton-juusto-kasvispiirakka/",
    "https://www.anninuunissa.fi/rapea-siemennakkaripiirakka-g/",
    "https://www.anninuunissa.fi/valkoinen-pizza-grillatulla-kesakurpitsalla/",
    "https://www.anninuunissa.fi/horsmankukka-mansikkahillo/",
    "https://www.anninuunissa.fi/helppo-sitruunapasta/",
    "https://www.anninuunissa.fi/passionruudut/",
    "https://www.anninuunissa.fi/salted-caramel-taytekakku/",
    "https://www.anninuunissa.fi/kasvishampurilaiset-havikista-vegeburgeriksi/",
    "https://www.anninuunissa.fi/koyhat-ritarit-ja-karamellisoitua-omenaa/",
    "https://www.anninuunissa.fi/ihanan-helppo-sitruunamutakakku-g/",
    "https://www.anninuunissa.fi/taydellinen-italialainen-pizza/",
    "https://www.anninuunissa.fi/vegaaninen-kinuskipiirakka/",
    "https://www.anninuunissa.fi/porkkanakakku-tuorepuuro-g/",
    "https://www.anninuunissa.fi/uunijuusto-ja-pizzatikut/",
    "https://www.anninuunissa.fi/arkiruokavinkki-kreikkalainen-burgeri/",
    "https://www.anninuunissa.fi/uunissa-paahdetut-kirsikkatomaatit/",
    "https://www.anninuunissa.fi/minipannarit-ja-omena-pihlajanmarjahillo/",
    "https://www.anninuunissa.fi/helppo-halloween-piirakka/",
    "https://www.anninuunissa.fi/helppo-juhannuskakku-g/",
    "https://www.anninuunissa.fi/valimerellinen-kasvisvoileipakakku/",
    "https://www.anninuunissa.fi/pikablinit-paras-kuohuva-uudeksi-vuodeksi/",
    "https://www.anninuunissa.fi/meheva-raparperipiirakka-g/",
    "https://www.anninuunissa.fi/parhaat-alkupalat-x-6-kuplien-kanssa/",
    "https://www.anninuunissa.fi/paras-pullataikina-ohje-vinkit/",
    "https://www.anninuunissa.fi/meheva-suklaa-kesakurpitsakakku/",
    "https://www.anninuunissa.fi/paasiaisen-paras-porkkanakakku/",
    "https://www.anninuunissa.fi/vauvan-mustikkamuffinssit-ei-lisattya-sokeria/",
    "https://www.anninuunissa.fi/peruna-lehtikaalisalaatti/",
    "https://www.anninuunissa.fi/helppo-suklaa-vaniljajaatelokakku/",
    "https://www.anninuunissa.fi/helpot-lantturieskat-6-kk/",
    "https://www.anninuunissa.fi/kurpitsa-mozzarella-pestosalaatti/",
    "https://www.anninuunissa.fi/gluteeniton-runebergin-kakku/",
    "https://www.anninuunissa.fi/rapeat-puolukkasampylat/",
    "https://www.anninuunissa.fi/lasten-dipattavat-laskiaispullat-sokeriton/",
    "https://www.anninuunissa.fi/piparkakku-uuniriisipuuro-ve/",
    "https://www.anninuunissa.fi/gluteeniton-leivonta-nain-muutat-reseptit-helposti/",
    "https://www.anninuunissa.fi/helppo-juustopiirakka-ja-asiaa-mausteista-arvonta/",
    "https://www.anninuunissa.fi/dallas-laskiaispullat/",
    "https://www.anninuunissa.fi/parhaimmat-hodarisampylat/",
    "https://www.anninuunissa.fi/timjami-mansikkakakku-g/",
    "https://www.anninuunissa.fi/mansikka-murupaistos-helppo-mokkiohje-ve/",
    "https://www.anninuunissa.fi/laskiaisen-mutakakku-m/",
    "https://www.anninuunissa.fi/hedelmasalaatti-parasta-just-nyt/",
    "https://www.anninuunissa.fi/helpot-kinuski-puolukkapullat/",
    "https://www.anninuunissa.fi/arkiruokavinkki-taytetyt-kana-avocadojuurileivat/",
    "https://www.anninuunissa.fi/nopea-mansikkajuustokakku-g/",
    "https://www.anninuunissa.fi/sitruuna-vadelmakakku-ve/",
    "https://www.anninuunissa.fi/syotavilla-kukilla-koristeltu-kakku/",
    "https://www.anninuunissa.fi/amerikkalainen-omenakeksipiirakka/",
    "https://www.anninuunissa.fi/raikas-veriappelsiinisalaatti/",
    "https://www.anninuunissa.fi/syreenisokeri/",
    "https://www.anninuunissa.fi/upea-sitruuna-kinuskitaytekakku-ve/",
    "https://www.anninuunissa.fi/kermainen-tomaattipasta/",
    "https://www.anninuunissa.fi/kevyt-porkkana-kurpitsakeitto-ve/",
    "https://www.anninuunissa.fi/caramel-puolukkatuorepuuro-g/",
    "https://www.anninuunissa.fi/taaperon-piparkakut-ilman-lisattya-valk-sokeria-ve/",
    "https://www.anninuunissa.fi/nice-cream-jaatelopuikot-ve/",
    "https://www.anninuunissa.fi/ihanan-helpot-pitaleivat/",
    "https://www.anninuunissa.fi/terveellisemmat-kauracookiet-g/",
    "https://www.anninuunissa.fi/kindermoussella-taytetyt-croissant-tuutit/",
    "https://www.anninuunissa.fi/paistettu-sitruuna-ricottajuustokakku-g/",
    "https://www.anninuunissa.fi/taydellinen-juustotarjotin/",
    "https://www.anninuunissa.fi/angel-pie-eli-enkelten-piiras/",
    "https://www.anninuunissa.fi/ihana-joulujaatelokakku-m/",
    "https://www.anninuunissa.fi/appelsiini-oliivioljykakku/",
    "https://www.anninuunissa.fi/helpoimmat-kanelipullat-cinnamon-swirls/",
    "https://www.anninuunissa.fi/mustikka-mangotuorepuuro-g/",
    "https://www.anninuunissa.fi/lets-make-pizza-kokkauskurssi-comojarvella/",
    "https://www.anninuunissa.fi/paistettu-kiwi-jogurttipiirakka/",
    "https://www.anninuunissa.fi/geisha-brownie-geisha-vaahdolla/",
    "https://www.anninuunissa.fi/penne-caprese-tomaatti-mozzarellapasta/",
    "https://www.anninuunissa.fi/vegaaninen-leivonta-vinkkeja-onnistumiseen/",
    "https://www.anninuunissa.fi/taaperon-banaani-suklaakaurakeksit/",
    "https://www.anninuunissa.fi/key-lime-juustokakku-g/",
    "https://www.anninuunissa.fi/retro-hedelmajuustokakku-ve/",
    "https://www.anninuunissa.fi/appelsiinivispipuuro-myos-vauvalle-6-kk/",
    "https://www.anninuunissa.fi/kinuskiset-taatelipalat/",
    "https://www.anninuunissa.fi/piparkakkukalenteri-vegaaninen-piparitaikina/",
]


def scrape_recipe(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    title_tag = soup.find('h1', class_='entry-title')
    title = title_tag.get_text(strip=True) if title_tag else 'No Title Found'
    
    content_elements = []
    
    h2_tag = soup.find('h2', string=title)
    
    if h2_tag:
        for sibling in h2_tag.find_next_siblings():
            if sibling.name in ['p', 'ul', 'ol']:
                content_elements.append(str(sibling))
            else:
                break 
    else:
        print(f"No matching <h2> element found for title '{title}' in {url}")
    
    all_content_html = "".join(content_elements)
    
    content_div = soup.find('div', class_='entry-content single-content')
    
    image_urls = []
    
    if content_div:
        images = content_div.find_all('img', class_=lambda x: x and x.startswith('wp'))

        image_urls = [img['src'] for img in images]

    
    return {
        'url': url,
        'title': title,
        'content': all_content_html,
        'images': image_urls
    }

recipes_content = []

recipe_count = 0

for url in recipe_urls:
    print(f"Scraping content from {url}")
    recipe_data = scrape_recipe(url)
    recipes_content.append(recipe_data)
    recipe_count += 1 

print(f"Total number of recipes scraped: {recipe_count}")

json_content = json.dumps(recipes_content, indent=4, ensure_ascii=False)

with open('anninuunissa.json', 'w', encoding='utf-8') as f:
    f.write(json_content)
