var top_index=0;
var bottom_index=0;

parent.topframe.document.getElementById("tutorial").innerHTML=instructions[top_index];


// var button = parent.topframe.document.createElement("button");
// var t = parent.topframe.document.createTextNode("next game");
// button.appendChild(t);
// button.id="nextgamebutton";
// alert('button');


// button.style.position="absolute";
// button.style.left='100px';
// button.style.top='100px';
// button.style.zIndex='1000';
// // alert(button.style.left);
// alert(getComputedStyle(parent.bottomframe.document.getElementById("nextgamebutton"), null));

// parent.bottomframe.document.getElementById("scanbutton").style.backgroundColor="#f3f3f3";
// parent.bottomframe.document.getElementById("scanbutton").style.position='50%';
var elem = parent.bottomframe.document.getElementById("scanbutton");
elem.setAttribute("style","position:relative;\
    left: 20%;\
    top:85%;\
    zIndex: 1000;\
    mozBoxShadow:inset 0px 1px 0px 0px #c1ed9c;\
    webkitBoxShadow:inset 0px 1px 0px 0px #c1ed9c;\
    boxShadow:inset 0px 1px 0px 0px #c1ed9c;\
    background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #9dce2c), color-stop(1, #8cb82b) );\
    background:-moz-linear-gradient( center top, #9dce2c 5%, #8cb82b 100% );\
    filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#9dce2c', endColorstr='#8cb82b');\
    color:#333333;\
    solid:#333333");

    // background-color:#9dce2c;
    // -webkit-border-top-left-radius:3px;
    // -moz-border-radius-topleft:3px;
    // border-top-left-radius:3px;
    // -webkit-border-top-right-radius:3px;
    // -moz-border-radius-topright:3px;
    // border-top-right-radius:3px;
    // -webkit-border-bottom-right-radius:3px;
    // -moz-border-radius-bottomright:3px;
    // border-bottom-right-radius:3px;
    // -webkit-border-bottom-left-radius:3px;
    // -moz-border-radius-bottomleft:3px;
    // border-bottom-left-radius:3px;
    // text-indent:0;
    // border:1px solid #83c41a;
    // display:inline-block;
    // color:#ffffff;
    // font-family:Arial;
    // font-size:11px;
    // font-weight:bold;
    // font-style:normal;
    // height:28px;
    // line-height:23px;
    // width:85px;
    // text-decoration:none;
    // text-align:center;
    // text-shadow:1px 1px 0px #689324;");