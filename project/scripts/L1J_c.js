var L1J_c = {
	"mobs" : "",
	"scaling" : "",
	"camps" : "",
	"camps_lower" : "",
	"ref" : ""
};
//big krug gives 46xp at level 2, and 125 at all levels therafter?
//lesser krug spawns are one level lower
//scuttler one level down, ..most of the time?
L1J_c.mobs = {
   "Crimson Raptor":{"hp":  700, "ad": 20, "ar": 30, "mr": 30, "as":0.667, "ms":350, "ranged": true, "gold": 62, "xp": 15, "v": true },
           "Raptor":{"hp":  400, "ad": 13, "ar":  0, "mr":  0, "as":1.000, "ms":443, "ranged":false, "gold": 10, "xp": 26, "v": true },
"Greater Murk Wolf":{"hp": 1300, "ad": 42, "ar": 10, "mr":  0, "as":0.625, "ms":443, "ranged":false, "gold": 75, "xp": 26, "v": true },
        "Murk Wolf":{"hp":  380, "ad": 16, "ar":  0, "mr": 10, "as":0.625, "ms":443, "ranged":false, "gold": 16, "xp": 30, "v": true },
            "Gromp":{"hp": 1800, "ad": 70, "ar":  0, "mr":-15, "as":1.000, "ms":330, "ranged": true, "gold": 86, "xp":150, "v": true },
    "Blue Sentinel":{"hp": 2100, "ad": 82, "ar": 10, "mr":-15, "as":0.493, "ms":200, "ranged":false, "gold":100, "xp":200, "v": true },
  "Red Brambleback":{"hp": 2100, "ad": 82, "ar":-15, "mr": 10, "as":0.599, "ms":275, "ranged":false, "gold":100, "xp":200, "v": true },
     "Ancient Krug":{"hp": 1250, "ad": 80, "ar": 10, "mr":-15, "as":0.613, "ms":203, "ranged":false, "gold": 70, "xp": 46, "v": true },
             "Krug":{"hp":  500, "ad": 25, "ar":  0, "mr":  0, "as":0.613, "ms":285, "ranged":false, "gold": 10, "xp": 27, "v": true },
        "Mini Krug":{"hp":   60, "ad": 17, "ar":  0, "mr":  0, "as":0.613, "ms":335, "ranged":false, "gold": 10, "xp":  5, "v": true },
    "Rift Scuttler":{"hp": 1060, "ad":  0, "ar": 60, "mr": 60, "as":0.638, "ms":155, "ranged":false, "gold": 70, "xp": 10, "v": true },
      "Cloud Drake":{"hp": 4940, "ad": 50, "ar": 21, "mr": 30, "as":1.000, "ms":330, "ranged": true, "gold": 25, "xp": 75, "v": true },
   "Infernal Drake":{"hp": 4940, "ad":100, "ar": 21, "mr": 30, "as":0.500, "ms":330, "ranged": true, "gold": 25, "xp": 75, "v": true },
   "Mountain Drake":{"hp": 5434, "ad":150, "ar": 41, "mr": 50, "as":0.250, "ms":330, "ranged": true, "gold": 25, "xp": 75, "v": true },
      "Ocean Drake":{"hp": 4940, "ad":100, "ar": 21, "mr": 30, "as":0.500, "ms":330, "ranged": true, "gold": 25, "xp": 75, "v": true },
      "Rift Herald":{"hp":10000, "ad":119, "ar": 60, "mr": 50, "as":0.667, "ms":325, "ranged":false, "gold": 52, "xp":206, "v": true },
     "Elder Dragon":{"hp": 8380, "ad":150, "ar":120, "mr": 70, "as":0.500, "ms":330, "ranged": true, "gold":250, "xp":575, "v":false },
     "Baron Nashor":{"hp":10000, "ad":400, "ar":120, "mr": 70, "as":0.750, "ms":300, "ranged": true, "gold": 25, "xp":746, "v":false },
};
L1J_c.scaling = {
  "Crimson Raptor":[{"hp" : 700, "ad" : 20, "ar" : 30, "mr" : 30},
					{"hp" : 700, "ad" : 20, "ar" : 30, "mr" : 30},
					{"hp" : 788, "ad" : 28, "ar" : 45, "mr" : 45},
					{"hp" : 788, "ad" : 28, "ar" : 45, "mr" : 45},
					{"hp" : 875, "ad" : 31, "ar" : 53, "mr" : 53},
					{"hp" : 875, "ad" : 31, "ar" : 53, "mr" : 53},
					{"hp" : 980, "ad" : 34, "ar" : 56, "mr" : 56},
					{"hp" : 1050, "ad" : 37, "ar" : 60, "mr" : 60},
					{"hp" : 1120, "ad" : 42, "ar" : 60, "mr" : 60},
					{"hp" : 1120, "ad" : 42, "ar" : 60, "mr" : 60},
					{"hp" : 1125, "ad" : 46, "ar" : 60, "mr" : 60}],
          "Raptor":[{"hp" : 400, "ad" : 13, "ar" : 0, "mr" : 0},
					{"hp" : 400, "ad" : 13, "ar" : 0, "mr" : 0},
					{"hp" : 440, "ad" : 19, "ar" : 0, "mr" : 0},
					{"hp" : 440, "ad" : 19, "ar" : 0, "mr" : 0},
					{"hp" : 470, "ad" : 21, "ar" : 0, "mr" : 0},
					{"hp" : 470, "ad" : 21, "ar" : 0, "mr" : 0},
					{"hp" : 500, "ad" : 23, "ar" : 0, "mr" : 0},
					{"hp" : 540, "ad" : 25, "ar" : 0, "mr" : 0},
					{"hp" : 600, "ad" : 28, "ar" : 0, "mr" : 0},
					{"hp" : 600, "ad" : 28, "ar" : 0, "mr" : 0},
					{"hp" : 680, "ad" : 31, "ar" : 0, "mr" : 0}],
"Greater Murk Wolf":[{"hp" : 1300, "ad" : 42, "ar" : 10, "mr" : 0},
					{"hp" : 1300, "ad" : 42, "ar" : 10, "mr" : 0},
					{"hp" : 1463, "ad" : 59, "ar" : 15, "mr" : 0},
					{"hp" : 1463, "ad" : 59, "ar" : 15, "mr" : 0},
					{"hp" : 1625, "ad" : 65, "ar" : 18, "mr" : 0},
					{"hp" : 1625, "ad" : 65, "ar" : 18, "mr" : 0},
					{"hp" : 1820, "ad" : 71, "ar" : 19, "mr" : 0},
					{"hp" : 1950, "ad" : 78, "ar" : 20, "mr" : 0},
					{"hp" : 2080, "ad" : 88, "ar" : 20, "mr" : 0},
					{"hp" : 2080, "ad" : 88, "ar" : 20, "mr" : 0},
					{"hp" : 2275, "ad" : 97, "ar" : 20, "mr" : 0}],
       "Murk Wolf":[{"hp" : 380, "ad" : 16, "ar" : 0, "mr" : 10},
					{"hp" : 380, "ad" : 16, "ar" : 0, "mr" : 10},
					{"hp" : 428, "ad" : 22, "ar" : 0, "mr" : 15},
					{"hp" : 428, "ad" : 22, "ar" : 0, "mr" : 15},
					{"hp" : 475, "ad" : 25, "ar" : 0, "mr" : 18},
					{"hp" : 475, "ad" : 25, "ar" : 0, "mr" : 18},
					{"hp" : 532, "ad" : 27, "ar" : 0, "mr" : 19},
					{"hp" : 570, "ad" : 30, "ar" : 0, "mr" : 20},
					{"hp" : 608, "ad" : 34, "ar" : 0, "mr" : 20},
					{"hp" : 608, "ad" : 34, "ar" : 0, "mr" : 20},
					{"hp" : 665, "ad" : 37, "ar" : 0, "mr" : 20}],
           "Gromp":[{"hp" : 1800, "ad" : 70, "ar" : 0, "mr" : -15},
					{"hp" : 1800, "ad" : 70, "ar" : 0, "mr" : -15},
					{"hp" : 2025, "ad" : 98, "ar" : 0, "mr" : -22},
					{"hp" : 2025, "ad" : 98, "ar" : 0, "mr" : -22},
					{"hp" : 2250, "ad" : 109, "ar" : 0, "mr" : -26},
					{"hp" : 2250, "ad" : 109, "ar" : 0, "mr" : -26},
					{"hp" : 2520, "ad" : 119, "ar" : 0, "mr" : -28},
					{"hp" : 2700, "ad" : 130, "ar" : 0, "mr" : -30},
					{"hp" : 2880, "ad" : 147, "ar" : 0, "mr" : -30},
					{"hp" : 2880, "ad" : 147, "ar" : 0, "mr" : -30},
					{"hp" : 3150, "ad" : 161, "ar" : 0, "mr" : -30}],
   "Blue Sentinel":[{"hp" : 2100, "ad" : 82, "ar" : 10, "mr" : -15},
					{"hp" : 2100, "ad" : 82, "ar" : 10, "mr" : -15},
					{"hp" : 2363, "ad" : 115, "ar" : 15, "mr" : -22},
					{"hp" : 2363, "ad" : 115, "ar" : 15, "mr" : -22},
					{"hp" : 2625, "ad" : 127, "ar" : 18, "mr" : -26},
					{"hp" : 2625, "ad" : 127, "ar" : 18, "mr" : -26},
					{"hp" : 2940, "ad" : 139, "ar" : 19, "mr" : -28},
					{"hp" : 3150, "ad" : 152, "ar" : 20, "mr" : -30},
					{"hp" : 3360, "ad" : 172, "ar" : 20, "mr" : -30},
					{"hp" : 3360, "ad" : 172, "ar" : 20, "mr" : -30},
					{"hp" : 3675, "ad" : 189, "ar" : 20, "mr" : -30}],
 "Red Brambleback":[{"hp" : 2100, "ad" : 82, "ar" : -15, "mr" : 10},
					{"hp" : 2100, "ad" : 82, "ar" : -15, "mr" : 10},
					{"hp" : 2363, "ad" : 115, "ar" : -22, "mr" : 15},
					{"hp" : 2363, "ad" : 115, "ar" : -22, "mr" : 15},
					{"hp" : 2625, "ad" : 127, "ar" : -26, "mr" : 18},
					{"hp" : 2625, "ad" : 127, "ar" : -26, "mr" : 18},
					{"hp" : 2940, "ad" : 139, "ar" : -28, "mr" : 19},
					{"hp" : 3150, "ad" : 152, "ar" : -30, "mr" : 20},
					{"hp" : 3360, "ad" : 172, "ar" : -30, "mr" : 20},
					{"hp" : 3360, "ad" : 172, "ar" : -30, "mr" : 20},
					{"hp" : 3675, "ad" : 189, "ar" : -30, "mr" : 20}],
    "Ancient Krug":[{"hp" : 1250, "ad" : 80, "ar" : 10, "mr" : -15},
					{"hp" : 1250, "ad" : 80, "ar" : 10, "mr" : -15},
					{"hp" : 1407, "ad" : 112, "ar" : 15, "mr" : -22},
					{"hp" : 1407, "ad" : 112, "ar" : 15, "mr" : -22},
					{"hp" : 1563, "ad" : 124, "ar" : 18, "mr" : -26},
					{"hp" : 1563, "ad" : 124, "ar" : 18, "mr" : -26},
					{"hp" : 1750, "ad" : 136, "ar" : 19, "mr" : -28},
					{"hp" : 1875, "ad" : 148, "ar" : 20, "mr" : -30},
					{"hp" : 2000, "ad" : 168, "ar" : 20, "mr" : -30},
					{"hp" : 2000, "ad" : 168, "ar" : 20, "mr" : -30},
					{"hp" : 2188, "ad" : 184, "ar" : 20, "mr" : -30}],
            "Krug":[{"hp" : 500, "ad" : 25, "ar" : 0, "mr" : 0},
					{"hp" : 500, "ad" : 25, "ar" : 0, "mr" : 0},
					{"hp" : 563, "ad" : 35, "ar" : 0, "mr" : 0},
					{"hp" : 563, "ad" : 35, "ar" : 0, "mr" : 0},
					{"hp" : 625, "ad" : 39, "ar" : 0, "mr" : 0},
					{"hp" : 625, "ad" : 39, "ar" : 0, "mr" : 0},
					{"hp" : 700, "ad" : 43, "ar" : 0, "mr" : 0},
					{"hp" : 750, "ad" : 46, "ar" : 0, "mr" : 0},
					{"hp" : 800, "ad" : 53, "ar" : 0, "mr" : 0},
					{"hp" : 800, "ad" : 53, "ar" : 0, "mr" : 0},
					{"hp" : 875, "ad" : 58, "ar" : 0, "mr" : 0}],
       "Mini Krug":[{"hp" : 60, "ad" : 17, "ar" : 0, "mr" : 0},
					{"hp" : 60, "ad" : 17, "ar" : 0, "mr" : 0},
					{"hp" : 68, "ad" : 24, "ar" : 0, "mr" : 0},
					{"hp" : 68, "ad" : 24, "ar" : 0, "mr" : 0},
					{"hp" : 75, "ad" : 26, "ar" : 0, "mr" : 0},
					{"hp" : 75, "ad" : 26, "ar" : 0, "mr" : 0},
					{"hp" : 84, "ad" : 29, "ar" : 0, "mr" : 0},
					{"hp" : 90, "ad" : 31, "ar" : 0, "mr" : 0},
					{"hp" : 96, "ad" : 36, "ar" : 0, "mr" : 0},
					{"hp" : 96, "ad" : 36, "ar" : 0, "mr" : 0}],
   "Rift Scuttler":[{"hp" : 1060, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1060, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1239, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1364, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1495, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1700, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 1917, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 2146, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 2387, "ad" : 0, "ar" : 60, "mr" : 60},
					{"hp" : 2640, "ad" : 0, "ar" : 60, "mr" : 60}]
}

