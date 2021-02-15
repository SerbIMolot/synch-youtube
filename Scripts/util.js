
import urlParser from "js-video-url-parser";

function checkErrResponse(xhr) {
	let err = eval("(" + xhr.responseText + ")");
	let msg = '';
	if (xhr.status === 0) {
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
		msg = 'Uncaught Error.';
	}
	alert(msg + "\nResponce text: " + err.Message);
}

function getParams(url) {
	let params = {};
	let parser = document.createElement('a');
	parser.href = url;
	let query = parser.search.substring(1);
	let lets = query.split('&');
	for (let i = 0; i < lets.length; i++) {
		let pair = lets[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

let link = window.location.href.split('/');
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
function loadChatsView() {
	$.ajax({
		url: siteLocation + '/Room/UpdateGrid?roomName=' + roomName,
		type: 'post',
		cache: false,
		async: true,
		success: function (result) {
			console.log(result);
			$('#partialChats').html(result);
		},
		error: function (xhr, status, error) {
			checkErrResponse(xhr);
		}
	});
}

$('body').on('click', '.createBtn', function () {
	let msg = $('#createText').val();
	if (msg.length != 0) {
		console.log(msg);

		$('#createText').val('');

	}
});

$("#write_link").on('input', function () {
	let $item = $(this);
	let input = $item.val();
	if (input.includes("youtube") && (input.includes("watch") || input.includes("list"))) {
		$("#preview_playlist").empty();
		previewVideos.length = 0;
		let linkParams = getParams(input);
		let playlistVids;
		let url = "https://www.youtube.com/list_ajax?style=json&action_get_list=1&list=" + linkParams.list + "&index=" + 0 + "&hl=en";

		$.connection.groupHubs.server.getVideosFromLink(input);

	} else {
		$("#preview_playlist").empty();
		document.getElementById("elements_count").innerHTML = "";
		previewVideos.length = 0;

	}
});

$('body').on('click', '.link_send_btn', function () {
	let msg = $('#write_link').val();
	if (msg.length != 0) {
		console.log(msg);
		$.connection.groupHubs.server.changeVideoSource(currentRoomName, msg).done(function (videos) {
			// alert("Added");
		});

	}
});

$('body').on('click', '.ytp-suggestion-link', function () {

});
$('#vid1').on('click', function () {
});
$('.ytp-suggestion-image').on('click', function () {
});
$('.ytp-suggestion-overlay').on('click', function () {
});
function playlistButtonPress() {
	if (document.getElementById('playlist-ui').style.width == '0px' || document.getElementById('playlist-ui').style.width == '') {
		document.getElementById('playlist-ui').style.width = '20%';
		document.getElementById('playlist-ui').style.height = '100%';
		document.getElementById('playlist_slide').style.marginRight = '20%';
	}
	else if (document.getElementById('playlist-ui').style.width == '20%') {
		document.getElementById('playlist-ui').style.width = '0';
		document.getElementById('playlist-ui').style.height = '0';
		document.getElementById('playlist_slide').style.marginRight = '0%';
	}
}

(function ($, sr) {
	let debounce = function (func, threshold, execAsap) {
		let timeout;

		return function debounced() {
			let obj = this, args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			}

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap)
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
	// smartresize 
	jQuery.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery, 'smartresize');

window.addEventListener("onunload", function (e) {
	let confirmationMessage = "\o/";

	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage;                            //Webkit, Safari, Chrome
});
$(document).on('onunload', function () {
	$.ajax({
		url: "/Account/LogOff",
		success: function (result) {
		},
		error: function (xhr, status, error) {
			checkErrResponse(xhr);
		}
		
	});
});
window.addEventListener("beforeunload", function logData() {
	navigator.sendBeacon("/Account/LogOff", null);
});
$(document).on('beforeunload', function () {
	$.ajax({
		url: "/Account/LogOff",
		success: function (result) {
		},
		error: function (xhr, status, error) {
			checkErrResponse(xhr);
		}
	});
});
function addToPlaylist(videoArray) {
	videopl.playlist(Array.prototype.push.apply(videopl.playlist(), videoArray));
}
if (currentRoomName !== undefined) {

	let videopl = videojs('vid1');

	let serverCurrentTimeCall = 0;

	videopl.on('playing', function () {
		$.connection.groupHubs.server.groupPlay(currentRoomName);
	});
	videopl.on('pause', function () {
		console.log('TESTSEMT: OSEMT: OMSET');
		$.connection.groupHubs.server.groupPause(currentRoomName);
	});
	videopl.on('canplay', (event) => {
	});


	videopl.on("mouseover", function () {
		document.getElementById("room_name").style.opacity = 1;
	});
	videopl.on("mouseout", function () {
		document.getElementById("room_name").style.opacity = 0;
	});
	let myMiddleware = function (videopl) {
		let tech;
		let prevCurrentTime;

		return {
			setSource: function (srcObj, next) {
				next(null, srcObj);
			},
			currentTime: function (ct) {
				prevCurrentTime = ct;
				return ct;
			},
			setCurrentTime: function (time) {
				if (serverCurrentTimeCall == 0) {
					$.connection.groupHubs.server.timeUpdate(currentRoomName, time);
					console.log(time);
					prevCurrentTime = time;
					return time;
				} else if (serverCurrentTimeCall == 1) {
					prevCurrentTime = time;
					serverCurrentTimeCall = 0;
					return time;
				}

			},
			// Required for middleware. Simply passes along the source
			loadeddata: function (time) {
			}
		};
	};

	videojs.use('*', myMiddleware);
	videopl.playlist([]);
	videopl.playlistUi({
		el: document.getElementById('playlist-ui')
	});

	function notifyUserOfTryingToReconnect() {
	}
	function notifyUserOfConnectionProblem() {
	}
	function notifyUserOfDisconnect() {
	}
	function addElementPreview(videosJson) {
		let videos = JSON.parse(videosJson);
		let playlist = document.getElementById("preview_playlist");
		videos.forEach(video => {
			let new_video =
				$(`<li class="playlist_item">
                        <div class="video_block">
                            <picture class="video_thumbnail">`+
					`<source srcset="` + video.thumbnail[0].srcset + `" type="` + video.thumbnail[0].type + `">
                                <img alt="" src="` + video.thumbnail[1].src + `">
                            </picture>
                            <span class="time_date" id="msg_time">` + video.duration + `</span>
                        </div>
                    </li>`).addClass('playlist_item');
			new_video.appendTo('#preview_playlist');
		});
		document.getElementById("elements_count").innerHTML = $('#preview_playlist li').length;
	}
	$(function () {
		let roomVideoIds;
		let chat = $.connection.groupHubs;
		let tryingToReconnect = false;
		let isServerChangePlaylist = false;
		let isChangeItem = false;
		$.connection.hub.reconnected(function () {
			tryingToReconnect = false;
		});
		$.connection.hub.reconnecting(function () {
			tryingToReconnect = true;
			notifyUserOfTryingToReconnect();
		});
		$.connection.hub.connectionSlow(function () {
			notifyUserOfConnectionProblem();
		});
		$.connection.hub.disconnected(function () {
			if (tryingToReconnect) {
				notifyUserOfDisconnect();
			}
		});
		chat.client.setTime = function (time) {
			video.currentTime(time);
		};
		chat.client.groupPlay = function () {
			videopl.play();
		};
		chat.client.groupPause = function () {
			videopl.pause();
		};
		chat.client.timeUpdate = function (time) {
			serverCurrentTimeCall = 1;
			videopl.currentTime(time);
		};
		chat.client.addVideoToPlaylist = function (videoJson) {
			let video = JSON.parse(videoJson);
			let currentPlaylist = videopl.playlist();
			currentPlaylist.push(video);
			videopl.playlist(currentPlaylist);
		};
		chat.client.addVideoArrayToPlaylist = function (videoArrayJson) {
			let videoArray = JSON.parse(videoArrayJson);
			let currentPlaylist = videopl.playlist();
			Array.prototype.push.apply(currentPlaylist, videoArray);
			videopl.playlist(currentPlaylist);
		};
		chat.client.forceTimeUpdateServer = function () {

			$.connection.groupHubs.server.updateRoomTime(currentRoomName, videopl.currentTime());
		};
		let timeToSet = 0.0;
		let setPlaylistIndexTimeSet = false;
		chat.client.setPlaylistIndexTime = function (index, time) {
			if (index != videopl.playlist.currentIndex()) {
				isServerChangePlaylist = true;
				videopl.playlist.currentItem(index);
				console.log("442" + isServerChangePlaylist);
				setPlaylistIndexTimeSet = true;
				timeToSet = time;
			}
			else {
				setPlaylistIndexTimeSet = true;
				timeToSet = time;
			}


		};
		chat.client.previewVideoFromLink = function (videos) {
			if (index != videopl.playlist.currentIndex()) {
				isServerChangePlaylist = true;
				videopl.playlist.currentItem(index);
				console.log("442" + isServerChangePlaylist);
				setPlaylistIndexTimeSet = true;
				timeToSet = time;
			}
			else {
				setPlaylistIndexTimeSet = true;
				timeToSet = time;
			}


		};

		$('#preview_playlist').on('click', '.playlist_item', function () {
			let index = parseInt(this.id.replace(/[^\d.]/g, ''));
			let videoJson = previewVideos[index];
			chat.server.addVideoToRoom(currentRoomName, videoJson);

		});
		chat.client.previewLoadedVideos = function (videosJson, isSamePlaylist) {

			let videos = JSON.parse(videosJson);

			let playlist = document.getElementById("preview_playlist");
			let id = 0;
			videos.forEach(video => {
				previewVideos.push(JSON.stringify(video));
				let videoJ = JSON.stringify(video);
				let new_video =
					$(`<li class="playlist_item"  id="preview_video_` + id + `">
                        <input type="hidden" id="video_data_` + id + `" value="` + videoJ + `">
                    <div class="video_block">
                        <picture class="video_thumbnail">`+
						`<source srcset="` + video.thumbnail[0].srcset + `" type="` + video.thumbnail[0].type + `">
                            <img alt="" src="` + video.thumbnail[1].src + `">
                        </picture>
                        <span class="time_date" id="msg_time">` + video.duration + `</span>
                    </div>
                </li>`).addClass('playlist_item');
				new_video.appendTo('#preview_playlist');
				id++;
			});
			document.getElementById("elements_count").innerHTML = $('#preview_playlist li').length;

		};
		chat.client.changeVideoSource = function (source) {
			let vid = JSON.parse(source);

			console.log(source);

			isServerChangePlaylist = true;

			videopl.src(vid[0].src);
			videopl.playlist(vid);
			videopl.playlist.autoadvance(1);
			videopl.playlist.repeat(false);

		};
		chat.client.addMessage = function (name, message, roomName, time) {
			if (roomName == currentRoomName) {

				let new_message =
					$(`<li class="incoming_msg">
                <div class="received_msg">
                    <div class="received_msg sender_name">` + name + `</div>
                    <div class="received_withd_msg">
                        <p>` +
						message +
						`</p>
                    </div>
                    <span class="time_date" id="msg_time">` + time + `</span>
                </div>
            </li>`).addClass('incoming_msg');
				new_message.appendTo('#msg_history');
			}
			else {
				loadChatsView();
			}
		};
		chat.client.addCallerMessage = function (name, message, time) {

			$('#msg_history').append(`<li class="outgoing_msg">
				<div class="sent_msg">
					<div class="outgoing_msg sender_name">
						<p>` +
				name +
				`</p>
					</div>
					<div class="received_withd_msg">
						<p>` +
				message +
				`</p>
					</div>
					<span class="time_date">` + time + `</span>
				</div>
			</li>`);
			updateScroll();
		};

		chat.client.onConnected = function (id, userName) {


			$('#chatBody').show();

			$('#hdId').val(id);
			$('#username').val(userName);
			if (currentRoomName !== undefined) {
				chat.server.updatePlaylist(currentRoomName);
				updateScroll();
				chat.server.joinRoom(currentRoomName);
				chat.server.requestTimeSynch(currentRoomName, userName);
				chat.server.updateUsersInRoom(currentRoomName);
				$('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');
			}
			console.log(userName);
			console.log(userName);


		};
		function updateScroll() {
			let element = document.getElementById("msg_history");
			element.scrollTop = element.scrollHeight;

		}

		chat.client.onNewUserConnected = function (id, name) {

			AddUser(id, name);
		};
		chat.client.synchWith = function (name) {
			chat.server.setTimeForOtherClient(name, videopl.currentTime(), videopl.playlist.currentIndex());
		};

		chat.client.onUserDisconnected = function (userName) {
			if (currentRoomAnmin.userName == userName) {
				chat.groupHubs.server.switchAdminForRoom(currentRoomName, userName);
			}
		};

		chat.client.updateUsersInRoom = function (roomJson) {
			let room = JSON.parse(roomJson);

			let newUserList = document.getElementById("user-list");
			newUserList.innerHTML = "";
			room.Users.forEach(user => {
				let newUserLi = document.createElement('li');
				if (room.Admin.UserName === user.UserName) {

					newUserLi.appendChild(document.createTextNode(user.UserName + "Admin"));
				}
				else {

					newUserLi.appendChild(document.createTextNode(user.UserName));
				}
				newUserList.appendChild(newUserLi);
			});
		};
		chat.client.changePlaylistItem = function (id) {
			if (id != videopl.playlist.currentIndex()) {
				console.log("442" + isServerChangePlaylist);
				isServerChangePlaylist = true;
				videopl.playlist.currentItem(id);
				videopl.currentTime(0.0);
			}

		};
		videopl.on("playlistitem", function (id, jd) {

			if (!isServerChangePlaylist && jd.playlistItemId_ != videopl.playlist.currentIndex()) {

				$.connection.groupHubs.server.changePlaylistItem(currentRoomName, videopl.playlist.currentIndex());
			}
			else if (isServerChangePlaylist) {
				isServerChangePlaylist = false;
				console.log("458" + isServerChangePlaylist);
			}
		});
		videopl.on("sourceset", function () {

			console.log("sourceset");

		});
		videopl.on("loadstart", function () {
			if (setPlaylistIndexTimeSet) {
				videopl.currentTime(timeToSet);
				console.log("loadstart");
				setPlaylistIndexTimeSet = false;
				videopl.play();
			}

		});
		videopl.on("loadedmetadata", function () {

			console.log("loadedmetadata");

		});
		videopl.on("ready", function () {

			console.log("ready");

		});
		videopl.on("canplay", function () {

			console.log("canplay");

		});
		$.connection.hub.start().done(function () {
			console.log("hub is ready");

			$('body').on('click', '.msg_send_btn', function () {
				let msg = $('#write_msg').val();
				if (msg.length != 0) {
					console.log(currentRoomName);
					chat.server.sendGroupMessage(currentRoomName, msg);
					$('#write_msg').val('');

				}
			});

		}).fail(function (e) {
			console.error(e);
		});
	});
}
function htmlEncode(value) {
	let encodedValue = $('<div />').text(value).html();
	return encodedValue;
}
function AddUser(id, name) {

	let userId = $('#hdId').val();

	if (userId != id) {

		$("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
	}
}