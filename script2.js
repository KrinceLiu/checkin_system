// dynamic html page2 --------------------------------
$('#checkinStart').click(function(event){
	event.preventDefault();
	var d = new Date();

	$.ajax({
		method:'post',
		url:'./checkin/topics',
		data:{
			topic:$('#checkinID').val(),
			starttime: new Date().toLocaleString()
		},
		success: checkinNow
	});
});

function checkinNow(data){
	$("html").html(data);
		$.getScript("script3.js", function(){
	});

	$("<link/>", {
   		rel: "stylesheet",
   		type: "text/css",
   		href: "./style.css"
	}).appendTo("head");
}

$('#viewHistory').click(function(event){
	event.preventDefault();
	$.ajax({
		method:'post',
		url:"./checkin/analysis",
		success: analysis
	});
});

function analysis(data){
	var table = $('<table>');
	var frow = $('<tr>');
	frow.append($('<th>').text(" Name "));
	frow.append($('<th>').text(" UserID "));
	frow.append($('<th>').text(" Check-in topic "));
	frow.append($('<th>').text(" On Time? "));
	table.append(frow);
	$.each(data,function(){
		var row =$('<tr>');
		row.append($('<td>').text(this.name));
		row.append($('<td>').text(this.userid));
		row.append($('<td>').text(this.topic));
		row.append($('<td>').text(this.ontime));
		table.append(row);
	});
	$('body').append(table);


}





