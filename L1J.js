var L1J = {
	"view" : "main",
	"ref" : ""
};

L1J.switch_view = function(v) {	
	"use strict";
	if (v !== "main") {
		L1J.ref.main_a.className = "inactive";
		L1J.ref.main.className = "hide2";
	}
	if (v !== "runes") {
		L1J.ref.runes_a.className = "inactive";
		L1J.ref.runes.className = "hide2";
	}
	if (v !== "masteries") {
		L1J.ref.masteries_a.className = "inactive";
		L1J.ref.masteries.className = "hide2";
	}
	if (v !== "debug") {
		L1J.ref.debug_a.className = "inactive";
		L1J.ref.debug.className = "hide2";
	}
	
	L1J.ref[v].className = "";
	L1J.ref[v + "_a"].className = "current";
	
	L1J.view = v;
}

L1J.init = function() {
	"use strict";
	L1J.ref = {
		"main_a" : document.getElementById("main_a"),
		"runes_a" : document.getElementById("runes_a"),
		"masteries_a" : document.getElementById("masteries_a"),
		"debug_a" : document.getElementById("debug_a"),
		"main" : document.getElementById("main"),
		"runes" : document.getElementById("runes"),
		"masteries" : document.getElementById("masteries"),
		"debug" : document.getElementById("debug"),
		"champsel" : document.getElementById("champion")
	}
	
	var i = 0;
	var keys = Object.keys(champions.data);
	while (i < keys.length) {
		var e = document.createElement("option");
		e.text = champions.data[keys[i]].name;
		e.value = keys[i];
		L1J.ref.champsel.add(e);
		++i;
	}
	
	L1J.ref.main_a.onclick = function () { L1J.switch_view("main"); };
	L1J.ref.runes_a.onclick = function () { L1J.switch_view("runes"); };
	L1J.ref.masteries_a.onclick = function () { L1J.switch_view("masteries"); };
	L1J.ref.debug_a.onclick = function () { L1J.switch_view("debug"); };	
	
	L1J.switch_view("main");
}

window.addEventListener("load", L1J.init);