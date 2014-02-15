//black_box.js

window.onload = function() {

	//extra set and element functions first:

	Raphael.el.draggable = function () {
    	var me = this, //reference to the set to use inside the drag functions
        //relative coordinates: 
        	ox = 0, //origin
        	oy = 0,
        	lx = 0, //current location
        	ly = 0,
        	moveFunc = function (dx, dy) {
           		lx = dx + ox; //update current location
            	ly = dy + oy;
            	me.transform('t' + lx + ',' + ly);
        	},
        	startFunc = function () {},
        	endFunc = function () {
        		ox = lx;
        		oy = ly;
        	};
        this.drag(moveFunc, startFunc, endFunc);
    };

	Raphael.st.draggable = function () {
    	var me = this, //reference to the set to use inside the drag functions
        //relative coordinates: 
        ox = 0, //origin
        oy = 0,
        lx = 0, //current location
        ly = 0,
        moveFunc = function (dx, dy) {
            lx = dx + ox; //update current location
            ly = dy + oy;
            me.transform('t' + lx + ',' + ly);
        },
        startFunc = function () {},
        endFunc = function () {
            ox = lx;
            oy = ly;
        };
    	this.drag(moveFunc, startFunc, endFunc);
	};

	// useful moves:
   	var appear = Raphael.animation({opacity:1.0}, 20);
   	var disappear = Raphael.animation({opacity:0.0}, 20);

    // create paper and make drawing functions
    var R = Raphael(0, 0, '100%', '100%'),
    	h = 480, //window.innerHeight,
    	w = 800; //window.innerWidth;

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
    	var	ship1 = R.rect(0.15*w, 0.2*h, 0.2*w, 50).attr(style),
			ship2 = R.rect(0.15*w, 0.4*h, 0.2*w, 50).attr(style),
    		ship3 = R.rect(0.65*w, 0.2*h, 0.2*w, 50).attr(style),
    		ship4 = R.rect(0.65*w, 0.4*h, 0.2*w, 50).attr(style),
    		butt1 = makeButton(ship1),
    		butt2 = makeButton(ship2),
    		butt3 = makeButton(ship3),
    		butt4 = makeButton(ship4);

    		//ship1.mouseover(function () {butt1.animate(appear)} );
    		ship2.mouseover(function () {
    			butt2.animate(appear);
    		});
    		ship3.mouseover(function () {
    			butt3.animate(appear);
    		});
    		ship4.mouseover(function () {
    			butt4.animate(appear);
    		});
    	var scnrs = R.set();
    	scnrs.push(
    		R.set(ship1, butt1).draggable(),
    		R.set(ship2, butt2).draggable(),
    		R.set(ship3, butt3).draggable(),
    		R.set(ship4, butt4).draggable());
    	//scnrs[1].mouseover(function() {this[2].animate(appear)})
    		//why is this undefined??
    	//scnrs.forEach(function(scnr) {
    	//	scnr.hover(
    	//		function() {this[1].this[2].animate(appear)},
    	//		function() {this[1].this[2].animate(disappear)});
    	//})
/*
    	scnrs.forEach(function(scnr) {
    		scnr.push(makeButton(scnr));
    	});
*/
    	return (scnrs);
    };

    var makeButton = function (scanner) {
    	var box = scanner.getBBox(),
    		button = R.rect(box.x2-20, box.y-20, 20, 20).attr({
    			fill: '#093',
    			'stroke-width': 2,
    			stroke: '#fff',
    			opacity: 0.0
    		});
    	return (button);

    };

    var makeClaw = function(){
    	R.setStart();
    	var claw1 = R.rect(0.48*w, 0.1*h, 0.02*w, 0.3*h).attr(style),
    		claw = R.setFinish();
    	claw.dblclick(function () {
    		alert('splash screen');
    	})
    	return (claw);
    };

	//draw things!
	var frame = R.rect(0,0,800,480),
		sandbox = makeSandbox(),
		scanners = makeScanners(),
		claw = makeClaw();
	claw.draggable();
}