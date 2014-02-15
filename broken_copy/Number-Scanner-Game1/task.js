//Main task functionality. The various instructions_x.js files contain pieces of this

//draggable implementation before paper instantiation
Raphael.st.draggable = function (snap) {
    var me = this, //reference to the set to use inside the drag functions
        ox = 0, //relative origin
        oy = 0,
        lx = 0, //current location
        ly = 0,
        moveFunc = function (dx, dy, x, y) {
            //slow, clumsy checks that it doesn't go offscreen
            //over_x = ((me.getBBox().x < 0) && dx < 0) || ((me.getBBox().x2 > w) && dx > 0),
            //over_y = ((me.getBBox().y < 0) && dy < 0) || ((me.getBBox().y2 > h) && dy > 0),
            var o_x = (x < 0) || (x > w),
                o_y = (y < 0) || (y > h);
            if (snap == undefined || me.getBBox().y2 < snap || y < snap - 150) {
                lx = (o_x) ? lx : ox + dx; //update current location
                ly = (o_y) ? ly : oy + dy;
            } else if (y > snap-150) {
                lx = (o_x) ? lx : ox + dx; //only update horizontal movement
            }
            me.transform('t' + lx + ',' + ly);
        },
        startFunc = function () {},
        endFunc = function () {
            ox = lx;
            oy = ly;
        };
    this.drag(moveFunc, startFunc, endFunc);
};

Raphael.el.draggable = function (snap) {
    var me = this, //reference to the set to use inside the drag functions
        ox = 0, //relative origin
        oy = 0,
        lx = 0, //current location
        ly = 0,
        moveFunc = function (dx, dy, x, y) {
            var o_x = (x < 0) || (x > w),
                o_y = (y < 0) || (y > h);
            if (snap == undefined || me.getBBox().y2 < snap || y < snap - 150) {
                lx = (o_x) ? lx : ox + dx; //update current location
                ly = (o_y) ? ly : oy + dy;
            } else if (y > snap-150) {
                lx = (o_x) ? lx : ox + dx; //only update horizontal movement
            }
            me.transform('t' + lx + ',' + ly);
        },
        startFunc = function () {},
        endFunc = function () {
            ox = lx;
            oy = ly;
        };
    this.drag(moveFunc, startFunc, endFunc);
};

window.onload = function () {
    var R = Raphael(0, 0, "100%", "100%");
        h = window.innerHeight, //global
        w = window.innerWidth;  //global

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
    claw.box = claw.getBBox();
    return (claw);
},

    makeSandbox = function (level) {
        var outline = '#050', //'#030',
            horiz = '#0A0', //'#093',
            vert = '#083'; //'#060';
        R.setStart();
        var front = R.rect(0.1 * w - 7.5, 0.8 * h - 15, 0.8 * w + 15, 50).attr({
                    fill: vert,
                    stroke: outline,
                    'stroke-width': 3
                }),
            top = R.path([
                    ['m', 0.1 * w - 30, 0.8 * h],
                    ['l', 30, -90],
                    ['h', 0.8 * w],
                    ['l', 30, 90],
                    ['z']
                    ]).attr({
                        fill: horiz,
                        stroke: outline,
                        'stroke-width': 3
                }),
            center = R.path([
                        ['m', 0.1 * w - 7.5, 0.8 * h - 15],
                        ['l', 20, -60],
                        ['h', 0.8 * w - 25],
                        ['l', 20, 60],
                        ['z']
                        ]).attr({
                            fill: vert,
                            stroke: outline,
                            'stroke-width': 3
                    }),
            back = R.rect(0.1 * w + 12.5, 0.8 * h - 75, 0.8 * w - 25, 50).attr({
                            fill: vert,
                            stroke: outline,
                            'stroke-width': 3
                    }),
            bot = R.path([
                        ['m', 0.1 * w + 12.5, 0.8 * h - 25],
                        ['l', -4, 10],
                        ['m', 0.8 * w - 17, 0],
                        ['l', -4, -10]
                        ]).attr({
                            stroke: outline,
                            'stroke-width': 3
                        }),
            topfront = R.rect(0.1 * w - 30, 0.8 * h, 0.8 * w + 60, 15).attr({
                            fill: horiz,
                            stroke: outline,
                            'stroke-width': 3
                        });
        if (level == 'full') {          //different levels for intro:
            var sand = R.path([
                ['m', 0.1 * w, 0.8 * h - 17],
                ['l', 15, -50],
                ['l', 0.8 * w - 30, 0],
                ['l', 15, 50],
                ['z']
                ]).attr({
                    fill: '#FF9',
                    stroke: '#CC9',
                    'stroke-width': 1
                });
        } else if (level == 'half') {
            var sand1 = R.path([
                ['m', 0.1 * w + 6, 0.8 * h - 17],
                ['l', 10, -32],
                ['l', 0.8 * w - 30, 0],
                ['l', 10, 32],
                ['z']
                ]).attr({
                    fill: '#FF9',
                    stroke: '#CC9',
                    'stroke-width': 1
                });
            }
    var s = R.setFinish();
    //s.transform('s)
    return (s);
    },
    makeScanners = function(sizes, efficacies) {
        //creates as many scanners as specified by sizes.length, and creates text next to them
        // efficacies = shuffle(efficacies);
    var actual_efficacies = efficacies;
    var scnrs = [],
        z = 0;
        for (var i=0; i < sizes.length; i++){
            var fill = 1-efficacies[i];
            scnrs.push(R.rect(.10*w, (line_height-(40-(5*z)))*.01*h, sizes[z]*nll, .05*h, 10).attr({fill: "hsb(.35,.4, .8 )", stroke: "white", opacity: efficacies[z]*efficacies[z]}).data('eff', 1 ).data('beta', (1-efficacies[z])).data('pos', [.10*w,(line_height-(40-(5*z)))*.01*h]));
            R.text(.09*w,(line_height-(38 -z*5))*.01*h, String(efficacies[i]*100+'%')).attr({fill:'#333'});
            z++;
        }
        return scnrs;
    }, 