L1J_c.camps = {
"Red Brambleback":{"initial":100, "respawn":300, "level":2, "mobs":["Red Brambleback"]},
  "Blue Sentinel":{"initial":100, "respawn":300, "level":2, "mobs":["Blue Sentinel"]},
        "Raptors":{"initial": 97, "respawn":100, "level":2, "mobs":["Crimson Raptor", "Raptor", "Raptor", "Raptor", "Raptor", "Raptor"]},
    "Murk Wolves":{"initial": 97, "respawn":100, "level":2, "mobs":["Greater Murk Wolf", "Murk Wolf", "'Murk Wolf"]},
          "Krugs":{"initial":110, "respawn":100, "level":2, "mobs":["Ancient Krug", "Krug"]},
          "Gromp":{"initial":112, "respawn":100, "level":2, "mobs":["Gromp"]},
"N Rift Scuttler":{"initial":145, "respawn":180, "level":2, "mobs":["Rift Scuttler"]},
"S Rift Scuttler":{"initial":145, "respawn":180, "level":2, "mobs":["Rift Scuttler"]},
    "Cloud Drake":{"initial":150, "respawn":360, "level":6, "mobs":["Cloud Drake"]},
 "Infernal Drake":{"initial":150, "respawn":360, "level":6, "mobs":["Infernal Drake"]},
 "Mountain Drake":{"initial":150, "respawn":360, "level":6, "mobs":["Mountain Drake"]},
    "Ocean Drake":{"initial":150, "respawn":360, "level":6, "mobs":["Ocean Drake"]},
    "Rift Herald":{"initial":600, "respawn":999, "level":6, "mobs":["Rift Herald"]},
   "Elder Dragon":{"initial":999, "respawn":999, "level":6, "mobs":["Elder Dragon"]},
   "Baron Nashor":{"initial":999, "respawn":999, "level":1, "mobs":["Baron Nashor"]}
};

