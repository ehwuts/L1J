var queryDict = {};

var stats;
var statsObj;
var runes = JSON.parse(runes_json);
var red, yellow, blue, black, codeObj;
var have = {'red': [0,0,0,0,0,0,0,0,0], 'yellow': [0,0,0,0,0,0,0,0,0], 'blue': [0,0,0,0,0,0,0,0,0], 'black': [0,0,0]};
var haveref = {'red': [], 'yellow': [], 'blue': [], 'black': []};

function update_transferals() {
	queryDict.r = codeObj.textContent;
	
	var data = [];
	if (typeof(queryDict.m) == "string") data.push("m="+queryDict.m);
	data.push("r="+queryDict.r);	
	if (typeof(queryDict.c) == "string") data.push("c="+queryDict.c);
	
	data = data.join("&");
	
	document.getElementById("mainref").href = "index.html?"+data;
	document.getElementById("masteryref").href = "masteries.html?"+data;
}

function do_filter(tag) {
	if (tag == 'all') {
		for (i = 0; i < runes.index.length; i++) {
			document.getElementById(runes.index[i]).className = "";
		}	
	} else if (runes.tags[tag]) {
		for (i = 0; i < runes.index.length; i++) {
			document.getElementById(runes.index[i]).className = "hidden";
		}
		for (i = 0; i < runes.tags[tag].length; i++) {
			document.getElementById(runes.tags[tag][i]).className = "";
		}
	}
}

function toggle_visible(id) {
	var obj = document.getElementById(id);
	
	if (obj.className == "hidden") obj.className = "";
	else obj.className = "hidden";
}

function update_statlist() {
	var code = have.red.join(",") + "," + have.yellow.join(",") + "," + have.blue.join(",") + "," + have.black.join(",");
	
	codeObj.textContent = code;
	statsObj.innerHTML = '';
	for (var attr in stats.stats) {
		if (stats.stats[attr]) {
			statsObj.innerHTML += attr + ': '+stats.stats[attr]+'<br>';
		}
	}
	
	update_transferals();
}

function add_rune(rune) {
	if (runes.data[rune]) {
		var type = runes.data[rune].type;
		for (i = 0; i < have[type].length; ++i) {
			if (have[type][i] == 0) {
				have[type][i] = rune;
				haveref[type][i].textContent = runes.data[rune].name;				
				for (var attr in runes.data[rune].stats) {
					stats.stats[attr] += runes.data[rune].stats[attr];
				}
				update_statlist();				
				break;				
			}
		}
	}
}

function remove_rune(element_id) {
	var parts = element_id.split("_");
	var type = parts[0], id = parts[1];
	if (have[type][id] != 0) {
		for (var attr in runes.data[have[type][id]].stats) {
			stats.stats[attr] -= runes.data[have[type][id]].stats[attr];
		}
		have[type][id] = 0;
		haveref[type][id].textContent = '';
		update_statlist();
	}
}

function populate_list(value, index, array) {
	var e = document.createElement("span");
	e.id = value;
	e.innerHTML = runes.data[value].desc;
	e.onclick = function() {add_rune(this.id); return false;};
	var e2 = document.createElement("br");
	e.appendChild(e2);
	this.appendChild(e);
}

function runes_init() {
	// this line by http://stackoverflow.com/users/985454/qwerty
	location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
	
	stats = JSON.parse(stats_json);
	red = document.getElementById('red');
	yellow = document.getElementById('yellow');
	blue = document.getElementById('blue');
	black = document.getElementById('black');
	statsObj = document.getElementById('statslist');
	codeObj = document.getElementById('code');	
		
	document.getElementById('tag').onchange = function() {do_filter(this.value); return false;};
	document.getElementById('marks').onclick = function() {toggle_visible('red'); return false;};
	document.getElementById('seals').onclick = function() {toggle_visible('yellow'); return false;};
	document.getElementById('glyphs').onclick = function() {toggle_visible('blue'); return false;};
	document.getElementById('quints').onclick = function() {toggle_visible('black'); return false;};
		
	runes.runes.red.forEach(populate_list, red);
	runes.runes.yellow.forEach(populate_list, yellow);
	runes.runes.blue.forEach(populate_list, blue);
	runes.runes.black.forEach(populate_list, black);
	
	for (i=0; i<runes.index.length; i++) {
		t = runes.index[i];
		document.getElementById(t).onclick = function() {add_rune(this.id); return false;};
	}
	for (i=0;i<have.red.length;i++) {
		haveref.red[i] = document.getElementById('red_'+i);
		haveref.red[i].onclick = function() {remove_rune(this.id); return false;};
	}
	for (i=0;i<have.yellow.length;i++) {
		haveref.yellow[i] = document.getElementById('yellow_'+i);
		haveref.yellow[i].onclick = function() {remove_rune(this.id); return false;};
	}
	for (i=0;i<have.blue.length;i++) {
		haveref.blue[i] = document.getElementById('blue_'+i);
		haveref.blue[i].onclick = function() {remove_rune(this.id); return false;};
	}
	for (i=0;i<have.black.length;i++) {
		haveref.black[i] = document.getElementById('black_'+i);
		haveref.black[i].onclick = function() {remove_rune(this.id); return false;};
	}
	
	if (typeof(queryDict.r) == "string") {
		var data = queryDict.r.split(",");
		var i = 0;
		while (i < data.length) {
			add_rune(data[i]);
			++i;
		}
	} else update_transferals();
}

window.addEventListener("load", runes_init);