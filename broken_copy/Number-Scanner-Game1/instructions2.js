
            //complete. gets sessions, writes to database, has all scanner functionality, 
            window.onload = function () {
                var R = Raphael(0, 0, "100%", "100%"),
                    line_height = 75;
                    outline = R.rect('33%', String(line_height-2)+'%', '34%', 32,10).attr({stroke: "grey","stroke-dasharray":"--", opacity: 1}),
                    line = R.rect('17%', String(line_height)+'%', '66%', 2).attr({fill: "white", stroke: "red", opacity: 1}),
                    number_line_start = R.text('17%', String(line_height+2)+'%', '1').attr({fill: '#333'}),
                    number_line_end = R.text('83%', String(line_height+2)+'%', '100').attr({fill: '#333'}),
                    // button = R.rect('47%', String(line_height+10)+'%', '6%', 23, 3).attr({fill: '#CCC', stroke: "red", opacity: 1}),
                    // button_text = R.text('50%', String(line_height+12)+'%', 'SCAN').attr({fill: 'black'}),

                    // textbox = R.rect('15%', '2%', '70%', 150, 5).attr({stroke:"white", opacity:1}),
                    // textbox_button = R.rect('77%', '17%', '6%', 23, 4).attr({fill: '#CCC', stroke:'red'}),
                    // textbox_button_text = R.text('79.9%', '19%', 'Continue').attr({fill: 'black', 'font-size':13}),
                    
                    // t1= "On the next screen we will play a game. I will think of a number somewhere on the \
                    // number line, and you will use",
                    // t2="scanners to try to find it."
                    // i1 = R.text('50%', '5%', t1).attr({fill: '#fff', 'font-size':18}),
                    // i2 = R.text('50%', '8%', t2).attr({fill: '#fff', 'font-size':18}),

                    h = window.innerHeight,
                    w = window.innerWidth,
                    nll = .66*w; //number line length

                    makeScanners = function(sizes, efficacies)
                    {
                        var scnrs = [],
                        z = 0;
                        for (var i=0; i < sizes.length; i++){
                            var fill = 1-efficacies[i];
                            scnrs.push(R.rect(.10*w, (line_height-(40-(5*z)))*.01*h, sizes[z]*nll, .05*h, 10).attr({fill: "hsb(.35,.4, .8 )", stroke: "white", opacity: efficacies[z]*efficacies[z]}).data('eff', 1 ).data('beta', (1-efficacies[z])).data('pos', [.10*w,(line_height-(40-(5*z)))*.01*h]));
                            R.text(.09*w,(line_height-(38 -z*5))*.01*h, String(efficacies[i]*100+'%')).attr({fill:'#333'});
                            z++;
                        }
                        return scnrs;    
                    }
                    ////scanners

                    //'beta' is the failure probability. success is 1-beta.
                    //length-only condition
                    // r = R.rect(.10*w,(line_height-40)*.01*h,.125*nll,30,10).attr({fill: "hsb(.35,.4,.4)", stroke: "white", opacity: .5,}).data('eff', 1).data('beta',0).data('pos', [100,100]),
                    // g = R.rect(.10*w,(line_height-35)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,.6)", stroke: "white", opacity: .5}).data('eff', 1).data('beta',0).data('pos', [100,150]),
                    // b = R.rect(.10*w,(line_height-30)*.01*h,.5*nll,30,10).attr({fill: "hsb(.35,.4,.8)" stroke: "white", opacity: .5}).data('eff', 1).data('beta',0).data('pos', [100,200]),
                    // p = R.rect(.10*w,(line_height-25)*.01*h,.75*nll,30,10).attr({fill: "hsb(.35,.4,1)", stroke: "white", opacity: .5}).data('eff', 1).data('beta',0).data('pos', [100,250]),
                    
                    //reliability-only condition
                    // r = R.rect(.10*w,(line_height-40)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,.4)", stroke: "white", opacity: .5,}).data('eff', 1).data('beta',.75).data('pos', [100,100]),
                    // g = R.rect(.10*w,(line_height-35)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,.6)", stroke: "white", opacity: .5}).data('eff', 1).data('beta',.5).data('pos', [100,150]),
                    // b = R.rect(.10*w,(line_height-30)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,.8)", stroke: "white", opacity: .5}).data('eff', 1).data('beta',.25).data('pos', [100,200]),
                    // p = R.rect(.10*w,(line_height-25)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,1)", stroke: "white", opacity: .5}).data('eff', 1).data('beta',0).data('pos', [100,250]);
                    
                    //crossed condition

                    // r = R.rect(.10*w,(line_height-40)*.01*h,.125*nll,30,10).attr({fill: "hsb(.35,.4,.4)", stroke: "white", opacity: .4}).data('eff', 1).data('beta',0).data('pos', [100,100]),
                    // g = R.rect(.10*w,(line_height-35)*.01*h,.25*nll,30,10).attr({fill: "hsb(.35,.4,.6)", stroke: "white", opacity: .4}).data('eff', 1).data('beta',.25).data('pos', [100,150]),
                    // b = R.rect(.10*w,(line_height-30)*.01*h,.5*nll,30,10).attr({fill: "hsb(.35,.4,.8)", stroke: "white", opacity: .4}).data('eff', 1).data('beta',.5).data('pos', [100,200]),
                    // p = R.rect(.10*w,(line_height-25)*.01*h,.75*nll,30,10).attr({fill: "hsb(.35,.4,1)", stroke: "white", opacity: .4}).data('eff', 1).data('beta',.75).data('pos', [100,250]);


                    // c = R.image("imagebot2.svg", .48*w, (line_height+15)*.01*h, 50, 50).attr({fill: "green", opacity: 1}).data('pos', [.48*w,.90*h]);

                var tmpscanners = makeScanners(efficacies[0], efficacies[1]);
                var r = tmpscanners[0],
                g = tmpscanners[1],
                b = tmpscanners[2],
                p = tmpscanners[3];
                var scanners = [r,g,b,p];

                var nextable = false; // can't click next unless crosshairs is on line
                var scannable = false; // button won't click unless a scanner is in place
                var printIndex = 0; // used for determining y-axis location of print statements (for debugging)
                var game = 0; // 0 = single number, 1 = range

                var target = setTarget(game);

                //This is what gets sent to the database when people click the 'next' button.
                var output = {'user':null, 'trial':null, 'target':target, 'clicks':[], 'result':[]};

                var urlString = document.URL;
                // var urlParams = parseURLParams(urlString);


                // alerted = function(){

                //     if (!scannable){
                //         alert("You may only move the crosshairs after you have used at least one scanner on the number line")
                //     }
                // }


                //Main function
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
                                scanners[i].glow({color: "red", width: 5}); 
                            }
                        }
                        //animate the crosshairs
                        R.set(r, g, b, p).drag(move, start, up);
                        ScanClick();
                    }
                    else //Don't scan.
                    {
                      if (!scannable)
                        {
                            top_alert('<p>You must place a scanner on the number line before clicking \'SCAN\'.</p>');
                            // setTimeout(function()
                            // {
                            //     top_alert('<p>You must place a scanner on the number line before clicking \'SCAN\'.</p>');
                            //     // button.animate({opacity: 1}, 700, '>');
                            // }, 700);
                        }
                        else
                        {
                            //Too many scanners on the line.

                            for (var i=0; i<scanners.length; i++)
                            {
                                scanners[i].animate({x: scanners[i].data('pos')[0], y:scanners[i].data('pos')[1]});
                            }
                            top_alert('<p>Only one scanner can be on the number line.</p>');
                            // setTimeout(function()
                            // {
                            //     top_alert('<p>Only one scanner can be on the number line.</p>');
                            //     }, 300);
                        }
                    }
                   
                    
                };


                nextButtonClick = function()
                {
                    if (h*.01*(line_height-5)<(c.attr('y')+25) && (c.attr('y')+25)<h*.01*(line_height+2))
                        //there's a little built in wiggle room so that the crosshairs doesn't have to be exactly on the line
                    {
                        var xPos = c.attr('x')+25;
                        var floor = .17*w;
                        var range = .66*w;
                        var num = ((xPos - floor)/(range))*100;
                        var a = Math.round(num);
                        alert("You chose " + a + " as the target.");
                        nextable = true;
                    }
                    else
                    {
                        top_alert("<p>Place the crosshairs on the number line first</p>");
                    }
                    if (nextable == true)
                    {
                        //pushing the absolute coordinate since that's what is stored in target
                        // output.result.push(xPos);
                        // output.user = userID;
                        // output.trial = trial;
                        // sendData(output);
                        setTimeout(function()
                        {
                            c = "c="+userID; //store userID
                            d = "d="+cond; //store condition
                            e = "e="+String(trial+1); //store trial #
                            //add c,d,e to url of next page.
                            window.location.href = 'http://198.61.169.95/pedro/js/index.html?'+c+'&'+d+'&'+e;
                            // window.location.href = 'file:///Users/pedro/Desktop/js_new/index.html';
                        }, 500);
                        
                    }
                };
                

                //Helper functions//
                top_alert = function(new_text)
                {
                    old_text = parent.topframe.document.getElementById("tutorial").innerHTML;
                    parent.topframe.document.getElementById("tutorial").innerHTML = new_text;
                    setTimeout(function()
                    {
                        parent.topframe.document.getElementById("tutorial").innerHTML = old_text;
                    }, 2000);
                }
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
                                    signal = 'red';
                                    scanner.glow({color: "red", width: 5});

                                }
                                else
                                {
                                    signal = 'blue';
                                    scanner.glow({color: "hsb(.6, 1, 1)", width: 5});

                                }

                            }
                            //missed the target
                            else
                            {
                                if (correct_signal)
                                {
                                    signal = 'blue';
                                    scanner.glow({color: "hsb(.6, 1, 1)", width: 5});

                                }
                                else
                                {
                                    signal = 'red';
                                    scanner.glow({color: "red", width: 5});
                                }
                            }
                        }
                        //
                        else
                        {
                            ////this part has no false signals implemented.
                            alert('range game');
                            //missed the target
                            if (left>target[1] || right<target[0])
                            {
                                scanner.glow({color: "red", width: 5});
                                print('no overlap');
                            }
                            else
                            {
                                overlap = getOverlap(target, [left, right]);
                                col = makeHSB(overlap);
                                scanner.glow({color:col, width: 5});
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
                    output.clicks.push([scanner.attr('width'),left, right, signal]);
                    // NextClick();
                };

                sendData = function(data_to_send)
                {
                  // print(data_to_send.left);
                  $.ajax({
                  type: "POST",
                  datatype: "json",
                  url: "http://198.61.169.95/pedro/js/write_to_mongo.php",
                  data: data_to_send,
                  success: function(data) {
                      alert('Great! Now let\'s try again with another number line');
     //                  setTimeout(function()
                 // {window.location.href = 'file:///Users/pedro/Desktop/js_new/index.html'}, 500)
                  },
                  error: function(){
                    alert('failure to send to database');
                }
                });
                }

                getOverlap = function(targetRange, scannerRange)
                {
                    scannerLength = scannerRange[1] - scannerRange[0];
                    //scanner 
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
                    this.animate({opacity: .5}, 700, "bounce");
                };
                makeHSB = function(num)
                {
                    //sets the saturation value of HSV string to 'num'
                    str = "hsb(.3,"+num.toString()+",1)";
                    return str;
                };
                R.set(r, g, b, p).drag(move, start, up);
            };
                convertNumber = function(num)
                {
                    //converts percentages to absolute coordinates
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
                function ScanClick()
                {
                    mainButtonClick();
                    NextClick();
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
                
                
