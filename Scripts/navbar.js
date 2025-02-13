﻿let link = window.location.href.split('/');
let siteLocation;
let currentRoomName;
const previewVideos = [];

if (link[5] !== undefined) {
	currentRoomName = link[5];
	let virtDir = link[3];
	siteLocation = 'https://' + window.location.host + '/' + virtDir;

}
else {
	currentRoomName = link[4];
	siteLocation = 'https://' + window.location.host;
}

function openSlideMenu() {
	document.getElementById('menu').style.width = '25%';
	document.getElementById('content').style.width = '25%';
	document.getElementById('content').style.opacity = 0;
	document.getElementById('closedBar').style.opacity = 0;
	document.getElementById('open_menu').style.opacity = 0;

	document.getElementById('closedBar').style.width = '0';
}
function closeSlideMenu() {
	document.getElementById('menu').style.width = '0';
	document.getElementById('content').style.width = '3%';

	document.getElementById('closedBar').style.opacity = 1;
	setTimeout(
		function () {
			document.getElementById('closedBar').style.width = '3%';
			document.getElementById('open_menu').style.opacity = 1;
		}, 680);
}

$(document).ready(function () {
	$('#open_menu').on('click', function () {
		if ($('#content').css('opacity') == 0) {

			$('#content').css('opacity', 1);

		}
		else {
			$('#content').css('opacity', 0);

		}
	});

});
$('#create_new_room').on('click', function () {
	$.ajax({
		url: siteLocation + '/Room/CreateChatRoom',
		type: 'GET',
		cache: true,
		async: true,
		success: function (result) {
			$('#dialogContent').html(result);
			$('#modDialog').modal('show');
		},
		error: function (jqXHR, exception) {
			checkErrResponse(jqXHR.status);
		}
	});
});
$('#join_room').on('click', function () {
	$.ajax({
		url: siteLocation + '/Room/JoinChatRoom',
		type: 'GET',
		dataType: "html",
		cache: true,
		async: true,
		success: function (result) {
			$('#dialogContent').html(result);
			$('#modDialog').modal('show');
		},
		error: function (jqXHR, exception) {
			checkErrResponse(jqXHR.status);
		}
	}).fail(function (jqXHR, textStatus, errorThrown) {
		alert("Failed: " + errorThrown);
	}).always(function (a, textStatus, b) {
	});
});

function onCreateClick() {
	let room = $('#createText').val();
	if (room.length != 0) {
		console.log(room);
		console.log(siteLocation + '/Room/CreateRoom?roomName=' + room);
		$.ajax({
			url: siteLocation + '/Room/CreateRoom?roomName=' + room,
			type: 'post',
			cache: false,
			async: true,
			success: function (result) {
				console.log(result);
				window.location.href = "Chat/" + room;
				loadMessageView(room);
			},
			error: function (jqXHR, exception) {
				checkErrResponse(jqXHR.status);
			}
		});

		$('#createText').val('');

	}
}
function onJoinClick() {
	let room = $('#joinRoomText').val();
	if (room.length != 0) {
		console.log(room);
		console.log(siteLocation + '/Room/JoinRoom/' + room);
		$.ajax({
			url: siteLocation + '/Room/JoinRoom/' + room,
			type: 'post',
			cache: false,
			async: true,
			success: function (result) {

				window.location.href = "Chat/" + room;
				console.log(result);
				$('#partialChats').html(result);
				loadMessageView(room);
			},
			error: function (jqXHR, exception) {
				checkErrResponse(jqXHR.status);
			}
		});
		$('#joinRoomText').val('');


	}
}

function checkErrResponse(status) {

	let msg = '';
	if (status === 0) {
		msg = 'Not connect.\n Verify Network.';
	} else if (jqXHR.status == 404) {
		msg = 'Requested page not found. [404]';
	} else if (jqXHR.status == 500) {
		msg = 'Internal Server Error [500].';
	} else if (exception === 'parsererror') {
		msg = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		msg = 'Time out error.';
	} else if (exception === 'abort') {
		msg = 'Ajax request aborted.';
	} else {
		msg = 'Uncaught Error.\n' + jqXHR.responseText;
	}
	alert(msg);
}