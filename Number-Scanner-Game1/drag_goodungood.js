//----------------------------------------------------------------------------
// drag.js //
function setObjectXY(object, x, y) {
	switch(object.type) {
		case 'circle': {
			object.x = (x - object.attr('cx'));
			object.y = (y - object.attr('cy'));
		}
		break;
		case 'path': {
			object.x = (x - object.getBBox().x);
			object.y = (y - object.getBBox().y);
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
			// get offsets of object within set
			var offcx = object.attr('cx') - setBox.x,
				offcy = object.attr('cy') - setBox.y;
				//rx = object.attr('rx'),
				//ry = object.attr('ry'),
			//these deltas could be carried through the fxns instead of defining it here
			dx = (x - object.attr('cx')) - object.x;
			dy = (y - object.attr('cy')) - object.y;

			// set lx,ly = new object coordinates
			if (setBox.x  + dx < 0) {lx = 0 + offcx;}
			else if (setBox.x2 + dx  > 800) {
				lx = 800 + offcx - setBox.width;}
			else {lx = object.attr('cx') + dx;}

			if (setBox.y  + dy < 0) {ly = 0 + offcy;}
			else if (setBox.y2 + dy  > line) {ly = line + offcy - setBox.height;}
			else {ly = object.attr('cy') + dy;}

			object.attr({cx: lx, cy: ly});
		}
		break;
		case 'path': {
			// get offsets of object within set
			var box = object.getBBox(),
				offx = box.x - setBox.x,
				offy = box.y - setBox.y;

			dx = (x - box.x) - object.x;
			dy = (y - box.y) - object.y;

			//lx = dx ;
			//ly = dy ;

			if (setBox.x + dx < 0) {lx = 0;}
			else if (setBox.x2 + dx  > 800) {lx = 0;}
			else {lx = dx;}

			if (setBox.y  + dy < 0) {ly = 0;}
			else if (setBox.y2 + dy  > line) {ly = 0;}
			else {ly = dy;}


			object.attr({path: Raphael.transformPath(object.attr('path'), '...T' + lx + ',' + ly)});
			//console.log(object.attr('path'));
			};

			/*
			if (y > 200) {
			object.attr({path: Raphael.transformPath(object.attr('path'), '...T' + dx + ',' + 0)})
			}
			else {object.attr({path: Raphael.transformPath(object.attr('path'), '...T' + dx + ',' + ly)})
			}
		*/
		break;
		default: {
			// get offsets of object within set
			var offx = object.attr('x') - setBox.x,
				offy = object.attr('y') - setBox.y,
				//offx2 = object.attr('x2') - setBox.x2,
				//offy2 = object.attr('y2') - setBox.y2,
				//width = object.attr('width'),
				//height = object.attr('height');

			dx = (x - object.attr('x')) - object.x;
			dy = (y - object.attr('y')) - object.y;

			// set lx, ly = new object coordinates
			if (setBox.x  + dx < 0) {lx = 0 + offx;}
			else if (setBox.x2 + dx  > 800) {lx = 800 + offx - setBox.width;}
			else {lx = object.attr('x') + dx;}

			if (offbot) {
				if (setNow[0].data('scnr')) {setNow[1].animate(appear)};
				ly = line + offy - setBox.height;
			}
			else {
				if (setNow[0].data('scnr'))} {setNow[1].animate(disappear)};
				if (setBox.y  + dy < 0) {ly = 0 + offy;}
				else {ly = object.attr('y') + dy;};
				};


			}

			if (setBox.y  + dy < 0) {ly = 0 + offy;}
			else if (offbot) {
				ly = line + offy - setBox.height;
				if (setNow[0].data('scnr')) {setNow[1].animate(appear)};
			}
			else {ly = object.attr('y') + dy;}

			object.attr({x: lx, y: ly});
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

/* moved to other file
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
*/

