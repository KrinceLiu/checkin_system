
$('#loginB').click(function(event){
	console.log("message sent through ajax ! ");
	event.preventDefault();
	$.ajax({
		method:'post',
		url:'./login/admins',
		data:{
			uname:$('#uname').val(),
			pword:$('#pword').val()
		},
		success: adminlanding
	});

});

function adminlanding(data){
	console.log("got response");

	if(data === "fail"){
		alert("password failed");
	}
	else{
		$("html").html(data);
		$.getScript("script2.js", function(){
		});
	}
	$("<link/>", {
   		rel: "stylesheet",
   		type: "text/css",
   		href: "./style.css"
	}).appendTo("head");
}

$('#createB').click(function(event){
	console.log("message sent through ajax ! ");
	event.preventDefault();
	$.ajax({
		method:'post',
		url:'./login/create',
		data:{
		uname2:$('#uname2').val(),
		pword2:$('#pword2').val()
		},
		success: createsuccess
	});

});

function createsuccess(data){
	alert("New admin created");
	$('<li>').html("username: "+`${data.username}`+ " password: "+`${data.password}`).appendTo('ul');
}
// $('#redirectB').click(function(event){
// 	event.preventDefault();
// 	$.ajax({
// 		method:'get',
// 		url:'/checkin_page'
// 	});

// });


