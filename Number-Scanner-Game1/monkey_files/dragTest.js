//----------------------------------------------------------------------------
function setObjectXY(object, x, y) {
	switch(object.type) {
		case 'circle': {
			object.x = (x - object.attr('cx'));
			object.y = (y - object.attr('cy'));
		}
		break;
		default: {
			object.x = (x - object.attr('x'));
			object.y = (y - object.attr('y'));
		}
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function updateObjectAttr(object, x, y) {
	switch(object.type) {
		case 'circle': {
			dx = (x - object.attr('cx')) - object.x;
			dy = (y - object.attr('cy')) - object.y;

			var x = object.attr('cx') + dx,
				y = object.attr('cy') + dy;

			object.attr({cx: x, cy: y});
		}
		break;
		default: {
			dx = (x - object.attr('x')) - object.x;
			dy = (y - object.attr('y')) - object.y;

			var x = object.attr('x') + dx,
				y = object.attr('y') + dy;

			object.attr({x: x, y: y});
		}
	}
};

//----------------------------------------------------------------------------
//	on place to move our set or simple objects
function start(object, x, y, event) {
	switch(object.type) {
		case 'set': {
			for (var ndx = 0; ndx < object.length; ndx++) {
				setObjectXY(object[ndx], x, y);
			}
		}
		break;
		default: {
			setObjectXY(object, x, y);
		}
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function move(object, dx, dy, x, y, event) {
	switch(object.type) {
		case 'set': {
			for (var ndx = 0; ndx < object.length; ndx++) {
				updateObjectAttr(object[ndx], x, y);
			}
		}
		break;
		default: {
			updateObjectAttr(object, x, y);
		}
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function stop(object, event) {
};

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
		move(object, dx, dy, x, y, event);
	}
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function onSetStop(object) {
	return function(event) {    // store reference to the set in the closure (there is no way of referencing it from Elements)
		stop(object, event);
	}
};

//----------------------------------------------------------------------------
window.onload = function() {
	var paper = Raphael("canvas_container");

	var mySetCircle = paper.circle(100, 170, 30).attr('fill', 'orange');
	var mySetText = paper.text(100, 170, 'foo');

	var myset = paper.set(
		mySetCircle,
		mySetText
	);

	myset.drag(onSetMove(myset), onSetStart(myset), onSetStop(myset));

	//	and for simple objects:
	var myCircle = paper.circle(300, 300, 50).attr('fill', 'green');
	myCircle.drag(onMove, onStart, onStop);


	// some new object style
	    var style = {
        fill: "#444",
        stroke: "#fff",
        "stroke-width": 3,
        "stroke-linejoin": "round"
    };
    // our prototype
	var myRect = paper.rect(0, 0, 50, 50).attr(style);
	myRect.drag(onMove, onStart, onStop);


};

