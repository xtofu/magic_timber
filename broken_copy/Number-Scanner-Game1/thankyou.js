
            //complete. gets sessions, writes to database, has all scanner functionality, 
            window.onload = function () {
                var R = Raphael(0, 0, "100%", "100%"),
                    line_height = 75;

                    h = window.innerHeight,
                    w = window.innerWidth,
                    nll = .66*w; //number line length


                var nextable = false; // can't click next unless crosshairs is on line
                var scannable = false; // button won't click unless a scanner is in place
                var printIndex = 0; // used for determining y-axis location of print statements (for debugging)
                var game = 0; // 0 = single number, 1 = range

                var target = setTarget(game);

                //This is what gets sent to the database when people click the 'next' button.
                var output = {'user':null, 'trial':null, 'target':target, 'clicks':[], 'result':[]};


                var urlString = document.URL;
                var urlParams = parseURLParams(urlString);

                var userID = urlParams['c'];
                ID = R.text('49%', '22%', userID).attr({fill: 'red', 'font-size':20});

                //Sends data when the 'next' button is clicked. Use window.location.href command to send people to a new page.
                // c.node.onclick = function()
                // {
                //     if (!scannable){
                //         alert("You may only move the crosshairs after you have used at least one scanner on the number line")
                //     }
                //     if (h*.01*(line_height-5)<(c.attr('y')+25) && (c.attr('y')+25)<h*.01*(line_height+2))
                //     {
                //         var next_button = R.rect('90%', '90%', '6%', 23, 2).attr({fill: '#CCC', stroke: "red", opacity: 1}),
                //             next_button_text = R.text('93%', '92%', 'NEXT').attr({fill: 'black'});

                //         next_button.node.onclick = function()
                //         {
                //             nextButtonClick();
                //         }

                //         next_button_text.node.onclick = function()
                //         {
                //             nextButtonClick();
                //         }
                //     }
                // }

                alerted = function(){

                    if (!scannable){
                        alert("You may only move the crosshairs after you have used at least one scanner on the number line")
                    }
                }

                // c.node.onmouseover = function(){
                //     alerted();
                // }

                // c.node.ondragstart = function()
                // {
                //     alerted();
                // }

                // button.node.onclick = function()
                // {
                //     mainButtonClick();
                // }
                // button_text.node.onclick = function()
                // {
                //     mainButtonClick();
                // }

                // //Main function
                // mainButtonClick = function()
                // {
                //     scanners_on_line = 0;
                //     for (var i=0; i < scanners.length; i++)
                //     {
                //         var yloc = String(70+i*3)+'%';
                //         if (isScannerOnLine(scanners[i])==true) //if a scanner is on the number line
                //             {   scanners_on_line += 1;
                //                 scannable = true;
                //                 button.animate({fill:'white'}, 200, '<');
                //                 setTimeout(function()
                //                 {
                //                     button.animate({fill: '#CCC'}, 700, '<');}, 200);
                //             }
                //     };
                //     if (scanners_on_line == 1) //This is the correct number of scanners to have on line. Scan.
                //     {
                //         for (var i=0; i < scanners.length; i++)
                //         {
                //             if (isScannerOnLine(scanners[i])==true)
                //             {
                //                 button.animate({fill:'white'}, 200, '<');
                //                 setTimeout(function()
                //                 {
                //                     button.animate({fill: '#CCC'}, 700, '<');}, 200);
                //                 scan(scanners[i]);  
                //             }
                //         }
                //         //animate the crosshairs
                //         R.set(r, g, b, p, c).drag(move, start, up);

                        
                //     }
                //     else //Don't scan.
                //     {
                //       if (!scannable)
                //         {
                //             //No scanner on the line
                //             button.animate({opacity: .7}, 700, 'bounce');
                //             setTimeout(function()
                //             {
                //                 alert('You must place a scanner on the number line before clicking \'SCAN\'.');
                //                 button.animate({opacity: 1}, 700, '>');}, 700);
                //         }
                //         else
                //         {
                //             //Too many scanners on the line.

                //             for (var i=0; i<scanners.length; i++)
                //             {
                //                 scanners[i].animate({x: scanners[i].data('pos')[0], y:scanners[i].data('pos')[1]});
                //             }
                //             setTimeout(function()
                //             {
                //                 alert('Only one scanner can be on the number line.');
                //                 }, 300);
                //         }
                //     }
                    
                // };


                // nextButtonClick = function()
                // {
                //     if (h*.01*(line_height-5)<(c.attr('y')+25) && (c.attr('y')+25)<h*.01*(line_height+2))
                //         //there's a little built in wiggle room so that the crosshairs doesn't have to be exactly on the line
                //     {
                //         var xPos = c.attr('x')+25;
                //         var floor = .17*w;
                //         var range = .66*w;
                //         var num = ((xPos - floor)/(range))*100;
                //         var a = Math.round(num);
                //         alert("You chose " + a + " as the target.");
                //         nextable = true;
                //     }
                //     else
                //     {
                //         alert("Place the crosshairs on the number line first");
                //     }
                //     if (nextable == true)
                //     {
                //         //pushing the absolute coordinate since that's what is stored in target
                //         // output.result.push(xPos);
                //         // output.user = userID;
                //         // output.trial = trial;
                //         // sendData(output);
                //         setTimeout(function()
                //         {
                //             c = "c="+userID; //store userID
                //             d = "d="+cond; //store condition
                //             e = "e="+String(trial+1); //store trial #
                //             //add c,d,e to url of next page.
                //             window.location.href = 'http://198.61.169.95/pedro/js/index.html?'+c+'&'+d+'&'+e;
                //             // window.location.href = 'file:///Users/pedro/Desktop/js_new/index.html';
                //         }, 500);
                        
                //     }
                // };
                

                //Helper functions//

     //            isScannerOnLine = function(scanner)
     //            {
     //                //Takes a scanner as argument, returns whether it's on the number line
     //                if (window.innerHeight*.01*(line_height-3.5)<scanner.attr('y') && scanner.attr('y')<window.innerHeight*.01*line_height)
     //                    return true;
     //                else
     //                    return false;
     //            }
     //            scan = function(scanner)
     //            {   
     //                //Takes a scanner as argument, returns the result of scanning the number line below it.
                    
     //                left = scanner.attr('x');
     //                right = left + scanner.attr('width');
     //                works = (scanner.data('eff') >= Math.random()); //scanner will function with frequency given by scanner.eff
     //                correct_signal = (scanner.data('beta') <= Math.random()); //scanner will return true signal with p(scanner.beta)
     //                signal = 'none';
     //                if (works)
     //                {
     //                    //single target
     //                    if (target.length == 1)
     //                    {
     //                        //found the target
     //                        if (left <=target[0] && target[0] <= right)
     //                        {
     //                            if (correct_signal)
     //                            {
     //                                signal = 'red';
     //                                scanner.glow({color: "red", width: 5});

     //                            }
     //                            else
     //                            {
     //                                signal = 'blue';
     //                                scanner.glow({color: "hsb(.6, 1, 1)", width: 5});

     //                            }

     //                        }
     //                        //missed the target
     //                        else
     //                        {
     //                            if (correct_signal)
     //                            {
     //                                signal = 'blue';
     //                                scanner.glow({color: "hsb(.6, 1, 1)", width: 5});

     //                            }
     //                            else
     //                            {
     //                                signal = 'red';
     //                                scanner.glow({color: "red", width: 5});
     //                            }
     //                        }
     //                    }
     //                    //
     //                    else
     //                    {
     //                        ////this part has no false signals implemented.
     //                        alert('range game');
     //                        //missed the target
     //                        if (left>target[1] || right<target[0])
     //                        {
     //                            scanner.glow({color: "red", width: 5});
     //                            print('no overlap');
     //                        }
     //                        else
     //                        {
     //                            overlap = getOverlap(target, [left, right]);
     //                            col = makeHSB(overlap);
     //                            scanner.glow({color:col, width: 5});
     //                            print('overlap');
     //                            print(overlap);
     //                        }
     //                    }
                        
     //                }
     //                else
     //                {
     //                    scanner.animate({opacity: .2}, 1000, 'bounce');
     //                setTimeout(function()
     //                    {scanner.animate({opacity: .5}, 1000, 'bounce')}, 700);
     //                }
     //                //Append new click data (scanner width, location_left, location_right, result) to the output array
     //                output.clicks.push([scanner.attr('width'),left, right, signal]);
     //            };

     //            sendData = function(data_to_send)
     //            {
     //              // print(data_to_send.left);
     //              $.ajax({
     //              type: "POST",
     //              datatype: "json",
     //              url: "http://198.61.169.95/pedro/js/write_to_mongo.php",
     //              data: data_to_send,
     //              success: function(data) {
     //                  alert('Great! Now let\'s try again with another number line');
     // //                  setTimeout(function()
     //             // {window.location.href = 'file:///Users/pedro/Desktop/js_new/index.html'}, 500)
     //              },
     //              error: function(){
     //                alert('failure to send to database');
     //            }
     //            });
     //            }

     //            getOverlap = function(targetRange, scannerRange)
     //            {
     //                scannerLength = scannerRange[1] - scannerRange[0];
     //                //scanner 
     //                if (inRange(targetRange, scannerRange[0]) && inRange(targetRange, scannerRange[1]))
     //                {
     //                    return 1;
     //                }
     //                else if (inRange(targetRange, scannerRange[0]) && (!inRange(targetRange, scannerRange[1])))
     //                {
     //                    return (targetRange[1] - scannerRange[0])/(scannerLength);
     //                }
     //                else if ((!inRange(targetRange, scannerRange[0])) && !inRange(targetRange, scannerRange[1]))
     //                {
     //                    return (scannerRange[1] - targetRange[0])/(scannerLength);
     //                }
     //            }
     //            inRange = function(range, num)
     //            {
     //                if (num>range[0] && num<range[1])
     //                    return true;
     //                else
     //                    return false;
     //            }
               
     //            print = function(string)
     //            {
     //                //helper function for easy printing
     //                height = 70+printIndex;
     //                stringHeight = String(height)+'%';
     //                R.text('50%', stringHeight, string).attr({fill: 'white'});   
     //                printIndex +=2;
     //            };
     //            var start = function () {
     //                this.ox = this.attrs.x;
     //                this.oy = this.attrs.y;
     //                this.animate({opacity: .25}, 500, ">");
     //            },
     //            move = function (dx, dy) {
     //                this.attr({x: this.ox + dx, y: this.oy + dy});
     //            },
     //            up = function () {
     //                this.animate({opacity: .5}, 700, "bounce");
     //            };
     //            makeHSB = function(num)
     //            {
     //                //sets the saturation value of HSV string to 'num'
     //                str = "hsb(.3,"+num.toString()+",1)";
     //                return str;
     //            };
     //            R.set(r, g, b, p).drag(move, start, up);
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
                
                
