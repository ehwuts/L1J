start_loc=$PWD

cd $(dirname $0)

api_key=`cat api_key.txt`

champions_url="https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion?champData=partype,passive,spells,stats&api_key="
runes_url="https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/rune?runeListData=stats,tags&api_key="
masteries_url="https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/mastery?masteryListData=all&api_key="
items_url="https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/item?itemListData=all&api_key="

wget "$champions_url$api_key" > tmp/champions.txt
wget "$runes_url$api_key" > tmp/runes.txt
wget "$masteries_url$api_key" > tmp/masteries.txt
wget "$items_url$api_key" > tmp/items.txt

echo "var champions = " | cat - tmp/champions.txt > materials/champions.js
echo "var runes = " | cat - tmp/runes.txt > materials/runes.js
echo "var masteries_data = " | cat - tmp/masteries.txt > materials/masteries.js
echo "var items = " | cat - tmp/items.txt > materials/items.js



cd $start_loc