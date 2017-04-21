var L1J = {
	"view" : "main",
	"ref" : "",
	"stats" : "",
};

L1J.update_preview = function() {
	"use strict";
	L1J.stats = Object.assign({}, champions.data[L1J.ref.champsel.value].stats);
	L1J.stats.level = L1J.ref.level.value;
	L1J.stats.partype = champions.data[L1J.ref.champsel.value].partype;
	/* begin base char stats */
	L1J.stats.hp += (L1J.stats.level - 1) * L1J.stats.hpperlevel;
	L1J.stats.hpregen += (L1J.stats.level - 1) * L1J.stats.hpregenperlevel;
	L1J.stats.mp += (L1J.stats.level - 1) * L1J.stats.mpperlevel;
	L1J.stats.mpregen += (L1J.stats.level - 1) * L1J.stats.mpregenperlevel;
	L1J.stats.lethality = 0;
	L1J.stats.percarmorpenetration = 0;
	L1J.stats.flatmagicpenetration = 0;
	L1J.stats.percmagicpenetration = 0;
	L1J.stats.lifesteal = 0;
	L1J.stats.spellvamp = 0;
	L1J.stats.attackdamage += (L1J.stats.level - 1) * L1J.stats.attackdamageperlevel;
	L1J.stats.magicdamage = 0;
	L1J.stats.armor += (L1J.stats.level - 1) * L1J.stats.armorperlevel;
	L1J.stats.spellblock += (L1J.stats.level - 1) * L1J.stats.spellblockperlevel;
	L1J.stats.attackspeedbase = 0.625 / (1 + L1J.stats.attackspeedoffset);
	L1J.stats.attackspeedbonus = (L1J.stats.level - 1) * L1J.stats.attackspeedperlevel / 100;
	L1J.stats.percentcooldown = 0;
	L1J.stats.crit += (L1J.stats.level - 1) * L1J.stats.critperlevel;
	L1J.stats.critmod = 2;
	/* end base char stats */
	
	/* begin runes inclusion */
	L1J.stats.hp += L1J_r.stats.FlatHPPoolMod + L1J.stats.level * L1J_r.stats.rFlatHPModPerLevel;
	L1J.stats.hpregen += L1J_r.stats.FlatHPRegenMod + L1J.stats.level * L1J_r.stats.rFlatHPRegenModPerLevel;
	if (L1J.stats.partype == "Mana") {
		L1J.stats.mp += L1J_r.stats.FlatMPPoolMod + L1J.stats.level * L1J_r.stats.rFlatMPModPerLevel;
		L1J.stats.mpregen += L1J_r.stats.FlatMPRegenMod + L1J.stats.level * L1J_r.stats.rFlatMPRegenModPerLevel;
	}
	if (L1J.stats.partype == "Energy") {
		L1J.stats.mp += L1J_r.stats.FlatEnergyPoolMod + L1J.stats.level * L1J_r.stats.rFlatEnergyModPerLevel;
		L1J.stats.mpregen += L1J_r.stats.FlatEnergyRegenMod + L1J.stats.level * L1J_r.stats.rFlatEnergyRegenModPerLevel;
	}
	L1J.stats.armor += L1J_r.stats.FlatArmorMod + L1J.stats.level * L1J_r.stats.rFlatArmorModPerLevel;
	L1J.stats.spellblock += L1J_r.stats.FlatSpellBlockMod + L1J.stats.level * L1J_r.stats.rFlatSpellBlockModPerLevel;
	L1J.stats.attackdamage += L1J_r.stats.FlatPhysicalDamageMod + L1J.stats.level * L1J_r.stats.rFlatPhysicalDamageModPerLevel;
	L1J.stats.magicdamage += L1J_r.stats.FlatMagicDamageMod + L1J.stats.level * L1J_r.stats.rFlatMagicDamageModPerLevel;
	L1J.stats.attackspeedbonus += L1J_r.stats.PercentAttackSpeedMod;
	L1J.stats.percentcooldown += L1J_r.stats.rPercentCooldownMod + L1J.stats.level * L1J_r.stats.rPercentCooldownModPerLevel;
	L1J.stats.crit += L1J_r.stats.FlatCritChanceMod;
	L1J.stats.critmod += L1J_r.stats.FlatCritDamageMod;
	L1J.stats.lifesteal += L1J_r.stats.PercentLifeStealMod;
	L1J.stats.spellvamp += L1J_r.stats.PercentSpellVampMod;
	L1J.stats.flatmagicpenetration += L1J_r.stats.rFlatMagicPenetrationMod;
	L1J.stats.movespeed *= (1 + L1J_r.stats.PercentMovementSpeedMod);
	
	//FlatHPPoolMod,rFlatHPModPerLevel,FlatHPRegenMod,rFlatHPRegenModPerLevel
	//FlatMPPoolMod,rFlatMPModPerLevel,FlatMPRegenMod,rFlatMPRegenModPerLevel
	//FlatEnergyPoolMod,rFlatEnergyModPerLevel,FlatEnergyRegenMod,rFlatEnergyRegenModPerLevel
	//FlatArmorMod,rFlatArmorModPerLevel,FlatSpellBlockMod,rFlatSpellBlockModPerLevel
	//FlatPhysicalDamageMod,rFlatPhysicalDamageModPerLevel,FlatMagicDamageMod,rFlatMagicDamageModPerLevel
	//PercentAttackSpeedMod,rPercentCooldownMod,rPercentCooldownModPerLevel
	//FlatCritChanceMod,FlatCritDamageMod,PercentLifeStealMod,PercentSpellVampMod,rFlatMagicPenetrationMod
	
	//below runes not yet added
	//,PercentHPPoolMod,rFlatGoldPer10Mod,PercentEXPBonus,rPercentTimeDeadMod	
	/* end runes inclusion */
	
	/* hard and soft stat caps */
	L1J.stats.movespeed = Math.max(0, L1J.stats.movespeed - 490) * 0.5 + Math.max(0, Math.min(490, L1J.stats.movespeed) - 415) * 0.8 + Math.min(415, L1J.stats.movespeed);
	L1J.stats.percentcooldown = Math.max(-0.4, L1J.stats.percentcooldown);
	L1J.stats.attackspeedeffective = Math.min(2.50,L1J.stats.attackspeedbase * (1 + L1J.stats.attackspeedbonus));
	
	L1J.ref.preview.innerHTML = "HP " + L1J.stats.hp.toFixed(2) + " | MP " + L1J.stats.mp.toFixed(2) + "<br>" 
		+ "HPR "  + L1J.stats.hpregen.toFixed(2) + " |  MPR " + L1J.stats.mpregen.toFixed(2) + "<br>"
		+ "ARP " + L1J.stats.lethality + "/" + L1J.stats.percarmorpenetration.toFixed(2) + " | MPN " + L1J.stats.flatmagicpenetration + "/" + L1J.stats.percmagicpenetration.toFixed(2) + "<br>"
		+ "LS " + L1J.stats.lifesteal + " | SV " + L1J.stats.spellvamp + "<br>"
		+ "AD " + L1J.stats.attackdamage.toFixed(2) + " | AP " + L1J.stats.magicdamage.toFixed(2) + "<br>"
		+ "AR " + L1J.stats.armor.toFixed(2) + " | MR " + L1J.stats.spellblock.toFixed(2) + "<br>"
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
		"preview" : document.getElementById("stats_preview"),
		"level" : document.getElementById("clevel")
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
	i = 1;
	while (i <= 18) {
		var e = document.createElement("option");
		e.text = i;
		e.value = i;
		L1J.ref.level.add(e);
		++i;
	}
	
	L1J.ref.main_a.onclick = function () { L1J.switch_view("main"); };
	L1J.ref.runes_a.onclick = function () { L1J.switch_view("runes"); };
	L1J.ref.masteries_a.onclick = function () { L1J.switch_view("masteries"); };
	L1J.ref.debug_a.onclick = function () { L1J.switch_view("debug"); };	
	L1J.ref.champsel.onchange = L1J.update_preview;
	L1J.ref.level.onchange = L1J.update_preview;
	
	L1J.switch_view("main");
}

window.addEventListener("load", L1J.init);