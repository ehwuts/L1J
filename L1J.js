var L1J = {
	"view" : "main",
	"ref" : "",
	"stats" : "",
};

L1J.update_preview = function() {
	"use strict";
	L1J.stats = Object.assign({}, champions.data[L1J.ref.champsel.value].stats);
	L1J.stats.level = 1;
	L1J.stats.hp += L1J.stats.level * L1J.stats.hpperlevel;
	L1J.stats.mp += L1J.stats.level * L1J.stats.mpperlevel;
	L1J.stats.hpregen += L1J.stats.level * L1J.stats.hpregenperlevel;
	L1J.stats.mpregen += L1J.stats.level * L1J.stats.mpregenperlevel;
	L1J.stats.lethality = 0;
	L1J.stats.percarmorpenetration = 0;
	L1J.stats.flatmagicpenetration = 0;
	L1J.stats.percmagicpenetration = 0;
	L1J.stats.lifesteal = 0;
	L1J.stats.spellvamp = 0;
	L1J.stats.attackdamage += L1J.stats.level * L1J.stats.attackdamageperlevel;
	L1J.stats.magicdamage = 0;
	L1J.stats.armor += L1J.stats.level * L1J.stats.armorperlevel;
	L1J.stats.spellblock += L1J.stats.level * L1J.stats.spellblockperlevel;
	L1J.stats.attackspeedbase = 0.625 / (1 + L1J.stats.attackspeedoffset);
	L1J.stats.attackspeedbonus = (L1J.stats.level - 1) * L1J.stats.attackspeedperlevel / 100;
	L1J.stats.attackspeedeffective = L1J.stats.attackspeedbase * (1 + L1J.stats.attackspeedbonus);
	L1J.stats.percentcooldown = 0;
	L1J.stats.crit += L1J.stats.level * L1J.stats.critperlevel;
	
	L1J.ref.preview.innerHTML = "HP " + L1J.stats.hp.toFixed(2) + " | MP " + L1J.stats.mp.toFixed(2) + "<br>" 
		+ "HPR "  + L1J.stats.hpregen.toFixed(2) + " |  MPR " + L1J.stats.mpregen.toFixed(2) + "<br>"
		+ "ARP " + L1J.stats.lethality + "/" + L1J.stats.percarmorpenetration.toFixed(2) + " | MPN " + L1J.stats.flatmagicpenetration + "/" + L1J.stats.percmagicpenetration.toFixed(2) + "<br>"
		+ "LS " + L1J.stats.lifesteal + " | SV " + L1J.stats.spellvamp + "<br>"
		+ "AD " + L1J.stats.attackdamage.toFixed(2) + " | AP " + L1J.stats.magicdamage.toFixed(2) + "<br>"
		+ "AR " + L1J.stats.armor.toFixed(2) + " | MR " + L1J.stats.spellblock + "<br>"
		+ "AS " + L1J.stats.attackspeedeffective.toFixed(4) + " | CDR " + L1J.stats.percentcooldown.toFixed(2) + "<br>"
		+ "Crit " + L1J.stats.crit + " | MS " + L1J.stats.movespeed + "<br>";
}

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
		"champsel" : document.getElementById("champion"),
		"preview" : document.getElementById("stats_preview")
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
	L1J.ref.champsel.onchange = L1J.update_preview;
	
	L1J.switch_view("main");
}

window.addEventListener("load", L1J.init);