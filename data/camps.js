var mobs = {
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
//big krug gives 46 at level 2, and 125 at all levels therafter

var camps = {
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