makeUfo = function (x, y) {
    R.setStart();
    var opac = 1; //to allow easy change of opacity to represent scanner reliability as in the original adult version
    topBody = R.path(
        "M" + x + "," + y + " c30,-100 170,-100 200,-2 c0,-25 -200,-25 -200,0").attr({
        fill: "#2ac7d6",
            "stroke-width": 3,
        stroke: "#24b7c5",
        opacity: opac
    }),
    //"M100,200 C130,100 270,100 300,200 C300,175 100,175 100,200"
    dome = R.path(
        "M" + (x + 60) + "," + (y - 60) + " c20,-55 60,-55 80,0 c-20,-10 -60,-10 -80 0").attr({
        fill: "#e0f4f6",
            "stroke-width": 3,
        stroke: "#ceebee",
        opacity: opac
    }),
    bottom = R.path(
        "M" + x + "," + y + " c0,25 200,25 200,0 c0 -25 -200,-25 -200,0").attr({
        fill: "#25a4d2",
            "stroke-width": 3,
        stroke: "#249ac5",
        opacity: opac
    }),
    opening = R.path("M" + (x + 25) + "," + y + " c20,15 120,15 145,0 c-20,-15 -120,-15  -145,0").attr({
        fill: "#8acde5",
            "stroke-width": 3,
        stroke: "#6cc1df",
        opacity: opac
    }),
    spikes = R.path("M" + (x + 30) + "," + (y + 10) + " l15,0 l-7.5,20z M" + (x + 150) + "," + (y + 10) + " l15,0 l-7.5,20z M" + (x + 90) + "," + (y - 15) + " l15,0 l-7.5,20z").attr({
        fill: "#808080",
        stroke: "#636363",
            "stroke-width": 2,
        opacity: opac
    }),
    //"M100,200 C100,225 300,225 300,200 C300,175 100,175 100,200"

    num = 25, //to move location of each star to the right
    fillColor = "#e1c222"; //to make empty stars (out of 5) for reliabilities
    for (i = 0; i < 5; i += 1) {
        R.path("M" + (x + num) + "," + (y - 40) + " l10,0 l5,-10 l5,10 l10,0 l-10,6 l7,11 l-12,-7 l-12,7 l7,-11z").attr({
            fill: fillColor,
            stroke: "#d6a719",
            opacity: opac
        });
        num += 30;
    }
    //"M125,225 L135 225 L140 215 L145 225 L155 225 L145 231 L152 242 L140 235 L128 242 L135 231z

    //light initialization should occur only when the SCAN button is pressed
    /*var light = R.path("M" + x + "," + y + " l200,0 l0,100 l-200,0z").attr({
            fill: "#2418df",
            opacity: 0.25
        }),
        //"M100,200 C100,225 300,225 300,200 L300 300 L100 300z" */
    ufoSet = R.setFinish();
    ufoSet.getBBox().y2
    return ufoSet;
},
    //maketest = function{
    //    R.startset();
    //    R.circle

    var nll = .66*w, //number line length
        snap_to = 0.8 * h - 44, //snap-to guide
        line_height= snap_to, //legacy (75)
        sandBox = makeSandbox('full'),
        claw = makeClaw(0.85 * w, 0.15 * h),
        c = claw.getBBox();
    claw.draggable(snap_to);
    var ufo = makeUfo(0.5 * w, 0.2 * h);
    ufo.draggable(snap_to); 

    if (parent.topframe.trial == parent.topframe.total_trials-1)
    {
        //go to the last screen if we've run all the trials.
        go_to_end = true;
    }
        //remove these?
        var urlString = document.URL;
        var urlParams = parseURLParams(urlString);

    //check whether you're continuing a previous session or not. Ensures that the right variables persist.
    StartSession();
    
    //actually create scanners
    var tmpscanners = makeScanners(parent.topframe.conditions[parent.topframe.trial][0],parent.topframe.conditions[parent.topframe.trial][1]);
    var r = tmpscanners[0],
    g = tmpscanners[1],
    b = tmpscanners[2],
    p = tmpscanners[3];
    var scanners = [r,g,b,p];
    
    //various helper variables controlling which buttons can be clicked when, whether crosshairs move, etc.
    var next_click_is_allowed = false; // can't click next unless crosshairs is on line
    var scannable = false; // button won't click unless a scanner is in place
    var crosshairs_are_moveable = false; //can't use crosshairs until scanned at least once
    var go_to_end = false; //receives message from frame.js telling it to end the experiment (send data, etc.)
    var printIndex = 0; // used for determining y-axis location of print statements (for debugging)
    
    //game = 0: single-number game. game = 1 would be the 'range' version, which is currently not fully implemented.
    var game = 0;

    //set target (pick random location)
    var target = setTarget(game);

    //make target appear if you need it for testing
    // var t = R.circle(target[0], String(line_height+.2)+'%', 3).attr({fill: 'red'});

    var d = new Date();
    var time = String(d.getMonth()+1) + '/' + String(d.getDate())+ '/' + String(d.getHours()) +':' + String(d.getMinutes()) + ':' + String(d.getSeconds());
    
    //additional variables (efficacy, length) needed to push to data on each trial for conditions in which these 
    //vary from trial to trial.
    var effic = [];
    var len = [];
    for (i=0; i<scanners.length; i++)
    {
        effic.push(1.0-scanners[i].data('beta'))
        len.push(absolute_to_relative(scanners[i].attr('width')))
    }

    //JSON object that gets written to 'data' field in mongodb.
    var output = {'trial':null, 'available_scanners':[len, effic], 'clicks':[], 'guess':null, 'target':null, 'certainty':null, 'correct':null, 'time':time};
