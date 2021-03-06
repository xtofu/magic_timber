
            window.onload = function () {
                var R = Raphael(0, 0, "100%", "100%"),
                    line = R.rect('17%', '50%', '66%', 2).attr({fill: "white", stroke: "red", opacity: 1}),
                    start_text = R.text('17%', '52%', '1').attr({fill: '#fff'}),
                    end_text = R.text('83%', '52%', '100').attr({fill: '#fff'}),
                    button = R.rect('47%', '60%', '6%', 23, 2).attr({fill: '#CCC', stroke: "red", opacity: 1}),
                    button_text = R.text('50%', '62%', 'SCAN').attr({fill: 'black'}),
                    // next_button = R.rect('90%', '90%', '6%', 23, 2).attr({fill: '#CCC', stroke: "red", opacity: 1}),
                    // next_button_text = R.text('93%', '92%', 'NEXT').attr({fill: 'black'}),
                    r = R.rect(100,100,100,30,10).attr({fill: "hsb(.6, 1, .8)", stroke: "white", opacity: .5,}).data('eff', 1),
                    g = R.rect(100,150,200,30,10).attr({fill: "hsb(.6, .85, .8)", stroke: "white", opacity: .5}).data('eff', .5),
                    b = R.rect(100,200,300,30,10).attr({fill: "hsb(.6, .6, .8)", stroke: "white", opacity: .5}).data('eff', .4),
                    p = R.rect(100,250,400,30,10).attr({fill: "hsb(.6, .5, .8)", stroke: "white", opacity: .5}).data('eff', .2);

                var scanners = [r,g,b,p];
                var scannable = false; //button won't click unless a scanner is in place
                var randomNumber = Math.floor(Math.random()*101)
                var printIndex = 0;
                var target;

                // next_button.node.onclick = function()
                // {
                //     window.location.href = 'file:///Users/pedro/Desktop/js/index.html';
                // }

                button.node.onclick = function()
                {
                    mainButtonClick();
                }
                button_text.node.onclick = function()
                {
                    mainButtonClick();
                }

                mainButtonClick = function()
                {

                    target = convertNumber(randomNumber);

                    for (var i=0; i < scanners.length; i++)
                    {
                        var yloc = String(70+i*3)+'%';
                        if (window.innerHeight*.45<scanners[i].attr('y') && scanners[i].attr('y')<window.innerHeight*.55)
                            {
                                scannable = true;
                                button.animate({fill:'white'}, 200, '<');
                                setTimeout(function()
                                {
                                    button.animate({fill: '#CCC'}, 700, '<');}, 200);
                                scan(scanners[i]);
                            }
                    };
                    if (!scannable)
                    {
                        button.animate({opacity: .7}, 700, 'bounce');
                        setTimeout(function()
                            {
                                alert('You must place a scanner on the number line before clicking \'SCAN\'.');
                                button.animate({opacity: 1}, 700, '>');}, 700);
                    }
                };
                convertNumber = function(num)
                {
                    range = .66*window.innerWidth;
                    left = .17*window.innerWidth;
                    newNum = left + num*.01*range;
                    return newNum;
                };

                scan = function(scanner)
                {
                    left = scanner.attr('x');
                    right = left + scanner.attr('width');
                    works = (scanner.data('eff') >= Math.random());
                    if (works)
                    {
                        if (left <=target && target <= right)
                        {
                            scanner.glow({color: "hsb(.3,1,1)"});
                        }
                        else
                        {
                            scanner.glow({color: "red"});
                        }
                    }
                    else
                    {
                        scanner.animate({opacity: .2}, 1000, 'bounce');
                    setTimeout(function()
                        {scanner.animate({opacity: .5}, 1000, 'bounce')}, 700);
                    }
                    var output = {'left':left, 'right':right, 'target':target, 'works':works};

        		    sendData(output);
                };

                sendData = function(data_to_send)
                {
		  print(data_to_send.left);
                  $.ajax({
                  type: "POST",
                  datatype: "json",
                  url: "http://198.61.169.95/pedro/js/write_to_mongo.php",
                      data: data_to_send,
                  success: function(data) {
                      alert(data);
                  },
                  error: function(){
                    alert('failure');
                }
                });
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
                R.set(r, g, b, p).drag(move, start, up);



            };
