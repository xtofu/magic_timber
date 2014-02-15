
// Contains critical frame-navigating functionality.

// The top frame loads from the 'instructions' list below as the user proceeds through the task.
// Functionality for loading from this is in NextClick() and ScanClick() functions, below.

// These functions implement hard-coded correspondence between certain top and bottom screens, so that the tutorial appears interactive
// to the user. Any changes in this correspondence (new steps to tutorial, etc.) will need to be accompanied by changing the elements of
// the various lists: change_both_list, change_top_list, exception_states.

// Each new bottom-frame .html page loads a corresponding instructions_x_.js file that contains the appropriate tutorial screen.

//instructions 5,6,7,8 .js are the familiarization trials.

// Noe that nextbutton, scanbutton, nextgamebutton are all loaded in the .html page, and its functionality is tied to the appropriate
// .js function (either in frame.js or in instructions_x_.js for the 'SCAN' button).

var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var instructions = ["<p>As you go through this tutorial, some instructions may appear as pop-ups.</p> Please read them carefully,\
 as they contain information you need to know!",
"<p>In a little while we will play a game. I will think of a number somewhere on the number line below,</p><p>and you will use scanners \
to try to find it.</p><p>In the next few screens, you'll learn to play the game.</p><p>If a screen ever doesn't load immediately, do not \
refresh the browser, otherwise you'll have to start everything from the beginning.</p>",
"<p>Below are a bunch of green scanners. To use one, drag the scanner to the number line, \
and then press the 'SCAN' button.</p> <p> Please drag a scanner and place it anywhere in the dashed outline on the number line, \
and then pres 'SCAN'.</p>", 
"<p>When the scanner doesn't find a number, it turns red.</p> Click 'next' to continue the tutorial.",
"<p>Now we will see what the scanner does when it <b>does</b> find a number.</p> <p> Please drag a scanner and place it anywhere in \
the dashed outline on the number line, and then pres 'SCAN'.</p>", 
"<p>When the scanner <b>does</b> find a number, it turns blue.</p> Click 'next' to continue the tutorial.",
"<p>Some scanners work better than others. The lighter in color the scanner, the less likely it is to work properly.</p>\
<p>Next to each scanner is a number; it tells you how reliable the scanner is. For example, if it says '50%', it means that \
half the time the scanner will give you the right answer, and half the time it will give you the wrong answer.</p>\
<p>To see what I mean by this, drag the lightest-colored scanner to the dashed line and press 'SCAN' a few times. \
Note that I've made the hidden number visible for this example.",
"<p>Hmm. It looks like the scanner thinks the number is there even though it isn't.</p><p>Try scanning again.</p>",
"<p>Ok, this time the scanner thinks the number isn't there, which is good.</p><p>Note that the color might appear purple; that's because \
the red from the first scan and the blue from the new one are overlapping.</p><p>Scan a few more times, and then press 'next'.</p>",
"<p>Great. Press 'next' to move on.</p>",
"<p>On the next few screens you'll get a chance to see how good each of these scanners is.</p><p>Pay attention during this part; the better you \
understand the scanners, the better you'll do in the game </p><p>Look at the number next to this scanner, \
and then drag the scanner on top of the target and scan a few times. Notice how often it gives you the right answer when you put it on top of\
the target, and then drag it somewhere not on top of the target and scan a few more times.</p>",
"<p>Notice that the error rate is the same whether you're scanning on top of the target or elsewhere.</p>",
"FILLER; this is just filler to be skipped by the way frames are incremented.",
"<p>Here's another scanner. Look at the number next to the scanner, and then drag the scanner on top of the target and scan a few times.\
 Notice how often it gives you the right answer when you put it on top of the target, and then drag it somewhere not \
 on top of the target and scan a few more times.</p>",
 // "<p>Notice that the error rate is the same whether you're scanning on top of the target or elsewhere.</p>",
 "FILLER",
 "<p>Here's yet another scanner. Look at the number next to the scanner, and then drag the scanner on top of the target and scan a few times.\
 Notice how often it gives you the right answer when you put it on top of the target, and then drag it somewhere not \
 on top of the target and scan a few more times.</p>",
 // "<p>Notice that the error rate is the same whether you're scanning on top of the target or elsewhere.</p>",
 "FILLER",
 "<p>And here's the last scanner you'll be using. Look at the number next to the scanner, and then drag the scanner on top of the target and scan a few times.\
 Notice how often it gives you the right answer when you put it on top of the target, and then drag it somewhere not \
 on top of the target and scan a few more times.</p>",
 // "<p>Notice that the error rate is the same whether you're scanning on top of the target or elsewhere.</p>",
 "FILLER",
"<p>In the real game you can use whichever scanners you want, as many times as you want, to try to find the number. You can \
place each number anywhere, as long as it overlaps at least partially with the number line.</p> <p>Once you think you know \
where the hidden number is, you'll drag the crosshairs to that spot, and press the 'next game' button.</p>\
<p>Note that the crosshairs won't move unless you've used a scanner. I want to make sure you're not guessing!</p>\
<p>Use a scanner, then drag the crosshairs to the actual number and press 'next game'.</p>",
"<p>Good, now drag the crosshairs to the actual number and press 'next game'.</p>",
"<p>Ok, great. The tutorial is over.</p><p>On the next page you'll start playing the game. It consists of six rounds. \
In each round, you can use whichever scanners you want as you try to find the number.</p><p>Once you think you know where it is, drag \
the crosshairs to that spot, and press the 'NEXT' button.</p><p> Each time you finish a round you'll begin a new one, \
where you'll have to find a new hidden number.</p>"];

