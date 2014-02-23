//////////////////
///black_box.js///
//////////////////

/* current status:
	* trial0 initializes with single target
	* moveables stay in frame, and can't go past sandbox
		(not quite sticky though)
	* scanners properly SCAN and display hits based on scanner attr
		(need to run diagnostics to check)
	* scanners only rudimentially indicate size (half ellipse gray shadow)

	need:
	* STAMP
	* GUESS
	* position reset

	when drawing:
	* assign data to the first element of a set, i.e. set[0].data('i', i)
	* moveables might have to be a single, un-nested, set of paths (not rect, circle),
		with no transformations  (transformPath and set new path instead).
*/

window.onload = function() {
  // create paper and make drawing functions
  	var R = Raphael(0, 0, '100%', '100%');
	h = 640 //window.innerHeight 	//480
	w = 1024 //window.innerWidth	//800
	line = 0.75*h; //line height
	length = 0.75*w

	var style = {
		fill: "#444",
		stroke: "#fff",
		"stroke-width": 3,
		"stroke-linejoin": "round"
	};


	function makeSandbox () {
	/*
	black box of sandbox--to be replaced
	*/
		R.setStart();
		var sandbox0 = R.path('M'+0.125*w+','+line+'h'+length+'v'+ 0.15*h +'h-'+length+'z').attr(style),
		//var sandbox1 = R.rect(0.1*w, line, length, 100).attr(style),
			//320 should be  var line (height)
			sandbox = R.setFinish();
		return (sandbox);
	};

	/**
	 * Makes a single ufo with the given size (due to scaling with the Element.transform 
	 * method) and the given number of stars opaque out of 5 (the rest are just outlined). 
	 * ***THE SCALING CURRENTLY DOES NOT WORK---THE INDIVIDUAL PATHS SCALE, BUT NOT TOGETHER
	 * The scanning light of the ufo is currently 
	 * The ufo body is made up of many different paths and colors, so the singular ufo
	 * is returned at the end of the method as a set that can be called all together. 
	 * <p>
	 * @param 	x 		the initial x-position of the ufo
	 * 			y 		the initial y-position of the ufo
	 * 			size 	the horizontal proportion of the ufo to a normal size
	 * 			stars 	the number of stars (representing efficacy) 
	 * @returns 	the set of paths that make up one ufo
	 * 
	 * 
	 **/
	var makeUfo = function (x, y, size, stars) {
    	var opac = 1; //to allow easy change of opacity to represent scanner reliability as in the original adult version
    	var r = size*length*0.5;
    	R.setStart();
    	var carry = R.path('M'+(x+100-r)+','+(y+30)+' \
    			a'+r+','+100+',0,1,1,'+r*2+',0z').attr({
	    		fill: '#222',
    			opacity: 0.2
    		}), //holder for data (and scanner width, coordinates)
    		lig=R.path("M" + x + "," + y + " l200,0 l0,100 l-200,0z").attr({
  		      	fill: "#555",
        		opacity: 0.2 		//to be changed when the scan button is pressed
    		}), // make this splay to size of scanner; some outline that fills when scanned perhaps
    		topBody = R.path(
        		"M" + x + "," + y + " c30,-100 170,-100 200,-2 c0,25 -200,25 -200,0").attr({
        		fill: "#2ac7d6",
            	"stroke-width": 3,
        		stroke: "#24b7c5",
        		opacity: opac
    		}),
        	bottom = R.path(
	        	"M" + (x + 60) + "," + (y + 18) + " c20,30 60,30 80,0 c-20,2 -60,2 -80,0 ").attr({
	        	fill: "#e0f4f6",
	            "stroke-width": 3,
	        	stroke: "#ceebee",
	        	opacity: opac
    		}),
        	/*dome = R.path(
	        	"M" + (x + 60) + "," + (y - 60) + " c20,-55 60,-55 80,0 c-20,-10 -60,-10 -80 0").attr({
	        	fill: "#093", //"#e0f4f6",
	            "stroke-width": 3,
	        	stroke: "#060", //#ceebee",
	        	opacity: 0.2
	    	}),	*/
        	num = 25, //to move location of each star to the right
        	fillColor = "#e1c222"; //to make empty stars (out of 5) for reliabilities
        for (i = 0; i < 5; i += 1) {
        	R.path("M" + (x + num) + "," + (y - 20) + " l10,0 l5,-10 l5,10 l10,0 l-10,6 l7,11 l-12,-7 l-12,7 l7,-11z").attr({
            	fill: fillColor,
            	stroke: "#d6a719",
            	opacity: opac
        	});
        	if (i==stars-1)
        	{
            	fillColor="#e0f4f6";
        	}
        	num += 30;
    	}	
    	var button = R.path(
	        	"M" + (x + 60) + "," + (y - 66) + " c10,-40 70,-40 80,0 c-20,8 -60,8 -80 0").attr({
	        	fill: "#093", //"#e0f4f6",
	            "stroke-width": 3,
	        	stroke: "#060", //#ceebee",
	        	opacity: 0.0
	    	});	//dome is now a button!
	    button.attr({path: Raphael.transformPath(button.attr('path'), 's0.01,0.01')});
    	var ufo = R.setFinish();
    	//ufo.transform("s"+String(size)); //need to fix scaling
    	var ufoConditions=[size, stars];
    	ufo[0].data({
			which: 'ship',
			online: 0,
			snapto: 0,
			unsnap: 0,
    		size: size,
    		length: size*length,
    		eff: stars2eff(stars),
    		beta: 1-stars2eff(stars) //see task.js
    	});    	
    	return ufo;
	};

	/**
	 *	Makes scanners in the shape of ufos with the given conditions for length
	 *  and number of stars (efficacy). Also lets scanners be dragged around 
	 *  screen. 
	 *  <p>
	 *  @para 		conditions for lengths and number of stars of scanners
	 *  @returns	the set of scanners
	 **/
	var makeScanners = function (conditions) {
		var randomSizes = conditions[0];
		var randomStars = conditions[1];
		var conds = new Array();
		for (var i = 0; i < 4; i++) {
        	var num1 = parseInt(Math.random() * (4-i)); //as array length decreases
        	var num2 = parseInt(Math.random() * (4-i));
        	var siz = randomSizes[num1];
        	var star = randomStars[num2];
        	conds.push([siz, star]);
       		randomSizes.splice(num1,1);    //at index num1, remove 1 item
        	randomStars.splice(num2,1);
    		}
		var ship0 = makeUfo(0.15*w, 0.2*h, conds[0][0], conds[0][1]),
			ship1 = makeUfo(0.15*w, 0.5*h, conds[1][0], conds[1][1]),
			ship2 = makeUfo(0.65*w, 0.2*h, conds[2][0], conds[2][1]),
			ship3 = makeUfo(0.65*w, 0.5*h, conds[3][0], conds[3][1]);

		var scanners=R.set(ship0, ship1, ship2, ship3);

		scanners.forEach(function(scanner) {
			scanner.drag(onSetMove(scanner), onSetStart(scanner), onSetStop(scanner))
			//scanner[0].data({ });
			scanner.dblclick(function () {
    			console.log(scanner.getBBox());
    			console.log('online: '+scanner[0].data('online')+' unsnap: '+scanner[0].data('unsnap')+'');
    		});
			////SCAN FUNCTION//// //maybe put outside this?
    		scanner[9].click(function () {
    			/*
    			scanner[9].animate({		//responsive button grow
    				path: scanner[9].transformPath(scanner[9].attr('path'), 's0.9,0.9')
    				}, 50, function () {
    					scanner[9].animate({
    						path: scanner[9].transformPath(scanner[9].attr('path'), 's1.11,1.11')
    					}, 50);
    				})
    		});*/
    			SCAN(scanner);
    		});
    		scanner[0].data({
    			xOrigin: scanner.getBBox().x,
    			yOrigin: scanner.getBBox().y
    		});
    	});
		return scanners;
	};

	function SCAN (scanner) {
		//alert(scanner[0].data('online'));
		if (scanner[0].data('online')) {
			var scannerx = scanner.getBBox().x,
				scannerx2 = scanner.getBBox().x2,
				hit = number2position(target) >= scannerx && number2position(target) <= scannerx2,
				displayhit = (Math.random() < scanner[0].data('eff')) ? hit : !hit;

			//alert('x:'+scannerx+' x2:'+scannerx2);
			console.log('hit: '+hit+' // displayhit: '+displayhit+' // eff: '+ scanner[0].data('eff')+'');
			if (displayhit) {
			scanner[1].animate({
				opacity:1,
				fill: '#06F' //"#2418df"
				},200,'bounce', function () {
					this.animate({
						opacity:0.2, 
						fill: '#555'
					},500,'<');
				});
			}
			else {
				scanner[1].animate({
					opacity:1,
					fill: '#F30'
				},200,'bounce', function () {
					this.animate({
						opacity:0.2, 
						fill: '#555'
					},500,'<');
				});
			};
			end.output[trial].clicks.push({
				"trial": trial,		// check
				//"click": end.output[trial].clicks[0].click + 1,		//number the clicks?, maybe just use array position
				"target": target,
				"x1": scannerx,
				"x2": scannerx2,
				"hit": hit,
				"displayhit": displayhit

			})

			return;
		}
		else {
			//fault?
			return;
		};
	};

	function makeClaw (x, y) {
		var carry = R.path('M' + x + ',' + y + 'm-70,0a70,70,0,1,0,140,0a70,70,0,1,0,-140,0z')
			.attr({
		//R.circle(x, 1.5 * y, 70).attr({
            	fill: '#000',
            	opacity: 0.2
        	}).toFront(),
	    	arm = R.path('M' + x + ',' + y + 'l30,60l-30,60l5,0l40,-60,l-30,-60').attr({
	            fill: '#999',
	            stroke: '#555',
	                'stroke-width': 3
	            }),
	        arm2 = R.path('M' + x + ',' + y + 'l-30,60l30,60l-5,0l-40,-60,l30,-60').attr({
	                fill: '#999',
	                stroke: '#555',
	                'stroke-width': 3
	            }),
	        ring = R.path('M' + x + ',' + y + 'm-15,0 a15,15,0,1,0,30,0a15,15,0,1,0,-30,0z')
	        	.attr({
	        //R.circle(x, y, 15).attr({
	                fill: '#093',
	                stroke: '#060',
	                'stroke-width': 3
	            }),
	        rring = R.path('M' + x + ',' + y + 'm-5,0 a5,5,0,1,0,10,0a5,5,0,1,0,-10,0z')
	        	.attr({
	        //R.circle(x, y, 5).attr({
	                fill: '#999',
	                stroke: '#555',
	                'stroke-width': 2
	            }),
	        //pull = R.path('M' + (x - 15) + ',' + y + 'l0,-' + 2*h + 'm30,0l0,' + 2*h + 'z').attr({fill: '#111', stroke: '#333',  'stroke-width': 2}),
	        claw = R.set(carry, arm, arm2, ring, rring);
	    claw.data({
				which: 'claw',
				online: 0,
				snapto: 0,
				unsnap: 0,
				button: 0,
				hit: 0,
				fault: 0
			});
		claw.dblclick(function () {
				console.log(claw.getBBox());
				console.log('online: '+claw[0].data('online')+' unsnap: '+claw[0].data('unsnap')+'');
				//alert(claw[0].data('online'));
				GUESS(claw);
		});
		claw.drag(onSetMove(claw), onSetStart(claw), onSetStop(claw));
	    return (claw);
	};

	function GUESS (claw) {
		if (claw[0].data('online')) {
			var clawx = claw.getBBox().x,
				clawx2 = claw.getBBox().x2,
				hit = number2position(target) >= clawx && number2position(target) <= clawx2;
			console.log(hit);
			claw.animate({
				transform: 't0,50'
			},500, 'backIn', function () {
				if (hit) {
					claw[0].data('hit',1);
					//gem appear
				}
				else {
					claw[0].data('hit',0)
				};
				claw.animate({
					transform: 't0,-'+(line+100)+''
				},1000, '>', function () {
					alert('splashscreen: ' + hit +'');
				});
			});
		}
		else {}
	};

	function initializeTrial (conditions) {
		trial = trial + 1;
		sandbox = makeSandbox();
		scanners = makeScanners(conditions);
		claw = makeClaw(0.5*w, 0.1*h);
		target = setTarget(1);
		end.output.push({
			"trial": trial,
			"conditions": conditions,
			"target": target,
			"guess": null,
			//time: time,
			"clicks": [],		//scandata = end.output[trial].clicks[]
			"correct": null
		})
		return;
	};

	function initializeSession (userID) {
		end = {"user": userID, "output":[]};
		trial = -1;		//cludge
		target = null;
		return;
	}

	//draw things!
	var frame = R.rect(0,0,w,h).attr({
		'stroke-width':2
	});

	initializeSession('testID');
	//alert(end.user);
	conditions=[[0.0625, 0.125, 0.25, 0.5], [1,2,3,4]]; //sizes, stars
	initializeTrial(conditions);
	sandbox.dblclick(function () {
		alert(end.output[0].target);
	});
};

////////////////////////
/// helper functions ///
////////////////////////

function number2position (num) {
	// 1:100 --> x-coordinate
	var pos = Math.floor(0.5*(w - length) + 0.01* num * length);
	return pos;
}

function position2number (pos) {
	// x-coordinate --> 1:100
	var num = (pos - 0.5 * (w - length)) * 100 / length;
	return num;
}

function setTarget (range) {
	var target = Math.floor(Math.random() * 100 + 1);
	// number from 1 to 100
	// not doing anything with range yet;
	// could use fewer than 100 numbers
	return target;
}

function stars2eff (stars) {
	var eff = 0.375 + 0.125 * stars;
	return eff;
}

// useful moves:
var appear = Raphael.animation({opacity:1.0}, 1);
var disappear = Raphael.animation({opacity:0.0}, 1);
var online = 0;
var unsnap = 0;
/*
var grow = Raphael.animation({		
			opacity: 1.0,
			path: Raphael.transformPath(this.attr('path'), 's100,100')
		},200,'bounce');
var shrink = Raphael.animation({
			opacity: 0.0,
			path: Raphael.transformPath(this.attr('path'), 's0.01,0.01')
		},200,'backIn');
*/