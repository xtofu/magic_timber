//black_box.js
//new draggable

window.onload = function() {

//extra set and element functions first:

//Raphael.el.draggable = function () {
    var startFunc = function () {
                   // storing original coordinates
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.attr({
            opacity: 1
        });
    };
    var moveFunc = function (dx, dy) {
       // cache rect properties
       var box = this.getBBox(),
           sx = sandbox.attr('x'),
           sy = sandbox.attr('y');

       // keeps Rect in boarder
       var x = this.ox + dx;
       x = x < 0 ? 0 : x > w - box.width ? w - box.width : x;

       var y = this.oy + dy;
       y = y < 0 ? 0 : y > line - box.height ? line - box.height : y;
      
       if (this.type == "rect") {
           this.attr({
               x: x,
               y: y
           });
       }
       else {
           this.attr({
               cx: x,
               cy: y
           });
       };
    };
    var endFunc = function () {
       this.attr({
           opacity: 0.5
       });
    };
/*
Raphael.st.draggable = function () {
    var startFunc = function () {
                   // storing original coordinates
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.attr({
            opacity: 1
        });
    };
    var moveFunc = function (dx, dy) {
       // cache rect properties
       var box = this.getBBox(),
           sx = sandbox.attr('x'),
           sy = sandbox.attr('y');

       // keeps Rect in boarder
       var x = this.ox + dx;
       x = x < 0 ? 0 : x > w - box.width ? w - box.width : x;

       var y = this.oy + dy;
       y = y < 0 ? 0 : y > line - box.height ? line - box.height : y;
      
       if (this.type == "rect") {
           this.attr({
               x: x,
               y: y
           });
       }
       else {
           this.attr({
               cx: x,
               cy: y
           });
       };
   };
    var endFunc = function () {
       this.attr({
           opacity: 0.5
       });
    };
    this.drag(moveFunc, startFunc, endFunc);
};
*/
    // useful moves:
    var appear = Raphael.animation({opacity:1.0}, 20);
    var disappear = Raphael.animation({opacity:0.0}, 20);

    // create paper and make drawing functions
    var R = Raphael(0, 0, '100%', '100%'),
        h = 480, //window.innerHeight,
        w = 800, //window.innerWidth;
        line = 600;    //w*0.75

    var style = {
        fill: "#444",
        stroke: "#fff",
        "stroke-width": 3,
        "stroke-linejoin": "round"
    };

    var makeSandbox = function () {
        R.setStart();
        var sandbox1 = R.rect(0.125*w, 0.7*h, line, 100).attr(style),
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

     //ship1.mouseover(function () {butt1.animate(appear)} );
        ship2.onDragOver(function() {
            butt2.animate(appear);
            ship2.attr({fill: "blue"});
        });

     
     ship3.mouseover(function () {
     butt3.animate(appear);
     });
     ship4.mouseover(function () {
     butt4.animate(appear);
     });
     var scnrs = R.set();
     scnrs.push(
     R.set(ship1, butt1).drag(moveFunc, startFunc, endFunc),
     R.set(ship2, butt2).drag(moveFunc, startFunc, endFunc),
     R.set(ship3, butt3).drag(moveFunc, startFunc, endFunc),
     R.set(ship4, butt4).drag(moveFunc, startFunc, endFunc));

     //scnrs[1].mouseover(function() {this[2].animate(appear)})
     //why is this undefined??
     //scnrs.forEach(function(scnr) {
     // scnr.hover(
     // function() {this[1].this[2].animate(appear)},
     // function() {this[1].this[2].animate(disappear)});
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
claw.drag(moveFunc, startFunc, endFunc);
//claw.hover(function() {
//        claw.attr({fill: "red"});
//    });

claw.onDragOver(function() {
        claw.attr({fill: "blue"});
    });
};
