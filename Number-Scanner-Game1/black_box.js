//black_box.js

// useful moves:
var appear = Raphael.animation({opacity:1.0}, 20);
var disappear = Raphael.animation({opacity:0.0}, 20);

window.onload = function() {
  // create paper and make drawing functions
  	var R = Raphael(0, 0, '100%', '100%');
	h = 480; //window.innerHeight,
	w = 800; //window.innerWidth;
	line = 600;

	var style = {
		fill: "#444",
		stroke: "#fff",
		"stroke-width": 3,
		"stroke-linejoin": "round"
	};

	var makeSandbox = function () {
		R.setStart();
		var sandbox1 = R.rect(0.1*w, 0.7*h, 0.8*w, 100).attr(style),
		sandbox = R.setFinish();
		return (sandbox);
	};

	var makeScanners = function () {
		var ship1 = R.rect(0.15*w, 0.2*h, 0.2*w, 50).attr(style),
			ship2 = R.rect(0.15*w, 0.4*h, 0.2*w, 50).attr(style),
			ship3 = R.rect(0.65*w, 0.2*h, 0.2*w, 50).attr(style),
			ship4 = R.rect(0.65*w, 0.4*h, 0.2*w, 50).attr(style),
			butt1 = makeButton(ship1),
			butt2 = makeButton(ship2),
			butt3 = makeButton(ship3),
			butt4 = makeButton(ship4);
/*
	//ship1.mouseover(function () {butt1.animate(appear)} );
			 ship2.onDragOver(function() {
				ship2.attr({fill: "blue"});
*/
		var scnrs = R.set();
		scnrs.push(
			R.set(ship1, butt1),
			R.set(ship2, butt2),
			R.set(ship3, butt3),
			R.set(ship4, butt4));

		ship1.dblclick(function () {
			alert(this.attr('y'));
		});

		scnrs[1].dblclick(function () {
			alert(this.data('snap'));
		});
		scnrs.forEach(function(scnr) {
			scnr.drag(onSetMove(scnr), onSetStart(scnr), onSetStop(scnr))
			scnr[0].data({
				snap: 0,
				outside: 0,
				somethingelse: 0 
			});
		});
		return (scnrs);
	};

	var makeButton = function (scanner) {
		var box = scanner.getBBox(),
		button = R.rect(box.x2-20, box.y-20, 20, 20).attr({
			fill: '#093',
			'stroke-width': 2,
			stroke: '#fff',
			opacity: 1.0
		});
		return (button);

	};

	var makeClaw = function (x, y) {
	    R.setStart();
	    var arm = R.path('M' + x + ',' + y + 'l30,60l-30,60l5,0l40,-60,l-30,-60').attr({
	            fill: '#999',
	            stroke: '#555',
	                'stroke-width': 3
	            }),
	        arm2 = R.path('M' + x + ',' + y + 'l-30,60l30,60l-5,0l-40,-60,l30,-60').attr({
	                fill: '#999',
	                stroke: '#555',
	                'stroke-width': 3
	            }),
	        ring = R.circle(x, y, 15).attr({
	                fill: '#093',
	                stroke: '#060',
	                'stroke-width': 3
	            }),
	        rring = R.circle(x, y, 5).attr({
	                fill: '#999',
	                stroke: '#555',
	                'stroke-width': 2
	            }),
	        pull = R.path('M' + (x - 15) + ',' + y + 'l0,-' + 2*h + 'm30,0l0,' + 2*h + 'z').attr({fill: '#111', stroke: '#333',  'stroke-width': 2}),
	        carry = R.circle(x, 1.5 * y, 74).attr({
	                fill: '#000',
	                opacity: 0
	            }).toFront(),
	        claw = R.setFinish();
	        claw.data({
				snap: 0,
				outside: 0,
				somethingelse: 0 
			});
	    return (claw);
	};

//draw things!
	var frame = R.rect(0,0,800,480),
		sandbox = makeSandbox(),
		scanners = makeScanners(),
		claw = makeClaw(0.5*w, 0.2*h);
		claw.dblclick(function () {
			alert('splash screen');
		});
	    claw.box = claw.getBBox();
		claw.drag(onSetMove(claw), onSetStart(claw), onSetStop(claw));
		//scanners.drag(onMove, onStart, onStop);

		//claw.onDragOver(function() {
		//	claw.attr({fill: "blue"});
		//});

/*
	for (var i = 0; i < scanners.length; i++) {
		if (scanners[i].getBBox().y2 > line -20) {
			alert('for if');
			scanners[i][1].animate(appear);
		 }
		 //else {scnrs[i][1].animate(appear)}
		};
		*/

};
// drag functions! see drag.js //
//----------------------------------------------------------------------------
function onStart(x, y, event) {
	start(this, x, y, event);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onMove(dx, dy, x, y, event) {
	move(this, dx, dy, x, y, event);
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onStop(event) {
	stop(this, event);
};

//----------------------------------------------------------------------------
function onSetStart(object) {
	return function(x, y, event) {    // store reference to the set in the closure (there is no way of referencing it from Elements)
		start(object, x, y, event);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onSetMove(object) {
	return function(dx, dy, x, y, event) {    // store reference to the set in the closure (there is no way of referencing it from Elements)
		/*
		if (object.getBBox().y2 > line) {
			object.data('snap') == 1
		}
		else {
			object.data('snap') == 0
		};
		*/ //it makes it too slow!
		move(object, dx, dy, x, y, event);
		
	};
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onSetStop(object) {
	return function(event) {    // store reference to the set in the closure (there is no way of referencing it from Elements)
		stop(object, event);
	}
};
