L1J_r = {
	"stats" : { "stats" : {} },
	"statsObj" : "",
	"runes" : "",
	"red" : "", "blue" : "", "black" : "", "codeObj" : "",
	"marks" : "", "seals" : "", "glyphs" : "", "quints" : "",
	"have" : {'red': [0,0,0,0,0,0,0,0,0], 'yellow': [0,0,0,0,0,0,0,0,0], 'blue': [0,0,0,0,0,0,0,0,0], 'black': [0,0,0]},
	"haveref" : {'red': [], 'yellow': [], 'blue': [], 'black': []},
	"rcount" : ""
};

L1J_r.do_filter = function(tag) {
	"use strict";
	var i;
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

L1J_r.switch_visible = function (id) {
	"use strict";
	
	L1J_r[id].className = "";
	if (id != "marks") {
		L1J_r.marks.className = "hide2";
	}
	if (id != "seals") {
		L1J_r.seals.className = "hide2";
	}
	if (id != "glyphs") {
		L1J_r.glyphs.className = "hide2";
	}
	if (id != "quints") {
		L1J_r.quints.className = "hide2";
	}
}

L1J_r.recalc_stats = function() {
	"use strict";
	var code = L1J_r.have.red.join(",") + "," + L1J_r.have.yellow.join(",") + "," + L1J_r.have.blue.join(",") + "," + L1J_r.have.black.join(",");	
	L1J_r.codeObj.value = code;
	
	for (var attr in L1J_r.stats) {
		L1J_r.stats[attr] = 0;
	}
	var i = 0;
	var a = 0;
	while (i < L1J_r.have.red.length) {
		if (L1J_r.have.red[i] != 0) {
			++a;
			for (var attr in L1J_r.runes.data[L1J_r.have.red[i]].stats) {
				L1J_r.stats[attr] += L1J_r.runes.data[L1J_r.have.red[i]].stats[attr];
			}
		}
		++i;
	}
	i = 0;
	var b = 0;
	while (i < L1J_r.have.yellow.length) {
		if (L1J_r.have.yellow[i] != 0) {
			++b;
			for (var attr in L1J_r.runes.data[L1J_r.have.yellow[i]].stats) {
				L1J_r.stats[attr] += L1J_r.runes.data[L1J_r.have.yellow[i]].stats[attr];
			}
		}
		++i;
	}
	i = 0;
	var c = 0;
	while (i < L1J_r.have.blue.length) {
		if (L1J_r.have.blue[i] != 0) {
			++c;
			for (var attr in L1J_r.runes.data[L1J_r.have.blue[i]].stats) {
				L1J_r.stats[attr] += L1J_r.runes.data[L1J_r.have.blue[i]].stats[attr];
			}
		}
		++i;
	}
	i = 0;
	var d = 0;
	while (i < L1J_r.have.black.length) {
		if (L1J_r.have.black[i] != 0) {
			++d;
			for (var attr in L1J_r.runes.data[L1J_r.have.black[i]].stats) {
				L1J_r.stats[attr] += L1J_r.runes.data[L1J_r.have.black[i]].stats[attr];
			}
		}
		++i;
	}
	
	L1J_r.statsObj.innerHTML = '';
	for (var attr in L1J_r.stats) {
		if (L1J_r.stats[attr]) {
			L1J_r.statsObj.innerHTML += attr + ': '+L1J_r.stats[attr]+'<br>';
		}
	}
	
	L1J_r.rcount.innerHTML = a + "/" + b + "/" + c + "/" + d;
}

L1J_r.add_rune = function(rune) {
	"use strict";
	if (L1J_r.runes.data[rune]) {
		var type = L1J_r.runes.data[rune].rune.type;
		for (var i = 0; i < L1J_r.have[type].length; ++i) {
			if (L1J_r.have[type][i] == 0) {
				L1J_r.have[type][i] = rune;
				L1J_r.haveref[type][i].textContent = L1J_r.runes.data[rune].name;
				/*
				for (var attr in L1J_r.runes.data[rune].stats) {
					L1J_r.stats[attr] += L1J_r.runes.data[rune].stats[attr];
				}
				*/
				L1J_r.recalc_stats();				
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
		/*
		for (var attr in L1J_r.runes.data[L1J_r.have[type][id]].stats) {
			L1J_r.stats[attr] -= L1J_r.runes.data[L1J_r.have[type][id]].stats[attr];
		}
		*/
		L1J_r.have[type][id] = 0;
		L1J_r.haveref[type][id].textContent = '';
		L1J_r.recalc_stats();
	}
}

L1J_r.populate_list = function(value, index, array) {
	"use strict";
	var e = document.createElement("span");
	e.id = value;
	e.innerHTML = L1J_r.runes.data[value].description;
	e.onclick = function() {L1J_r.add_rune(this.id); return false;};
	var e2 = document.createElement("br");
	e.appendChild(e2);
	this.appendChild(e);
}

L1J_r.parse_runes = function() {
	//L1J_r.stats
	L1J_r.runes = {
		"data" : runes.data,
		"index" : [], 
		"runes" : {
			"black" : [],
			"blue" : [],
			"red" : [],
			"yellow" : []
		},
		"tags" : {}
	};
	var i = 0;
	var keys = Object.keys(runes.data);
	while (i < keys.length) {
		if (runes.data[keys[i]].rune.tier == "3") {
			L1J_r.runes.index.push(keys[i]);
			L1J_r.runes.runes[runes.data[keys[i]].rune.type].push(keys[i]);
			var k = 0;
			while (k < runes.data[keys[i]].tags.length) {
				if (L1J_r.runes.tags[runes.data[keys[i]].tags[k]] === undefined) {
					L1J_r.runes.tags[runes.data[keys[i]].tags[k]] = [];
				}
				L1J_r.runes.tags[runes.data[keys[i]].tags[k]].push(keys[i]);
				++k;
			}
			k = 0;
			var stats = Object.keys(runes.data[keys[i]].stats);
			while (k < stats.length) {
				if (L1J_r.stats[stats[k]] === undefined ) {
					L1J_r.stats[stats[k]] = 0;
				}
				++k;
			}
		}
		
		++i;
	}
};

L1J_r.load_list = function() {
	var code = L1J_r.codeObj.value.split(',');
	var i = 0;
	while (i < code.length) {
		L1J_r.add_rune(code[i]);
		++i;
	}
}

L1J_r.init = function () {
	"use strict";
	L1J_r.rcount = document.getElementById("rcount");
	
	L1J_r.parse_runes();
	
	L1J_r.red = document.getElementById('red');
	L1J_r.yellow = document.getElementById('yellow');
	L1J_r.blue = document.getElementById('blue');
	L1J_r.black = document.getElementById('black');
	L1J_r.statsObj = document.getElementById('statslist');
	L1J_r.codeObj = document.getElementById('rdat');
	L1J_r.rload = document.getElementById('rload');
	
	L1J_r.marks = document.getElementById('red');
	L1J_r.seals = document.getElementById('yellow');
	L1J_r.glyphs = document.getElementById('blue');
	L1J_r.quints = document.getElementById('black');
		
	document.getElementById('tag').onchange = function() {L1J_r.do_filter(this.value); return false;};
	document.getElementById('marks').onclick = function() { L1J_r.switch_visible('marks'); return false; };
	document.getElementById('seals').onclick = function() { L1J_r.switch_visible('seals'); return false; };
	document.getElementById('glyphs').onclick = function() { L1J_r.switch_visible('glyphs'); return false; };
	document.getElementById('quints').onclick = function() { L1J_r.switch_visible('quints'); return false; };
	rload.onclick = L1J_r.load_list;
	
	L1J_r.switch_visible('marks');
		
	L1J_r.runes.runes.red.forEach(L1J_r.populate_list, L1J_r.red);
	L1J_r.runes.runes.yellow.forEach(L1J_r.populate_list, L1J_r.yellow);
	L1J_r.runes.runes.blue.forEach(L1J_r.populate_list, L1J_r.blue);
	L1J_r.runes.runes.black.forEach(L1J_r.populate_list, L1J_r.black);
	
	var i;
	for (i=0; i<L1J_r.runes.index.length; i++) {
		var t = L1J_r.runes.index[i];
		document.getElementById(t).onclick = function() { L1J_r.add_rune(this.id); return false; };
	}
	for (i=0;i<L1J_r.have.red.length;i++) {
		L1J_r.haveref.red[i] = document.getElementById('red_'+i);
		L1J_r.haveref.red[i].onclick = function() { L1J_r.remove_rune(this.id); return false; };
	}
	for (i=0;i<L1J_r.have.yellow.length;i++) {
		L1J_r.haveref.yellow[i] = document.getElementById('yellow_'+i);
		L1J_r.haveref.yellow[i].onclick = function() { L1J_r.remove_rune(this.id); return false; };
	}
	for (i=0;i<L1J_r.have.blue.length;i++) {
		L1J_r.haveref.blue[i] = document.getElementById('blue_'+i);
		L1J_r.haveref.blue[i].onclick = function() { L1J_r.remove_rune(this.id); return false; };
	}
	for (i=0;i<L1J_r.have.black.length;i++) {
		L1J_r.haveref.black[i] = document.getElementById('black_'+i);
		L1J_r.haveref.black[i].onclick = function() { L1J_r.remove_rune(this.id); return false; };
	}
}

window.addEventListener("load", L1J_r.init);