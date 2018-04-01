
// dynamic html page3 --------------------------------
$('#stopCheckin').click(function(event){
	event.preventDefault();
	var thistopic = document.getElementById("thistopic").innerText;
	var d = new Date();
	$.ajax({
		method:'post',
		url:'./checkin/stop',
		data:{
			topic: thistopic,
			stoptime: new Date().toLocaleString()
		},	
		success: stoped
	});
});
$('#viewCheck').click(function(event){
	event.preventDefault();
	var thistopic = document.getElementById("thistopic").innerText;
	$.ajax({
		method:'post',
		url:'./checkin/view',
		data:{
			topic: thistopic
		},
		success: view
	});
});






function stoped(data){
	counter_stop();
	alert(data + `  Click  "view Check-ins"  `);
}

function view(data){
	$('body').empty();


	$('<a>',{
    	text: 'go back',
    	href: './',
	}).appendTo('body');

	var num_check =0;
	var num_ontime = 0;
	var num_late = 0;

	var table = $('<table>');
	var frow = $('<tr>');
	frow.append($('<th>').text("Name"));
	frow.append($('<th>').text("UserID"));
	frow.append($('<th>').text("On Time?"));
	table.append(frow);

	$.each(data,function(){
		num_check = num_check +1;
		if (this.ontime === "yes"){
			num_ontime = num_ontime+1;
		}
		else{
			num_late = num_late +1;
		}
		var row =$('<tr>');
		row.append($('<td>').text(this.name));
		row.append($('<td>').text(this.userid));
		row.append($('<td>').text(this.ontime));
		table.append(row);
	});
	$('body').append($('<h5>').text(`Number of people check-in: ${num_check}`));
	$('body').append($('<h5>').text(`check-in on time: ${num_ontime}`));
	$('body').append($('<h5>').text(`check-in late: ${num_late}`));
	$('body').append(table);

}


var k = $('#K');
var time = 0 ;
show();
function show(){
	time ++;
	var sec = Math.floor(time%60);
	var min = Math.floor((time/60)%60);
	var hour =Math.floor((time/(60*60))%24);
	min = checkTime(min);
	hour = checkTime(hour);
	sec = checkTime(sec);
	document.getElementById("K").innerHTML = hour + ":" + min + ":" + sec;
}



function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
}

function counter_stop(){
	clearInterval(timer);
}
function counter_reset(){
	document.getElementById("K").innerHTML = "00:00:00";
	time = 0;
}
timer = setInterval(show,1000);
