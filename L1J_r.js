L1J_r = {
	"stats" : "",
	"StatsObj" : "",
	"runes" : JSON.parse(runes_json),
	"red" : "", "blue" : "", "black" : "", "codeObj" : "",
	"have" : {'red': [0,0,0,0,0,0,0,0,0], 'yellow': [0,0,0,0,0,0,0,0,0], 'blue': [0,0,0,0,0,0,0,0,0], 'black': [0,0,0]},
	"haveref" : {'red': [], 'yellow': [], 'blue': [], 'black': []}
};

L1J_r.do_filter = function(tag) {
	"use strict";
	if (tag == 'all') {
		for (i = 0; i < L1J_r.runes.index.length; i++) {
			document.getElementById(L1J_r.runes.index[i]).className = "";
		}	
	} else if (L1J_r.runes.tags[tag]) {
		for (i = 0; i < L1J_r.runes.index.length; i++) {
			document.getElementById(L1J_r.runes.index[i]).className = "hide2";
		}
		for (i = 0; i < L1J_r.runes.tags[tag].length; i++) {
			document.getElementById(L1J_r.runes.tags[tag][i]).className = "";
		}
	}
}

L1J_r.toggle_visible = function(id) {
	"use strict";
	var obj = document.getElementById(id);
	
	if (obj.className == "hide2") obj.className = "";
	else obj.className = "hide2";
}

L1J_r.update_statlist = function() {
	"use strict";
	var code = L1J_r.have.red.join(",") + "," + L1J_r.have.yellow.join(",") + "," + L1J_r.have.blue.join(",") + "," + L1J_r.have.black.join(",");
	
	L1J_r.codeObj.textContent = code;
	L1J_r.statsObj.innerHTML = '';
	for (var attr in L1J_r.stats.stats) {
		if (L1J_r.stats.stats[attr]) {
			L1J_r.statsObj.innerHTML += attr + ': '+L1J_r.stats.stats[attr]+'<br>';
		}
	}
}

L1J_r.add_rune = function(rune) {
	"use strict";
	if (L1J_r.runes.data[rune]) {
		var type = L1J_r.runes.data[rune].type;
		for (i = 0; i < L1J_r.have[type].length; ++i) {
			if (L1J_r.have[type][i] == 0) {
				L1J_r.have[type][i] = rune;
				L1J_r.haveref[type][i].textContent = L1J_r.runes.data[rune].name;				
				for (var attr in L1J_r.runes.data[rune].stats) {
					L1J_r.stats.stats[attr] += L1J_r.runes.data[rune].stats[attr];
				}
				L1J_r.update_statlist();				
				break;				
			}
		}
	}
}

L1J_r.remove_rune = function(element_id) {
	"use strict";
	var parts = element_id.split("_");
	var type = parts[0], id = parts[1];
	if (L1J_r.have[type][id] != 0) {
		for (var attr in L1J_r.runes.data[L1J_r.have[type][id]].stats) {
			L1J_r.stats.stats[attr] -= L1J_r.runes.data[L1J_r.have[type][id]].stats[attr];
		}
		L1J_r.have[type][id] = 0;
		L1J_r.haveref[type][id].textContent = '';
		update_statlist();
	}
}

L1J_r.populate_list = function(value, index, array) {
	"use strict";
	var e = document.createElement("span");
	e.id = value;
	e.innerHTML = L1J_r.runes.data[value].desc;
	e.onclick = function() {L1J_r.add_rune(this.id); return false;};
	var e2 = document.createElement("br");
	e.appendChild(e2);
	this.appendChild(e);
}

L1J_r.init = function () {
	"use strict";
	
	L1J_r.stats = JSON.parse(stats_json);
	L1J_r.red = document.getElementById('red');
	L1J_r.yellow = document.getElementById('yellow');
	L1J_r.blue = document.getElementById('blue');
	L1J_r.black = document.getElementById('black');
	L1J_r.statsObj = document.getElementById('statslist');
	L1J_r.codeObj = document.getElementById('rdat');
		
	document.getElementById('tag').onchange = function() {L1J_r.do_filter(this.value); return false;};
	document.getElementById('marks').onclick = function() {L1J_r.toggle_visible('red'); return false;};
	document.getElementById('seals').onclick = function() {L1J_r.toggle_visible('yellow'); return false;};
	document.getElementById('glyphs').onclick = function() {L1J_r.toggle_visible('blue'); return false;};
	document.getElementById('quints').onclick = function() {L1J_r.toggle_visible('black'); return false;};
		
	L1J_r.runes.runes.red.forEach(L1J_r.populate_list, L1J_r.red);
	L1J_r.runes.runes.yellow.forEach(L1J_r.populate_list, L1J_r.yellow);
	L1J_r.runes.runes.blue.forEach(L1J_r.populate_list, L1J_r.blue);
	L1J_r.runes.runes.black.forEach(L1J_r.populate_list, L1J_r.black);
	
	for (i=0; i<L1J_r.runes.index.length; i++) {
		t = L1J_r.runes.index[i];
		document.getElementById(t).onclick = function() {L1J_r.add_rune(this.id); return false;};
	}
	for (i=0;i<L1J_r.have.red.length;i++) {
		L1J_r.haveref.red[i] = document.getElementById('red_'+i);
		L1J_r.haveref.red[i].onclick = function() {L1J_r.remove_rune(this.id); return false;};
	}
	for (i=0;i<L1J_r.have.yellow.length;i++) {
		L1J_r.haveref.yellow[i] = document.getElementById('yellow_'+i);
		L1J_r.haveref.yellow[i].onclick = function() {L1J_r.remove_rune(this.id); return false;};
	}
	for (i=0;i<L1J_r.have.blue.length;i++) {
		L1J_r.haveref.blue[i] = document.getElementById('blue_'+i);
		L1J_r.haveref.blue[i].onclick = function() {L1J_r.remove_rune(this.id); return false;};
	}
	for (i=0;i<L1J_r.have.black.length;i++) {
		L1J_r.haveref.black[i] = document.getElementById('black_'+i);
		L1J_r.haveref.black[i].onclick = function() {L1J_r.remove_rune(this.id); return false;};
	}
}

window.addEventListener("load", L1J_r.init);