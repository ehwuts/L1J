<?php
die('This file is used to fetch data upon deployment or a game update. As such it spends most of its time disabled by this line.');

$key = "";

$champs = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion?champData=passive,spells,stats&api_key='.$key;
$masteries = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/mastery?masteryListData=all&api_key='.$key;
$runes = 'https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/rune?runeListData=stats&api_key='.$key;
?>