/*
    //crosshairs functionality
    c.node.onclick = function()
    {
        if (!crosshairs_are_moveable){
            top_alert("<p>You may only move the crosshairs after you have used at least one scanner on the number line.</p>", "<p>Find the number!<p>");
        }
        if (h*.01*(line_height-5)<(c.attr('y')+25) && (c.attr('y')+25)<h*.01*(line_height+2))
        {
            next_click_is_allowed = true;
        }

    }
    c.node.onmouseover = function()
    {
        if (!crosshairs_are_moveable)
        {
            top_alert("<p>You may only move the crosshairs after you have used at least one scanner on the number line.</p>", "<p>Find the number<p>");
        }
    }
    */
    //controls click of 'scan' button. Don't change variable name here; it's called in other files.
    mainButtonClick = function()
    {
        scanners_on_line = 0;
        for (var i=0; i < scanners.length; i++)
        {
            var yloc = String(70+i*3)+'%';
            if (isScannerOnLine(scanners[i])==true) //if a scanner is on the number line
                {   scanners_on_line += 1;
                    scannable = true;
                }
            };
        if (scanners_on_line == 1) //This is the correct number of scanners to have on line. Scan.
        {
            for (var i=0; i < scanners.length; i++)
            {
                if (isScannerOnLine(scanners[i])==true)
                {
                    scan(scanners[i]);
                    crosshairs_are_moveable = true
                    scannable = false
                    setTimeout(function()
                    {
                        for (var j=0; j<scanners.length; j++)
                        {
                            scanners[j].animate({x: scanners[j].data('pos')[0], y:scanners[j].data('pos')[1]});
                        }
                    },400);
                }
            }

            //Allows scanner and crosshairs objects to be moveable
            R.set(r,g,b,p).drag(move, start, up);
        }
        else //Don't scan.
        {
          if (!scannable)
          {
                //No scanner on the line
                top_alert('<p>You must place a scanner on the number line before clicking \'SCAN\'.</p>', '<p>Find the number!</p>')
            }
            else
            {
                //Too many scanners on the line. Return them to original positions and display appropriate message.
                for (var j=0; j<scanners.length; j++)
                {
                    scanners[j].animate({x: scanners[j].data('pos')[0], y:scanners[j].data('pos')[1]});
                }
                setTimeout(function()
                {
                    top_alert('<p>Only one scanner can be on the number line.</p>', '<p>Find the number!</p>');
                }, 300);
                scanners_on_line = 0;
                scannable = false;
            }
        }
    };
    top_alert = function(new_text)
    {
        //temporarily displays new_text on top frame.
        old_text = parent.topframe.document.getElementById("tutorial").innerHTML;
        parent.topframe.document.getElementById("tutorial").innerHTML = new_text;
        setTimeout(function()
        {
            parent.topframe.document.getElementById("tutorial").innerHTML = old_text;
        }, 2000);
    };
    
    nextButtonClick = function()
    {
        //governs click of 'next' button
        //there's a little built in wiggle room so that the crosshairs doesn't have to be exactly on the line
        if (h*.01*(line_height-12)<(c.attr('y')+25) && (c.attr('y')+25)<h*.01*(line_height+5))
        {
            var xPos = c.attr('x')+25;
            var floor = .17*w;
            var range = .66*w;
            var num = ((xPos - floor)/(range))*100;
            var a = Math.round(num);
            next_click_is_allowed = true;
        }
        else
        {
            top_alert("<p>Place the crosshairs on the number line first</p>", "<p>Find the number!</p>");
        }
        if (next_click_is_allowed == true)
        {
            //pushing data to 'output'
            output.guess = convert_to_number_line(xPos);
            output.target = convert_to_number_line(target[0]); //remove the indexing if you ever run the 'range' condition.
            output.trial = parent.topframe.trial;
            did_user_find_target = inCrosshairs();
            output.correct = did_user_find_target;
            parent.topframe.found_target = did_user_find_target; //you need this so that GetInterstitial(found_target) can run properly.
            parent.topframe.output = output;
            setTimeout(function()
            {
                GetCertaintyJudgment();
            }, 500);
        }
    };

    //Helper functions//

    isScannerOnLine = function(scanner)
    {
        //Takes a scanner as argument, returns whether it's on the number line
        if (window.innerHeight*.01*(line_height-3.5)<scanner.attr('y') && scanner.attr('y')<window.innerHeight*.01*line_height)
            return true;
        else
            return false;
    }
    scan = function(scanner)
    {   
        //Takes a scanner as argument, returns the result of scanning the number line below it.
        left = scanner.attr('x');
        right = left + scanner.attr('width');
        works = (scanner.data('eff') >= Math.random()); //scanner will function with frequency given by scanner.eff
        correct_signal = (scanner.data('beta') <= Math.random()); //scanner will return true signal with p(scanner.beta)
        signal = 'none';
        if (works)
        {
            //single target
            if (target.length == 1)
            {
                //found the target
                if (left <=target[0] && target[0] <= right)
                {
                    if (correct_signal)
                    {
                        signal = 'yes';
                        scanner.glow({color: "hsb(.6, 1, 1)", width: 5});
                    }
                    else
                    {
                        signal = 'no';
                        scanner.glow({color: "red",width: 5});
                    }
                }
                //missed the target
                else
                {
                    if (correct_signal)
                    {
                        signal = 'no';
                        scanner.glow({color: "red",width: 5});
                    }
                    else
                    {
                        signal = 'yes';
                        scanner.glow({color: "hsb(.6, 1, 1)",width: 5});
                    }
                }
            }
            else
            {
                //this is for 'range' game. Probably d/n work.
                ////this part has no false signals implemented.
                alert('range game');
                //missed the target
                if (left>target[1] || right<target[0])
                {
                    scanner.glow({color: "red",width: 5});
                    print('no overlap');
                }
                else
                {
                    overlap = getOverlap(target, [left, right]);
                    col = makeHSB(overlap);
                    scanner.glow({color:col,width: 5});
                    print('overlap');
                    print(overlap);
                }
            }
        }
        else
        {
            scanner.animate({opacity: .2}, 1000, 'bounce');
            setTimeout(function()
                {scanner.animate({opacity: .5}, 1000, 'bounce')}, 700);
        }
        //Append new click data (scanner width, location_left, location_right, result) to the output array
        output.clicks.push([absolute_to_relative(scanner.attr('width')), 1-scanner.data('beta'), convert_to_number_line(left), convert_to_number_line(right), signal]);
    };
    getOverlap = function(targetRange, scannerRange)
    {
        scannerLength = scannerRange[1] - scannerRange[0];
        if (inRange(targetRange, scannerRange[0]) && inRange(targetRange, scannerRange[1]))
        {
            return 1;
        }
        else if (inRange(targetRange, scannerRange[0]) && (!inRange(targetRange, scannerRange[1])))
        {
            return (targetRange[1] - scannerRange[0])/(scannerLength);
        }
        else if ((!inRange(targetRange, scannerRange[0])) && !inRange(targetRange, scannerRange[1]))
        {
            return (scannerRange[1] - targetRange[0])/(scannerLength);
        }
    }

    inCrosshairs = function()
    {
        if (target.length == 1)
        {
            if ((c.attr('x')+.0065*w) <= target[0] && target[0]<= (c.attr('x')+.0235*w))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    crosshairCompare = function()
    //this will be in pixel difference I believe
    //this is also only for a single target and doesn't apply to the range condition
    {
        if (target.length ==1)
        {
            diff = (c.attr('x')+25)-target[0];
            if (diff<0)
            {
                diff = diff*(-1);
            }
            return diff
        }
    };
    inRange = function(range, num)
    {
        if (num>range[0] && num<range[1])
            return true;
        else
            return false;
    }
    print = function(string)
    {
        //helper function for easy printing
        height = 70+printIndex;
        stringHeight = String(height)+'%';
        R.text('50%', stringHeight, string).attr({fill: 'white'});   
        printIndex +=2;
    };
    var start = function () {
        this.ox = this.attrs.x;
        this.oy = this.attrs.y;
        this.animate({opacity: .25}, 500, ">");
    },
    move = function (dx, dy) {
        this.attr({x: this.ox + dx, y: this.oy + dy});
    },
    up = function () {
        this.animate({opacity: (1-this.data('beta'))*(1-this.data('beta'))}, 700, "bounce");
    };
    makeHSB = function(num)
    {
        //sets the saturation value of HSV string to 'num'
        str = "hsb(.3,"+num.toString()+",1)";
        return str;
    };
    R.set(scanners).drag(move, start, up);
};
convertNumber = function(num)
{
        //converts number-line coordinates to absolute coordinates
        range = .66*window.innerWidth;
        left = .17*window.innerWidth;
        newNum = left + num*.01*range;
        return newNum;
    };
    setTarget = function(game)
    {
        //picks a random number bet. 1-100, sets as target
        //game==0: single number game
        //game ==1: range game
        var target = [];
        target.push(convertNumber(Math.floor(Math.random()*101)));
        if (game==0)
        {
            return target;
        }
        else
        {
            //push a second target
            target.push(convertNumber(Math.floor(Math.random()*101)));
            //put them in [small, large] order.
            if (target[1]<target[0])
            {
                tmp = target[0];
                target[0] = target[1];
                target[1] = tmp;
            }
            return target;
        }
    };
    function parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1;
      var queryEnd   = url.indexOf("#") + 1 || url.length + 1;
      var query      = url.slice(queryStart, queryEnd - 1);
      if (query === url || query === "") return;
      var params  = {};
      var nvPairs = query.replace(/\+/g, " ").split("&");
      for (var i=0; i<nvPairs.length; i++) {
        var nv = nvPairs[i].split("=");
        var n  = decodeURIComponent(nv[0]);
        var v  = decodeURIComponent(nv[1]);
        if ( !(n in params) ) {
          params[n] = [];
      }
      params[n].push(nv.length === 2 ? v : null);
  }
  return params;
};
getSession = function(userID)
{
  var result = 0;
  $.ajax({
      type: "POST",
      datatype: "json",
      url: "http://198.61.169.95/pedro/js/intro.php",
      data: userID,
      async: false,
      success: function(data,status){
            //alert("Data: " + data);
            result = data;
        },
        error: function(){
            alert('failure to query database');
        },
    });
  return result
};
var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
        || this.searchVersion(navigator.appVersion)
        || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
    {
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    },
    {   string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    },
    {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    },
    {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    },
    {
        string: navigator.vendor,
        subString: "iCab",
        identity: "iCab"
    },
    {
        string: navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
    },
    {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    },
    {
        string: navigator.vendor,
        subString: "Camino",
        identity: "Camino"
    },
        {       // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {       // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
        ],
        dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
     },
     {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }
    ]

};
BrowserDetect.init();

convert_to_number_line = function(num)
{
    floor = .17*w;
    range = .66*w;

    var newnum = ((num-floor)/(range))*100.0;
    var a = Math.round(newnum);
    return a;

};
absolute_to_relative = function(num)
{
    range = .66*w;
    return num*1.0/range;
};

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

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
