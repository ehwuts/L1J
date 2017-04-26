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
	"mdesc" : "",
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
	"ss" : 0,
	"mcount" : ""
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

L1J_m.draw_cell = function(panel, row, col) {
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

L1J_m.draw_spent = function() {
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

L1J_m.gen_code = function() {
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
	
	L1J.update_preview();
	L1J.warn_masteries();
}

L1J_m.redraw_full = function() {
	var panel = 0;
	while (panel < L1J_m.layout.length) {
		var row = 0;
		while (row < L1J_m.layout[panel].length) {
			var col = 0;
			while (col < L1J_m.layout[panel][row].length) {
				L1J_m.draw_cell(panel, row, col);
				++col;
			}
			++row;
		}
		++panel;
	}
	L1J_m.draw_spent();
	L1J_m.gen_code();
	
	L1J_m.mcount.innerHTML = L1J_m.s[0] + "/" + L1J_m.s[1] + "/" + L1J_m.s[2];
}

L1J_m.add_m = function(panel, row, col) {
	var has = L1J_m.masteries[panel][row].m[col];
	var could = ((L1J_m.masteries[panel][row].s||(L1J_m.ss < 30 && (row==0 || L1J_m.masteries[panel][row-1].s == L1J_m.masteries[panel][row-1].c)))&&L1J_m.masteries[panel][row].m[col]!==undefined);
	if (L1J_m.ss == 30 && L1J_m.masteries[panel][row].m[col] == L1J_m.masteries[panel][row].s) could = false;
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
	
	L1J_m.redraw_full();
}

L1J_m.dec_m = function(panel, row, col) {
	"use strict";
	if (L1J_m.masteries[panel][row].m[col] && (row + 1 == L1J_m.masteries[panel].length || L1J_m.masteries[panel][row+1].s == 0)) {
		--L1J_m.masteries[panel][row].m[col];
		--L1J_m.ss;
		--L1J_m.s[panel];
		--L1J_m.masteries[panel][row].s;
	}
	L1J_m.redraw_full();
}

L1J_m.handle_click = function(left, e) {
	"use strict";
	var loc = L1J_m.which_cell_is_here(get_coords(e, L1J_m.canvas));
	if (loc !== false) {
		if (left) L1J_m.add_m(loc[0], loc[1], loc[2]);
		else L1J_m.dec_m(loc[0], loc[1], loc[2]);
		
		var id = L1J_m.tree2[loc[0]][loc[1]].masteryTreeItems[loc[2]].masteryId;
		var rank = L1J_m.masteries[loc[0]][loc[1]].m[loc[2]];
		
		L1J_m.mdesc.innerHTML = masteries_data.data[id].name + "<br> Currently: " + (rank>0?masteries_data.data[id].sanitizedDescription[rank-1]:"nothing") + (rank<masteries_data.data[id].ranks?"<br> Next: "+masteries_data.data[id].sanitizedDescription[rank]:"");
	}	
}

L1J_m.initialize = function() {
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
				if (input[pos] != "0") L1J_m.add_m(panel,row,input[pos]-1);
				++pos;
			} else {
				if (input[pos] != "0") {
					L1J_m.add_m(panel, row, 0);
				}
				++pos;
				if (input[pos] != "0") {
					L1J_m.add_m(panel, row, 1);
				}
				++pos;
			}
			++row;
		}
		++panel;
	}
 
	L1J_m.redraw_full();
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
	
	L1J_m.canvas.onclick = function(e) { L1J_m.handle_click(true, e); return false; }
	L1J_m.canvas.oncontextmenu = function(e) { L1J_m.handle_click(false, e); return false; }
	
	document.getElementById("loadmastery").onclick = L1J_m.initialize;
	L1J_m.gen_code();
	L1J_m.initialize();
}

L1J_m.init = function() {
	"use strict";
	L1J_m.mcount = document.getElementById("mcount");
	
	L1J_m.mdat = document.getElementById("mdat");
	L1J_m.mdesc = document.getElementById("mdesc");
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
	
	L1J_m.img.icons.src = "project/materials/masteries.png";
	L1J_m.img.icons.onload = L1J_m.init_finish;
	L1J_m.img.icons_grey.src = "project/materials/masteries_grey.png";
	L1J_m.img.icons_grey.onload = L1J_m.init_finish;	
	L1J_m.img.decoration.src = "project/materials/decoration.png";
	L1J_m.img.decoration.onload = L1J_m.init_finish;
};

window.addEventListener("load", L1J_m.init);