L1J_c.fight = function() {
	
}

L1J_c.start_fight = function() {
	
	
	return false;
}

L1J_c.check_route = function() {
	console.log("test");
	var route = L1J_c.ref.route.value.split(",");
	for (var i in route) {
		route[i] = route[i].trim().toLowerCase();
		if (L1J_c.camps_lower[route[i]] == undefined) {
			console.log(route[i]);
			L1J_c.ref.rimg.src = L1J.img.no;
			return;
		}
	}
	L1J_c.ref.rimg.src = L1J.img.yes;
}

L1J_c.init = function() {
	L1J_c.ref = {
		"camp" : document.getElementById("camp"),
		"route" : document.getElementById("route"),
		"rimg" : document.getElementById("img_chk_route")
	};
	
	L1J_c.ref.route.onkeyup = L1J_c.check_route;
	L1J_c.ref.route.onchange = L1J_c.check_route;
	
	L1J_c.camps_lower = {};
	var camp_names = Object.keys(L1J_c.camps);
	for (var i in camp_names) {
		var e = document.createElement("option");
		e.value = camp_names[i];
		e.text = camp_names[i];
		L1J_c.camps_lower[camp_names[i].toLowerCase()] = L1J_c.camps[camp_names[i]];
		L1J_c.ref.camp.add(e);
		document.getElementById("run").onclick = L1J_c.start_fight;
	}
}

window.addEventListener("load", L1J_c.init);