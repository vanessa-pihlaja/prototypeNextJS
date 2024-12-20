import requests
from bs4 import BeautifulSoup
import json

recipe_urls = [
"https://ottolenghi.co.uk/recipes/apricot-and-pecan-stuffing-with-green-sauce",
"https://ottolenghi.co.uk/recipes/marinated-mushrooms-with-walnut-and-tahini-yogurt",
"https://ottolenghi.co.uk/recipes/chocolate-raspberry-tart",
"https://ottolenghi.co.uk/recipes/chicken-thighs-with-barberries-and-feta",
"https://ottolenghi.co.uk/recipes/sumac-marinated-baby-chickens-stuffed-with-bulgar-lamb",
"https://ottolenghi.co.uk/recipes/chicken-meatballs-with-preserved-lemon-and-harissa-relish",
"https://ottolenghi.co.uk/recipes/potato-and-gochujang-braised-eggs",
"https://ottolenghi.co.uk/recipes/baked-blue-cheese-cake-with-pickled-beetroot-and-honey",
"https://ottolenghi.co.uk/recipes/buckwheat-and-rice-salad-with-dried-cherries-and-hazelnuts",
"https://ottolenghi.co.uk/recipes/french-beans-with-shiitake-mushrooms-nutmeg",
"https://ottolenghi.co.uk/recipes/roasted-sweet-potato-with-pecan-and-maple-method",
"https://ottolenghi.co.uk/recipes/tomatoes-and-red-rice-with-burrata",
"https://ottolenghi.co.uk/recipes/membrillo-and-stilton-quiche",
"https://ottolenghi.co.uk/recipes/char-grilled-squid-with-chana-dal-and-preserved-lemon",
"https://ottolenghi.co.uk/recipes/tenderstem-broccoli-with-peanut-gochujang-dressing",
"https://ottolenghi.co.uk/recipes/muhammara",
"https://ottolenghi.co.uk/recipes/cumin-lamb-skewers",
"https://ottolenghi.co.uk/recipes/labneh-with-olives-pistachios-and-oregano",
"https://ottolenghi.co.uk/recipes/sagnarelli-with-wild-broad-beans-and-lemon",
"https://ottolenghi.co.uk/recipes/skillet-blintzes-with-lemon-mascarpone-and-thyme",
"https://ottolenghi.co.uk/recipes/yoghurt-and-orange-semifreddo-with-cherries-and-amaretti",
"https://ottolenghi.co.uk/recipes/dark-chocolate-mousse-with-baileys-mascarpone-cream",
"https://ottolenghi.co.uk/recipes/paella-with-soller-prawns-and-grilled-vegetables",
"https://ottolenghi.co.uk/recipes/spicy-turnip",
"https://ottolenghi.co.uk/recipes/baked-mint-rice-with-pomegranate-and-olive-salsa",
"https://ottolenghi.co.uk/recipes/beef-beetroot-and-habanero-stew",
"https://ottolenghi.co.uk/recipes/blackberry-and-star-anise-friands",
"https://ottolenghi.co.uk/recipes/kohlrabi-apple-and-beetroot-salad",
"https://ottolenghi.co.uk/recipes/lamb-siniyah",
"https://ottolenghi.co.uk/recipes/lamb-shoulder-with-broad-beans-and-herbs",
"https://ottolenghi.co.uk/recipes/potato-spirals-with-tomato-salsa-and-creme-fraiche",
"https://ottolenghi.co.uk/recipes/ginger-egg-fried-rice",
"https://ottolenghi.co.uk/recipes/chicory-boats-with-feta-walnut-and-pomegranate",
"https://ottolenghi.co.uk/recipes/blackened-sea-bass-with-scotch-bonnet-sauce",
"https://ottolenghi.co.uk/recipes/bbq-lamb-tacos-with-pineapple-pickle-and-chutney",
"https://ottolenghi.co.uk/recipes/butternut-squash-with-orange-oil-and-burnt-honey",
"https://ottolenghi.co.uk/recipes/crab-on-toast-with-lime-cumin-and-pickled-samphire",
"https://ottolenghi.co.uk/recipes/aubergine-kuku",
"https://ottolenghi.co.uk/recipes/sweet-potato-shakshuka-with-sriracha-butter-and-pickled-onions-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/chilled-red-pepper-soup",
"https://ottolenghi.co.uk/recipes/pastis-gascon",
"https://ottolenghi.co.uk/recipes/curried-carrot-mash-with-brown-butter-and-quick-pickled-chillies",
"https://ottolenghi.co.uk/recipes/grilled-sweet-potatoes-with-hot-sauce-butter-chive-soured-cream-and-pumpkin-seeds",
"https://ottolenghi.co.uk/recipes/baked-dakos-with-spiced-chickpeas-tomato-and-feta",
"https://ottolenghi.co.uk/recipes/french-beans-and-mangetout-with-hazelnut-and-orange-full",
"https://ottolenghi.co.uk/recipes/pulled-pork-sandwich-with-pomegranate-salad",
"https://ottolenghi.co.uk/recipes/crispy-cumin-lamb-with-aubergine-and-ginger",
"https://ottolenghi.co.uk/recipes/sticky-pomegranate-and-pistachio-pigs-in-blankets",
"https://ottolenghi.co.uk/recipes/iranian-vegetable-stew-with-dried-lime",
"https://ottolenghi.co.uk/recipes/fig-and-goat-s-cheese-tart",
"https://ottolenghi.co.uk/recipes/vegetable-makloubeh",
"https://ottolenghi.co.uk/recipes/aubergine-curry",
"https://ottolenghi.co.uk/recipes/strawberry-and-rose-mess",
"https://ottolenghi.co.uk/recipes/crispy-roast-potatoes-with-rosemary-and-zaatar-and-salsa-verde",
"https://ottolenghi.co.uk/recipes/buckwheat-and-ricotta-hotcakes-with-preserved-lemon-salsa",
"https://ottolenghi.co.uk/recipes/mashed-purple-sweet-potatoes-with-lime-and-yoghurt",
"https://ottolenghi.co.uk/recipes/cucumber-crunch-salad-with-curried-cashews",
"https://ottolenghi.co.uk/recipes/baked-chocolate-truffle-with-pernod-figs",
"https://ottolenghi.co.uk/recipes/one-basic-meringue-roulade-brown-sugar-meringue-roulade-with-burnt-honey-apples",
"https://ottolenghi.co.uk/recipes/ginataang-kalabasa-with-ginger-and-prawn-oil",
"https://ottolenghi.co.uk/recipes/carrots-and-leeks-turkish-style",
"https://ottolenghi.co.uk/recipes/chocolate-banana-and-pecan-cookies",
"https://ottolenghi.co.uk/recipes/tomato-and-pomegranate-salad",
"https://ottolenghi.co.uk/recipes/roasted-sweet-potato-tomato-sauce-and-feta-otk",
"https://ottolenghi.co.uk/recipes/roasted-goose-with-quince-cranberries-maple-gravy",
"https://ottolenghi.co.uk/recipes/lemon-and-raspberry-bars",
"https://ottolenghi.co.uk/recipes/sweet-and-spicy-beef-and-pork-pie-method",
"https://ottolenghi.co.uk/recipes/potato-and-asparagus-salad-with-black-garlic-and-dukkah",
"https://ottolenghi.co.uk/recipes/saffron-rice-with-barberries-pistachio-and-mixed-herbs",
"https://ottolenghi.co.uk/recipes/turkey-and-sweetcorn-meatballs-with-roasted-pepper-sauce-method",
"https://ottolenghi.co.uk/recipes/zaatar-salmon-and-tahini-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/brunsli-chocolate-cookies",
"https://ottolenghi.co.uk/recipes/hot-charred-cherry-tomatoes-with-cold-yoghurt",
"https://ottolenghi.co.uk/recipes/brussels-sprouts-with-burnt-butter-and-black-garlic",
"https://ottolenghi.co.uk/recipes/chermoula-marinated-sea-bass-stuffed-with-olives-preserved-lemon",
"https://ottolenghi.co.uk/recipes/deep-fried-stuffed-green-olives",
"https://ottolenghi.co.uk/recipes/braised-eggs-with-beef-smoked-aubergine-and-tomato",
"https://ottolenghi.co.uk/recipes/braised-lamb-with-maftoul-and-chickpeas",
"https://ottolenghi.co.uk/recipes/roast-butternut-squash-and-red-onion-with-tahini-and-za-atar",
"https://ottolenghi.co.uk/recipes/sweetcorn-polenta",
"https://ottolenghi.co.uk/recipes/beetroot-with-green-miso-dressing-and-nori-almonds",
"https://ottolenghi.co.uk/recipes/pecan-and-gingernut-chocolate-salami",
"https://ottolenghi.co.uk/recipes/cauliflower-steaks-with-zahter",
"https://ottolenghi.co.uk/recipes/spicy-nuts",
"https://ottolenghi.co.uk/recipes/pappardelle-with-rose-harissa-black-olives-and-capers",
"https://ottolenghi.co.uk/recipes/asparagus-with-mushrooms-and-poached-egg",
"https://ottolenghi.co.uk/recipes/charred-brussel-sprouts-with-olive-oil-and-lemon",
"https://ottolenghi.co.uk/recipes/adjaruli-khachapuri-with-aleppo-chilli-and-spring-onion-butter",
"https://ottolenghi.co.uk/recipes/tahini-and-halva-brownies",
"https://ottolenghi.co.uk/recipes/date-stuffed-whole-mackerel",
"https://ottolenghi.co.uk/recipes/caramelised-white-chocolate-and-macadamia-cookies",
"https://ottolenghi.co.uk/recipes/dakos-reveg0010013",
"https://ottolenghi.co.uk/recipes/crab-and-radish-bruschetta-with-radish-cress",
"https://ottolenghi.co.uk/recipes/middle-eastern-millionaire-s-shortbread",
"https://ottolenghi.co.uk/recipes/lahmacun-turkish-pizza-with-spicy-minced-beef-and-salad-topping",
"https://ottolenghi.co.uk/recipes/sweet-spiced-fishcakes-with-bread-salad",
"https://ottolenghi.co.uk/recipes/veal-olive-and-pancetta-stew-with-roasted-red-pepper",
"https://ottolenghi.co.uk/recipes/tangerine-doughnuts",
"https://ottolenghi.co.uk/recipes/green-chilli-con-carne-with-warm-cornbread",
"https://ottolenghi.co.uk/recipes/roasted-and-raw-courgettes-with-tomato-salsa-and-labneh",
"https://ottolenghi.co.uk/recipes/cauliflower-salad-with-miso-dressing-and-pistachio-pesto",
"https://ottolenghi.co.uk/recipes/magical-chicken-and-parmesan-soup-with-pappardelle-otk",
"https://ottolenghi.co.uk/recipes/roasted-cod-with-a-coriander-crust-falastin-pg-204",
"https://ottolenghi.co.uk/recipes/bittersweet-salad",
"https://ottolenghi.co.uk/recipes/pea-and-leek-soup-with-basil-oil",
"https://ottolenghi.co.uk/recipes/ultimate-winter-couscous",
"https://ottolenghi.co.uk/recipes/chunky-minestrone-with-basil-paste-and-pecorino",
"https://ottolenghi.co.uk/recipes/fattoush",
"https://ottolenghi.co.uk/recipes/carrot-and-walnut-cake-method",
"https://ottolenghi.co.uk/recipes/set-cheesecake-with-greengage-compote",
"https://ottolenghi.co.uk/recipes/prawn-tamarind-and-herb-stew",
"https://ottolenghi.co.uk/recipes/spicy-mushroom-lasagne-flavour-pg-228",
"https://ottolenghi.co.uk/recipes/roast-sweet-potatoes-with-pickled-onions-coriander-and-goat-s-cheese",
"https://ottolenghi.co.uk/recipes/strawberry-and-harissa-ketchup",
"https://ottolenghi.co.uk/recipes/yoghurt-cream-with-sticky-apricots-and-filo-wafer",
"https://ottolenghi.co.uk/recipes/spring-roast-chicken-with-preserved-lemon",
"https://ottolenghi.co.uk/recipes/fish-and-prawn-pirao",
"https://ottolenghi.co.uk/recipes/char-grilled-sprouting-broccoli-with-sweet-tahini",
"https://ottolenghi.co.uk/recipes/crispy-cheese-and-mustard-cauliflower-bites",
"https://ottolenghi.co.uk/recipes/shakshuka",
"https://ottolenghi.co.uk/recipes/marinated-turkey-breast-with-cumin-coriander-and-white-wine-method",
"https://ottolenghi.co.uk/recipes/spiced-apple-butter",
"https://ottolenghi.co.uk/recipes/twice-baked-feta-stuffed-potatoes-with-za-atar-pesto-otk",
"https://ottolenghi.co.uk/recipes/freekeh-pilaf",
"https://ottolenghi.co.uk/recipes/hot-yoghurt-and-broad-bean-soup",
"https://ottolenghi.co.uk/recipes/plum-blackberry-and-bay-friand-bake",
"https://ottolenghi.co.uk/recipes/spicy-chicken-and-cabbage-soup",
"https://ottolenghi.co.uk/recipes/mascarpone-cherry-and-grappa-trifle",
"https://ottolenghi.co.uk/recipes/rosti-with-cream-cheese-dill-pickle-and-everything-seasoning",
"https://ottolenghi.co.uk/recipes/rigatoni-with-fennel-sausage-sauce-and-pecorino-and-anchovy-pesto",
"https://ottolenghi.co.uk/recipes/pork-belly-banh-mi",
"https://ottolenghi.co.uk/recipes/grilled-sweetcorn-slaw",
"https://ottolenghi.co.uk/recipes/devilled-eggs-with-tangerine-rayu",
"https://ottolenghi.co.uk/recipes/grilled-pollack-with-cavolo-nero-and-buckwheat-polenta",
"https://ottolenghi.co.uk/recipes/seared-beef-with-cucumber-and-seaweed",
"https://ottolenghi.co.uk/recipes/lamb-tomato-and-sweet-spices",
"https://ottolenghi.co.uk/recipes/giant-couscous-with-golden-raisins-lemon-and-almonds",
"https://ottolenghi.co.uk/recipes/grilled-salmon-with-pine-nut-salsa",
"https://ottolenghi.co.uk/recipes/southern-fried-chicken",
"https://ottolenghi.co.uk/recipes/coconut-rice-with-peanut-crunch",
"https://ottolenghi.co.uk/recipes/pan-fried-tomatoes-with-cucumber-salsa",
"https://ottolenghi.co.uk/recipes/quails-with-burnt-miso-butterscotch-and-pomegranate-and-walnut-salsa",
"https://ottolenghi.co.uk/recipes/braised-artichokes-with-freekeh-grains-and-herbs",
"https://ottolenghi.co.uk/recipes/kale-tahini-caesar-with-zaatar-chickpeas-and-roasted-grapes",
"https://ottolenghi.co.uk/recipes/confit-and-grilled-parsnips-with-herbs-and-vinegar",
"https://ottolenghi.co.uk/recipes/butter-bean-puree-with-dukkah",
"https://ottolenghi.co.uk/recipes/roasted-chicken-legs-with-dates-olives-and-capers",
"https://ottolenghi.co.uk/recipes/dorayaki-with-coffee-cream-and-tahini-chocolate-sauce",
"https://ottolenghi.co.uk/recipes/baby-gem-lettuce-with-burnt-aubergine-yoghurt-smacked-cucumber-and-shatta-falastin-pg-96",
"https://ottolenghi.co.uk/recipes/black-rice-with-mango-and-coconut-cream",
"https://ottolenghi.co.uk/recipes/pierogi",
"https://ottolenghi.co.uk/recipes/sundal",
"https://ottolenghi.co.uk/recipes/walnut-and-halva-cake",
"https://ottolenghi.co.uk/recipes/pointed-cabbage-with-nam-prik",
"https://ottolenghi.co.uk/recipes/baked-polenta-with-feta-bechamel-and-zaatar-tomatoes",
"https://ottolenghi.co.uk/recipes/coconut-greens-with-scotch-bonnet-and-jammy-eggs",
"https://ottolenghi.co.uk/recipes/roast-cauliflower-with-yoghurt-and-spicy-red-pepper-sauce",
"https://ottolenghi.co.uk/recipes/ricotta-tart",
"https://ottolenghi.co.uk/recipes/clementine-almond-syrup-cake",
"https://ottolenghi.co.uk/recipes/puy-lentil-and-aubergine-stew",
"https://ottolenghi.co.uk/recipes/super-soft-courgettes-with-harissa-and-lemon-flavour-pg-204",
"https://ottolenghi.co.uk/recipes/roasted-aubergine-with-saffron-yoghurt",
"https://ottolenghi.co.uk/recipes/red-rice-with-mushrooms-and-cavolo-nero",
"https://ottolenghi.co.uk/recipes/roasted-chicken-with-clementines-arak",
"https://ottolenghi.co.uk/recipes/caramelised-fig-orange-and-goat-s-cheese-salad",
"https://ottolenghi.co.uk/recipes/roasted-figs-with-pomegranate-molasses-and-orange-zest",
"https://ottolenghi.co.uk/recipes/braised-fennel-with-capers-and-olives",
"https://ottolenghi.co.uk/recipes/grilled-apricot-honey-and-goats-cheese-dip",
"https://ottolenghi.co.uk/recipes/sumac-and-mint-rubbed-rabbit-saddle-with-seared-radicchio",
"https://ottolenghi.co.uk/recipes/sambal-udang-and-petai-prawn-and-petai-sambal",
"https://ottolenghi.co.uk/recipes/spring-salad",
"https://ottolenghi.co.uk/recipes/chickpea-tomato-and-bread-soup",
"https://ottolenghi.co.uk/recipes/roast-peaches-with-makrut-lime-sabayon-and-raspberries",
"https://ottolenghi.co.uk/recipes/grilled-corn-on-the-cob-with-miso-mayonnaise",
"https://ottolenghi.co.uk/recipes/schupfnudeln-with-browned-butter-and-poppy-seeds",
"https://ottolenghi.co.uk/recipes/aubergine-with-black-garlic",
"https://ottolenghi.co.uk/recipes/cold-yoghurt-soup",
"https://ottolenghi.co.uk/recipes/asparagus-with-capers-and-egg",
"https://ottolenghi.co.uk/recipes/roasted-potatoes-with-caramel-agen-prunes",
"https://ottolenghi.co.uk/recipes/caramelised-onion-orecchiette-with-hazelnuts-and-sage",
"https://ottolenghi.co.uk/recipes/fried-rice-cakes-with-creamed-leeks-and-egg",
"https://ottolenghi.co.uk/recipes/whole-black-bream-with-pine-nuts-and-lemon",
"https://ottolenghi.co.uk/recipes/saffron-pasta-with-chipotle-shallots-and-pickled-chillies",
"https://ottolenghi.co.uk/recipes/swiss-chard-galette-with-dolcelatte-and-sumac",
"https://ottolenghi.co.uk/recipes/stuffed-vine-leaves-with-liver-and-apple",
"https://ottolenghi.co.uk/recipes/confit-tandoori-chickpeas",
"https://ottolenghi.co.uk/recipes/parmigiana-pie-with-tomato-sauce",
"https://ottolenghi.co.uk/recipes/butternut-squash-leek-and-zaatar-pie",
"https://ottolenghi.co.uk/recipes/coccoli",
"https://ottolenghi.co.uk/recipes/chicken-musakhan",
"https://ottolenghi.co.uk/recipes/spatchcock-roasted-turkey-with-chilli-and-curry-leaf-butter",
"https://ottolenghi.co.uk/recipes/chicken-with-potatoes-prunes-and-pomegranate-molasses",
"https://ottolenghi.co.uk/recipes/roasted-brussel-sprouts-with-cinnamon-butter-yoghurt-and-chestnuts",
"https://ottolenghi.co.uk/recipes/polenta-crisps-with-avocado-and-yoghurt",
"https://ottolenghi.co.uk/recipes/sweet-summer-salad",
"https://ottolenghi.co.uk/recipes/tomatoes-with-sumac-onions-and-pine-nuts",
"https://ottolenghi.co.uk/recipes/baked-feta-and-dill-frittata",
"https://ottolenghi.co.uk/recipes/strawberry-tiramisu-cake",
"https://ottolenghi.co.uk/recipes/asparagus-vichyssoise-soup",
"https://ottolenghi.co.uk/recipes/sweet-and-salty-cheesecake-with-cherries-and-crumble",
"https://ottolenghi.co.uk/recipes/sweet-and-smoky-mexican-chicken",
"https://ottolenghi.co.uk/recipes/couscous-with-grilled-cherry-tomatoes-and-fresh-herbs",
"https://ottolenghi.co.uk/recipes/pork-tenderloin-with-caramelised-garlic-and-orange-salsa",
"https://ottolenghi.co.uk/recipes/courgette-chickpea-and-herb-pancakes",
"https://ottolenghi.co.uk/recipes/smacked-cucumber-salad-with-sumac-onions-and-radishes",
"https://ottolenghi.co.uk/recipes/louise-cake-with-plum-and-coconut",
"https://ottolenghi.co.uk/recipes/kimchi-and-gruyere-rice-fritters",
"https://ottolenghi.co.uk/recipes/butternut-squash-in-cheesy-custard-with-orange-rayu",
"https://ottolenghi.co.uk/recipes/plum-and-rhubarb-cobbler-with-star-anise-vanilla",
"https://ottolenghi.co.uk/recipes/roasted-fish-with-aromatic-olive-oil",
"https://ottolenghi.co.uk/recipes/corn-grilled-in-its-husk-with-creamy-pecorino-dressing",
"https://ottolenghi.co.uk/recipes/legume-noodle-soup",
"https://ottolenghi.co.uk/recipes/date-and-oat-soda-bread-with-salted-date-butter",
"https://ottolenghi.co.uk/recipes/smoked-haddock-and-oyster-quiches",
"https://ottolenghi.co.uk/recipes/burrata-with-chargrilled-grapes-and-basil",
"https://ottolenghi.co.uk/recipes/curried-egg-and-cauliflower-salad",
"https://ottolenghi.co.uk/recipes/fried-seafood-cocktail-with-marie-rose-sauce",
"https://ottolenghi.co.uk/recipes/egg-rougaille",
"https://ottolenghi.co.uk/recipes/braised-eggs-with-leek-and-za-atar",
"https://ottolenghi.co.uk/recipes/marinated-raw-courgettes-with-nasturtium-pesto-and-ricotta",
"https://ottolenghi.co.uk/recipes/irish-stew",
"https://ottolenghi.co.uk/recipes/baked-seafood-with-tomatoes-and-turkish-cheese",
"https://ottolenghi.co.uk/recipes/pear-and-macadamia-crumble-with-chocolate-sauce",
"https://ottolenghi.co.uk/recipes/harissa-and-gruyere-gratin",
"https://ottolenghi.co.uk/recipes/potato-slab-pie-with-salsa-verde",
"https://ottolenghi.co.uk/recipes/crushed-puy-lentils-with-tahini-and-cumin",
"https://ottolenghi.co.uk/recipes/watermelon-and-feta-salad-with-marinated-olives-and-preserved-lemon",
"https://ottolenghi.co.uk/recipes/tangerine-and-ancho-chilli-flan",
"https://ottolenghi.co.uk/recipes/kale-and-herb-dumplings-in-broth",
"https://ottolenghi.co.uk/recipes/courgette-and-chickpea-meatballs-in-spicy-tomato-sauce",
"https://ottolenghi.co.uk/recipes/danish-rice-pudding-risalamande-with-salted-almond-brittle-and-sour-sumac-cherries",
"https://ottolenghi.co.uk/recipes/smoked-aubergine-yogurt-vol-au-vents",
"https://ottolenghi.co.uk/recipes/roast-vegetable-tart",
"https://ottolenghi.co.uk/recipes/raw-root-vegetables",
"https://ottolenghi.co.uk/recipes/slow-cooked-hake-in-cascabel-oil-with-corn-tortillas",
"https://ottolenghi.co.uk/recipes/grilled-red-mullet-with-lemon-and-celery-salad",
"https://ottolenghi.co.uk/recipes/torta-pasqualina",
"https://ottolenghi.co.uk/recipes/nepalese-potato-salad",
"https://ottolenghi.co.uk/recipes/pineapple-and-sage-martini",
"https://ottolenghi.co.uk/recipes/mee-goreng",
"https://ottolenghi.co.uk/recipes/pan-fried-brussels-sprouts-and-shallots-with-pomegranate-purple-basil",
"https://ottolenghi.co.uk/recipes/pull-apart-scones-with-zaatar-and-feta",
"https://ottolenghi.co.uk/recipes/miso-and-peanut-butter-chickpea-salad",
"https://ottolenghi.co.uk/recipes/coronation-quiche",
"https://ottolenghi.co.uk/recipes/purple-sprouting-broccoli-with-rice-noodles",
"https://ottolenghi.co.uk/recipes/charred-peas-with-lemon-and-parmesan-dressing",
"https://ottolenghi.co.uk/recipes/gondi",
"https://ottolenghi.co.uk/recipes/funky-faloodeh",
"https://ottolenghi.co.uk/recipes/jersey-royals-samphire-and-buttered-radishes",
"https://ottolenghi.co.uk/recipes/chaat-masala-potatoes-with-yoghurt-and-tamarind-flavour-pg-193",
"https://ottolenghi.co.uk/recipes/mackerel-and-green-bean-salad-with-harissa-dressing",
"https://ottolenghi.co.uk/recipes/pecan-and-coconut-granola-with-roasted-rhubarb-and-blackcurrants",
"https://ottolenghi.co.uk/recipes/pancakes-with-maple-brown-butter-apples-and-sesame-praline",
"https://ottolenghi.co.uk/recipes/fig-yogurt-and-almond-cake-with-or-without-extra-figs",
"https://ottolenghi.co.uk/recipes/pear-and-fennel-salad-with-caraway-and-pecorino",
"https://ottolenghi.co.uk/recipes/curried-cauliflower-cheese-filo-pie-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/apricot-and-almond-ensaimada",
"https://ottolenghi.co.uk/recipes/baba-ganoush",
"https://ottolenghi.co.uk/recipes/coffee-and-chilli-rubbed-chicken-koftas-with-grilled-onions",
"https://ottolenghi.co.uk/recipes/sweet-and-sour-onion-petals-flavour-pg-245",
"https://ottolenghi.co.uk/recipes/squid-with-sweet-potato-and-lemon-salsa",
"https://ottolenghi.co.uk/recipes/chorizo-banana-and-prawn-cakes-with-harissa-yoghurt",
"https://ottolenghi.co.uk/recipes/roasted-pumpkin-wedges-with-chestnut-cinnamon-fresh-bay-leaves",
"https://ottolenghi.co.uk/recipes/corn-dogs",
"https://ottolenghi.co.uk/recipes/strained-ricotta-with-banana-fritters-and-maple-syrup",
"https://ottolenghi.co.uk/recipes/fried-tomatoes-with-goat-s-curd",
"https://ottolenghi.co.uk/recipes/tomatoes-with-wasabi-mascarpone-and-pine-nuts",
"https://ottolenghi.co.uk/recipes/chipotle-roasted-chicken-with-plum-and-tarragon-salad",
"https://ottolenghi.co.uk/recipes/harissa-spiced-mackerel-picnic-cake",
"https://ottolenghi.co.uk/recipes/celeriac-and-lentils-with-hazelnuts-and-mint",
"https://ottolenghi.co.uk/recipes/zaatar-cacio-e-pepe",
"https://ottolenghi.co.uk/recipes/steamed-aubergine-with-charred-chilli-salsa-flavour-pg-45",
"https://ottolenghi.co.uk/recipes/globe-artichoke-salad-with-preserved-lemon-mayonnaise",
"https://ottolenghi.co.uk/recipes/aubergine-with-miso-and-chinese-cabbage",
"https://ottolenghi.co.uk/recipes/cinnamon-rice-pudding-with-cherry-compote-and-pistachios",
"https://ottolenghi.co.uk/recipes/chestnut-and-caramelised-clementine-trifle-with-aleppo-and-orange-blossom",
"https://ottolenghi.co.uk/recipes/razor-clams-with-saffron-mayonnaise",
"https://ottolenghi.co.uk/recipes/hazelnut-roly-poly-with-lemon-custard",
"https://ottolenghi.co.uk/recipes/lamb-chops-with-pilpelchuma-butter-tahini-yoghurt-and-herb-salad",
"https://ottolenghi.co.uk/recipes/berry-platter-with-sheeps-labneh-and-orange-oil-flavour-pg-295",
"https://ottolenghi.co.uk/recipes/meringue-roulade-with-rose-morello-cherries",
"https://ottolenghi.co.uk/recipes/crusted-tofu-with-wakame-and-lime",
"https://ottolenghi.co.uk/recipes/amaretti",
"https://ottolenghi.co.uk/recipes/sweet-pastry-cigars-with-almond-and-cinnamon-filling",
"https://ottolenghi.co.uk/recipes/bruschetta-with-aubergine",
"https://ottolenghi.co.uk/recipes/burnt-aubergine-pickle-with-garlic-yoghurt",
"https://ottolenghi.co.uk/recipes/ricotta-hotcakes",
"https://ottolenghi.co.uk/recipes/iranian-herb-fritters",
"https://ottolenghi.co.uk/recipes/tomato-and-watermelon-gazpacho",
"https://ottolenghi.co.uk/recipes/almond-and-aniseed-nougat",
"https://ottolenghi.co.uk/recipes/baba-ganoush-burnt-aubergine-with-tahini",
"https://ottolenghi.co.uk/recipes/tomato-rhubarb-and-elderflower-salad",
"https://ottolenghi.co.uk/recipes/butternut-squash-and-fondue-pie-with-pickled-red-chillies",
"https://ottolenghi.co.uk/recipes/grilled-hispi-cabbage-with-coriander-garlic-chilli-and-lime-oil",
"https://ottolenghi.co.uk/recipes/noors-black-lime-tofu-flavour",
"https://ottolenghi.co.uk/recipes/avocado-and-broad-bean",
"https://ottolenghi.co.uk/recipes/roasted-cauliflower-and-burnt-aubergine-with-tomato-salsa-falastin-pg-110",
"https://ottolenghi.co.uk/recipes/sesame-crusted-feta-with-black-lime-honey-syrup-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/roasted-pork-belly",
"https://ottolenghi.co.uk/recipes/sumac-martini",
"https://ottolenghi.co.uk/recipes/olive-oil-flatbreads-with-three-garlic-butter",
"https://ottolenghi.co.uk/recipes/cheese-chorizo-and-spring-onion-pancakes",
"https://ottolenghi.co.uk/recipes/smoked-haddock-brandade-cakes-with-lime-yogurt",
"https://ottolenghi.co.uk/recipes/grilled-radicchio-and-kale-salad-with-orange-and-hazelnuts",
"https://ottolenghi.co.uk/recipes/blackened-chicken-with-caramel-and-clementine-dressing",
"https://ottolenghi.co.uk/recipes/pot-barley-orange-and-sesame-pudding",
"https://ottolenghi.co.uk/recipes/grilled-prawns-and-corn-with-tamarind-and-coriander-dressing",
"https://ottolenghi.co.uk/recipes/honey-and-apricot-trifle-with-walnuts-and-lavender",
"https://ottolenghi.co.uk/recipes/stuffed-romano-peppers-with-ricotta-and-mascarpone",
"https://ottolenghi.co.uk/recipes/labneh-cheesecake-with-roasted-apricots-honey-and-cardamom-falastin-pg-322",
"https://ottolenghi.co.uk/recipes/roast-turkey-with-ancho-chilli-gravy",
"https://ottolenghi.co.uk/recipes/vanilla-custard-with-roasted-strawberries-and-rhubarb",
"https://ottolenghi.co.uk/recipes/hot-smoked-trout-with-fennel-peas-and-goat-s-cheese",
"https://ottolenghi.co.uk/recipes/cinnamon-pavlova-praline-cream-and-fresh-figs",
"https://ottolenghi.co.uk/recipes/stuffed-aubergine-in-curry-and-coconut-dal-flavour-pg-152",
"https://ottolenghi.co.uk/recipes/bourbon-glazed-spare-ribs-with-smoked-corn-salad",
"https://ottolenghi.co.uk/recipes/lime-and-poppy-seed-slaw-with-curry-leaf-oil-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/tarragon-gondi",
"https://ottolenghi.co.uk/recipes/smoky-creamy-pasta-with-burnt-aubergine-and-tahini-otk",
"https://ottolenghi.co.uk/recipes/pumpkin-saffron-orange-soup-with-caramelised-pumpkin-seeds",
"https://ottolenghi.co.uk/recipes/salt-crusted-fish-with-mediterranean-salad",
"https://ottolenghi.co.uk/recipes/warm-mackeral-with-potato-and-wild-garlic",
"https://ottolenghi.co.uk/recipes/roasted-rhubarb-with-sweet-labneh",
"https://ottolenghi.co.uk/recipes/cheesy-curry-crepes",
"https://ottolenghi.co.uk/recipes/turkey-courgette-burgers-with-spring-onion-cumin-a",
"https://ottolenghi.co.uk/recipes/crispy-duck-with-rye-pancakes",
"https://ottolenghi.co.uk/recipes/figs-with-young-pecorino-and-honey-method",
"https://ottolenghi.co.uk/recipes/everything-cheesers",
"https://ottolenghi.co.uk/recipes/red-lentil-and-chard-soup",
"https://ottolenghi.co.uk/recipes/warm-vegan-spinach-and-artichoke-dip",
"https://ottolenghi.co.uk/recipes/candy-beetroot-with-lentils-and-yuzu",
"https://ottolenghi.co.uk/recipes/duck-with-rhubarb-jam-and-pickled-cucumber",
"https://ottolenghi.co.uk/recipes/watermelon-and-strawberry-granita",
"https://ottolenghi.co.uk/recipes/chickpeas-cacio-e-pepe",
"https://ottolenghi.co.uk/recipes/roast-red-pepper-dip-with-lemon-and-olive-salsa",
"https://ottolenghi.co.uk/recipes/chocolate-guinness-cakes-with-baileys-irish-cream",
"https://ottolenghi.co.uk/recipes/lamb-rump-with-vanilla-braised-chicory-and-sorrel-pesto",
"https://ottolenghi.co.uk/recipes/black-pepper-tofu-a",
"https://ottolenghi.co.uk/recipes/fried-goat-s-cheese-with-tomato-and-basil-salsa",
"https://ottolenghi.co.uk/recipes/celebration-rice-with-lamb-chicken-and-garlic-yoghurt-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/cured-gurnard-with-camomile-and-cucumber-water",
"https://ottolenghi.co.uk/recipes/gigli-with-chickpeas-and-zaatar-simple",
"https://ottolenghi.co.uk/recipes/chicken-shawarma-sandwiches",
"https://ottolenghi.co.uk/recipes/side-of-greens-with-crispy-garlic",
"https://ottolenghi.co.uk/recipes/peach-rosemary-and-lime-galette",
"https://ottolenghi.co.uk/recipes/beef-shin-cooked-in-pomegranate-and-beetroot-juice",
"https://ottolenghi.co.uk/recipes/pork-and-prawn-scotch-eggs",
"https://ottolenghi.co.uk/recipes/baked-ricotta-with-figs-and-lavender-honey",
"https://ottolenghi.co.uk/recipes/pork-souvlaki-with-cucumber-salad-and-tzatziki",
"https://ottolenghi.co.uk/recipes/halva-ice-cream-with-chocolate-sauce-and-salted-peanuts",
"https://ottolenghi.co.uk/recipes/double-lemon-chicken-with-cheats-preserved-lemon",
"https://ottolenghi.co.uk/recipes/grilled-peaches-apricots-and-figs-with-scented-yoghurt",
"https://ottolenghi.co.uk/recipes/prawn-cucumber-and-scotch-bonnet-buns",
"https://ottolenghi.co.uk/recipes/riced-potatoes-with-anchovy-butter",
"https://ottolenghi.co.uk/recipes/chicken-pastilla",
"https://ottolenghi.co.uk/recipes/portobello-mushroom-tarts-with-pine-nut-and-parsley-salsa",
"https://ottolenghi.co.uk/recipes/harissa-marinated-beef-sirloin-with-preserved-lemon-sauce",
"https://ottolenghi.co.uk/recipes/lamb-arancini",
"https://ottolenghi.co.uk/recipes/machboos-rubyan",
"https://ottolenghi.co.uk/recipes/oven-chips-with-cardamom-mayonnaise",
"https://ottolenghi.co.uk/recipes/cauliflower-pomegranate-and-pistachio-salad",
"https://ottolenghi.co.uk/recipes/grilled-carrots-and-tofu-with-harissa",
"https://ottolenghi.co.uk/recipes/upside-down-lemon-maple-and-vanilla-pudding-with-lemon-maple-butter-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/hummus-with-grilled-quail-pomegranate-molasses-and-parsley-salsa",
"https://ottolenghi.co.uk/recipes/sweet-tahini-rolls",
"https://ottolenghi.co.uk/recipes/sweetcorn-soup-with-chipotle-and-lime",
"https://ottolenghi.co.uk/recipes/laxpudding",
"https://ottolenghi.co.uk/recipes/saffron-chicken-and-herb-salad",
"https://ottolenghi.co.uk/recipes/fish-koftas-with-beetroot-relish",
"https://ottolenghi.co.uk/recipes/passion-fruit-mango-and-creme-fraiche-soleros",
"https://ottolenghi.co.uk/recipes/seaweed-ginger-and-carrot-salad",
"https://ottolenghi.co.uk/recipes/victoria-sponge-with-strawberries-and-white-chocolate-cream",
"https://ottolenghi.co.uk/recipes/tamarind-and-tomato-braised-chickpeas",
"https://ottolenghi.co.uk/recipes/green-herb-salad",
"https://ottolenghi.co.uk/recipes/baby-aubergines-in-tomato-sauce-with-anchovy-and-dill-yoghurt",
"https://ottolenghi.co.uk/recipes/swiss-chard-and-herb-tart-with-young-cheese",
"https://ottolenghi.co.uk/recipes/roast-parsnips-and-jerusalem-artichokes-with-cavolo-nero-and-stilton",
"https://ottolenghi.co.uk/recipes/hummus-recipe",
"https://ottolenghi.co.uk/recipes/roasted-pork-belly-with-crushed-butternut-squash-and-apple-and-walnut-salsa",
"https://ottolenghi.co.uk/recipes/corn-cakes-with-beetroot-and-apple-salad",
"https://ottolenghi.co.uk/recipes/butternut-squash-with-ginger-tomatoes-and-lime-yoghurt",
"https://ottolenghi.co.uk/recipes/grilled-courgettes-with-warm-yoghurt-and-saffron-butter-otk-shelf-love",
"https://ottolenghi.co.uk/recipes/wakame-and-baby-cucumber-with-shallot-and-coriander-seed-crisp",
"https://ottolenghi.co.uk/recipes/baked-chocolate-ganache-with-spicy-hazelnuts-and-orange-oil",
"https://ottolenghi.co.uk/recipes/seriously-zesty-bread-salad",
"https://ottolenghi.co.uk/recipes/apple-butter-galette",
"https://ottolenghi.co.uk/recipes/barbecue-beef-short-ribs-with-black-garlic-and-urfa-chilli",
"https://ottolenghi.co.uk/recipes/gingerbread-house",
"https://ottolenghi.co.uk/recipes/butterbean-hummus-with-red-pepper-and-walnut-paste",
"https://ottolenghi.co.uk/recipes/turmeric-fried-eggs-with-tamarind-dressing",
"https://ottolenghi.co.uk/recipes/roasted-pork-belly-with-orange-star-anise",
"https://ottolenghi.co.uk/recipes/celebration-tah-chin-with-chicken-and-spinach",
"https://ottolenghi.co.uk/recipes/roast-cassava-with-roast-garlic-and-coriander-salsa",
"https://ottolenghi.co.uk/recipes/farro-and-roasted-red-pepper-salad",
"https://ottolenghi.co.uk/recipes/spiced-praline-meringues",
"https://ottolenghi.co.uk/recipes/mont-blanc-tarts",
"https://ottolenghi.co.uk/recipes/mushroom-and-herb-polenta",
"https://ottolenghi.co.uk/recipes/chayas-dal-pita-with-grilled-tomato-salsa",
"https://ottolenghi.co.uk/recipes/confit-leeks-with-puy-lentils-and-leek-cream",
"https://ottolenghi.co.uk/recipes/swede-gnocchi-with-miso-butter",
"https://ottolenghi.co.uk/recipes/gnudi-with-chilli-and-crisp-lemon-skin",
"https://ottolenghi.co.uk/recipes/sea-bass-and-turmeric-potatoes-in-rasam-broth",
"https://ottolenghi.co.uk/recipes/slow-cooked-chicken-with-a-crisp-corn-crust",
"https://ottolenghi.co.uk/recipes/browned-butter-and-lime-rice-pudding",
"https://ottolenghi.co.uk/recipes/lobster-fennel-and-grape-salad",
"https://ottolenghi.co.uk/recipes/smokey-sweetcorn-and-tofu-fritters",
"https://ottolenghi.co.uk/recipes/roasted-and-pickled-celeriac-with-sweet-chilli-dressing-flavour-pg-55",
"https://ottolenghi.co.uk/recipes/roast-potatoes-with-green-sauce-and-tahini",
"https://ottolenghi.co.uk/recipes/cauliflower-soup-with-mustard-croutons",
"https://ottolenghi.co.uk/recipes/sticky-miso-banans",
"https://ottolenghi.co.uk/recipes/preserved-lemons",
"https://ottolenghi.co.uk/recipes/roasted-lemon-and-fregola-salad",
"https://ottolenghi.co.uk/recipes/portobello-steaks-and-butter-bean-mash-flavour-pg-210",
"https://ottolenghi.co.uk/recipes/belinda-s-flourless-coconut-and-chocolate-cake",
"https://ottolenghi.co.uk/recipes/grilled-courgettes-with-cascabel-honey",
"https://ottolenghi.co.uk/recipes/champagne-and-saffron-jelly-with-cardamom-shortbread",
"https://ottolenghi.co.uk/recipes/pumpkin-spice-snickerdoodles",
"https://ottolenghi.co.uk/recipes/raspberry-halva-crumble-bars-with-sumac-and-rose",
"https://ottolenghi.co.uk/recipes/roasted-aubergine-with-curried-yoghurt",
"https://ottolenghi.co.uk/recipes/lemon-and-labneh-mascarpone-layer-cake",
"https://ottolenghi.co.uk/recipes/preserved-lemon-chicken",
"https://ottolenghi.co.uk/recipes/seared-duck-breast-with-blood-orange-and-star-anise",
"https://ottolenghi.co.uk/recipes/asparagus-with-labneh-brown-butter-and-burnt-lemon",
"https://ottolenghi.co.uk/recipes/chermoula-basted-halibut-with-farro",
]


def scrape_recipe(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    title_tag = soup.find('h1', class_='ct-field ct-field-field post-title')
    title = title_tag.get_text(strip=True) if title_tag else 'No Title Found'
    
    content_elements = soup.find_all(class_=["cooking-ingredients", "cooking-method"])
    all_content_text = "\n\n".join(element.get_text(separator='\n', strip=True) for element in content_elements)

    image_div = soup.find('div', class_='ct-field ct-field-image')
    image_urls = image_div.find('a')['href'] if image_div else None
    
    return {
        'url': url,
        'title': title,
        'content': all_content_text.strip(),
        'images': image_urls
    }

recipes_content = []

for url in recipe_urls:
    print(f"Scraping content from {url}")
    recipe_data = scrape_recipe(url)
    recipes_content.append(recipe_data)

json_content = json.dumps(recipes_content, indent=4, ensure_ascii=False)
with open('ottolenghi.json', 'w', encoding='utf-8') as f:
    f.write(json_content)
