//avoid_collide.js


window.onload = function () {
  var height = 500;
  var width = 500;
  var rectSize = 50;
  var R = Raphael("canvas", height, width);

// Build Rects
  var rect1 = R.rect((width / 2) - (rectSize/2), 0, rectSize, rectSize).attr({
    fill: "hsb(.8, 1, 1)",
    stroke: "none",
    opacity: .5,
    cursor: "move"
  });
  var rect2 = R.rect(0, 100, width, rectSize).attr({
    fill: "hsb(0, 0, 0)",
    stroke: "none",
    opacity: .5,
    cursor: "move"
  });

// start, move, and end are the drag functions
var start = function () {
// storing original coordinates
  this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
  this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
  this.attr({ opacity: 1 });
};

var move = function (dx, dy) {
var me = this
// cache rect properties
var r2_x = rect2.attr('x'),
r2_y = rect2.attr('y'),
r1_x = this.attr('x'),
r1_y = this.attr('y');

// keeps Rect in boarder
var x = this.ox + dx;
//x = x < 0 ? 0 : x > width - rectSize ? width - rectSize : x;

var y = this.oy + dy;
y = y < 0 ? 0 : y > height - rectSize ? height - rectSize : y;

var me = this.getBBox();
x = x < 0 ? 0 : x > width - rectSize ? width - rectSize : x;

// check the x and y directions separately                                        
var x_collide = rect_collision(r2_x, r2_y, rectSize, x, r1_y, rectSize),
y_collide = rect_collision(r2_x, r2_y, rectSize, r1_x, y, rectSize);                   

// see if we are currently overlapping
if (!x_collide) {
// extra logic so that the moving rect can't pass over the top of the
// stationary one if the user tries to drag it over
if ((this.stuckx && (!in_range(y, r2_y, rectSize) || Math.abs(x - r1_x) < rectSize)) || !this.stuckx ) {
this.attr({x:x});
this.pdx = dx;
this.stuckx = false;
}                          
}
else {
// otherwise we are overlapping, force the moving rect next to the other one
// we use the change in dx to determine which side to stick to
this.stuckx = true;
this.attr({x: this.pdx > dx ? r2_x + rectSize + 1 : r2_x - rectSize - 1});                       
}

// then do the same for y
if (!y_collide) {
if ((this.stucky && (!in_range(x, r2_x, rectSize) || Math.abs(y - r1_y) < rectSize)) || !this.stucky ) {
this.attr({y:y});
this.pdy = dy;
this.stucky = false;
} 
}
else {
this.stucky = true;
this.attr({y: this.pdy > dy ? r2_y + rectSize + 1 : r2_y - rectSize - 1});                       
}

};

var end = function () {
this.attr({ opacity: .5 });
};

// make Rect Dragable
rect1.drag(move, start, end);
};

var in_range = function (val, start, size) {
return !(val + size < start || val > start + size);            
}

var rect_collision = function (x1, y1, size1, x2, y2, size2) {
var a = {top: y1, bottom: y1+size1, left: x1, right: x1+size1};
var b = {top: y2, bottom: y2+size2, left: x2, right: x2+size2};

// this is the general way to figure out if two rects are overlapping
return !(a.left >= b.right || a.right <= b.left ||
a.top >= b.bottom || a.bottom <= b.top);                                 
};































