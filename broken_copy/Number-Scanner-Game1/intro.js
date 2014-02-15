window.onload = function()
{
  var R = Raphael(0, 0, "100%", "100%"),
  r = R.rect(100,100,100,30,10).attr({fill: "hsb(.6, 1, .8)", stroke: "white", opacity: .5,}).data('eff', 1).data('pos', [100,100]),
  button = R.rect('47%', '60%', '6%', 23, 2).attr({fill: '#CCC', stroke: "red", opacity: 1});
         // var start = function () {
         //            this.ox = this.attrs.x;
         //            this.oy = this.attrs.y;
         //            this.animate({opacity: .25}, 500, ">");
         //        },
         //        move = function (dx, dy) {
         //            this.attr({x: this.ox + dx, y: this.oy + dy});
         //        },
         //        up = function () {
         //            this.animate({opacity: .5}, 700, "bounce");
         //        };

button.node.onclick = function()
{
session = getSession({"userID":"123"});
session = JSON.parse(session);
userID = session.user;
setTimeout(function()
    {alert(userID)},500);
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
                    alert("Data: " + data+ "\nStatus: " + status);
                    result = data;
                  },
                  error: function(){
                    alert('failure to send to database');
                },
                });
  return result
};
}
