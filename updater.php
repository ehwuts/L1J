<?php
die('This file is used to fetch data upon deployment or a game update. As such it spends most of its time disabled by this line.');

$key = "";

//var champions = 
$champs = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion?champData=partype,passive,spells,stats&api_key='.$key;
// var masteries_data =
$masteries = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/mastery?masteryListData=all&api_key='.$key;
// var runes =
$runes = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/rune?runeListData=stats,tags&api_key='.$key;
// var items =
$items = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/item?itemListData=all&api_key='.$key;
?>