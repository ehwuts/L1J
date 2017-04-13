var L1J = {
	"view" : "main",
	"ref" : ""
};

L1J.switch_view = function(v) {
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

/* begin masteries rewrite */
var queryDict = {};
//TODO: DOn't redraw full thing each time
//TODO: make load actually support partial adds

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

var masteries_json = '[[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}],[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}],[{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0]},{"s":0,"c":5,"m":[0,0]},{"s":0,"c":1,"m":[0,0,0]}]]';
var draw_layout = [[[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[],[]]],[[[],[]],[[],[],[]],[[],[]],[[],[]],[[],[]],[[],[],[]]],[[[],[]],[[],[]],[[],[]],[[],[]],[[],[]],[[],[],[]]]];

var default_init = "0000000000000000000000000000";

var mdat, canvas, context;
var icons = new Image(), icons_grey = new Image(), decoration = new Image();
var masteries;
var s;
var ss = 0;
var panel_width;

var spacing;

function setup_layout() {
	var spare_height = canvas.height - 288;
	spacing = Math.floor(spare_height / 9);
	
	var width_base = Math.floor((panel_width - 144)/3);
	
	var t1 = [width_base, panel_width - 48 - width_base];
	var t2 = [[Math.floor((panel_width - width_base) / 2) - 48, Math.floor((panel_width + width_base) / 2)],
	          [width_base, Math.floor(panel_width / 2) - 24, panel_width - 48 - width_base]];
	
	var panel = 0;
	while (panel < draw_layout.length) {
		var row = 0;
		while (row < draw_layout[panel].length) {
			var col = 0;
			while (col < draw_layout[panel][row].length) {
				draw_layout[panel][row][col] = [panel*(panel_width+2) + (row%2?t2[draw_layout[panel][row].length-2][col]:t1[col]), (spacing)*(row + 1) + (row * 48)];
				++col;
			}
			++row;
		}
		++panel;
	}
}

function which_cell_is_here(loc) {
	var panel = Math.floor(loc[0] / panel_width);
	var row = Math.floor(loc[1] / (48 + spacing));
	var col = 0;
	if (masteries[panel].length > row) while (col < masteries[panel][row].m.length) {
		if (draw_layout[panel][row][col][0] <= loc[0] && draw_layout[panel][row][col][0] + 48 >= loc[0] && loc[1] >= draw_layout[panel][row][col][1]) {
			return [panel, row, col];
		}
		++col;
	}
	
	return false;
}

function draw_cell(panel, row, col) {
	var has = masteries[panel][row].m[col];
	var could = masteries[panel][row].s||(ss < 30 && (row==0 || masteries[panel][row-1].s == masteries[panel][row-1].c));
	
	context.drawImage(has?icons:icons_grey, 48*col + 144*panel, 48*row, 48, 48, draw_layout[panel][row][col][0], draw_layout[panel][row][col][1], 48, 48);
	context.drawImage(could?icons:icons_grey, 96, 0, 48, 48, draw_layout[panel][row][col][0], draw_layout[panel][row][col][1], 48, 48);
	if (row%2 == 0) {
		context.drawImage(decoration, 0, (has?80:(could?64:48)), 31, 16, draw_layout[panel][row][col][0]+20, draw_layout[panel][row][col][1]+38, 31, 16);
		context.textAlign = "left";
		context.font = "11px sans-serif";
		context.fillStyle = (has?"#fe0":(could?"#08f":"#aaa"));
		context.fillText(has+"/"+masteries[panel][row].c, draw_layout[panel][row][col][0]+28, draw_layout[panel][row][col][1]+50);
	}
}

function draw_spent() {	
	var offset = 288 + 7*spacing;
	var offset2 = offset + (canvas.height - offset)/2;
	
	context.fillStyle = "#581800";
	context.fillRect(0,offset,(canvas.width - 4)/3,canvas.height-offset);
	context.fillStyle = "#332033";
	context.fillRect((canvas.width - 4)/3 + 2,offset,(canvas.width - 4)/3,canvas.height-offset);
	context.fillStyle = "#182C3D";
	context.fillRect((canvas.width - 4)*2/3 + 4,offset,(canvas.width - 4)/3,canvas.height-offset);

	context.textAlign = "center";
	context.fillStyle = "#eee";
	context.font = "17px sans-serif";
	context.fillText("Ferocity: "+s[0], panel_width/2, offset2);
	context.fillText("Cunning: "+s[1], panel_width*3/2+2, offset2);
	context.fillText("Resolve: "+s[2], panel_width*5/2+4, offset2);
}

function gen_code() {
	var code = "";
	
	var panel = 0;
	while (panel < draw_layout.length) {
		var row = 0;
		while (row < draw_layout[panel].length) {
			var col = 0;
			if (row % 2) {
				code += (masteries[panel][row].m[0]?1:(masteries[panel][row].m[1]?2:(masteries[panel][row].m[2]?3:0)));
			} else while (col < draw_layout[panel][row].length) {
				code += masteries[panel][row].m[col];
				++col;
			}
			++row;
		}
		++panel;
	}
	mdat.value = code;
}

function redraw_full() {
	var panel = 0;
	while (panel < draw_layout.length) {
		var row = 0;
		while (row < draw_layout[panel].length) {
			var col = 0;
			while (col < draw_layout[panel][row].length) {
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
	var has = masteries[panel][row].m[col];
	var could = ((masteries[panel][row].s||(ss < 30 && (row==0 || masteries[panel][row-1].s == masteries[panel][row-1].c)))&&masteries[panel][row].m[col]!==undefined);
	
	if (could) {
		if (!masteries[panel][row].s) {
			var adj = Math.min(30-ss, masteries[panel][row].c);
			masteries[panel][row].m[col] += adj;
			ss += adj;
			s[panel] += adj;
			masteries[panel][row].s += adj;			
		} else {
			if (masteries[panel][row].s < masteries[panel][row].c && ss < 30) {
				++masteries[panel][row].m[col];
				++masteries[panel][row].s;
				++ss;
				++s[panel];
			} else {
				if (masteries[panel][row].m[col] < masteries[panel][row].c) {
					if (row % 2) {
						for (var i = 0; i < masteries[panel][row].m.length; ++i) masteries[panel][row].m[i] = 0;
						masteries[panel][row].m[col] = 1;
					} else {
						++masteries[panel][row].m[col];
						--masteries[panel][row].m[(col?0:1)];
					}
				}
			}
		}
	}
	
	redraw_full();
}

function dec_m(panel, row, col) {
	if (masteries[panel][row].m[col] && (row + 1 == masteries[panel].length || masteries[panel][row+1].s == 0)) {
		--masteries[panel][row].m[col];
		--ss;
		--s[panel];
		--masteries[panel][row].s;
	}
	redraw_full();
}

function handle_click(left, e) {
	var loc = which_cell_is_here(get_coords(e, canvas));
	if (loc !== false) {
		if (left) add_m(loc[0], loc[1], loc[2]);
		else dec_m(loc[0], loc[1], loc[2]);
	}
}

function initialize(input) {
	masteries = JSON.parse(masteries_json);
	s = [0,0,0];
	ss = 0;
	
	if (input !== default_init) {
		var pos = 0;
		
		var panel = 0;
		while (panel < 3) {
			var row = 0;
			while (row < 6) {
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
		queryDict.m = input;
	} else {
		queryDict.m = default_init;
		redraw_full();
	}
}

var load_src = 0;
function check_finish(x) {
	if (++load_src < 3) return;
	
	canvas.onclick = function(e) { handle_click(true, e); return false; }
	canvas.oncontextmenu = function(e) { handle_click(false, e); return false; }
	
	if (typeof(queryDict.m) == "string") initialize(queryDict.m);
	else initialize(default_init);
	
	document.getElementById("loadmastery").onclick = function() { initialize(mdat.value); };
}

function masteries_init() {
	
	// this line by http://stackoverflow.com/users/985454/qwerty
	location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});	
	
	mdat = document.getElementById("mdat");
	canvas = document.getElementById("masteries_canvas");
	context = canvas.getContext("2d");
	panel_width = Math.floor((canvas.width - 4) / 3);
	
	context.fillStyle = "#581800";
	context.fillRect(0,0,(canvas.width - 4)/3,canvas.height);
	context.fillStyle = "#332033";
	context.fillRect((canvas.width - 4)/3 + 2,0,(canvas.width - 4)/3,canvas.height);
	context.fillStyle = "#182C3D";
	context.fillRect((canvas.width - 4)*2/3 + 4,0,(canvas.width - 4)/3,canvas.height);
	
	setup_layout();
	
	icons.src = "img/masteries.png";
	icons.onload = check_finish;
	icons_grey.src = "img/masteries_grey.png";
	icons_grey.onload = check_finish;	
	decoration.src = "img/decoration.png";
	decoration.onload = check_finish;
};
/* end old masteries code */
window.onload = function() { L1J.init(); masteries_init(); };