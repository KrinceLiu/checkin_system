$('#checkinB').click(function(event){
	event.preventDefault();
	$.ajax({
		method:'post',
		url:'./checkin/userid',
		data:{
			topic:$('#topic').val(),
			name:$('#name').val(),
			userid:$('#userid').val()
		},
		success: checkined
	});

});

function checkined(data){
	if(data==="notopic"){
		alert("No such CHECK-IN String! Please try again! ");
	}
	else{
	  	//$.each(data, function(){
	    $('<li>').html("Check-in User:"+`${data.name}, `+"User ID:"+`${data.userid}, ` +"Check-in String:"+`${data.topic}, `+ "If-ontime: "+`${data.ontime}`).appendTo('body>ul');
		
	}	
}