var interstitial_text = "<p>Great! you found the number. Now click 'next' to play the next round.</p>";

var thank_you_text =  ["<p>Great! You're all done.<p> <p>You found ", " targets!<p> <p>Thank you for partipating!<p>\
<p>To get credit for this HIT, please paste the red code below in the MTurk window from which you began this task.<p>"];

function StartSession()
{
	if (parent.topframe.userID==null)
	{
		//make userID
		parent.topframe.userID = makeID(7);
		parent.topframe.conditions = determineTrials();
	}
}

function UpdateData(output)
{
	parent.topframe.data.push(output);
}
function SendAllData()
{
	userID = parent.topframe.userID;
	cond = parent.topframe.cond;
	data = parent.topframe.data;
	to_send = {"userID":userID, "cond":cond, "data":data};
	postToPHP(to_send);
}
function postToPHP(data_to_send)
{

  $.ajax({
  type: "POST",
  datatype: "json",
  async: false,
  url: "write_to_mongo.php",
  data: data_to_send,
  success: function() {
  	return;
  },
  error: function(){
    alert('failure to send to database. Please report this in the \'comments\'\
    	window at the end of the MTurk task.');
}
});
}

function WriteCertainty()
{
	var certainty = document.formxml.certainty.value;
	parent.topframe.output.certainty = certainty;
	GetInterstitial(parent.topframe.found_target);
}
function GetCertaintyJudgment()
{
	parent.topframe.document.getElementById("tutorial").innerHTML = "<p>Before finding out whether you found the target, \
	please rate how confident you are about the target's location using the slider below.</p>";
	parent.bottomframe.location = 'certainty_judgment.html';
}

