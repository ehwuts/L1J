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
		"debug" : document.getElementById("debug")
	}
	
	L1J.ref.main_a.onclick = function () { L1J.switch_view("main"); };
	L1J.ref.runes_a.onclick = function () { L1J.switch_view("runes"); };
	L1J.ref.masteries_a.onclick = function () { L1J.switch_view("masteries"); };
	L1J.ref.debug_a.onclick = function () { L1J.switch_view("debug"); };	
	
	L1J.switch_view("masteries");
}

/* begin masteries rewrite */
// get_coords based on http://www.chestysoft.com/imagefile/javascript/get-coordinates.asp
function get_coords(e, obj) {
	"use strict";
	var itemX = 0, itemY = 0, eventX = 0, eventY = 0;
	
	if (typeof(obj.offsetParent) === "undefined" || typeof(obj.offsetParent) === "null") {
		itemX = obj.x;
		itemY = obj.y;
	} else do {
		itemX += obj.offsetLeft;
		itemY += obj.offsetTop;
		obj = obj.offsetParent;
	} while (obj);
	
	if (e.clientX || e.clientY) {
		eventX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		eventY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	
	return [eventX - itemX, eventY - itemY];
}
//TODO: DOn't redraw full thing each time
//TODO: make load actually support partial adds

var L1J_m = {
	"mdat" : "",
	"canvas" : "",
	"context" : "",
	"img" : { "icons" : new Image(), "icons_grey" : new Image(), "decoration" : new Image() },
	"img_loaded" : 0,
	"colors" : { 
		"ferocity" : "#581800", 
		"cunning" : "#332033", 
		"resolve" : "#182C3D",
		"text-can" : "",
		"text-have" : "",
		"text-sum" : "#eee"
	},
	"spacing" : 0,
	"panel_width" : 0,
	"layout" : [[[[],[]],[[],[],[]],[[],[]],[[],[],[]],[[],[]],[[],[],[]]],[[[],[]],[[],[],[]],[[],[]],[[],[],[]],[[],[]],[[],[],[]]],[[[],[]],[[],[],[]],[[],[]],[[],[],[]],[[],[]],[[],[],[]]]],
	"masteries" : "",
	"masteries_json" : '[[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}],[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}],[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}]]',
	"tree2" : [masteries_data.tree.Ferocity, masteries_data.tree.Cunning, masteries_data.tree.Resolve],
	"s" : [0,0,0],
	"ss" : 0
};

L1J_m.which_cell_is_here = function(loc) {
	"use strict";
	var panel = Math.floor(loc[0] / L1J_m.panel_width);
	var row = Math.floor(loc[1] / (48 + L1J_m.spacing));
	var col = 0;
	if (L1J_m.masteries[panel].length > row) while (col < L1J_m.masteries[panel][row].m.length) {
		if (L1J_m.layout[panel][row][col][0] <= loc[0] && L1J_m.layout[panel][row][col][0] + 48 >= loc[0] && loc[1] >= L1J_m.layout[panel][row][col][1]) {
			return [panel, row, col];
		}
		++col;
	}
	
	return false;
}

function draw_cell(panel, row, col) {
	"use strict";
	var has = L1J_m.masteries[panel][row].m[col];
	var could = L1J_m.masteries[panel][row].s||(L1J_m.ss < 30 && (row==0 || L1J_m.masteries[panel][row-1].s == L1J_m.masteries[panel][row-1].c));
	
	var id = (L1J_m.tree2[panel][row].masteryTreeItems[col].masteryId - 6000)+"";
		
	L1J_m.context.drawImage(has?L1J_m.img.icons:L1J_m.img.icons_grey, 48*(id.charAt(2)-1) + 192*(id.charAt(0)-1), 48*(id.charAt(1)-1), 48, 48, L1J_m.layout[panel][row][col][0], L1J_m.layout[panel][row][col][1], 48, 48);
	L1J_m.context.drawImage(L1J_m.img.decoration, has?0:48, 0, 48, 48, L1J_m.layout[panel][row][col][0], L1J_m.layout[panel][row][col][1], 48, 48);
	if (row%2 == 0) {
		L1J_m.context.drawImage(L1J_m.img.decoration, 0, (has?80:(could?64:48)), 31, 16, L1J_m.layout[panel][row][col][0]+20, L1J_m.layout[panel][row][col][1]+38, 31, 16);
		L1J_m.context.textAlign = "left";
		L1J_m.context.font = "11px sans-serif";
		L1J_m.context.fillStyle = (has?"#fe0":(could?"#08f":"#aaa"));
		L1J_m.context.fillText(has+"/"+L1J_m.masteries[panel][row].c, L1J_m.layout[panel][row][col][0]+28, L1J_m.layout[panel][row][col][1]+50);
	}
}

function draw_spent() {
	"use strict";
	var offset = 288 + 7*L1J_m.spacing;
	var offset2 = offset + (L1J_m.canvas.height - offset)/2;
	
	L1J_m.context.fillStyle = "#581800";
	L1J_m.context.fillRect(0,offset,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height-offset);
	L1J_m.context.fillStyle = "#332033";
	L1J_m.context.fillRect((L1J_m.canvas.width - 4)/3 + 2,offset,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height-offset);
	L1J_m.context.fillStyle = "#182C3D";
	L1J_m.context.fillRect((L1J_m.canvas.width - 4)*2/3 + 4,offset,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height-offset);

	L1J_m.context.textAlign = "center";
	L1J_m.context.fillStyle = "#eee";
	L1J_m.context.font = "17px sans-serif";
	L1J_m.context.fillText("Ferocity: "+L1J_m.s[0], L1J_m.panel_width/2, offset2);
	L1J_m.context.fillText("Cunning: "+L1J_m.s[1], L1J_m.panel_width*3/2+2, offset2);
	L1J_m.context.fillText("Resolve: "+L1J_m.s[2], L1J_m.panel_width*5/2+4, offset2);
}

function gen_code() {
	"use strict";
	var code = "";
		
	var panel = 0;
	while (panel < L1J_m.layout.length) {
		var row = 0;
		while (row < L1J_m.layout[panel].length) {
			var col = 0;
			if (row % 2) {
				code += (L1J_m.masteries[panel][row].m[0]?1:(L1J_m.masteries[panel][row].m[1]?2:(L1J_m.masteries[panel][row].m[2]?3:0)));
			} else while (col < L1J_m.layout[panel][row].length) {
				code += L1J_m.masteries[panel][row].m[col];
				++col;
			}
			++row;
		}
		++panel;
	}
	L1J_m.mdat.value = code;
}

function redraw_full() {
	var panel = 0;
	while (panel < L1J_m.layout.length) {
		var row = 0;
		while (row < L1J_m.layout[panel].length) {
			var col = 0;
			while (col < L1J_m.layout[panel][row].length) {
				draw_cell(panel, row, col);
				++col;
			}
			++row;
		}
		++panel;
	}
	draw_spent();
	gen_code();
}

function add_m(panel, row, col) {
	var has = L1J_m.masteries[panel][row].m[col];
	var could = ((L1J_m.masteries[panel][row].s||(L1J_m.ss < 30 && (row==0 || L1J_m.masteries[panel][row-1].s == L1J_m.masteries[panel][row-1].c)))&&L1J_m.masteries[panel][row].m[col]!==undefined);
	
	if (could) {
		if (!L1J_m.masteries[panel][row].s) {
			var adj = Math.min(30-L1J_m.ss, L1J_m.masteries[panel][row].c);
			L1J_m.masteries[panel][row].m[col] += adj;
			L1J_m.ss += adj;
			L1J_m.s[panel] += adj;
			L1J_m.masteries[panel][row].s += adj;			
		} else {
			if (L1J_m.masteries[panel][row].s < L1J_m.masteries[panel][row].c && L1J_m.ss < 30) {
				++L1J_m.masteries[panel][row].m[col];
				++L1J_m.masteries[panel][row].s;
				++L1J_m.ss;
				++L1J_m.s[panel];
			} else {
				if (L1J_m.masteries[panel][row].m[col] < L1J_m.masteries[panel][row].c) {
					if (row % 2) {
						for (var i = 0; i < L1J_m.masteries[panel][row].m.length; ++i) L1J_m.masteries[panel][row].m[i] = 0;
						L1J_m.masteries[panel][row].m[col] = 1;
					} else {
						++L1J_m.masteries[panel][row].m[col];
						--L1J_m.masteries[panel][row].m[(col?0:1)];
					}
				}
			}
		}
	}
	
	redraw_full();
}

function dec_m(panel, row, col) {
	"use strict";
	if (L1J_m.masteries[panel][row].m[col] && (row + 1 == L1J_m.masteries[panel].length || L1J_m.masteries[panel][row+1].s == 0)) {
		--L1J_m.masteries[panel][row].m[col];
		--L1J_m.ss;
		--L1J_m.s[panel];
		--L1J_m.masteries[panel][row].s;
	}
	redraw_full();
}

function handle_click(left, e) {
	"use strict";
	var loc = L1J_m.which_cell_is_here(get_coords(e, L1J_m.canvas));
	if (loc !== false) {
		if (left) add_m(loc[0], loc[1], loc[2]);
		else dec_m(loc[0], loc[1], loc[2]);
	}
}

function initialize() {
	"use strict";
	L1J_m.masteries = JSON.parse(L1J_m.masteries_json);
	L1J_m.s = [0,0,0];
	L1J_m.ss = 0;
	
	var input = L1J_m.mdat.value;
	//console.log(input);
	
	var pos = 0;
	
	var panel = 0;
	while (panel < L1J_m.masteries.length) {
		var row = 0;
		while (row < L1J_m.masteries[panel].length) {
			if (row % 2) {
				if (input[pos] != "0") add_m(panel,row,input[pos]-1);
				++pos;
			} else {
				if (input[pos] != "0") {
					add_m(panel, row, 0);
				}
				++pos;
				if (input[pos] != "0") {
					add_m(panel, row, 1);
				}
				++pos;
			}
			++row;
		}
		++panel;
	}
 
	redraw_full();
}

L1J_m.define_layout = function() {
	"use strict";
	var spare_height = L1J_m.canvas.height - 288;
	L1J_m.spacing = Math.floor(spare_height / 9);
	
	var width_base = Math.floor((L1J_m.panel_width - 144)/4);
	
	var t1 = [width_base, L1J_m.panel_width - 48 - width_base];
	var t2 = [[Math.floor((L1J_m.panel_width - width_base) / 2) - 48, Math.floor((L1J_m.panel_width + width_base) / 2)],
	          [width_base, Math.floor(L1J_m.panel_width / 2) - 24, L1J_m.panel_width - 48 - width_base]];
	
	var panel = 0;
	while (panel < L1J_m.layout.length) {
		var row = 0;
		while (row < L1J_m.layout[panel].length) {
			var col = 0;
			while (col < L1J_m.layout[panel][row].length) {
				L1J_m.layout[panel][row][col] = [panel*(L1J_m.panel_width+2) + (row%2?t2[L1J_m.layout[panel][row].length-2][col]:t1[col]), (L1J_m.spacing)*(row + 1) + (row * 48)];
				++col;
			}
			++row;
		}
		++panel;
	}
}

L1J_m.init_finish = function(x) {
	"use strict";
	if (++(L1J_m.img_loaded) < L1J_m.img.length) return;
	
	L1J_m.canvas.onclick = function(e) { handle_click(true, e); return false; }
	L1J_m.canvas.contextmenu = function(e) { handle_click(false, e); return false; }
	
	document.getElementById("loadmastery").onclick = initialize;
	gen_code();
	initialize();
}

L1J_m.init = function() {
	"use strict";
	
	L1J_m.mdat = document.getElementById("mdat");	
	L1J_m.canvas = document.getElementById("masteries_canvas");
	L1J_m.context = L1J_m.canvas.getContext("2d");
	L1J_m.panel_width = Math.floor((L1J_m.canvas.width - 4) / 3);
	
	L1J_m.context.fillStyle = L1J_m.colors.ferocity;
	L1J_m.context.fillRect(0,0,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height);
	L1J_m.context.fillStyle = L1J_m.colors.cunning;
	L1J_m.context.fillRect((L1J_m.canvas.width - 4)/3 + 2,0,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height);
	L1J_m.context.fillStyle = L1J_m.colors.resolve;
	L1J_m.context.fillRect((L1J_m.canvas.width - 4)*2/3 + 4,0,(L1J_m.canvas.width - 4)/3,L1J_m.canvas.height);
	
	L1J_m.define_layout();
	L1J_m.masteries = JSON.parse(L1J_m.masteries_json);
	
	L1J_m.img.icons.src = "img/masteries.png";
	L1J_m.img.icons.onload = L1J_m.init_finish;
	L1J_m.img.icons_grey.src = "img/masteries_grey.png";
	L1J_m.img.icons_grey.onload = L1J_m.init_finish;	
	L1J_m.img.decoration.src = "img/decoration.png";
	L1J_m.img.decoration.onload = L1J_m.init_finish;
};
/* end old masteries code */
window.onload = function() { L1J.init(); L1J_m.init(); };