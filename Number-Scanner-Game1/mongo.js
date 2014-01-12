window.onload = function()
{
  determineTrial();
}


determineTrial = function(arg)
{
  var result = 0;
  $.ajax({
        type: "POST",
        datatype: "json",
        url: "http://198.61.169.95/pedro/js/write_to_mongo.php",
        //url: "file:///Users/pedro/Desktop/js_copy/mongo.php",
        //url: "http://198.61.169.95/pedro/js/intro.php",
        data: arg,
        async: true,
        success: function(data,status){
          alert(data);
          result = data;
        },
        error: function(){
          alert('failure to query database');},
        });
  return result;
};