function GetInterstitial(found_target)
{

	// alert('found target');
	// alert(found_target);
	// alert('certainty:');
	// alert(parent.topframe.output.certainty);
	// alert(parent.topframe.output['trial']);

	parent.topframe.current_trial++;
	
	if (found_target)
	{
		parent.topframe.correct++;
	}
	if (parent.topframe.current_trial==parent.topframe.total_trials)
	{
		UpdateData(parent.topframe.output);
		setTimeout(function()
			{SendAllData();}, 0
			);
        parent.topframe.document.getElementById("tutorial").innerHTML = thank_you_text[0]+parent.topframe.correct.toString()+'/'+parent.topframe.total_trials.toString()+thank_you_text[1];
       // parent.bottomframe.location.href = 'file:///Users/pedro/Desktop/js%20sandbox/thankyou.html?c='+parent.topframe.userID;
	    // parent.bottomframe.location.href = 'http://tsividis.scripts.mit.edu/js/thankyou.html?c='+parent.topframe.userID;
	    parent.bottomframe.location.href = 'http://lookit.mit.edu/numbers/thankyou.html?c='+parent.topframe.userID;
	    // parent.bottomframe.location.href = 'http://198.61.169.95/numbers/thankyou.html?c='+parent.topframe.userID;
	}
	else
	{
		if (found_target)
			text = "<p>Great job; you found the hidden number! Now click 'next' to play the next round.</p>";
		else
			text = "<p>Hmm... it seems you didn't find the hidden number. Click 'next' to play the next round.</p>";
		UpdateData(parent.topframe.output);
	}

	parent.topframe.document.getElementById("tutorial").innerHTML = text; //interstitial_text;
	parent.bottomframe.location = 'interstitial.html';
	parent.topframe.trial++;
	parent.topframe.document.getElementById("nextbutton").style.display="block";
}

//The below two functions govern the top and bottom frames of the tutorial. Top frames change via these functions
//and also as a result of the 'scan' function in the relevant instructionsx.js files. The latter usually increment the
//top frame after a specific number of clicks (e.g., in the familiarization trials).
//The instructions[] array at the top of this file contains the instructions that go in the top frames. Some of those
//instructions contain filler text that is never displayed: it is merely bypassed as the top frame is incremented to a
//new state (and its content is rewritten by the instructionsx.js file). As they are now, the indices of the instructions[]
//array correspond to the correct indices of the change_both and change_top lists.
//In states in which you want the bottom to be infinitely clickable and then have a change at top triggered by the relevant
//isntrucitons.js file, include the 'freeze' state in the ChangeTop list. Then have parent.topframe.top_index incremented by
//the instructions.js file, and then include the next state both in ChangeTop and in ChangeBoth. This will ensure that the
//'scan' button is still clickable, but that the 'next' button will now allow the user to proceed to the next state.

function NextClick()
{
	state = [parent.topframe.top_index, parent.topframe.bottom_index];
	// if (parent.topframe.bottom_index>8)
	// 	{alert(state);}
	if (equal(state, [20,9])) //displays 'NEXT' button on final screen of tutorial. //Use 12,5 for version w/o familiarization.
	{
		parent.topframe.document.getElementById("nextbutton").style.display="block";
	}
	if (equal(state, [21,10])) // moves us from tutorial to real game. // Use [21,10] for familiarization version,
    //[12,6] for w/o familiarization version, and [1,1] for straight-to-task version.
	{
		//parent.window.location.href = "http://198.61.169.95/pedro/js/index.html";
		// parent.topframe.location.href = 'file:///Users/pedro/Desktop/js%20sandbox/find_the_number.html';
		parent.topframe.document.getElementById("tutorial").innerHTML="<p>Find the number!</p>";
		parent.topframe.document.getElementById("nextbutton").style.display="none";
		//blicket server location "http://198.61.169.95/pedro/js/index.html";
		//scripts.mit.edu location
		// parent.bottomframe.location.href = "http://tsividis.scripts.mit.edu/js/index.html";
		parent.bottomframe.location.href = "http://lookit.mit.edu/numbers/index.html";
		// parent.bottomframe.location.href = "http://198.61.169.95/numbers/index.html";
	}
	else if (ChangeBoth(state))
	{	
		//increment top and bottom windows
		parent.topframe.top_index++;
		parent.topframe.bottom_index++;
		// alert('changed top/bottom to '+parent.topframe.top_index.toString()+', '+parent.topframe.bottom_index.toString());
		parent.topframe.document.getElementById("tutorial").innerHTML=instructions[parent.topframe.top_index];
		parent.bottomframe.location = "instructions"+parent.topframe.bottom_index.toString()+".html";

	}

}
function ScanClick()
{
	//the 'scan' button should only advance the top window, to give the user additional instructions.
	//when 'scan' is pressed in a state in which both top and bottom are ready to change, 'scan' has no effect.
	//The above effect is accomplished by including any top/bottom change states in the list in ChangeTop, which
	//contains the states at which the top should *not* be changed.
	state = [parent.topframe.top_index, parent.topframe.bottom_index];
	// alert(state);
	if (!ChangeBoth(state)) //make sure you shouldn't be changing both windows
	{
		if (ChangeTop(state)) //unless you're at an exception state, change the top index
			{
				parent.topframe.top_index++;
				parent.topframe.document.getElementById("tutorial").innerHTML=instructions[parent.topframe.top_index];
				state[0]++;
			}
	}
	// if (parent.topframe.bottom_index>8)
	// 	alert([parent.topframe.top_index, parent.topframe.bottom_index]); //remove once this is implemented
}

