// content.js
var obj = "cool";
var json;
var j = 5;
var i = 0;
var subject = "cool";
var bad_index = [];
var flag_again = false;
var exam = "ege";
var working = false;

function saver(){
	obj = json.responseText;
	var position = 3;
    if (obj === undefined) {
    	bad_index.push(i);
    }else {
		do {
	    	position = obj.indexOf("Ответ:", position+1);
	    } while (obj.indexOf("Ответ:", position+1) != -1)
	    console.log(position);
	    var space = 1;
	    end = obj.substr(position,60).indexOf("<",1)
	    if (obj.substr(position,20).indexOf(" ",1) === -1)
	    	space = 0;
	    var end_dot = obj.substr(position,30).indexOf(".",1);
	    if (end_dot > 0)
	    	end = end_dot;
	    var end_many_answers = obj.substr(position,30).indexOf("|",1);
	    if (end_many_answers > 0)
	    	end = end_many_answers;
	   	var right_answer = obj.substr(position+6+space,end-6-space);
		console.log(right_answer);
		var para = document.createElement("P");
		document.getElementsByClassName("test_inp")[i+4].value = right_answer;
		j++;
	}
}

function myLoop() {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
   	  if (flag_again === false) {
	      var firstHref = $("a[href^='/problem']").eq(i).attr("href");
	   	  json = $.getJSON("https://"+subject+"-"+exam+".sdamgia.ru"+firstHref);
	      setTimeout(saver, 2000);
	      i++;  
	  }                   //  increment the counter
	  if ((i <= $("a[href^='/problem']").length) && (flag_again === false)) {            //  if the counter < 10, call the loop function
	         myLoop();             //  ..  again which will trigger another
	         if (i == $("a[href^='/problem']").length)
	         	working = false;
      } else if (bad_index.length > 0){
      	flag_again = true;
      	i = bad_index.pop();
      	var firstHref = $("a[href^='/problem']").eq(i-1).attr("href");
   	    json = $.getJSON("https://"+subject+"-"+exam+".sdamgia.ru"+firstHref);
   	    setTimeout(saver, 2000);
   	    myLoop();
      }                        //  ..  setTimeout()
   }, 2100)
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
    	if (working == false) {
    		working = true;
	    	var name = window.location.href;
	    	console.log(name);
	    	subject = name.substr(name.indexOf("/",1)+2,name.indexOf("-",1)-name.indexOf("/",1)-2);
	    	exam = name.substr(name.indexOf("-",1)+1,name.indexOf(".",1)-name.indexOf("-",1)-1);
	    	myLoop();
	    }
    }
  }
);