//simple helper functions for the above
function ChangeBoth(state)
{
	//checks change_both_list below; if state is in the list, returns 'true'.
	//[10,5] is the beginning of the scanner efficacies tutorial.
	change_both_list = [[0,0],[1,1],[3,2],[5,3], [9,4],[12,5], [14,6], [16,7], [18,8], [20,9]]; //abridge to [0,0] for straight-to-task
	if (short_list_in_long_list(state, change_both_list))
		return true;
	else
		return false;
}
function ChangeTop(state)
{
	//functions by exception; returns true as long as state is *not* in the list below.
	// change_top_list = [[9,4]];
	change_top_list = [[8,4],[9,4],[10,5],[11,5],[12,5],[13,6],[14,6],[15,7],[16,7],[17,8],[18,8],[20,8]];
	if (!short_list_in_long_list(state, change_top_list))
	{
		return true;
	}
	else
		return false;
}
// function ExceptionState(state)
// {
// 	//returns true if 'state' is an exception state
// 	// exception_states = [[9,4]];
// 	exception_states = [[10,5],[11,5],[12,5],[13,6],[14,6],[15,7],[16,7],[17,8],[18,8],[20,8]];
// 	if (short_list_in_long_list(state, exception_states))
// 	{
// 		return true;
// 	}
// 	else
// 		return false;
// }

var lengths = [[.0625, .125, .25, .5], [.87,.87,.87,.87]];
var efficacies = [[.25, .25, .25, .25], [.87, .75, .62, .51]];
var crossed = [[.0625, .125, .25, .5], [.87, .75, .62, .51]];
//Function to determine conditions. Runs once at StartSession()
function determineTrials()
{

	//if you want 2 trials of each condition, use the array, [lengths, efficacies, crossed, lengths, efficacies, crossed]
	var conditions = [lengths, efficacies, crossed, crossed, crossed, crossed];

	conditions = shuffle(conditions);

	return conditions
}

function getCondition(index)
{

	return parent.topframe.conditions(index);
}



//general list functions
function in_list(a, list_b)
{
	for (var i=0; i<list_b.length; i++)
	{
		if (a==list_b[i])
			return true;
	}
	return false;
}
function short_list_in_long_list(shortlist, longlist)
{
	//takes a short list and a long list composed of short lists, returns whether the first list is in the long one.
	//e.g., [0,2] in [[0,1], [3,1], [0,2]]
	for (var i=0; i<longlist.length; i++)
	{
		if (equal(shortlist, longlist[i]))
			{
				return true;
			}
	}
	return false;
}
function equal(a,b)
{
	//compares piecewise elements of lists and b.
	for (var i=0; i<a.length; i++)
	{
		if (a[i]!=b[i])
		{
    		return false;
      	}
	}
  return true;
}
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function makeID(len)
{
    base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    base = stringshuffle(repeat(base, 5));
    return base.substring(0,len);
}
function repeat(s, n){
    var a = [];
    while(a.length < n){
        a.push(s);
    }
    return a.join('');
}
function stringshuffle(str) {
    var a = str.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}
