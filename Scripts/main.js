/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Scripts/util.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/util.js":
/*!*************************!*\
  !*** ./Scripts/util.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_video_url_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-video-url-parser */ "./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js");
/* harmony import */ var js_video_url_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_video_url_parser__WEBPACK_IMPORTED_MODULE_0__);
﻿

//import request from 'request';
var getUrlParams = function (url) {
	var params = {};
	(url + '?').split('?')[1].split('&').forEach(
		function (pair) {
			pair = (pair + '=').split('=').map(decodeURIComponent);
			if (pair[0].length) {
				params[pair[0]] = pair[1];
			}
		});

	return params;
};
var link = window.location.href.split('/');
var siteLocation;
var currentRoomName;
const previewVideos = [];

if (link[5] !== undefined) {
	currentRoomName = link[5];
	var virtDir = link[3];
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
			var err = eval("(" + xhr.responseText + ")");
			alert(err.Message);
		}
	});
}

function charNameclick(roomName) {
	console.log(roomName);
	$.connection.groupHubs.state.currentChatRoom = roomName;
	$.connection.groupHubs.server.switchCurrentRoom(roomName);
	loadMessageView(roomName);
}
function loadMessageView(roomName) {
	var link;
	$.ajax({
		url: siteLocation + '/Room/UpdateChat?roomName=' + roomName,
		type: 'post',
		cache: false,
		async: true,
		success: function (result) {
			console.log(result);
			$('#messages').html(result);
			currentRoomName = roomName;

			updateScroll();
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
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
	});
	$.ajax({
		url: siteLocation + '/Room/UpdateGrid?roomName=' + roomName,
		type: 'post',
		cache: false,
		async: true,
		success: function (result) {
			console.log(result);
			chatName.innerText = roomName;
			$('#partialChats').html(result);
		},
		error: function (jqXHR, exception) {
			var msg = '';
			if (jqXHR.status === 0) {
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
	});
	currentRoomName = roomName;
	$.connection.groupHubs.server.setCallerCurrentTime(roomName);
}

function DeleteCurrentChat() {
	$.ajax({
		url: siteLocation + '/Room/DeleteChat?roomName=' + currentRoomName,
		type: 'post',
		cache: false,
		async: true,
		success: function (result) {
			console.log(result);
			$('#partialChats').html(result);
		},
		error: function (xhr, status, error) {
			var err = eval("(" + xhr.responseText + ")");
			alert(err.Message);
		}
	});
}
function onCreateClick() {
	var room = $('#createText').val();
	if (room.length != 0) {
		console.log(room);
		console.log(siteLocation + '/Room/JoinRoom?roomName=' + room);
		$.ajax({
			url: siteLocation + '/Room/CreateRoom?roomName=' + room,
			type: 'post',
			cache: false,
			async: true,
			success: function (result) {
				console.log(result);
				//$('#partialChats').html(result);
				window.location.href = "Chat/" + room;
				//window.history.pushState({roomName: room}, "Title", "/Room/Chat");
				loadMessageView(room);
			},
			error: function (jqXHR, exception) {
				var msg = '';
				if (jqXHR.status === 0) {
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
		});

		$('#createText').val('');

	}
}
function onJoinClick() {
	var room = $('#joinRoomText').val();
	if (room.length != 0) {
		console.log(room);
		console.log(siteLocation + '/Room/JoinRoom?roomName=' + room);
		$.ajax({
			url: siteLocation + '/Room/JoinRoom?roomName=' + room,
			type: 'post',
			cache: false,
			async: true,
			success: function (result) {
				// $.connection.groupHubs.server.joinRoom(roomName);
				window.location.href = "Chat/" + room;
				console.log(result);
				$('#partialChats').html(result);
				loadMessageView(room);
			},
			error: function (jqXHR, exception) {
				var msg = '';
				if (jqXHR.status === 0) {
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
		});
		$('#joinRoomText').val('');


	}
}
function OpenYoutube() {
	$.ajax({
		url: siteLocation + '/Room/YoutubePlayer',
		type: 'get',
		cache: false,
		async: true,
		success: function (result) {
			console.log(result);
			$('#modDialog').modal('show');
		},
		error: function (xhr, status, error) {
			var err = eval("(" + xhr.responseText + ")");
			alert(err.Message);
		}
	});
}
//function onJoinClick() {
//    var roomName = $('#joinRoomText').val();
//    $.connection.groupHubs.server.joinRoom(roomName);
//
//    loadMessageView(roomName)
//} 
$('body').on('click', '.createBtn', function () {
	var msg = $('#createText').val();
	if (msg.length != 0) {
		console.log(msg);

		$('#createText').val('');

	}
});
function preview(source) {

	//.done(function () { console.log("second success"); })
	//.fail(function () { console.log("error"); })
	//.always(function () { console.log("complete"); });


	//var videos = JSON.parse(videosJson);
	//  videopl.playlist.currentItem(index)

}
function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, true); // false for synchronous request

	xmlHttp.addEventListener("load", function (event) {
		console.log(this);
	});
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
//var express = require('express');
//var cors = require('cors');
//var app = express();
//app.use(cors());
$("#write_link").on('input', function () {
	var $item = $(this);
	var input = $item.val();
	if (input.includes("youtube") && (input.includes("watch") || input.includes("list"))) {
		$("#preview_playlist").empty();
		previewVideos.length = 0;
		var linkParams = getParams(input);
		var playlistVids;
		var url = "https://www.youtube.com/list_ajax?style=json&action_get_list=1&list=" + linkParams.list + "&index=" + 0 + "&hl=en";
		//var dawes = request.get(url);
		//$.getJSON(url, function (data, status, xhr) {
		//    alert(data.data.title);
		//    // data contains the JSON-Object below
		//});
		//app.get('/products/:id', function (req, res, next) {
		//    res.json({ msg: 'This is CORS-enabled for all origins!' })
		//})
		// httpGetAsync(url, addElementPreview);
		//fetch(url).then(respn => respn.ok ? respn.json() : Promise.reject(undefined)).then(data => console.log(data))
		//    .catch(err => console.log(err));
		//
		//fetch(url).then((resp) => resp.text()).then(function (data) {
		//    dawes = data;
		//});
		//var blobs = fetch(url)
		//    .then(res => res.blob()) // Gets the response and returns it as a blob
		//    .then(blob => {
		//        // Here's where you get access to the blob
		//        // And you can use it for whatever you want
		//        // Like calling ref().put(blob)
		//
		//        // Here, I use it to make an image appear on the page
		//        var objectURL = URL.createObjectURL(blob);
		//        var myImage = new Image();
		//        myImage.src = objectURL;
		//        document.getElementById('myImg').appendChild(myImage)
		//    });
		////$.getJSON( url, function (data) {
		////    playlistVids = JSON.parse(data);
		////    // JSON result in `data` variable
		////})
		//var xhr = new XMLHttpRequest();
		//xhr.open(
		//    'GET',
		//    url,
		//    true
		//);
		//xhr.responseType = 'json';
		//xhr.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
		////xhr.setRequestHeader("Access-Control-Allow-Origin", '*');
		////xhr.setRequestHeader("sec-fetch-dest", 'document');
		//xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36");
		//xhr.send();
		//xhr.onreadystatechange = function () {
		//    if (xhr.readyState != 4) {
		//        return
		//    }
		//    if (xhr.status === 200) {
		//        console.log('result', xhr.responseText)
		//        console.log('result', JSON.parse(xhr.responseText))
		//
		//    } else {
		//        console.log('err', xhr.responseText)
		//    }
		//}
		//  request = new Request('/json', {
		// headers: new Headers({
		//     'Content-Type': 'Document'
		// })
		//
		//
		//ch(request)
		// .then(function () {
		//     alert("strhbf")/* handle response */
		//
		//var list = urlParser.parse('http://www.youtube.com/playlist?list=PL46F0A159EC02DF82');
		//var test = httpGet(url);
		//$.ajax({
		//    url: url,
		//    type: "GET",
		//    beforeSend: function (request) {
		//        request.setRequestHeader('Content-Type', 'json');
		//        request.setRequestHeader("Access-Control-Allow-Origin", '*');
		//        request.setRequestHeader("HH-User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36");
		//
		//    },
		//    dataType: "json",
		//    success: function (data) {
		//        alert(data);
		//    },
		//    error: function (XMLHttpRequest, textStatus, errorThrown) {
		//        alert("error");
		//        console.log("REQUEST" + XMLHttpRequest.toString());
		//        console.log("textStatus" + textStatus.toString());
		//        console.log("errorThrown" + errorThrown.toString());
		//    }
		//
		//});
		////preview(input);
		//$.connection.groupHubs.server.getVideosFromLink(input);
		$.connection.groupHubs.server.getVideosFromLink(input);

	} else {
		$("#preview_playlist").empty();
		document.getElementById("elements_count").innerHTML = "";
		previewVideos.length = 0;

	}
});
//function writeLinkInput() {
//    var input = $("#write_link").val();
//    if (input.includes("youtube") && (input.includes("watch") || input.includes("list"))) {
//        $("#preview_playlist").empty();
//        preview(input);
//
//    } else {
//        $("#preview_playlist").empty();
//        document.getElementById("elements_count").innerHTML = "";
//    }
//};

$('body').on('click', '.link_send_btn', function () {
	var msg = $('#write_link').val();
	if (msg.length != 0) {
		console.log(msg);
		$.connection.groupHubs.server.changeVideoSource(currentRoomName, msg).done(function (videos) {
			// alert("Added");
		});
		//videopl.src({ type: "video/youtube", src: msg });

	}
});

$('body').on('click', '.ytp-suggestion-link', function () {
	//  alert("Added");

});
$('#vid1').on('click', function () {
	// alert("inside suggestion-link");
});
$('.ytp-suggestion-image').on('click', function () {
	// alert("inside suggestion-image");
});
$('.ytp-suggestion-overlay').on('click', function () {
	// alert("inside ytp-suggestion-overlay");
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
/*
function openSlidePlaylist() {
    document.getElementById('playlist-ui').style.width = '25%';
}
function closeSlidePlaylist() {
    document.getElementById('playlist-ui').style.width = '0';
}
*/
(function ($, sr) {

	// debouncing function from John Hann
	// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	var debounce = function (func, threshold, execAsap) {
		var timeout;

		return function debounced() {
			var obj = this, args = arguments;
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
/*
$(function () {

    // Find all <video> element
    var $allVideos = $('video'),

        // The element that is fluid width
        $fluidEl = $('#content_container');

    // Figure out and save the aspect ratio for each <video> element on the page
    $allVideos.each(function () {

        $(this)
            // values from <video> height and width attributes
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(window).smartresize(function () {

        var newWidth = $fluidEl.width();

        // Resize all <video> according to their own aspect ratio
        $allVideos.each(function () {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();
});*/
//$scope.currentRoomName = "";
//$rootScope.$on("chatRoomChanged", function (args, room)
//{
//    $scope.currentRoomName = room;
//});
/*videopl.on('seeked', function () {
    if (clientSeek > 0) {
        $.connection.groupHubs.server.timeUpdate(currentRoomName, this.currentTime());
        console.log(this.currentTime());
        clientSeek = 0;
    }
    else {
        clientSeek = 1;
    }
})*/

window.addEventListener("onunload", function (e) {
	var confirmationMessage = "\o/";

	(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	return confirmationMessage;                            //Webkit, Safari, Chrome
});
$(document).on('onunload', function () {
	$.ajax({
		url: "/Account/LogOff",
		success: function (result) {
		}
	});
});
window.addEventListener("beforeunload", function logData() {
	navigator.sendBeacon("/Account/LogOff", null);

	//$.ajax({
	//	type: 'POST',
	//	async: false,
	//	url: "/Account/LogOff",
	//	success: function (result) {
	//	}
	//});
	//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	//return confirmationMessage;                            //Webkit, Safari, Chrome
});
$(document).on('beforeunload', function () {
	$.ajax({
		url: "/Account/LogOff",
		success: function (result) {
		}
	});
});
function addToPlaylist(videoArray) {
	videopl.playlist(Array.prototype.push.apply(videopl.playlist(), videoArray));
}
if (currentRoomName !== undefined) {

	var videopl = videojs('vid1');

	var serverCurrentTimeCall = 0;

	videopl.on('playing', function () {
		$.connection.groupHubs.server.groupPlay(currentRoomName);
	});
	videopl.on('pause', function () {
		console.log('TESTSEMT: OSEMT: OMSET');
		$.connection.groupHubs.server.groupPause(currentRoomName);
	});
	videopl.on('canplay', (event) => {
		//alert("Browser has loaded the current frame");
		//videopl.currentTime = 0.50;
	});

	//videopl.on('loadeddata', function () {
	//    alert("Browser has loaded the current frame");
	//});

	videopl.on("mouseover", function () {
		document.getElementById("room_name").style.opacity = 1;
	});
	videopl.on("mouseout", function () {
		document.getElementById("room_name").style.opacity = 0;
	});
	var myMiddleware = function (videopl) {
		var tech;
		var prevCurrentTime;

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
				//alert("Browser has loaded the current frame");
			}
		};
	};

	videojs.use('*', myMiddleware);
	videopl.playlist([]);
	videopl.playlistUi({
		el: document.getElementById('playlist-ui')
	});

	//var el = document.getElementsByClassName("vjs-playlist-item-list");
	//[].forEach.call(el, function (e) {
	//    addEventListener("click", function (e) {
	//        console.log(e);
	//        if (e.target && e.target.nodeName == "LI") {
	//            console.log(e.target.id + " was clicked");
	//        }
	//    })
	//var el = document.getElementsByClassName("vjs-playlist-item-list");
	//[].forEach.call(el, function (e) {
	//    addEventListener("click", function (e) {
	//        console.log(e);
	//        if (e.target && e.target.nodeName == "LI") {
	//            console.log(e.target.id + " was clicked");
	//        }
	//    })
	//
	//    // e.target is our targetted element.
	//    // try doing console.log(e.target.nodeName), it will result LI
	//});
	function notifyUserOfTryingToReconnect() {
		// alert("TRYING TO RECCONECT");
	}
	function notifyUserOfConnectionProblem() {
		//alert("YOU HAVE A CONNECTION PROBLEM :)");
	}
	function notifyUserOfDisconnect() {
		// alert("DISCONECTED!!! :)");
	}
	var getParams = function (url) {
		var params = {};
		var parser = document.createElement('a');
		parser.href = url;
		var query = parser.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			params[pair[0]] = decodeURIComponent(pair[1]);
		}
		return params;
	};
	function httpGetAsync(theUrl, callback) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function () {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
				callback(xmlHttp.responseText);
		};
		xmlHttp.open("GET", theUrl, true); // true for asynchronous 
		xmlHttp.setRequestHeader('Access-Control-Allow-Origin', 'null');
		xmlHttp.setRequestHeader('Content-type', 'application/json');
		xmlHttp.send(null);
	}
	function addElementPreview(videosJson) {
		var videos = JSON.parse(videosJson);
		var playlist = document.getElementById("preview_playlist");
		videos.forEach(video => {
			var new_video =
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
		var roomVideoIds;
		var chat = $.connection.groupHubs;
		var tryingToReconnect = false;
		var isServerChangePlaylist = false;
		var isChangeItem = false;
		$.connection.hub.reconnected(function () {
			tryingToReconnect = false;
		});
		$.connection.hub.reconnecting(function () {
			tryingToReconnect = true;
			notifyUserOfTryingToReconnect(); // Your function to notify user.
		});
		$.connection.hub.connectionSlow(function () {
			notifyUserOfConnectionProblem(); // Your function to notify user.
		});
		$.connection.hub.disconnected(function () {
			if (tryingToReconnect) {
				notifyUserOfDisconnect(); // Your function to notify user.
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
			var video = JSON.parse(videoJson);
			var currentPlaylist = videopl.playlist();
			currentPlaylist.push(video);
			videopl.playlist(currentPlaylist);
		};
		chat.client.addVideoArrayToPlaylist = function (videoArrayJson) {
			var videoArray = JSON.parse(videoArrayJson);
			var currentPlaylist = videopl.playlist();
			Array.prototype.push.apply(currentPlaylist, videoArray);
			videopl.playlist(currentPlaylist);
		};
		chat.client.forceTimeUpdateServer = function () {

			$.connection.groupHubs.server.updateRoomTime(currentRoomName, videopl.currentTime());
		};
		var timeToSet = 0.0;
		var setPlaylistIndexTimeSet = false;
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
			//  videopl.playlist.currentItem(index)


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
			//  videopl.playlist.currentItem(index)


		};

		$('#preview_playlist').on('click', '.playlist_item', function () {
			var index = parseInt(this.id.replace(/[^\d.]/g, ''));
			var videoJson = previewVideos[index];
			chat.server.addVideoToRoom(currentRoomName, videoJson);
			//videopl.src({ type: "video/youtube", src: msg });

		});
		chat.client.previewLoadedVideos = function (videosJson, isSamePlaylist) {

			var videos = JSON.parse(videosJson);
			//  videopl.playlist.currentItem(index)

			var playlist = document.getElementById("preview_playlist");
			var id = 0;
			videos.forEach(video => {
				previewVideos.push(JSON.stringify(video));
				var videoJ = JSON.stringify(video);
				var new_video =
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
			var vid = JSON.parse(source);
			//alert(typeof source);
			//vid.forEach(function (item, i, arr) {
			//    alert(i + ": " + item.src + " (массив:" + arr + ")");
			//});
			//var videosrc = [];
			console.log(source);
			//console.log( vid );
			isServerChangePlaylist = true;
			console.log("334" + isServerChangePlaylist);
			videopl.src(vid[0].src);
			videopl.playlist(vid);
			videopl.playlist.autoadvance(1);
			videopl.playlist.repeat(false);
			//videopl.src({ type: "video/youtube", src: source });
		};
		chat.client.addMessage = function (name, message, roomName, time) {
			// Добавление сообщений на веб-страницу 
			//document.getElementById("add_to_me").innerHTML +=
			if (roomName == currentRoomName) {
                /*$('#msg_history').append(
                    '<li class= "incoming_msg" > ' +
                        '<div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>' +
                            '<div class="received_msg">' +
                                '<div class="received_withd_msg">' +
                                    '<p>' +
                                    message +
                                    '</p >' +
                                    '<span class="time_date">' + time + '</span>' +
                                 '</div>' +
                            '</div>' +
                        '</div>' +
                    '</li>');*/

				var new_message =
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
            /*$('#msg_history').append(`<li class="outgoing_msg">
                                                <div class= "sent_msg">
                                                    <p>`+
                                                    message +
                                                    `</p> 
                                                </div >
                                                <span class="time_date">`+ time + `</span>
                                            </li >`
            );*/
			updateScroll();
		};

		// Функция, вызываемая при подключении нового пользователя
		chat.client.onConnected = function (id, userName) {


			$('#chatBody').show();
			// установка в скрытых полях имени и id текущего пользователя
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
			var element = document.getElementById("msg_history");
			element.scrollTop = element.scrollHeight;

		}
		// Добавляем нового пользователя
		chat.client.onNewUserConnected = function (id, name) {

			AddUser(id, name);
		};
		chat.client.synchWith = function (name) {
			//console.log("User " +name + " time " +videopl.currentTime());
			//$.connection.groupHubs.server.setTimeForOtherClient(name, videopl.currentTime);
			chat.server.setTimeForOtherClient(name, videopl.currentTime(), videopl.playlist.currentIndex());
		};

		// Удаляем пользователя
		chat.client.onUserDisconnected = function (userName) {
			if (currentRoomAnmin.userName == userName) {
				chat.groupHubs.server.switchAdminForRoom(currentRoomName, userName);
			}
			//$('#' + id).remove();
		};
		// Удаляем пользователя
		chat.client.updateUsersInRoom = function (roomJson) {
			var room = JSON.parse(roomJson);

			var newUserList = document.getElementById("user-list");
			newUserList.innerHTML = "";
			room.Users.forEach(user => {
				var newUserLi = document.createElement('li');
				if (room.Admin.UserName === user.UserName) {

					newUserLi.appendChild(document.createTextNode(user.UserName + "Admin"));
				}
				else {

					newUserLi.appendChild(document.createTextNode(user.UserName));
				}
				newUserList.appendChild(newUserLi);
			});
			//$('#' + id).remove();
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
				//alert(id + " ::::: " + jd + " " + isServerChangePlaylist + " defined ID: " + videopl.playlist.currentIndex());

				$.connection.groupHubs.server.changePlaylistItem(currentRoomName, videopl.playlist.currentIndex());
			}
			else if (isServerChangePlaylist) {
				//alert(id + " " +isServerChangePlaylist + " server");
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
				var msg = $('#write_msg').val();
				if (msg.length != 0) {
					console.log(currentRoomName);
					chat.server.sendGroupMessage(currentRoomName, msg);
					$('#write_msg').val('');

				}
			});

		}).fail(function (e) {
			//alert('There was an error');
			console.error(e);
		});
	});
}
// Кодирование тегов
function htmlEncode(value) {
	var encodedValue = $('<div />').text(value).html();
	return encodedValue;
}
//Добавление нового пользователя
function AddUser(id, name) {

	var userId = $('#hdId').val();

	if (userId != id) {

		$("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
	}
}

/***/ }),

/***/ "./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var getQueryParams = function getQueryParams(qs) {
    if (typeof qs !== 'string') {
      return {};
    }

    qs = qs.split('+').join(' ');
    var params = {};
    var match = qs.match(/(?:[?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/);
    var split;

    if (match === null) {
      return {};
    }

    split = match[0].substr(1).split(/[&#=]/);

    for (var i = 0; i < split.length; i += 2) {
      params[decodeURIComponent(split[i])] = decodeURIComponent(split[i + 1] || '');
    }

    return params;
  };

  var combineParams = function combineParams(params, hasParams) {
    if (_typeof(params) !== 'object') {
      return '';
    }

    var combined = '';
    var i = 0;
    var keys = Object.keys(params);

    if (keys.length === 0) {
      return '';
    } //always have parameters in the same order


    keys.sort();

    if (!hasParams) {
      combined += '?' + keys[0] + '=' + params[keys[0]];
      i += 1;
    }

    for (; i < keys.length; i += 1) {
      combined += '&' + keys[i] + '=' + params[keys[i]];
    }

    return combined;
  }; //parses strings like 1h30m20s to seconds


  function getLetterTime(timeString) {
    var totalSeconds = 0;
    var timeValues = {
      's': 1,
      'm': 1 * 60,
      'h': 1 * 60 * 60,
      'd': 1 * 60 * 60 * 24,
      'w': 1 * 60 * 60 * 24 * 7
    };
    var timePairs; //expand to "1 h 30 m 20 s" and split

    timeString = timeString.replace(/([smhdw])/g, ' $1 ').trim();
    timePairs = timeString.split(' ');

    for (var i = 0; i < timePairs.length; i += 2) {
      totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs[i + 1] || 's'];
    }

    return totalSeconds;
  } //parses strings like 1:30:20 to seconds


  function getColonTime(timeString) {
    var totalSeconds = 0;
    var timeValues = [1, 1 * 60, 1 * 60 * 60, 1 * 60 * 60 * 24, 1 * 60 * 60 * 24 * 7];
    var timePairs = timeString.split(':');

    for (var i = 0; i < timePairs.length; i++) {
      totalSeconds += parseInt(timePairs[i], 10) * timeValues[timePairs.length - i - 1];
    }

    return totalSeconds;
  }

  var getTime = function getTime(timeString) {
    if (typeof timeString === 'undefined') {
      return 0;
    }

    if (timeString.match(/^(\d+[smhdw]?)+$/)) {
      return getLetterTime(timeString);
    }

    if (timeString.match(/^(\d+:?)+$/)) {
      return getColonTime(timeString);
    }

    return 0;
  };

  var util = {
    getQueryParams: getQueryParams,
    combineParams: combineParams,
    getTime: getTime
  };

  var getQueryParams$1 = util.getQueryParams;

  function UrlParser() {
    for (var _i = 0, _arr = ['parseProvider', 'parse', 'bind', 'create']; _i < _arr.length; _i++) {
      var key = _arr[_i];
      this[key] = this[key].bind(this);
    }

    this.plugins = {};
  }

  var urlParser = UrlParser;

  UrlParser.prototype.parseProvider = function (url) {
    var match = url.match(/(?:(?:https?:)?\/\/)?(?:[^.]+\.)?(\w+)\./i);
    return match ? match[1] : undefined;
  };

  UrlParser.prototype.parse = function (url) {
    if (typeof url === 'undefined') {
      return undefined;
    }

    var provider = this.parseProvider(url);
    var result;
    var plugin = this.plugins[provider];

    if (!provider || !plugin || !plugin.parse) {
      return undefined;
    }

    result = plugin.parse.call(plugin, url, getQueryParams$1(url));

    if (result) {
      result = removeEmptyParameters(result);
      result.provider = plugin.provider;
    }

    return result;
  };

  UrlParser.prototype.bind = function (plugin) {
    this.plugins[plugin.provider] = plugin;

    if (plugin.alternatives) {
      for (var i = 0; i < plugin.alternatives.length; i += 1) {
        this.plugins[plugin.alternatives[i]] = plugin;
      }
    }
  };

  UrlParser.prototype.create = function (op) {
    if (_typeof(op) !== 'object' || _typeof(op.videoInfo) !== 'object') {
      return undefined;
    }

    var vi = op.videoInfo;
    var params = op.params;
    var plugin = this.plugins[vi.provider];
    params = params === 'internal' ? vi.params : params || {};

    if (plugin) {
      op.format = op.format || plugin.defaultFormat; // eslint-disable-next-line no-prototype-builtins

      if (plugin.formats.hasOwnProperty(op.format)) {
        return plugin.formats[op.format].apply(plugin, [vi, Object.assign({}, params)]);
      }
    }

    return undefined;
  };

  function removeEmptyParameters(result) {
    if (result.params && Object.keys(result.params).length === 0) {
      delete result.params;
    }

    return result;
  }

  var parser = new urlParser();
  var base = parser;

  var combineParams$1 = util.combineParams;

  function CanalPlus() {
    this.provider = 'canalplus';
    this.defaultFormat = 'embed';
    this.formats = {
      embed: this.createEmbedUrl
    };
    this.mediaTypes = {
      VIDEO: 'video'
    };
  }

  CanalPlus.prototype.parseParameters = function (params) {
    delete params.vid;
    return params;
  };

  CanalPlus.prototype.parse = function (url, params) {
    var _this = this;

    var result = {
      mediaType: this.mediaTypes.VIDEO,
      id: params.vid
    };
    result.params = _this.parseParameters(params);

    if (!result.id) {
      return undefined;
    }

    return result;
  };

  CanalPlus.prototype.createEmbedUrl = function (vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = 'http://player.canalplus.fr/embed/';
    params.vid = vi.id;
    url += combineParams$1(params);
    return url;
  };

  base.bind(new CanalPlus());

  var combineParams$2 = util.combineParams;

  function Coub() {
    this.provider = 'coub';
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl
    };
    this.mediaTypes = {
      VIDEO: 'video'
    };
  }

  Coub.prototype.parseUrl = function (url) {
    var match = url.match(/(?:embed|view)\/([a-zA-Z\d]+)/i);
    return match ? match[1] : undefined;
  };

  Coub.prototype.parse = function (url, params) {
    var result = {
      mediaType: this.mediaTypes.VIDEO,
      params: params,
      id: this.parseUrl(url)
    };

    if (!result.id) {
      return undefined;
    }

    return result;
  };

  Coub.prototype.createUrl = function (baseUrl, vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = baseUrl + vi.id;
    url += combineParams$2(params);
    return url;
  };

  Coub.prototype.createLongUrl = function (vi, params) {
    return this.createUrl('https://coub.com/view/', vi, params);
  };

  Coub.prototype.createEmbedUrl = function (vi, params) {
    return this.createUrl('//coub.com/embed/', vi, params);
  };

  base.bind(new Coub());

  var combineParams$3 = util.combineParams,
      getTime$1 = util.getTime;

  function Dailymotion() {
    this.provider = 'dailymotion';
    this.alternatives = ['dai'];
    this.defaultFormat = 'long';
    this.formats = {
      "short": this.createShortUrl,
      "long": this.createLongUrl,
      embed: this.createEmbedUrl,
      image: this.createImageUrl
    };
    this.mediaTypes = {
      VIDEO: 'video'
    };
  }

  Dailymotion.prototype.parseParameters = function (params) {
    return this.parseTime(params);
  };

  Dailymotion.prototype.parseTime = function (params) {
    if (params.start) {
      params.start = getTime$1(params.start);
    }

    return params;
  };

  Dailymotion.prototype.parseUrl = function (url) {
    var match = url.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);
    return match ? match[1] : undefined;
  };

  Dailymotion.prototype.parse = function (url, params) {
    var _this = this;

    var result = {
      mediaType: this.mediaTypes.VIDEO,
      params: _this.parseParameters(params),
      id: _this.parseUrl(url)
    };
    return result.id ? result : undefined;
  };

  Dailymotion.prototype.createUrl = function (base, vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    return base + vi.id + combineParams$3(params);
  };

  Dailymotion.prototype.createShortUrl = function (vi, params) {
    return this.createUrl('https://dai.ly/', vi, params);
  };

  Dailymotion.prototype.createLongUrl = function (vi, params) {
    return this.createUrl('https://dailymotion.com/video/', vi, params);
  };

  Dailymotion.prototype.createEmbedUrl = function (vi, params) {
    return this.createUrl('https://www.dailymotion.com/embed/video/', vi, params);
  };

  Dailymotion.prototype.createImageUrl = function (vi, params) {
    delete params.start;
    return this.createUrl('https://www.dailymotion.com/thumbnail/video/', vi, params);
  };

  base.bind(new Dailymotion());

  var combineParams$4 = util.combineParams,
      getTime$2 = util.getTime;

  function Twitch() {
    this.provider = 'twitch';
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl
    };
    this.mediaTypes = {
      VIDEO: 'video',
      STREAM: 'stream',
      CLIP: 'clip'
    };
  }

  Twitch.prototype.seperateId = function (id) {
    return {
      pre: id[0],
      id: id.substr(1)
    };
  };

  Twitch.prototype.parseChannel = function (result, params) {
    var channel = params.channel || params.utm_content || result.channel;
    delete params.utm_content;
    delete params.channel;
    return channel;
  };

  Twitch.prototype.parseUrl = function (url, result, params) {
    var match;
    match = url.match(/(clips\.)?twitch\.tv\/(?:(?:videos\/(\d+))|(\w+)(?:\/clip\/(\w+))?)/i);

    if (match && match[2]) {
      //video
      result.id = 'v' + match[2];
    } else if (params.video) {
      //video embed
      result.id = params.video;
      delete params.video;
    } else if (params.clip) {
      //clips embed
      result.id = params.clip;
      result.isClip = true;
      delete params.clip;
    } else if (match && match[1] && match[3]) {
      //clips.twitch.tv/id
      result.id = match[3];
      result.isClip = true;
    } else if (match && match[3] && match[4]) {
      //twitch.tv/channel/clip/id
      result.channel = match[3];
      result.id = match[4];
      result.isClip = true;
    } else if (match && match[3]) {
      result.channel = match[3];
    }

    return result;
  };

  Twitch.prototype.parseMediaType = function (result) {
    var mediaType;

    if (result.id) {
      if (result.isClip) {
        mediaType = this.mediaTypes.CLIP;
        delete result.isClip;
      } else {
        mediaType = this.mediaTypes.VIDEO;
      }
    } else if (result.channel) {
      mediaType = this.mediaTypes.STREAM;
    }

    return mediaType;
  };

  Twitch.prototype.parseParameters = function (params) {
    if (params.t) {
      params.start = getTime$2(params.t);
      delete params.t;
    }

    return params;
  };

  Twitch.prototype.parse = function (url, params) {
    var _this = this;

    var result = {};
    result = _this.parseUrl(url, result, params);
    result.channel = _this.parseChannel(result, params);
    result.mediaType = _this.parseMediaType(result);
    result.params = _this.parseParameters(params);
    return result.channel || result.id ? result : undefined;
  };

  Twitch.prototype.createLongUrl = function (vi, params) {
    var url = '';

    if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
      url = 'https://twitch.tv/' + vi.channel;
    } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
      var sep = this.seperateId(vi.id);
      url = 'https://twitch.tv/videos/' + sep.id;

      if (params.start) {
        params.t = params.start + 's';
        delete params.start;
      }
    } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
      if (vi.channel) {
        url = 'https://www.twitch.tv/' + vi.channel + '/clip/' + vi.id;
      } else {
        url = 'https://clips.twitch.tv/' + vi.id;
      }
    } else {
      return undefined;
    }

    url += combineParams$4(params);
    return url;
  };

  Twitch.prototype.createEmbedUrl = function (vi, params) {
    var url = 'https://player.twitch.tv/';

    if (vi.mediaType === this.mediaTypes.STREAM && vi.channel) {
      params.channel = vi.channel;
    } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
      params.video = vi.id;

      if (params.start) {
        params.t = params.start + 's';
        delete params.start;
      }
    } else if (vi.mediaType === this.mediaTypes.CLIP && vi.id) {
      url = 'https://clips.twitch.tv/embed';
      params.clip = vi.id;
    } else {
      return undefined;
    }

    url += combineParams$4(params);
    return url;
  };

  base.bind(new Twitch());

  var combineParams$5 = util.combineParams,
      getTime$3 = util.getTime;

  function Vimeo() {
    this.provider = 'vimeo';
    this.alternatives = ['vimeopro', 'vimeocdn'];
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl,
      image: this.createImageUrl
    };
    this.mediaTypes = {
      VIDEO: 'video'
    };
  }

  Vimeo.prototype.parseUrl = function (url, result) {
    var match = url.match(/(vimeo(?:cdn|pro)?)\.com\/(?:(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+|staff\/frame)\/)?videos?)\/)?(\d+)(?:_(\d+)(?:x(\d+))?)?(\.\w+)?/i);

    if (!match) {
      return result;
    }

    result.id = match[2];

    if (match[1] === 'vimeocdn') {
      if (match[3]) {
        result.imageWidth = parseInt(match[3]);

        if (match[4]) {
          //height can only be set when width is also set
          result.imageHeight = parseInt(match[4]);
        }
      }

      result.imageExtension = match[5];
    }

    return result;
  };

  Vimeo.prototype.parseParameters = function (params) {
    return this.parseTime(params);
  };

  Vimeo.prototype.parseTime = function (params) {
    if (params.t) {
      params.start = getTime$3(params.t);
      delete params.t;
    }

    return params;
  };

  Vimeo.prototype.parse = function (url, params) {
    var result = {
      mediaType: this.mediaTypes.VIDEO,
      params: this.parseParameters(params)
    };
    result = this.parseUrl(url, result);
    return result.id ? result : undefined;
  };

  Vimeo.prototype.createUrl = function (baseUrl, vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = baseUrl + vi.id;
    var startTime = params.start;
    delete params.start;
    url += combineParams$5(params);

    if (startTime) {
      url += '#t=' + startTime;
    }

    return url;
  };

  Vimeo.prototype.createLongUrl = function (vi, params) {
    return this.createUrl('https://vimeo.com/', vi, params);
  };

  Vimeo.prototype.createEmbedUrl = function (vi, params) {
    return this.createUrl('//player.vimeo.com/video/', vi, params);
  };

  Vimeo.prototype.createImageUrl = function (vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = 'https://i.vimeocdn.com/video/' + vi.id;

    if (vi.imageWidth && vi.imageHeight) {
      url += '_' + vi.imageWidth + 'x' + vi.imageHeight;
    } else if (vi.imageWidth) {
      url += '_' + vi.imageWidth;
    }

    if (vi.imageExtension === undefined) {
      vi.imageExtension = '.webp';
    }

    url += vi.imageExtension;
    delete vi.imageExtension;
    url += combineParams$5(params);
    return url;
  };

  base.bind(new Vimeo());

  var combineParams$6 = util.combineParams,
      getTime$4 = util.getTime;

  function Wistia() {
    this.provider = 'wistia';
    this.alternatives = [];
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl,
      embedjsonp: this.createEmbedJsonpUrl
    };
    this.mediaTypes = {
      VIDEO: 'video',
      EMBEDVIDEO: 'embedvideo'
    };
  }

  Wistia.prototype.parseUrl = function (url) {
    var match = url.match(/(?:(?:medias|iframe)\/|wvideo=)([\w-]+)/);
    return match ? match[1] : undefined;
  };

  Wistia.prototype.parseChannel = function (url) {
    var match = url.match(/(?:(?:https?:)?\/\/)?([^.]*)\.wistia\./);
    var channel = match ? match[1] : undefined;

    if (channel === 'fast' || channel === 'content') {
      return undefined;
    }

    return channel;
  };

  Wistia.prototype.parseParameters = function (params, result) {
    if (params.wtime) {
      params.start = getTime$4(params.wtime);
      delete params.wtime;
    }

    if (params.wvideo === result.id) {
      delete params.wvideo;
    }

    return params;
  };

  Wistia.prototype.parseMediaType = function (result) {
    if (result.id && result.channel) {
      return this.mediaTypes.VIDEO;
    } else if (result.id) {
      delete result.channel;
      return this.mediaTypes.EMBEDVIDEO;
    } else {
      return undefined;
    }
  };

  Wistia.prototype.parse = function (url, params) {
    var result = {
      id: this.parseUrl(url),
      channel: this.parseChannel(url)
    };
    result.params = this.parseParameters(params, result);
    result.mediaType = this.parseMediaType(result);

    if (!result.id) {
      return undefined;
    }

    return result;
  };

  Wistia.prototype.createUrl = function (vi, params, url) {
    if (params.start) {
      params.wtime = params.start;
      delete params.start;
    }

    url += combineParams$6(params);
    return url;
  };

  Wistia.prototype.createLongUrl = function (vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = 'https://' + vi.channel + '.wistia.com/medias/' + vi.id;
    return this.createUrl(vi, params, url);
  };

  Wistia.prototype.createEmbedUrl = function (vi, params) {
    if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
      return undefined;
    }

    var url = 'https://fast.wistia.com/embed/iframe/' + vi.id;
    return this.createUrl(vi, params, url);
  };

  Wistia.prototype.createEmbedJsonpUrl = function (vi) {
    if (!vi.id || !(vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.EMBEDVIDEO)) {
      return undefined;
    }

    return 'https://fast.wistia.com/embed/medias/' + vi.id + '.jsonp';
  };

  base.bind(new Wistia());

  var combineParams$7 = util.combineParams;

  function Youku() {
    this.provider = 'youku';
    this.defaultFormat = 'long';
    this.formats = {
      embed: this.createEmbedUrl,
      "long": this.createLongUrl,
      flash: this.createFlashUrl,
      "static": this.createStaticUrl
    };
    this.mediaTypes = {
      VIDEO: 'video'
    };
  }

  Youku.prototype.parseUrl = function (url) {
    var match = url.match(/(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/);
    return match ? match[1] : undefined;
  };

  Youku.prototype.parseParameters = function (params) {
    if (params.VideoIDS) {
      delete params.VideoIDS;
    }

    return params;
  };

  Youku.prototype.parse = function (url, params) {
    var _this = this;

    var result = {
      mediaType: this.mediaTypes.VIDEO,
      id: _this.parseUrl(url),
      params: _this.parseParameters(params)
    };

    if (!result.id) {
      return undefined;
    }

    return result;
  };

  Youku.prototype.createUrl = function (baseUrl, vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = baseUrl + vi.id;
    url += combineParams$7(params);
    return url;
  };

  Youku.prototype.createEmbedUrl = function (vi, params) {
    return this.createUrl('http://player.youku.com/embed/', vi, params);
  };

  Youku.prototype.createLongUrl = function (vi, params) {
    return this.createUrl('http://v.youku.com/v_show/id_', vi, params);
  };

  Youku.prototype.createStaticUrl = function (vi, params) {
    return this.createUrl('http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=', vi, params);
  };

  Youku.prototype.createFlashUrl = function (vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = 'http://player.youku.com/player.php/sid/' + vi.id + '/v.swf';
    url += combineParams$7(params);
    return url;
  };

  base.bind(new Youku());

  var combineParams$8 = util.combineParams,
      getTime$5 = util.getTime;

  function YouTube() {
    this.provider = 'youtube';
    this.alternatives = ['youtu', 'ytimg'];
    this.defaultFormat = 'long';
    this.formats = {
      "short": this.createShortUrl,
      "long": this.createLongUrl,
      embed: this.createEmbedUrl,
      shortImage: this.createShortImageUrl,
      longImage: this.createLongImageUrl
    };
    this.imageQualities = {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      DEFAULT: 'default',
      HQDEFAULT: 'hqdefault',
      SDDEFAULT: 'sddefault',
      MQDEFAULT: 'mqdefault',
      MAXRESDEFAULT: 'maxresdefault'
    };
    this.defaultImageQuality = this.imageQualities.HQDEFAULT;
    this.mediaTypes = {
      VIDEO: 'video',
      PLAYLIST: 'playlist',
      SHARE: 'share',
      CHANNEL: 'channel'
    };
  }

  YouTube.prototype.parseVideoUrl = function (url) {
    var match = url.match(/(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w-]{11})/i);
    return match ? match[1] : undefined;
  };

  YouTube.prototype.parseChannelUrl = function (url) {
    // Match an opaque channel ID
    var match = url.match(/\/channel\/([\w-]+)/);

    if (match) {
      return {
        id: match[1],
        mediaType: this.mediaTypes.CHANNEL
      };
    } // Match a vanity channel name or a user name. User urls are deprecated and
    // currently redirect to the channel of that same name.


    match = url.match(/\/(?:c|user)\/([\w-]+)/);

    if (match) {
      return {
        name: match[1],
        mediaType: this.mediaTypes.CHANNEL
      };
    }
  };

  YouTube.prototype.parseParameters = function (params, result) {
    if (params.start || params.t) {
      params.start = getTime$5(params.start || params.t);
      delete params.t;
    }

    if (params.v === result.id) {
      delete params.v;
    }

    if (params.list === result.id) {
      delete params.list;
    }

    return params;
  };

  YouTube.prototype.parseMediaType = function (result) {
    if (result.params.list) {
      result.list = result.params.list;
      delete result.params.list;
    }

    if (result.id && !result.params.ci) {
      result.mediaType = this.mediaTypes.VIDEO;
    } else if (result.list) {
      delete result.id;
      result.mediaType = this.mediaTypes.PLAYLIST;
    } else if (result.params.ci) {
      delete result.params.ci;
      result.mediaType = this.mediaTypes.SHARE;
    } else {
      return undefined;
    }

    return result;
  };

  YouTube.prototype.parse = function (url, params) {
    var channelResult = this.parseChannelUrl(url);

    if (channelResult) {
      return channelResult;
    } else {
      var result = {
        params: params,
        id: this.parseVideoUrl(url)
      };
      result.params = this.parseParameters(params, result);
      result = this.parseMediaType(result);
      return result;
    }
  };

  YouTube.prototype.createShortUrl = function (vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = 'https://youtu.be/' + vi.id;

    if (params.start) {
      url += '#t=' + params.start;
    }

    return url;
  };

  YouTube.prototype.createLongUrl = function (vi, params) {
    var url = '';
    var startTime = params.start;
    delete params.start;

    if (vi.mediaType === this.mediaTypes.CHANNEL) {
      if (vi.id) {
        url += 'https://www.youtube.com/channel/' + vi.id;
      } else if (vi.name) {
        url += 'https://www.youtube.com/c/' + vi.name;
      } else {
        return undefined;
      }
    } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
      params.feature = 'share';
      url += 'https://www.youtube.com/playlist';
    } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
      params.v = vi.id;
      url += 'https://www.youtube.com/watch';
    } else if (vi.mediaType === this.mediaTypes.SHARE && vi.id) {
      params.ci = vi.id;
      url += 'https://www.youtube.com/shared';
    } else {
      return undefined;
    }

    if (vi.list) {
      params.list = vi.list;
    }

    url += combineParams$8(params);

    if (vi.mediaType !== this.mediaTypes.PLAYLIST && startTime) {
      url += '#t=' + startTime;
    }

    return url;
  };

  YouTube.prototype.createEmbedUrl = function (vi, params) {
    var url = 'https://www.youtube.com/embed';

    if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list) {
      params.listType = 'playlist';
    } else if (vi.mediaType === this.mediaTypes.VIDEO && vi.id) {
      url += '/' + vi.id; //loop hack

      if (params.loop === '1') {
        params.playlist = vi.id;
      }
    } else {
      return undefined;
    }

    if (vi.list) {
      params.list = vi.list;
    }

    url += combineParams$8(params);
    return url;
  };

  YouTube.prototype.createImageUrl = function (baseUrl, vi, params) {
    if (!vi.id || vi.mediaType !== this.mediaTypes.VIDEO) {
      return undefined;
    }

    var url = baseUrl + vi.id + '/';
    var quality = params.imageQuality || this.defaultImageQuality;
    return url + quality + '.jpg';
  };

  YouTube.prototype.createShortImageUrl = function (vi, params) {
    return this.createImageUrl('https://i.ytimg.com/vi/', vi, params);
  };

  YouTube.prototype.createLongImageUrl = function (vi, params) {
    return this.createImageUrl('https://img.youtube.com/vi/', vi, params);
  };

  base.bind(new YouTube());

  var combineParams$9 = util.combineParams,
      getTime$6 = util.getTime;

  function SoundCloud() {
    this.provider = 'soundcloud';
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl
    };
    this.mediaTypes = {
      TRACK: 'track',
      PLAYLIST: 'playlist',
      APITRACK: 'apitrack',
      APIPLAYLIST: 'apiplaylist'
    };
  }

  SoundCloud.prototype.parseUrl = function (url, result) {
    var match = url.match(/(?:m\.)?soundcloud\.com\/(?:([\w-]+)\/(sets\/)?)([\w-]+)/i);

    if (!match) {
      return result;
    }

    result.channel = match[1];

    if (match[1] === 'playlists' || match[2]) {
      //playlist
      result.list = match[3];
    } else {
      //track
      result.id = match[3];
    }

    return result;
  };

  SoundCloud.prototype.parseParameters = function (params) {
    if (params.t) {
      params.start = getTime$6(params.t);
      delete params.t;
    }

    return params;
  };

  SoundCloud.prototype.parseMediaType = function (result) {
    if (result.id) {
      if (result.channel === 'tracks') {
        delete result.channel;
        delete result.params.url;
        result.mediaType = this.mediaTypes.APITRACK;
      } else {
        result.mediaType = this.mediaTypes.TRACK;
      }
    }

    if (result.list) {
      if (result.channel === 'playlists') {
        delete result.channel;
        delete result.params.url;
        result.mediaType = this.mediaTypes.APIPLAYLIST;
      } else {
        result.mediaType = this.mediaTypes.PLAYLIST;
      }
    }

    return result;
  };

  SoundCloud.prototype.parse = function (url, params) {
    var result = {};
    result = this.parseUrl(url, result);
    result.params = this.parseParameters(params);
    result = this.parseMediaType(result);

    if (!result.id && !result.list) {
      return undefined;
    }

    return result;
  };

  SoundCloud.prototype.createLongUrl = function (vi, params) {
    var url = '';
    var startTime = params.start;
    delete params.start;

    if (vi.mediaType === this.mediaTypes.TRACK && vi.id && vi.channel) {
      url = 'https://soundcloud.com/' + vi.channel + '/' + vi.id;
    } else if (vi.mediaType === this.mediaTypes.PLAYLIST && vi.list && vi.channel) {
      url = 'https://soundcloud.com/' + vi.channel + '/sets/' + vi.list;
    } else if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
      url = 'https://api.soundcloud.com/tracks/' + vi.id;
    } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
      url = 'https://api.soundcloud.com/playlists/' + vi.list;
    } else {
      return undefined;
    }

    url += combineParams$9(params);

    if (startTime) {
      url += '#t=' + startTime;
    }

    return url;
  };

  SoundCloud.prototype.createEmbedUrl = function (vi, params) {
    var url = 'https://w.soundcloud.com/player/';
    delete params.start;

    if (vi.mediaType === this.mediaTypes.APITRACK && vi.id) {
      params.url = 'https%3A//api.soundcloud.com/tracks/' + vi.id;
    } else if (vi.mediaType === this.mediaTypes.APIPLAYLIST && vi.list) {
      params.url = 'https%3A//api.soundcloud.com/playlists/' + vi.list;
    } else {
      return undefined;
    }

    url += combineParams$9(params);
    return url;
  };

  base.bind(new SoundCloud());

  var combineParams$a = util.combineParams;

  function TeacherTube() {
    this.provider = 'teachertube';
    this.alternatives = [];
    this.defaultFormat = 'long';
    this.formats = {
      "long": this.createLongUrl,
      embed: this.createEmbedUrl
    };
    this.mediaTypes = {
      VIDEO: 'video',
      AUDIO: 'audio',
      DOCUMENT: 'document',
      CHANNEL: 'channel',
      COLLECTION: 'collection',
      GROUP: 'group'
    };
  }

  TeacherTube.prototype.parse = function (url, params) {
    var result = {};
    result.list = this.parsePlaylist(params);
    result.params = params;
    var match = url.match(/\/(audio|video|document|user\/channel|collection|group)\/(?:[\w-]+-)?(\w+)/);

    if (!match) {
      return undefined;
    }

    result.mediaType = this.parseMediaType(match[1]);
    result.id = match[2];
    return result;
  };

  TeacherTube.prototype.parsePlaylist = function (params) {
    if (params['playlist-id']) {
      var list = params['playlist-id'];
      delete params['playlist-id'];
      return list;
    }

    return undefined;
  };

  TeacherTube.prototype.parseMediaType = function (mediaTypeMatch) {
    switch (mediaTypeMatch) {
      case 'audio':
        return this.mediaTypes.AUDIO;

      case 'video':
        return this.mediaTypes.VIDEO;

      case 'document':
        return this.mediaTypes.DOCUMENT;

      case 'user/channel':
        return this.mediaTypes.CHANNEL;

      case 'collection':
        return this.mediaTypes.COLLECTION;

      case 'group':
        return this.mediaTypes.GROUP;
    }
  };

  TeacherTube.prototype.createLongUrl = function (vi, params) {
    if (!vi.id) {
      return undefined;
    }

    var url = 'https://www.teachertube.com/';

    if (vi.list) {
      params['playlist-id'] = vi.list;
    }

    if (vi.mediaType === this.mediaTypes.CHANNEL) {
      url += 'user/channel/';
    } else {
      url += vi.mediaType + '/';
    }

    url += vi.id;
    url += combineParams$a(params);
    return url;
  };

  TeacherTube.prototype.createEmbedUrl = function (vi, params) {
    if (!vi.id) {
      return undefined;
    }

    var url = 'https://www.teachertube.com/embed/';

    if (vi.mediaType === this.mediaTypes.VIDEO || vi.mediaType === this.mediaTypes.AUDIO) {
      url += vi.mediaType + '/' + vi.id;
    } else {
      return undefined;
    }

    url += combineParams$a(params);
    return url;
  };

  base.bind(new TeacherTube());

  var lib = base;

  return lib;

})));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy91dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qcy12aWRlby11cmwtcGFyc2VyL2Rpc3QvanNWaWRlb1VybFBhcnNlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxlQUFlO0FBQy9DO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQztBQUNEOztBQUVBLHNCQUFzQiwrQkFBK0IsRUFBRTtBQUN2RCxzQkFBc0Isc0JBQXNCLEVBQUU7QUFDOUMsd0JBQXdCLHlCQUF5QixFQUFFOzs7QUFHbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGtCQUFrQiwrQ0FBK0M7QUFDakUsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLGdDQUFnQyxrQ0FBa0MsS0FBSztBQUMzSjtBQUNBO0FBQ0EscUVBQXFFLE9BQU87QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLE9BQU87QUFDM0Y7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsaUJBQWlCLGtDQUFrQzs7QUFFbkQ7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrRUFBa0U7O0FBRWxHLENBQUM7QUFDRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUzs7QUFFVDtBQUNBLEtBQUs7QUFDTCxDQUFDLEVBQUU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsdURBQXVEO0FBQ3ZELDRCQUE0QjtBQUM1QixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oseURBQXlEO0FBQ3pELDhCQUE4QjtBQUM5QixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsaUJBQWlCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxHQUFHO0FBQ0g7QUFDQSxtQ0FBbUM7QUFDbkMsR0FBRztBQUNIO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrQ0FBa0M7O0FBRXBELEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHFDQUFxQztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUEsR0FBRztBQUNIOztBQUVBOztBQUVBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJOztBQUVKLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDOzs7Ozs7Ozs7OztBQ3ZoQ0E7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsU0FDdUQ7QUFDekQsQ0FBQyxxQkFBcUI7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFVLGlCQUFpQjtBQUMzQjtBQUNBOztBQUVBO0FBQ0EsSUFBSTs7O0FBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBOztBQUVBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixzQkFBc0I7QUFDekM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EseUVBQXlFLGtCQUFrQjtBQUMzRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixnQ0FBZ0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvREFBb0Q7O0FBRXBEO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlGQUF5RixHQUFHO0FBQzVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vU2NyaXB0cy91dGlsLmpzXCIpO1xuIiwi77u/XHJcbmltcG9ydCB1cmxQYXJzZXIgZnJvbSBcImpzLXZpZGVvLXVybC1wYXJzZXJcIjtcclxuLy9pbXBvcnQgcmVxdWVzdCBmcm9tICdyZXF1ZXN0JztcclxudmFyIGdldFVybFBhcmFtcyA9IGZ1bmN0aW9uICh1cmwpIHtcclxuXHR2YXIgcGFyYW1zID0ge307XHJcblx0KHVybCArICc/Jykuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpLmZvckVhY2goXHJcblx0XHRmdW5jdGlvbiAocGFpcikge1xyXG5cdFx0XHRwYWlyID0gKHBhaXIgKyAnPScpLnNwbGl0KCc9JykubWFwKGRlY29kZVVSSUNvbXBvbmVudCk7XHJcblx0XHRcdGlmIChwYWlyWzBdLmxlbmd0aCkge1xyXG5cdFx0XHRcdHBhcmFtc1twYWlyWzBdXSA9IHBhaXJbMV07XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG52YXIgbGluayA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KCcvJyk7XHJcbnZhciBzaXRlTG9jYXRpb247XHJcbnZhciBjdXJyZW50Um9vbU5hbWU7XHJcbmNvbnN0IHByZXZpZXdWaWRlb3MgPSBbXTtcclxuXHJcbmlmIChsaW5rWzVdICE9PSB1bmRlZmluZWQpIHtcclxuXHRjdXJyZW50Um9vbU5hbWUgPSBsaW5rWzVdO1xyXG5cdHZhciB2aXJ0RGlyID0gbGlua1szXTtcclxuXHRzaXRlTG9jYXRpb24gPSAnaHR0cHM6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyAnLycgKyB2aXJ0RGlyO1xyXG5cclxufVxyXG5lbHNlIHtcclxuXHRjdXJyZW50Um9vbU5hbWUgPSBsaW5rWzRdO1xyXG5cdHNpdGVMb2NhdGlvbiA9ICdodHRwczovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdDtcclxufVxyXG5mdW5jdGlvbiBsb2FkQ2hhdHNWaWV3KCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IHNpdGVMb2NhdGlvbiArICcvUm9vbS9VcGRhdGVHcmlkP3Jvb21OYW1lPScgKyByb29tTmFtZSxcclxuXHRcdHR5cGU6ICdwb3N0JyxcclxuXHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdGFzeW5jOiB0cnVlLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHQkKCcjcGFydGlhbENoYXRzJykuaHRtbChyZXN1bHQpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcblx0XHRcdHZhciBlcnIgPSBldmFsKFwiKFwiICsgeGhyLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuXHRcdFx0YWxlcnQoZXJyLk1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGFyTmFtZWNsaWNrKHJvb21OYW1lKSB7XHJcblx0Y29uc29sZS5sb2cocm9vbU5hbWUpO1xyXG5cdCQuY29ubmVjdGlvbi5ncm91cEh1YnMuc3RhdGUuY3VycmVudENoYXRSb29tID0gcm9vbU5hbWU7XHJcblx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuc3dpdGNoQ3VycmVudFJvb20ocm9vbU5hbWUpO1xyXG5cdGxvYWRNZXNzYWdlVmlldyhyb29tTmFtZSk7XHJcbn1cclxuZnVuY3Rpb24gbG9hZE1lc3NhZ2VWaWV3KHJvb21OYW1lKSB7XHJcblx0dmFyIGxpbms7XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogc2l0ZUxvY2F0aW9uICsgJy9Sb29tL1VwZGF0ZUNoYXQ/cm9vbU5hbWU9JyArIHJvb21OYW1lLFxyXG5cdFx0dHlwZTogJ3Bvc3QnLFxyXG5cdFx0Y2FjaGU6IGZhbHNlLFxyXG5cdFx0YXN5bmM6IHRydWUsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblx0XHRcdCQoJyNtZXNzYWdlcycpLmh0bWwocmVzdWx0KTtcclxuXHRcdFx0Y3VycmVudFJvb21OYW1lID0gcm9vbU5hbWU7XHJcblxyXG5cdFx0XHR1cGRhdGVTY3JvbGwoKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCBleGNlcHRpb24pIHtcclxuXHRcdFx0dmFyIG1zZyA9ICcnO1xyXG5cdFx0XHRpZiAoanFYSFIuc3RhdHVzID09PSAwKSB7XHJcblx0XHRcdFx0bXNnID0gJ05vdCBjb25uZWN0LlxcbiBWZXJpZnkgTmV0d29yay4nO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGpxWEhSLnN0YXR1cyA9PSA0MDQpIHtcclxuXHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIHBhZ2Ugbm90IGZvdW5kLiBbNDA0XSc7XHJcblx0XHRcdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDUwMCkge1xyXG5cdFx0XHRcdG1zZyA9ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IgWzUwMF0uJztcclxuXHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdwYXJzZXJlcnJvcicpIHtcclxuXHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIEpTT04gcGFyc2UgZmFpbGVkLic7XHJcblx0XHRcdH0gZWxzZSBpZiAoZXhjZXB0aW9uID09PSAndGltZW91dCcpIHtcclxuXHRcdFx0XHRtc2cgPSAnVGltZSBvdXQgZXJyb3IuJztcclxuXHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdhYm9ydCcpIHtcclxuXHRcdFx0XHRtc2cgPSAnQWpheCByZXF1ZXN0IGFib3J0ZWQuJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtc2cgPSAnVW5jYXVnaHQgRXJyb3IuXFxuJyArIGpxWEhSLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0fVxyXG5cdFx0XHRhbGVydChtc2cpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IHNpdGVMb2NhdGlvbiArICcvUm9vbS9VcGRhdGVHcmlkP3Jvb21OYW1lPScgKyByb29tTmFtZSxcclxuXHRcdHR5cGU6ICdwb3N0JyxcclxuXHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdGFzeW5jOiB0cnVlLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHRjaGF0TmFtZS5pbm5lclRleHQgPSByb29tTmFtZTtcclxuXHRcdFx0JCgnI3BhcnRpYWxDaGF0cycpLmh0bWwocmVzdWx0KTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCBleGNlcHRpb24pIHtcclxuXHRcdFx0dmFyIG1zZyA9ICcnO1xyXG5cdFx0XHRpZiAoanFYSFIuc3RhdHVzID09PSAwKSB7XHJcblx0XHRcdFx0bXNnID0gJ05vdCBjb25uZWN0LlxcbiBWZXJpZnkgTmV0d29yay4nO1xyXG5cdFx0XHR9IGVsc2UgaWYgKGpxWEhSLnN0YXR1cyA9PSA0MDQpIHtcclxuXHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIHBhZ2Ugbm90IGZvdW5kLiBbNDA0XSc7XHJcblx0XHRcdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDUwMCkge1xyXG5cdFx0XHRcdG1zZyA9ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3IgWzUwMF0uJztcclxuXHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdwYXJzZXJlcnJvcicpIHtcclxuXHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIEpTT04gcGFyc2UgZmFpbGVkLic7XHJcblx0XHRcdH0gZWxzZSBpZiAoZXhjZXB0aW9uID09PSAndGltZW91dCcpIHtcclxuXHRcdFx0XHRtc2cgPSAnVGltZSBvdXQgZXJyb3IuJztcclxuXHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdhYm9ydCcpIHtcclxuXHRcdFx0XHRtc2cgPSAnQWpheCByZXF1ZXN0IGFib3J0ZWQuJztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRtc2cgPSAnVW5jYXVnaHQgRXJyb3IuXFxuJyArIGpxWEhSLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0fVxyXG5cdFx0XHRhbGVydChtc2cpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGN1cnJlbnRSb29tTmFtZSA9IHJvb21OYW1lO1xyXG5cdCQuY29ubmVjdGlvbi5ncm91cEh1YnMuc2VydmVyLnNldENhbGxlckN1cnJlbnRUaW1lKHJvb21OYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGVsZXRlQ3VycmVudENoYXQoKSB7XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogc2l0ZUxvY2F0aW9uICsgJy9Sb29tL0RlbGV0ZUNoYXQ/cm9vbU5hbWU9JyArIGN1cnJlbnRSb29tTmFtZSxcclxuXHRcdHR5cGU6ICdwb3N0JyxcclxuXHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdGFzeW5jOiB0cnVlLFxyXG5cdFx0c3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHQkKCcjcGFydGlhbENoYXRzJykuaHRtbChyZXN1bHQpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcblx0XHRcdHZhciBlcnIgPSBldmFsKFwiKFwiICsgeGhyLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuXHRcdFx0YWxlcnQoZXJyLk1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbmZ1bmN0aW9uIG9uQ3JlYXRlQ2xpY2soKSB7XHJcblx0dmFyIHJvb20gPSAkKCcjY3JlYXRlVGV4dCcpLnZhbCgpO1xyXG5cdGlmIChyb29tLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRjb25zb2xlLmxvZyhyb29tKTtcclxuXHRcdGNvbnNvbGUubG9nKHNpdGVMb2NhdGlvbiArICcvUm9vbS9Kb2luUm9vbT9yb29tTmFtZT0nICsgcm9vbSk7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHNpdGVMb2NhdGlvbiArICcvUm9vbS9DcmVhdGVSb29tP3Jvb21OYW1lPScgKyByb29tLFxyXG5cdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdFx0YXN5bmM6IHRydWUsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhyZXN1bHQpO1xyXG5cdFx0XHRcdC8vJCgnI3BhcnRpYWxDaGF0cycpLmh0bWwocmVzdWx0KTtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiQ2hhdC9cIiArIHJvb207XHJcblx0XHRcdFx0Ly93aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe3Jvb21OYW1lOiByb29tfSwgXCJUaXRsZVwiLCBcIi9Sb29tL0NoYXRcIik7XHJcblx0XHRcdFx0bG9hZE1lc3NhZ2VWaWV3KHJvb20pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCBleGNlcHRpb24pIHtcclxuXHRcdFx0XHR2YXIgbXNnID0gJyc7XHJcblx0XHRcdFx0aWYgKGpxWEhSLnN0YXR1cyA9PT0gMCkge1xyXG5cdFx0XHRcdFx0bXNnID0gJ05vdCBjb25uZWN0LlxcbiBWZXJpZnkgTmV0d29yay4nO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDQwNCkge1xyXG5cdFx0XHRcdFx0bXNnID0gJ1JlcXVlc3RlZCBwYWdlIG5vdCBmb3VuZC4gWzQwNF0nO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDUwMCkge1xyXG5cdFx0XHRcdFx0bXNnID0gJ0ludGVybmFsIFNlcnZlciBFcnJvciBbNTAwXS4nO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoZXhjZXB0aW9uID09PSAncGFyc2VyZXJyb3InKSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIEpTT04gcGFyc2UgZmFpbGVkLic7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICd0aW1lb3V0Jykge1xyXG5cdFx0XHRcdFx0bXNnID0gJ1RpbWUgb3V0IGVycm9yLic7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdhYm9ydCcpIHtcclxuXHRcdFx0XHRcdG1zZyA9ICdBamF4IHJlcXVlc3QgYWJvcnRlZC4nO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnVW5jYXVnaHQgRXJyb3IuXFxuJyArIGpxWEhSLnJlc3BvbnNlVGV4dDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YWxlcnQobXNnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0JCgnI2NyZWF0ZVRleHQnKS52YWwoJycpO1xyXG5cclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gb25Kb2luQ2xpY2soKSB7XHJcblx0dmFyIHJvb20gPSAkKCcjam9pblJvb21UZXh0JykudmFsKCk7XHJcblx0aWYgKHJvb20ubGVuZ3RoICE9IDApIHtcclxuXHRcdGNvbnNvbGUubG9nKHJvb20pO1xyXG5cdFx0Y29uc29sZS5sb2coc2l0ZUxvY2F0aW9uICsgJy9Sb29tL0pvaW5Sb29tP3Jvb21OYW1lPScgKyByb29tKTtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogc2l0ZUxvY2F0aW9uICsgJy9Sb29tL0pvaW5Sb29tP3Jvb21OYW1lPScgKyByb29tLFxyXG5cdFx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRcdGNhY2hlOiBmYWxzZSxcclxuXHRcdFx0YXN5bmM6IHRydWUsXHJcblx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHQvLyAkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci5qb2luUm9vbShyb29tTmFtZSk7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIkNoYXQvXCIgKyByb29tO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblx0XHRcdFx0JCgnI3BhcnRpYWxDaGF0cycpLmh0bWwocmVzdWx0KTtcclxuXHRcdFx0XHRsb2FkTWVzc2FnZVZpZXcocm9vbSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIGV4Y2VwdGlvbikge1xyXG5cdFx0XHRcdHZhciBtc2cgPSAnJztcclxuXHRcdFx0XHRpZiAoanFYSFIuc3RhdHVzID09PSAwKSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnTm90IGNvbm5lY3QuXFxuIFZlcmlmeSBOZXR3b3JrLic7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChqcVhIUi5zdGF0dXMgPT0gNDA0KSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnUmVxdWVzdGVkIHBhZ2Ugbm90IGZvdW5kLiBbNDA0XSc7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChqcVhIUi5zdGF0dXMgPT0gNTAwKSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnSW50ZXJuYWwgU2VydmVyIEVycm9yIFs1MDBdLic7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdwYXJzZXJlcnJvcicpIHtcclxuXHRcdFx0XHRcdG1zZyA9ICdSZXF1ZXN0ZWQgSlNPTiBwYXJzZSBmYWlsZWQuJztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGV4Y2VwdGlvbiA9PT0gJ3RpbWVvdXQnKSB7XHJcblx0XHRcdFx0XHRtc2cgPSAnVGltZSBvdXQgZXJyb3IuJztcclxuXHRcdFx0XHR9IGVsc2UgaWYgKGV4Y2VwdGlvbiA9PT0gJ2Fib3J0Jykge1xyXG5cdFx0XHRcdFx0bXNnID0gJ0FqYXggcmVxdWVzdCBhYm9ydGVkLic7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdG1zZyA9ICdVbmNhdWdodCBFcnJvci5cXG4nICsganFYSFIucmVzcG9uc2VUZXh0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRhbGVydChtc2cpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdCQoJyNqb2luUm9vbVRleHQnKS52YWwoJycpO1xyXG5cclxuXHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIE9wZW5Zb3V0dWJlKCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IHNpdGVMb2NhdGlvbiArICcvUm9vbS9Zb3V0dWJlUGxheWVyJyxcclxuXHRcdHR5cGU6ICdnZXQnLFxyXG5cdFx0Y2FjaGU6IGZhbHNlLFxyXG5cdFx0YXN5bmM6IHRydWUsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcblx0XHRcdCQoJyNtb2REaWFsb2cnKS5tb2RhbCgnc2hvdycpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yOiBmdW5jdGlvbiAoeGhyLCBzdGF0dXMsIGVycm9yKSB7XHJcblx0XHRcdHZhciBlcnIgPSBldmFsKFwiKFwiICsgeGhyLnJlc3BvbnNlVGV4dCArIFwiKVwiKTtcclxuXHRcdFx0YWxlcnQoZXJyLk1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbi8vZnVuY3Rpb24gb25Kb2luQ2xpY2soKSB7XHJcbi8vICAgIHZhciByb29tTmFtZSA9ICQoJyNqb2luUm9vbVRleHQnKS52YWwoKTtcclxuLy8gICAgJC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuam9pblJvb20ocm9vbU5hbWUpO1xyXG4vL1xyXG4vLyAgICBsb2FkTWVzc2FnZVZpZXcocm9vbU5hbWUpXHJcbi8vfSBcclxuJCgnYm9keScpLm9uKCdjbGljaycsICcuY3JlYXRlQnRuJywgZnVuY3Rpb24gKCkge1xyXG5cdHZhciBtc2cgPSAkKCcjY3JlYXRlVGV4dCcpLnZhbCgpO1xyXG5cdGlmIChtc2cubGVuZ3RoICE9IDApIHtcclxuXHRcdGNvbnNvbGUubG9nKG1zZyk7XHJcblxyXG5cdFx0JCgnI2NyZWF0ZVRleHQnKS52YWwoJycpO1xyXG5cclxuXHR9XHJcbn0pO1xyXG5mdW5jdGlvbiBwcmV2aWV3KHNvdXJjZSkge1xyXG5cclxuXHQvLy5kb25lKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coXCJzZWNvbmQgc3VjY2Vzc1wiKTsgfSlcclxuXHQvLy5mYWlsKGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2coXCJlcnJvclwiKTsgfSlcclxuXHQvLy5hbHdheXMoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpOyB9KTtcclxuXHJcblxyXG5cdC8vdmFyIHZpZGVvcyA9IEpTT04ucGFyc2UodmlkZW9zSnNvbik7XHJcblx0Ly8gIHZpZGVvcGwucGxheWxpc3QuY3VycmVudEl0ZW0oaW5kZXgpXHJcblxyXG59XHJcbmZ1bmN0aW9uIGh0dHBHZXQodGhlVXJsKSB7XHJcblx0dmFyIHhtbEh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHR4bWxIdHRwLm9wZW4oXCJHRVRcIiwgdGhlVXJsLCB0cnVlKTsgLy8gZmFsc2UgZm9yIHN5bmNocm9ub3VzIHJlcXVlc3RcclxuXHJcblx0eG1sSHR0cC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHRcdGNvbnNvbGUubG9nKHRoaXMpO1xyXG5cdH0pO1xyXG5cdHhtbEh0dHAuc2VuZChudWxsKTtcclxuXHRyZXR1cm4geG1sSHR0cC5yZXNwb25zZVRleHQ7XHJcbn1cclxuLy92YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKTtcclxuLy92YXIgY29ycyA9IHJlcXVpcmUoJ2NvcnMnKTtcclxuLy92YXIgYXBwID0gZXhwcmVzcygpO1xyXG4vL2FwcC51c2UoY29ycygpKTtcclxuJChcIiN3cml0ZV9saW5rXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgJGl0ZW0gPSAkKHRoaXMpO1xyXG5cdHZhciBpbnB1dCA9ICRpdGVtLnZhbCgpO1xyXG5cdGlmIChpbnB1dC5pbmNsdWRlcyhcInlvdXR1YmVcIikgJiYgKGlucHV0LmluY2x1ZGVzKFwid2F0Y2hcIikgfHwgaW5wdXQuaW5jbHVkZXMoXCJsaXN0XCIpKSkge1xyXG5cdFx0JChcIiNwcmV2aWV3X3BsYXlsaXN0XCIpLmVtcHR5KCk7XHJcblx0XHRwcmV2aWV3VmlkZW9zLmxlbmd0aCA9IDA7XHJcblx0XHR2YXIgbGlua1BhcmFtcyA9IGdldFBhcmFtcyhpbnB1dCk7XHJcblx0XHR2YXIgcGxheWxpc3RWaWRzO1xyXG5cdFx0dmFyIHVybCA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vbGlzdF9hamF4P3N0eWxlPWpzb24mYWN0aW9uX2dldF9saXN0PTEmbGlzdD1cIiArIGxpbmtQYXJhbXMubGlzdCArIFwiJmluZGV4PVwiICsgMCArIFwiJmhsPWVuXCI7XHJcblx0XHQvL3ZhciBkYXdlcyA9IHJlcXVlc3QuZ2V0KHVybCk7XHJcblx0XHQvLyQuZ2V0SlNPTih1cmwsIGZ1bmN0aW9uIChkYXRhLCBzdGF0dXMsIHhocikge1xyXG5cdFx0Ly8gICAgYWxlcnQoZGF0YS5kYXRhLnRpdGxlKTtcclxuXHRcdC8vICAgIC8vIGRhdGEgY29udGFpbnMgdGhlIEpTT04tT2JqZWN0IGJlbG93XHJcblx0XHQvL30pO1xyXG5cdFx0Ly9hcHAuZ2V0KCcvcHJvZHVjdHMvOmlkJywgZnVuY3Rpb24gKHJlcSwgcmVzLCBuZXh0KSB7XHJcblx0XHQvLyAgICByZXMuanNvbih7IG1zZzogJ1RoaXMgaXMgQ09SUy1lbmFibGVkIGZvciBhbGwgb3JpZ2lucyEnIH0pXHJcblx0XHQvL30pXHJcblx0XHQvLyBodHRwR2V0QXN5bmModXJsLCBhZGRFbGVtZW50UHJldmlldyk7XHJcblx0XHQvL2ZldGNoKHVybCkudGhlbihyZXNwbiA9PiByZXNwbi5vayA/IHJlc3BuLmpzb24oKSA6IFByb21pc2UucmVqZWN0KHVuZGVmaW5lZCkpLnRoZW4oZGF0YSA9PiBjb25zb2xlLmxvZyhkYXRhKSlcclxuXHRcdC8vICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcblx0XHQvL1xyXG5cdFx0Ly9mZXRjaCh1cmwpLnRoZW4oKHJlc3ApID0+IHJlc3AudGV4dCgpKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcblx0XHQvLyAgICBkYXdlcyA9IGRhdGE7XHJcblx0XHQvL30pO1xyXG5cdFx0Ly92YXIgYmxvYnMgPSBmZXRjaCh1cmwpXHJcblx0XHQvLyAgICAudGhlbihyZXMgPT4gcmVzLmJsb2IoKSkgLy8gR2V0cyB0aGUgcmVzcG9uc2UgYW5kIHJldHVybnMgaXQgYXMgYSBibG9iXHJcblx0XHQvLyAgICAudGhlbihibG9iID0+IHtcclxuXHRcdC8vICAgICAgICAvLyBIZXJlJ3Mgd2hlcmUgeW91IGdldCBhY2Nlc3MgdG8gdGhlIGJsb2JcclxuXHRcdC8vICAgICAgICAvLyBBbmQgeW91IGNhbiB1c2UgaXQgZm9yIHdoYXRldmVyIHlvdSB3YW50XHJcblx0XHQvLyAgICAgICAgLy8gTGlrZSBjYWxsaW5nIHJlZigpLnB1dChibG9iKVxyXG5cdFx0Ly9cclxuXHRcdC8vICAgICAgICAvLyBIZXJlLCBJIHVzZSBpdCB0byBtYWtlIGFuIGltYWdlIGFwcGVhciBvbiB0aGUgcGFnZVxyXG5cdFx0Ly8gICAgICAgIHZhciBvYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cdFx0Ly8gICAgICAgIHZhciBteUltYWdlID0gbmV3IEltYWdlKCk7XHJcblx0XHQvLyAgICAgICAgbXlJbWFnZS5zcmMgPSBvYmplY3RVUkw7XHJcblx0XHQvLyAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215SW1nJykuYXBwZW5kQ2hpbGQobXlJbWFnZSlcclxuXHRcdC8vICAgIH0pO1xyXG5cdFx0Ly8vLyQuZ2V0SlNPTiggdXJsLCBmdW5jdGlvbiAoZGF0YSkge1xyXG5cdFx0Ly8vLyAgICBwbGF5bGlzdFZpZHMgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cdFx0Ly8vLyAgICAvLyBKU09OIHJlc3VsdCBpbiBgZGF0YWAgdmFyaWFibGVcclxuXHRcdC8vLy99KVxyXG5cdFx0Ly92YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblx0XHQvL3hoci5vcGVuKFxyXG5cdFx0Ly8gICAgJ0dFVCcsXHJcblx0XHQvLyAgICB1cmwsXHJcblx0XHQvLyAgICB0cnVlXHJcblx0XHQvLyk7XHJcblx0XHQvL3hoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcblx0XHQvL3hoci5zZXRSZXF1ZXN0SGVhZGVyKCdhY2NlcHQnLCAndGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuOCxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuOScpO1xyXG5cdFx0Ly8vL3hoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsICcqJyk7XHJcblx0XHQvLy8veGhyLnNldFJlcXVlc3RIZWFkZXIoXCJzZWMtZmV0Y2gtZGVzdFwiLCAnZG9jdW1lbnQnKTtcclxuXHRcdC8veGhyLnNldFJlcXVlc3RIZWFkZXIoXCJVc2VyLUFnZW50XCIsIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xNjMgU2FmYXJpLzUzNy4zNlwiKTtcclxuXHRcdC8veGhyLnNlbmQoKTtcclxuXHRcdC8veGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vICAgIGlmICh4aHIucmVhZHlTdGF0ZSAhPSA0KSB7XHJcblx0XHQvLyAgICAgICAgcmV0dXJuXHJcblx0XHQvLyAgICB9XHJcblx0XHQvLyAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcblx0XHQvLyAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIHhoci5yZXNwb25zZVRleHQpXHJcblx0XHQvLyAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCcsIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpXHJcblx0XHQvL1xyXG5cdFx0Ly8gICAgfSBlbHNlIHtcclxuXHRcdC8vICAgICAgICBjb25zb2xlLmxvZygnZXJyJywgeGhyLnJlc3BvbnNlVGV4dClcclxuXHRcdC8vICAgIH1cclxuXHRcdC8vfVxyXG5cdFx0Ly8gIHJlcXVlc3QgPSBuZXcgUmVxdWVzdCgnL2pzb24nLCB7XHJcblx0XHQvLyBoZWFkZXJzOiBuZXcgSGVhZGVycyh7XHJcblx0XHQvLyAgICAgJ0NvbnRlbnQtVHlwZSc6ICdEb2N1bWVudCdcclxuXHRcdC8vIH0pXHJcblx0XHQvL1xyXG5cdFx0Ly9cclxuXHRcdC8vY2gocmVxdWVzdClcclxuXHRcdC8vIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vICAgICBhbGVydChcInN0cmhiZlwiKS8qIGhhbmRsZSByZXNwb25zZSAqL1xyXG5cdFx0Ly9cclxuXHRcdC8vdmFyIGxpc3QgPSB1cmxQYXJzZXIucGFyc2UoJ2h0dHA6Ly93d3cueW91dHViZS5jb20vcGxheWxpc3Q/bGlzdD1QTDQ2RjBBMTU5RUMwMkRGODInKTtcclxuXHRcdC8vdmFyIHRlc3QgPSBodHRwR2V0KHVybCk7XHJcblx0XHQvLyQuYWpheCh7XHJcblx0XHQvLyAgICB1cmw6IHVybCxcclxuXHRcdC8vICAgIHR5cGU6IFwiR0VUXCIsXHJcblx0XHQvLyAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG5cdFx0Ly8gICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2pzb24nKTtcclxuXHRcdC8vICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgJyonKTtcclxuXHRcdC8vICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJISC1Vc2VyLUFnZW50XCIsIFwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzgwLjAuMzk4Ny4xNjMgU2FmYXJpLzUzNy4zNlwiKTtcclxuXHRcdC8vXHJcblx0XHQvLyAgICB9LFxyXG5cdFx0Ly8gICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG5cdFx0Ly8gICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHRcdC8vICAgICAgICBhbGVydChkYXRhKTtcclxuXHRcdC8vICAgIH0sXHJcblx0XHQvLyAgICBlcnJvcjogZnVuY3Rpb24gKFhNTEh0dHBSZXF1ZXN0LCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xyXG5cdFx0Ly8gICAgICAgIGFsZXJ0KFwiZXJyb3JcIik7XHJcblx0XHQvLyAgICAgICAgY29uc29sZS5sb2coXCJSRVFVRVNUXCIgKyBYTUxIdHRwUmVxdWVzdC50b1N0cmluZygpKTtcclxuXHRcdC8vICAgICAgICBjb25zb2xlLmxvZyhcInRleHRTdGF0dXNcIiArIHRleHRTdGF0dXMudG9TdHJpbmcoKSk7XHJcblx0XHQvLyAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclRocm93blwiICsgZXJyb3JUaHJvd24udG9TdHJpbmcoKSk7XHJcblx0XHQvLyAgICB9XHJcblx0XHQvL1xyXG5cdFx0Ly99KTtcclxuXHRcdC8vLy9wcmV2aWV3KGlucHV0KTtcclxuXHRcdC8vJC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuZ2V0VmlkZW9zRnJvbUxpbmsoaW5wdXQpO1xyXG5cdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuZ2V0VmlkZW9zRnJvbUxpbmsoaW5wdXQpO1xyXG5cclxuXHR9IGVsc2Uge1xyXG5cdFx0JChcIiNwcmV2aWV3X3BsYXlsaXN0XCIpLmVtcHR5KCk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVsZW1lbnRzX2NvdW50XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRwcmV2aWV3VmlkZW9zLmxlbmd0aCA9IDA7XHJcblxyXG5cdH1cclxufSk7XHJcbi8vZnVuY3Rpb24gd3JpdGVMaW5rSW5wdXQoKSB7XHJcbi8vICAgIHZhciBpbnB1dCA9ICQoXCIjd3JpdGVfbGlua1wiKS52YWwoKTtcclxuLy8gICAgaWYgKGlucHV0LmluY2x1ZGVzKFwieW91dHViZVwiKSAmJiAoaW5wdXQuaW5jbHVkZXMoXCJ3YXRjaFwiKSB8fCBpbnB1dC5pbmNsdWRlcyhcImxpc3RcIikpKSB7XHJcbi8vICAgICAgICAkKFwiI3ByZXZpZXdfcGxheWxpc3RcIikuZW1wdHkoKTtcclxuLy8gICAgICAgIHByZXZpZXcoaW5wdXQpO1xyXG4vL1xyXG4vLyAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgJChcIiNwcmV2aWV3X3BsYXlsaXN0XCIpLmVtcHR5KCk7XHJcbi8vICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVsZW1lbnRzX2NvdW50XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbi8vICAgIH1cclxuLy99O1xyXG5cclxuJCgnYm9keScpLm9uKCdjbGljaycsICcubGlua19zZW5kX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgbXNnID0gJCgnI3dyaXRlX2xpbmsnKS52YWwoKTtcclxuXHRpZiAobXNnLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuY2hhbmdlVmlkZW9Tb3VyY2UoY3VycmVudFJvb21OYW1lLCBtc2cpLmRvbmUoZnVuY3Rpb24gKHZpZGVvcykge1xyXG5cdFx0XHQvLyBhbGVydChcIkFkZGVkXCIpO1xyXG5cdFx0fSk7XHJcblx0XHQvL3ZpZGVvcGwuc3JjKHsgdHlwZTogXCJ2aWRlby95b3V0dWJlXCIsIHNyYzogbXNnIH0pO1xyXG5cclxuXHR9XHJcbn0pO1xyXG5cclxuJCgnYm9keScpLm9uKCdjbGljaycsICcueXRwLXN1Z2dlc3Rpb24tbGluaycsIGZ1bmN0aW9uICgpIHtcclxuXHQvLyAgYWxlcnQoXCJBZGRlZFwiKTtcclxuXHJcbn0pO1xyXG4kKCcjdmlkMScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuXHQvLyBhbGVydChcImluc2lkZSBzdWdnZXN0aW9uLWxpbmtcIik7XHJcbn0pO1xyXG4kKCcueXRwLXN1Z2dlc3Rpb24taW1hZ2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0Ly8gYWxlcnQoXCJpbnNpZGUgc3VnZ2VzdGlvbi1pbWFnZVwiKTtcclxufSk7XHJcbiQoJy55dHAtc3VnZ2VzdGlvbi1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdC8vIGFsZXJ0KFwiaW5zaWRlIHl0cC1zdWdnZXN0aW9uLW92ZXJsYXlcIik7XHJcbn0pO1xyXG5mdW5jdGlvbiBwbGF5bGlzdEJ1dHRvblByZXNzKCkge1xyXG5cdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9PSAnMHB4JyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9PSAnJykge1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlsaXN0LXVpJykuc3R5bGUud2lkdGggPSAnMjAlJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdF9zbGlkZScpLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwJSc7XHJcblx0fVxyXG5cdGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLndpZHRoID09ICcyMCUnKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9ICcwJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLmhlaWdodCA9ICcwJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdF9zbGlkZScpLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzAlJztcclxuXHR9XHJcbn1cclxuLypcclxuZnVuY3Rpb24gb3BlblNsaWRlUGxheWxpc3QoKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9ICcyNSUnO1xyXG59XHJcbmZ1bmN0aW9uIGNsb3NlU2xpZGVQbGF5bGlzdCgpIHtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLndpZHRoID0gJzAnO1xyXG59XHJcbiovXHJcbihmdW5jdGlvbiAoJCwgc3IpIHtcclxuXHJcblx0Ly8gZGVib3VuY2luZyBmdW5jdGlvbiBmcm9tIEpvaG4gSGFublxyXG5cdC8vIGh0dHA6Ly91bnNjcmlwdGFibGUuY29tL2luZGV4LnBocC8yMDA5LzAzLzIwL2RlYm91bmNpbmctamF2YXNjcmlwdC1tZXRob2RzL1xyXG5cdHZhciBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB0aHJlc2hvbGQsIGV4ZWNBc2FwKSB7XHJcblx0XHR2YXIgdGltZW91dDtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gZGVib3VuY2VkKCkge1xyXG5cdFx0XHR2YXIgb2JqID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcclxuXHRcdFx0ZnVuY3Rpb24gZGVsYXllZCgpIHtcclxuXHRcdFx0XHRpZiAoIWV4ZWNBc2FwKVxyXG5cdFx0XHRcdFx0ZnVuYy5hcHBseShvYmosIGFyZ3MpO1xyXG5cdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodGltZW91dClcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XHJcblx0XHRcdGVsc2UgaWYgKGV4ZWNBc2FwKVxyXG5cdFx0XHRcdGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcclxuXHJcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHRocmVzaG9sZCB8fCAxMDApO1xyXG5cdFx0fTtcclxuXHR9O1xyXG5cdC8vIHNtYXJ0cmVzaXplIFxyXG5cdGpRdWVyeS5mbltzcl0gPSBmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuID8gdGhpcy5iaW5kKCdyZXNpemUnLCBkZWJvdW5jZShmbikpIDogdGhpcy50cmlnZ2VyKHNyKTsgfTtcclxuXHJcbn0pKGpRdWVyeSwgJ3NtYXJ0cmVzaXplJyk7XHJcbi8qXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8vIEZpbmQgYWxsIDx2aWRlbz4gZWxlbWVudFxyXG4gICAgdmFyICRhbGxWaWRlb3MgPSAkKCd2aWRlbycpLFxyXG5cclxuICAgICAgICAvLyBUaGUgZWxlbWVudCB0aGF0IGlzIGZsdWlkIHdpZHRoXHJcbiAgICAgICAgJGZsdWlkRWwgPSAkKCcjY29udGVudF9jb250YWluZXInKTtcclxuXHJcbiAgICAvLyBGaWd1cmUgb3V0IGFuZCBzYXZlIHRoZSBhc3BlY3QgcmF0aW8gZm9yIGVhY2ggPHZpZGVvPiBlbGVtZW50IG9uIHRoZSBwYWdlXHJcbiAgICAkYWxsVmlkZW9zLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpXHJcbiAgICAgICAgICAgIC8vIHZhbHVlcyBmcm9tIDx2aWRlbz4gaGVpZ2h0IGFuZCB3aWR0aCBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIC5kYXRhKCdhc3BlY3RSYXRpbycsIHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aClcclxuXHJcbiAgICAgICAgICAgIC8vIGFuZCByZW1vdmUgdGhlIGhhcmQgY29kZWQgd2lkdGgvaGVpZ2h0XHJcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdoZWlnaHQnKVxyXG4gICAgICAgICAgICAucmVtb3ZlQXR0cignd2lkdGgnKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBXaGVuIHRoZSB3aW5kb3cgaXMgcmVzaXplZFxyXG4gICAgJCh3aW5kb3cpLnNtYXJ0cmVzaXplKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIG5ld1dpZHRoID0gJGZsdWlkRWwud2lkdGgoKTtcclxuXHJcbiAgICAgICAgLy8gUmVzaXplIGFsbCA8dmlkZW8+IGFjY29yZGluZyB0byB0aGVpciBvd24gYXNwZWN0IHJhdGlvXHJcbiAgICAgICAgJGFsbFZpZGVvcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgICAgICAkZWxcclxuICAgICAgICAgICAgICAgIC53aWR0aChuZXdXaWR0aClcclxuICAgICAgICAgICAgICAgIC5oZWlnaHQobmV3V2lkdGggKiAkZWwuZGF0YSgnYXNwZWN0UmF0aW8nKSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBLaWNrIG9mZiBvbmUgcmVzaXplIHRvIGZpeCBhbGwgdmlkZW9zIG9uIHBhZ2UgbG9hZFxyXG4gICAgfSkucmVzaXplKCk7XHJcbn0pOyovXHJcbi8vJHNjb3BlLmN1cnJlbnRSb29tTmFtZSA9IFwiXCI7XHJcbi8vJHJvb3RTY29wZS4kb24oXCJjaGF0Um9vbUNoYW5nZWRcIiwgZnVuY3Rpb24gKGFyZ3MsIHJvb20pXHJcbi8ve1xyXG4vLyAgICAkc2NvcGUuY3VycmVudFJvb21OYW1lID0gcm9vbTtcclxuLy99KTtcclxuLyp2aWRlb3BsLm9uKCdzZWVrZWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoY2xpZW50U2VlayA+IDApIHtcclxuICAgICAgICAkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci50aW1lVXBkYXRlKGN1cnJlbnRSb29tTmFtZSwgdGhpcy5jdXJyZW50VGltZSgpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRUaW1lKCkpO1xyXG4gICAgICAgIGNsaWVudFNlZWsgPSAwO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2xpZW50U2VlayA9IDE7XHJcbiAgICB9XHJcbn0pKi9cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib251bmxvYWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHR2YXIgY29uZmlybWF0aW9uTWVzc2FnZSA9IFwiXFxvL1wiO1xyXG5cclxuXHQoZSB8fCB3aW5kb3cuZXZlbnQpLnJldHVyblZhbHVlID0gY29uZmlybWF0aW9uTWVzc2FnZTsgLy9HZWNrbyArIElFXHJcblx0cmV0dXJuIGNvbmZpcm1hdGlvbk1lc3NhZ2U7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vV2Via2l0LCBTYWZhcmksIENocm9tZVxyXG59KTtcclxuJChkb2N1bWVudCkub24oJ29udW5sb2FkJywgZnVuY3Rpb24gKCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IFwiL0FjY291bnQvTG9nT2ZmXCIsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbiBsb2dEYXRhKCkge1xyXG5cdG5hdmlnYXRvci5zZW5kQmVhY29uKFwiL0FjY291bnQvTG9nT2ZmXCIsIG51bGwpO1xyXG5cclxuXHQvLyQuYWpheCh7XHJcblx0Ly9cdHR5cGU6ICdQT1NUJyxcclxuXHQvL1x0YXN5bmM6IGZhbHNlLFxyXG5cdC8vXHR1cmw6IFwiL0FjY291bnQvTG9nT2ZmXCIsXHJcblx0Ly9cdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHQvL1x0fVxyXG5cdC8vfSk7XHJcblx0Ly8oZSB8fCB3aW5kb3cuZXZlbnQpLnJldHVyblZhbHVlID0gY29uZmlybWF0aW9uTWVzc2FnZTsgLy9HZWNrbyArIElFXHJcblx0Ly9yZXR1cm4gY29uZmlybWF0aW9uTWVzc2FnZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XZWJraXQsIFNhZmFyaSwgQ2hyb21lXHJcbn0pO1xyXG4kKGRvY3VtZW50KS5vbignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IFwiL0FjY291bnQvTG9nT2ZmXCIsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBhZGRUb1BsYXlsaXN0KHZpZGVvQXJyYXkpIHtcclxuXHR2aWRlb3BsLnBsYXlsaXN0KEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHZpZGVvcGwucGxheWxpc3QoKSwgdmlkZW9BcnJheSkpO1xyXG59XHJcbmlmIChjdXJyZW50Um9vbU5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuXHR2YXIgdmlkZW9wbCA9IHZpZGVvanMoJ3ZpZDEnKTtcclxuXHJcblx0dmFyIHNlcnZlckN1cnJlbnRUaW1lQ2FsbCA9IDA7XHJcblxyXG5cdHZpZGVvcGwub24oJ3BsYXlpbmcnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci5ncm91cFBsYXkoY3VycmVudFJvb21OYW1lKTtcclxuXHR9KTtcclxuXHR2aWRlb3BsLm9uKCdwYXVzZScsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdURVNUU0VNVDogT1NFTVQ6IE9NU0VUJyk7XHJcblx0XHQkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci5ncm91cFBhdXNlKGN1cnJlbnRSb29tTmFtZSk7XHJcblx0fSk7XHJcblx0dmlkZW9wbC5vbignY2FucGxheScsIChldmVudCkgPT4ge1xyXG5cdFx0Ly9hbGVydChcIkJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZVwiKTtcclxuXHRcdC8vdmlkZW9wbC5jdXJyZW50VGltZSA9IDAuNTA7XHJcblx0fSk7XHJcblxyXG5cdC8vdmlkZW9wbC5vbignbG9hZGVkZGF0YScsIGZ1bmN0aW9uICgpIHtcclxuXHQvLyAgICBhbGVydChcIkJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZVwiKTtcclxuXHQvL30pO1xyXG5cclxuXHR2aWRlb3BsLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vbV9uYW1lXCIpLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG5cdH0pO1xyXG5cdHZpZGVvcGwub24oXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb21fbmFtZVwiKS5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHR9KTtcclxuXHR2YXIgbXlNaWRkbGV3YXJlID0gZnVuY3Rpb24gKHZpZGVvcGwpIHtcclxuXHRcdHZhciB0ZWNoO1xyXG5cdFx0dmFyIHByZXZDdXJyZW50VGltZTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzZXRTb3VyY2U6IGZ1bmN0aW9uIChzcmNPYmosIG5leHQpIHtcclxuXHRcdFx0XHRuZXh0KG51bGwsIHNyY09iaik7XHJcblx0XHRcdH0sXHJcblx0XHRcdGN1cnJlbnRUaW1lOiBmdW5jdGlvbiAoY3QpIHtcclxuXHRcdFx0XHRwcmV2Q3VycmVudFRpbWUgPSBjdDtcclxuXHRcdFx0XHRyZXR1cm4gY3Q7XHJcblx0XHRcdH0sXHJcblx0XHRcdHNldEN1cnJlbnRUaW1lOiBmdW5jdGlvbiAodGltZSkge1xyXG5cdFx0XHRcdGlmIChzZXJ2ZXJDdXJyZW50VGltZUNhbGwgPT0gMCkge1xyXG5cdFx0XHRcdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIudGltZVVwZGF0ZShjdXJyZW50Um9vbU5hbWUsIHRpbWUpO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codGltZSk7XHJcblx0XHRcdFx0XHRwcmV2Q3VycmVudFRpbWUgPSB0aW1lO1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRpbWU7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChzZXJ2ZXJDdXJyZW50VGltZUNhbGwgPT0gMSkge1xyXG5cdFx0XHRcdFx0cHJldkN1cnJlbnRUaW1lID0gdGltZTtcclxuXHRcdFx0XHRcdHNlcnZlckN1cnJlbnRUaW1lQ2FsbCA9IDA7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGltZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9LFxyXG5cdFx0XHQvLyBSZXF1aXJlZCBmb3IgbWlkZGxld2FyZS4gU2ltcGx5IHBhc3NlcyBhbG9uZyB0aGUgc291cmNlXHJcblx0XHRcdGxvYWRlZGRhdGE6IGZ1bmN0aW9uICh0aW1lKSB7XHJcblx0XHRcdFx0Ly9hbGVydChcIkJyb3dzZXIgaGFzIGxvYWRlZCB0aGUgY3VycmVudCBmcmFtZVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHR2aWRlb2pzLnVzZSgnKicsIG15TWlkZGxld2FyZSk7XHJcblx0dmlkZW9wbC5wbGF5bGlzdChbXSk7XHJcblx0dmlkZW9wbC5wbGF5bGlzdFVpKHtcclxuXHRcdGVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKVxyXG5cdH0pO1xyXG5cclxuXHQvL3ZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2anMtcGxheWxpc3QtaXRlbS1saXN0XCIpO1xyXG5cdC8vW10uZm9yRWFjaC5jYWxsKGVsLCBmdW5jdGlvbiAoZSkge1xyXG5cdC8vICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG5cdC8vICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuXHQvLyAgICAgICAgaWYgKGUudGFyZ2V0ICYmIGUudGFyZ2V0Lm5vZGVOYW1lID09IFwiTElcIikge1xyXG5cdC8vICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQuaWQgKyBcIiB3YXMgY2xpY2tlZFwiKTtcclxuXHQvLyAgICAgICAgfVxyXG5cdC8vICAgIH0pXHJcblx0Ly92YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmpzLXBsYXlsaXN0LWl0ZW0tbGlzdFwiKTtcclxuXHQvL1tdLmZvckVhY2guY2FsbChlbCwgZnVuY3Rpb24gKGUpIHtcclxuXHQvLyAgICBhZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHQvLyAgICAgICAgY29uc29sZS5sb2coZSk7XHJcblx0Ly8gICAgICAgIGlmIChlLnRhcmdldCAmJiBlLnRhcmdldC5ub2RlTmFtZSA9PSBcIkxJXCIpIHtcclxuXHQvLyAgICAgICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LmlkICsgXCIgd2FzIGNsaWNrZWRcIik7XHJcblx0Ly8gICAgICAgIH1cclxuXHQvLyAgICB9KVxyXG5cdC8vXHJcblx0Ly8gICAgLy8gZS50YXJnZXQgaXMgb3VyIHRhcmdldHRlZCBlbGVtZW50LlxyXG5cdC8vICAgIC8vIHRyeSBkb2luZyBjb25zb2xlLmxvZyhlLnRhcmdldC5ub2RlTmFtZSksIGl0IHdpbGwgcmVzdWx0IExJXHJcblx0Ly99KTtcclxuXHRmdW5jdGlvbiBub3RpZnlVc2VyT2ZUcnlpbmdUb1JlY29ubmVjdCgpIHtcclxuXHRcdC8vIGFsZXJ0KFwiVFJZSU5HIFRPIFJFQ0NPTkVDVFwiKTtcclxuXHR9XHJcblx0ZnVuY3Rpb24gbm90aWZ5VXNlck9mQ29ubmVjdGlvblByb2JsZW0oKSB7XHJcblx0XHQvL2FsZXJ0KFwiWU9VIEhBVkUgQSBDT05ORUNUSU9OIFBST0JMRU0gOilcIik7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIG5vdGlmeVVzZXJPZkRpc2Nvbm5lY3QoKSB7XHJcblx0XHQvLyBhbGVydChcIkRJU0NPTkVDVEVEISEhIDopXCIpO1xyXG5cdH1cclxuXHR2YXIgZ2V0UGFyYW1zID0gZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0dmFyIHBhcmFtcyA9IHt9O1xyXG5cdFx0dmFyIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdHBhcnNlci5ocmVmID0gdXJsO1xyXG5cdFx0dmFyIHF1ZXJ5ID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSk7XHJcblx0XHR2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KCc9Jyk7XHJcblx0XHRcdHBhcmFtc1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwYXJhbXM7XHJcblx0fTtcclxuXHRmdW5jdGlvbiBodHRwR2V0QXN5bmModGhlVXJsLCBjYWxsYmFjaykge1xyXG5cdFx0dmFyIHhtbEh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdHhtbEh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoeG1sSHR0cC5yZWFkeVN0YXRlID09IDQgJiYgeG1sSHR0cC5zdGF0dXMgPT0gMjAwKVxyXG5cdFx0XHRcdGNhbGxiYWNrKHhtbEh0dHAucmVzcG9uc2VUZXh0KTtcclxuXHRcdH07XHJcblx0XHR4bWxIdHRwLm9wZW4oXCJHRVRcIiwgdGhlVXJsLCB0cnVlKTsgLy8gdHJ1ZSBmb3IgYXN5bmNocm9ub3VzIFxyXG5cdFx0eG1sSHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nLCAnbnVsbCcpO1xyXG5cdFx0eG1sSHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xyXG5cdFx0eG1sSHR0cC5zZW5kKG51bGwpO1xyXG5cdH1cclxuXHRmdW5jdGlvbiBhZGRFbGVtZW50UHJldmlldyh2aWRlb3NKc29uKSB7XHJcblx0XHR2YXIgdmlkZW9zID0gSlNPTi5wYXJzZSh2aWRlb3NKc29uKTtcclxuXHRcdHZhciBwbGF5bGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlld19wbGF5bGlzdFwiKTtcclxuXHRcdHZpZGVvcy5mb3JFYWNoKHZpZGVvID0+IHtcclxuXHRcdFx0dmFyIG5ld192aWRlbyA9XHJcblx0XHRcdFx0JChgPGxpIGNsYXNzPVwicGxheWxpc3RfaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9fYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwaWN0dXJlIGNsYXNzPVwidmlkZW9fdGh1bWJuYWlsXCI+YCtcclxuXHRcdFx0XHRcdGA8c291cmNlIHNyY3NldD1cImAgKyB2aWRlby50aHVtYm5haWxbMF0uc3Jjc2V0ICsgYFwiIHR5cGU9XCJgICsgdmlkZW8udGh1bWJuYWlsWzBdLnR5cGUgKyBgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBhbHQ9XCJcIiBzcmM9XCJgICsgdmlkZW8udGh1bWJuYWlsWzFdLnNyYyArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcGljdHVyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCIgaWQ9XCJtc2dfdGltZVwiPmAgKyB2aWRlby5kdXJhdGlvbiArIGA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+YCkuYWRkQ2xhc3MoJ3BsYXlsaXN0X2l0ZW0nKTtcclxuXHRcdFx0bmV3X3ZpZGVvLmFwcGVuZFRvKCcjcHJldmlld19wbGF5bGlzdCcpO1xyXG5cdFx0fSk7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVsZW1lbnRzX2NvdW50XCIpLmlubmVySFRNTCA9ICQoJyNwcmV2aWV3X3BsYXlsaXN0IGxpJykubGVuZ3RoO1xyXG5cdH1cclxuXHQkKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciByb29tVmlkZW9JZHM7XHJcblx0XHR2YXIgY2hhdCA9ICQuY29ubmVjdGlvbi5ncm91cEh1YnM7XHJcblx0XHR2YXIgdHJ5aW5nVG9SZWNvbm5lY3QgPSBmYWxzZTtcclxuXHRcdHZhciBpc1NlcnZlckNoYW5nZVBsYXlsaXN0ID0gZmFsc2U7XHJcblx0XHR2YXIgaXNDaGFuZ2VJdGVtID0gZmFsc2U7XHJcblx0XHQkLmNvbm5lY3Rpb24uaHViLnJlY29ubmVjdGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dHJ5aW5nVG9SZWNvbm5lY3QgPSBmYWxzZTtcclxuXHRcdH0pO1xyXG5cdFx0JC5jb25uZWN0aW9uLmh1Yi5yZWNvbm5lY3RpbmcoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0cnlpbmdUb1JlY29ubmVjdCA9IHRydWU7XHJcblx0XHRcdG5vdGlmeVVzZXJPZlRyeWluZ1RvUmVjb25uZWN0KCk7IC8vIFlvdXIgZnVuY3Rpb24gdG8gbm90aWZ5IHVzZXIuXHJcblx0XHR9KTtcclxuXHRcdCQuY29ubmVjdGlvbi5odWIuY29ubmVjdGlvblNsb3coZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRub3RpZnlVc2VyT2ZDb25uZWN0aW9uUHJvYmxlbSgpOyAvLyBZb3VyIGZ1bmN0aW9uIHRvIG5vdGlmeSB1c2VyLlxyXG5cdFx0fSk7XHJcblx0XHQkLmNvbm5lY3Rpb24uaHViLmRpc2Nvbm5lY3RlZChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0cnlpbmdUb1JlY29ubmVjdCkge1xyXG5cdFx0XHRcdG5vdGlmeVVzZXJPZkRpc2Nvbm5lY3QoKTsgLy8gWW91ciBmdW5jdGlvbiB0byBub3RpZnkgdXNlci5cclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRjaGF0LmNsaWVudC5zZXRUaW1lID0gZnVuY3Rpb24gKHRpbWUpIHtcclxuXHRcdFx0dmlkZW8uY3VycmVudFRpbWUodGltZSk7XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuZ3JvdXBQbGF5ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2aWRlb3BsLnBsYXkoKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5ncm91cFBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2aWRlb3BsLnBhdXNlKCk7XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQudGltZVVwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lKSB7XHJcblx0XHRcdHNlcnZlckN1cnJlbnRUaW1lQ2FsbCA9IDE7XHJcblx0XHRcdHZpZGVvcGwuY3VycmVudFRpbWUodGltZSk7XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuYWRkVmlkZW9Ub1BsYXlsaXN0ID0gZnVuY3Rpb24gKHZpZGVvSnNvbikge1xyXG5cdFx0XHR2YXIgdmlkZW8gPSBKU09OLnBhcnNlKHZpZGVvSnNvbik7XHJcblx0XHRcdHZhciBjdXJyZW50UGxheWxpc3QgPSB2aWRlb3BsLnBsYXlsaXN0KCk7XHJcblx0XHRcdGN1cnJlbnRQbGF5bGlzdC5wdXNoKHZpZGVvKTtcclxuXHRcdFx0dmlkZW9wbC5wbGF5bGlzdChjdXJyZW50UGxheWxpc3QpO1xyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50LmFkZFZpZGVvQXJyYXlUb1BsYXlsaXN0ID0gZnVuY3Rpb24gKHZpZGVvQXJyYXlKc29uKSB7XHJcblx0XHRcdHZhciB2aWRlb0FycmF5ID0gSlNPTi5wYXJzZSh2aWRlb0FycmF5SnNvbik7XHJcblx0XHRcdHZhciBjdXJyZW50UGxheWxpc3QgPSB2aWRlb3BsLnBsYXlsaXN0KCk7XHJcblx0XHRcdEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGN1cnJlbnRQbGF5bGlzdCwgdmlkZW9BcnJheSk7XHJcblx0XHRcdHZpZGVvcGwucGxheWxpc3QoY3VycmVudFBsYXlsaXN0KTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5mb3JjZVRpbWVVcGRhdGVTZXJ2ZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHQkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci51cGRhdGVSb29tVGltZShjdXJyZW50Um9vbU5hbWUsIHZpZGVvcGwuY3VycmVudFRpbWUoKSk7XHJcblx0XHR9O1xyXG5cdFx0dmFyIHRpbWVUb1NldCA9IDAuMDtcclxuXHRcdHZhciBzZXRQbGF5bGlzdEluZGV4VGltZVNldCA9IGZhbHNlO1xyXG5cdFx0Y2hhdC5jbGllbnQuc2V0UGxheWxpc3RJbmRleFRpbWUgPSBmdW5jdGlvbiAoaW5kZXgsIHRpbWUpIHtcclxuXHRcdFx0aWYgKGluZGV4ICE9IHZpZGVvcGwucGxheWxpc3QuY3VycmVudEluZGV4KCkpIHtcclxuXHRcdFx0XHRpc1NlcnZlckNoYW5nZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHR2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJdGVtKGluZGV4KTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjQ0MlwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSB0cnVlO1xyXG5cdFx0XHRcdHRpbWVUb1NldCA9IHRpbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSB0cnVlO1xyXG5cdFx0XHRcdHRpbWVUb1NldCA9IHRpbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gIHZpZGVvcGwucGxheWxpc3QuY3VycmVudEl0ZW0oaW5kZXgpXHJcblxyXG5cclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5wcmV2aWV3VmlkZW9Gcm9tTGluayA9IGZ1bmN0aW9uICh2aWRlb3MpIHtcclxuXHRcdFx0aWYgKGluZGV4ICE9IHZpZGVvcGwucGxheWxpc3QuY3VycmVudEluZGV4KCkpIHtcclxuXHRcdFx0XHRpc1NlcnZlckNoYW5nZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHR2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJdGVtKGluZGV4KTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjQ0MlwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSB0cnVlO1xyXG5cdFx0XHRcdHRpbWVUb1NldCA9IHRpbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSB0cnVlO1xyXG5cdFx0XHRcdHRpbWVUb1NldCA9IHRpbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gIHZpZGVvcGwucGxheWxpc3QuY3VycmVudEl0ZW0oaW5kZXgpXHJcblxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0JCgnI3ByZXZpZXdfcGxheWxpc3QnKS5vbignY2xpY2snLCAnLnBsYXlsaXN0X2l0ZW0nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpbmRleCA9IHBhcnNlSW50KHRoaXMuaWQucmVwbGFjZSgvW15cXGQuXS9nLCAnJykpO1xyXG5cdFx0XHR2YXIgdmlkZW9Kc29uID0gcHJldmlld1ZpZGVvc1tpbmRleF07XHJcblx0XHRcdGNoYXQuc2VydmVyLmFkZFZpZGVvVG9Sb29tKGN1cnJlbnRSb29tTmFtZSwgdmlkZW9Kc29uKTtcclxuXHRcdFx0Ly92aWRlb3BsLnNyYyh7IHR5cGU6IFwidmlkZW8veW91dHViZVwiLCBzcmM6IG1zZyB9KTtcclxuXHJcblx0XHR9KTtcclxuXHRcdGNoYXQuY2xpZW50LnByZXZpZXdMb2FkZWRWaWRlb3MgPSBmdW5jdGlvbiAodmlkZW9zSnNvbiwgaXNTYW1lUGxheWxpc3QpIHtcclxuXHJcblx0XHRcdHZhciB2aWRlb3MgPSBKU09OLnBhcnNlKHZpZGVvc0pzb24pO1xyXG5cdFx0XHQvLyAgdmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SXRlbShpbmRleClcclxuXHJcblx0XHRcdHZhciBwbGF5bGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldmlld19wbGF5bGlzdFwiKTtcclxuXHRcdFx0dmFyIGlkID0gMDtcclxuXHRcdFx0dmlkZW9zLmZvckVhY2godmlkZW8gPT4ge1xyXG5cdFx0XHRcdHByZXZpZXdWaWRlb3MucHVzaChKU09OLnN0cmluZ2lmeSh2aWRlbykpO1xyXG5cdFx0XHRcdHZhciB2aWRlb0ogPSBKU09OLnN0cmluZ2lmeSh2aWRlbyk7XHJcblx0XHRcdFx0dmFyIG5ld192aWRlbyA9XHJcblx0XHRcdFx0XHQkKGA8bGkgY2xhc3M9XCJwbGF5bGlzdF9pdGVtXCIgIGlkPVwicHJldmlld192aWRlb19gICsgaWQgKyBgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ2aWRlb19kYXRhX2AgKyBpZCArIGBcIiB2YWx1ZT1cImAgKyB2aWRlb0ogKyBgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvX2Jsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwaWN0dXJlIGNsYXNzPVwidmlkZW9fdGh1bWJuYWlsXCI+YCtcclxuXHRcdFx0XHRcdFx0YDxzb3VyY2Ugc3Jjc2V0PVwiYCArIHZpZGVvLnRodW1ibmFpbFswXS5zcmNzZXQgKyBgXCIgdHlwZT1cImAgKyB2aWRlby50aHVtYm5haWxbMF0udHlwZSArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgYWx0PVwiXCIgc3JjPVwiYCArIHZpZGVvLnRodW1ibmFpbFsxXS5zcmMgKyBgXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcGljdHVyZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aW1lX2RhdGVcIiBpZD1cIm1zZ190aW1lXCI+YCArIHZpZGVvLmR1cmF0aW9uICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbGk+YCkuYWRkQ2xhc3MoJ3BsYXlsaXN0X2l0ZW0nKTtcclxuXHRcdFx0XHRuZXdfdmlkZW8uYXBwZW5kVG8oJyNwcmV2aWV3X3BsYXlsaXN0Jyk7XHJcblx0XHRcdFx0aWQrKztcclxuXHRcdFx0fSk7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWxlbWVudHNfY291bnRcIikuaW5uZXJIVE1MID0gJCgnI3ByZXZpZXdfcGxheWxpc3QgbGknKS5sZW5ndGg7XHJcblxyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50LmNoYW5nZVZpZGVvU291cmNlID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG5cdFx0XHR2YXIgdmlkID0gSlNPTi5wYXJzZShzb3VyY2UpO1xyXG5cdFx0XHQvL2FsZXJ0KHR5cGVvZiBzb3VyY2UpO1xyXG5cdFx0XHQvL3ZpZC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpLCBhcnIpIHtcclxuXHRcdFx0Ly8gICAgYWxlcnQoaSArIFwiOiBcIiArIGl0ZW0uc3JjICsgXCIgKNC80LDRgdGB0LjQsjpcIiArIGFyciArIFwiKVwiKTtcclxuXHRcdFx0Ly99KTtcclxuXHRcdFx0Ly92YXIgdmlkZW9zcmMgPSBbXTtcclxuXHRcdFx0Y29uc29sZS5sb2coc291cmNlKTtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyggdmlkICk7XHJcblx0XHRcdGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIjMzNFwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdHZpZGVvcGwuc3JjKHZpZFswXS5zcmMpO1xyXG5cdFx0XHR2aWRlb3BsLnBsYXlsaXN0KHZpZCk7XHJcblx0XHRcdHZpZGVvcGwucGxheWxpc3QuYXV0b2FkdmFuY2UoMSk7XHJcblx0XHRcdHZpZGVvcGwucGxheWxpc3QucmVwZWF0KGZhbHNlKTtcclxuXHRcdFx0Ly92aWRlb3BsLnNyYyh7IHR5cGU6IFwidmlkZW8veW91dHViZVwiLCBzcmM6IHNvdXJjZSB9KTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5hZGRNZXNzYWdlID0gZnVuY3Rpb24gKG5hbWUsIG1lc3NhZ2UsIHJvb21OYW1lLCB0aW1lKSB7XHJcblx0XHRcdC8vINCU0L7QsdCw0LLQu9C10L3QuNC1INGB0L7QvtCx0YnQtdC90LjQuSDQvdCwINCy0LXQsS3RgdGC0YDQsNC90LjRhtGDIFxyXG5cdFx0XHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX3RvX21lXCIpLmlubmVySFRNTCArPVxyXG5cdFx0XHRpZiAocm9vbU5hbWUgPT0gY3VycmVudFJvb21OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvKiQoJyNtc2dfaGlzdG9yeScpLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAnPGxpIGNsYXNzPSBcImluY29taW5nX21zZ1wiID4gJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiaW5jb21pbmdfbXNnX2ltZ1wiPiA8aW1nIHNyYz1cImh0dHBzOi8vcHRldHV0b3JpYWxzLmNvbS9pbWFnZXMvdXNlci1wcm9maWxlLnBuZ1wiIGFsdD1cInN1bmlsXCI+IDwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJyZWNlaXZlZF9tc2dcIj4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInJlY2VpdmVkX3dpdGhkX21zZ1wiPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHA+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9wID4nICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCI+JyArIHRpbWUgKyAnPC9zcGFuPicgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICAnPC9saT4nKTsqL1xyXG5cclxuXHRcdFx0XHR2YXIgbmV3X21lc3NhZ2UgPVxyXG5cdFx0XHRcdFx0JChgPGxpIGNsYXNzPVwiaW5jb21pbmdfbXNnXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVjZWl2ZWRfbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlY2VpdmVkX21zZyBzZW5kZXJfbmFtZVwiPmAgKyBuYW1lICsgYDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWNlaXZlZF93aXRoZF9tc2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2UgK1xyXG5cdFx0XHRcdFx0XHRgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCIgaWQ9XCJtc2dfdGltZVwiPmAgKyB0aW1lICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmApLmFkZENsYXNzKCdpbmNvbWluZ19tc2cnKTtcclxuXHRcdFx0XHRuZXdfbWVzc2FnZS5hcHBlbmRUbygnI21zZ19oaXN0b3J5Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bG9hZENoYXRzVmlldygpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuYWRkQ2FsbGVyTWVzc2FnZSA9IGZ1bmN0aW9uIChuYW1lLCBtZXNzYWdlLCB0aW1lKSB7XHJcblxyXG5cdFx0XHQkKCcjbXNnX2hpc3RvcnknKS5hcHBlbmQoYDxsaSBjbGFzcz1cIm91dGdvaW5nX21zZ1wiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZW50X21zZ1wiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm91dGdvaW5nX21zZyBzZW5kZXJfbmFtZVwiPlxyXG5cdFx0XHRcdFx0XHQ8cD5gICtcclxuXHRcdFx0XHRuYW1lICtcclxuXHRcdFx0XHRgPC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmVjZWl2ZWRfd2l0aGRfbXNnXCI+XHJcblx0XHRcdFx0XHRcdDxwPmAgK1xyXG5cdFx0XHRcdG1lc3NhZ2UgK1xyXG5cdFx0XHRcdGA8L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCI+YCArIHRpbWUgKyBgPC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2xpPmApO1xyXG4gICAgICAgICAgICAvKiQoJyNtc2dfaGlzdG9yeScpLmFwcGVuZChgPGxpIGNsYXNzPVwib3V0Z29pbmdfbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9IFwic2VudF9tc2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPmArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGA8L3A+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2RpdiA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCI+YCsgdGltZSArIGA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saSA+YFxyXG4gICAgICAgICAgICApOyovXHJcblx0XHRcdHVwZGF0ZVNjcm9sbCgpO1xyXG5cdFx0fTtcclxuXHJcblx0XHQvLyDQpNGD0L3QutGG0LjRjywg0LLRi9C30YvQstCw0LXQvNCw0Y8g0L/RgNC4INC/0L7QtNC60LvRjtGH0LXQvdC40Lgg0L3QvtCy0L7Qs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5cdFx0Y2hhdC5jbGllbnQub25Db25uZWN0ZWQgPSBmdW5jdGlvbiAoaWQsIHVzZXJOYW1lKSB7XHJcblxyXG5cclxuXHRcdFx0JCgnI2NoYXRCb2R5Jykuc2hvdygpO1xyXG5cdFx0XHQvLyDRg9GB0YLQsNC90L7QstC60LAg0LIg0YHQutGA0YvRgtGL0YUg0L/QvtC70Y/RhSDQuNC80LXQvdC4INC4IGlkINGC0LXQutGD0YnQtdCz0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXHJcblx0XHRcdCQoJyNoZElkJykudmFsKGlkKTtcclxuXHRcdFx0JCgnI3VzZXJuYW1lJykudmFsKHVzZXJOYW1lKTtcclxuXHRcdFx0aWYgKGN1cnJlbnRSb29tTmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Y2hhdC5zZXJ2ZXIudXBkYXRlUGxheWxpc3QoY3VycmVudFJvb21OYW1lKTtcclxuXHRcdFx0XHR1cGRhdGVTY3JvbGwoKTtcclxuXHRcdFx0XHRjaGF0LnNlcnZlci5qb2luUm9vbShjdXJyZW50Um9vbU5hbWUpO1xyXG5cdFx0XHRcdGNoYXQuc2VydmVyLnJlcXVlc3RUaW1lU3luY2goY3VycmVudFJvb21OYW1lLCB1c2VyTmFtZSk7XHJcblx0XHRcdFx0Y2hhdC5zZXJ2ZXIudXBkYXRlVXNlcnNJblJvb20oY3VycmVudFJvb21OYW1lKTtcclxuXHRcdFx0XHQkKCcjaGVhZGVyJykuaHRtbCgnPGgzPtCU0L7QsdGA0L4g0L/QvtC20LDQu9C+0LLQsNGC0YwsICcgKyB1c2VyTmFtZSArICc8L2gzPicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnNvbGUubG9nKHVzZXJOYW1lKTtcclxuXHRcdFx0Y29uc29sZS5sb2codXNlck5hbWUpO1xyXG5cclxuXHJcblx0XHR9O1xyXG5cdFx0ZnVuY3Rpb24gdXBkYXRlU2Nyb2xsKCkge1xyXG5cdFx0XHR2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXNnX2hpc3RvcnlcIik7XHJcblx0XHRcdGVsZW1lbnQuc2Nyb2xsVG9wID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XHJcblxyXG5cdFx0fVxyXG5cdFx0Ly8g0JTQvtCx0LDQstC70Y/QtdC8INC90L7QstC+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y9cclxuXHRcdGNoYXQuY2xpZW50Lm9uTmV3VXNlckNvbm5lY3RlZCA9IGZ1bmN0aW9uIChpZCwgbmFtZSkge1xyXG5cclxuXHRcdFx0QWRkVXNlcihpZCwgbmFtZSk7XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuc3luY2hXaXRoID0gZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdFx0Ly9jb25zb2xlLmxvZyhcIlVzZXIgXCIgK25hbWUgKyBcIiB0aW1lIFwiICt2aWRlb3BsLmN1cnJlbnRUaW1lKCkpO1xyXG5cdFx0XHQvLyQuY29ubmVjdGlvbi5ncm91cEh1YnMuc2VydmVyLnNldFRpbWVGb3JPdGhlckNsaWVudChuYW1lLCB2aWRlb3BsLmN1cnJlbnRUaW1lKTtcclxuXHRcdFx0Y2hhdC5zZXJ2ZXIuc2V0VGltZUZvck90aGVyQ2xpZW50KG5hbWUsIHZpZGVvcGwuY3VycmVudFRpbWUoKSwgdmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SW5kZXgoKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdC8vINCj0LTQsNC70Y/QtdC8INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5cdFx0Y2hhdC5jbGllbnQub25Vc2VyRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gKHVzZXJOYW1lKSB7XHJcblx0XHRcdGlmIChjdXJyZW50Um9vbUFubWluLnVzZXJOYW1lID09IHVzZXJOYW1lKSB7XHJcblx0XHRcdFx0Y2hhdC5ncm91cEh1YnMuc2VydmVyLnN3aXRjaEFkbWluRm9yUm9vbShjdXJyZW50Um9vbU5hbWUsIHVzZXJOYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyQoJyMnICsgaWQpLnJlbW92ZSgpO1xyXG5cdFx0fTtcclxuXHRcdC8vINCj0LTQsNC70Y/QtdC8INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5cdFx0Y2hhdC5jbGllbnQudXBkYXRlVXNlcnNJblJvb20gPSBmdW5jdGlvbiAocm9vbUpzb24pIHtcclxuXHRcdFx0dmFyIHJvb20gPSBKU09OLnBhcnNlKHJvb21Kc29uKTtcclxuXHJcblx0XHRcdHZhciBuZXdVc2VyTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1saXN0XCIpO1xyXG5cdFx0XHRuZXdVc2VyTGlzdC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHRyb29tLlVzZXJzLmZvckVhY2godXNlciA9PiB7XHJcblx0XHRcdFx0dmFyIG5ld1VzZXJMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblx0XHRcdFx0aWYgKHJvb20uQWRtaW4uVXNlck5hbWUgPT09IHVzZXIuVXNlck5hbWUpIHtcclxuXHJcblx0XHRcdFx0XHRuZXdVc2VyTGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodXNlci5Vc2VyTmFtZSArIFwiQWRtaW5cIikpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRuZXdVc2VyTGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodXNlci5Vc2VyTmFtZSkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRuZXdVc2VyTGlzdC5hcHBlbmRDaGlsZChuZXdVc2VyTGkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8kKCcjJyArIGlkKS5yZW1vdmUoKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5jaGFuZ2VQbGF5bGlzdEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdFx0aWYgKGlkICE9IHZpZGVvcGwucGxheWxpc3QuY3VycmVudEluZGV4KCkpIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjQ0MlwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdFx0aXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCA9IHRydWU7XHJcblx0XHRcdFx0dmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SXRlbShpZCk7XHJcblx0XHRcdFx0dmlkZW9wbC5jdXJyZW50VGltZSgwLjApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHRcdHZpZGVvcGwub24oXCJwbGF5bGlzdGl0ZW1cIiwgZnVuY3Rpb24gKGlkLCBqZCkge1xyXG5cclxuXHRcdFx0aWYgKCFpc1NlcnZlckNoYW5nZVBsYXlsaXN0ICYmIGpkLnBsYXlsaXN0SXRlbUlkXyAhPSB2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJbmRleCgpKSB7XHJcblx0XHRcdFx0Ly9hbGVydChpZCArIFwiIDo6Ojo6IFwiICsgamQgKyBcIiBcIiArIGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgKyBcIiBkZWZpbmVkIElEOiBcIiArIHZpZGVvcGwucGxheWxpc3QuY3VycmVudEluZGV4KCkpO1xyXG5cclxuXHRcdFx0XHQkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci5jaGFuZ2VQbGF5bGlzdEl0ZW0oY3VycmVudFJvb21OYW1lLCB2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJbmRleCgpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChpc1NlcnZlckNoYW5nZVBsYXlsaXN0KSB7XHJcblx0XHRcdFx0Ly9hbGVydChpZCArIFwiIFwiICtpc1NlcnZlckNoYW5nZVBsYXlsaXN0ICsgXCIgc2VydmVyXCIpO1xyXG5cdFx0XHRcdGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjQ1OFwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dmlkZW9wbC5vbihcInNvdXJjZXNldFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhcInNvdXJjZXNldFwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdHZpZGVvcGwub24oXCJsb2Fkc3RhcnRcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoc2V0UGxheWxpc3RJbmRleFRpbWVTZXQpIHtcclxuXHRcdFx0XHR2aWRlb3BsLmN1cnJlbnRUaW1lKHRpbWVUb1NldCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJsb2Fkc3RhcnRcIik7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSBmYWxzZTtcclxuXHRcdFx0XHR2aWRlb3BsLnBsYXkoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cdFx0dmlkZW9wbC5vbihcImxvYWRlZG1ldGFkYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKFwibG9hZGVkbWV0YWRhdGFcIik7XHJcblxyXG5cdFx0fSk7XHJcblx0XHR2aWRlb3BsLm9uKFwicmVhZHlcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coXCJyZWFkeVwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdHZpZGVvcGwub24oXCJjYW5wbGF5XCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY2FucGxheVwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdCQuY29ubmVjdGlvbi5odWIuc3RhcnQoKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJodWIgaXMgcmVhZHlcIik7XHJcblxyXG5cdFx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tc2dfc2VuZF9idG4nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0dmFyIG1zZyA9ICQoJyN3cml0ZV9tc2cnKS52YWwoKTtcclxuXHRcdFx0XHRpZiAobXNnLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhjdXJyZW50Um9vbU5hbWUpO1xyXG5cdFx0XHRcdFx0Y2hhdC5zZXJ2ZXIuc2VuZEdyb3VwTWVzc2FnZShjdXJyZW50Um9vbU5hbWUsIG1zZyk7XHJcblx0XHRcdFx0XHQkKCcjd3JpdGVfbXNnJykudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KS5mYWlsKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdC8vYWxlcnQoJ1RoZXJlIHdhcyBhbiBlcnJvcicpO1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn1cclxuLy8g0JrQvtC00LjRgNC+0LLQsNC90LjQtSDRgtC10LPQvtCyXHJcbmZ1bmN0aW9uIGh0bWxFbmNvZGUodmFsdWUpIHtcclxuXHR2YXIgZW5jb2RlZFZhbHVlID0gJCgnPGRpdiAvPicpLnRleHQodmFsdWUpLmh0bWwoKTtcclxuXHRyZXR1cm4gZW5jb2RlZFZhbHVlO1xyXG59XHJcbi8v0JTQvtCx0LDQstC70LXQvdC40LUg0L3QvtCy0L7Qs9C+INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xyXG5mdW5jdGlvbiBBZGRVc2VyKGlkLCBuYW1lKSB7XHJcblxyXG5cdHZhciB1c2VySWQgPSAkKCcjaGRJZCcpLnZhbCgpO1xyXG5cclxuXHRpZiAodXNlcklkICE9IGlkKSB7XHJcblxyXG5cdFx0JChcIiNjaGF0dXNlcnNcIikuYXBwZW5kKCc8cCBpZD1cIicgKyBpZCArICdcIj48Yj4nICsgbmFtZSArICc8L2I+PC9wPicpO1xyXG5cdH1cclxufSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwudXJsUGFyc2VyID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgICBfdHlwZW9mID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3R5cGVvZihvYmopO1xuICB9XG5cbiAgdmFyIGdldFF1ZXJ5UGFyYW1zID0gZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbXMocXMpIHtcbiAgICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHFzID0gcXMuc3BsaXQoJysnKS5qb2luKCcgJyk7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIHZhciBtYXRjaCA9IHFzLm1hdGNoKC8oPzpbP10oPzpbXj1dKyk9KD86W14mI10qKSg/OlsmXSg/OltePV0rKT0oPzpbXiYjXSopKSooPzpbI10uKik/KXwoPzpbI10uKikvKTtcbiAgICB2YXIgc3BsaXQ7XG5cbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBzcGxpdCA9IG1hdGNoWzBdLnN1YnN0cigxKS5zcGxpdCgvWyYjPV0vKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHBhcmFtc1tkZWNvZGVVUklDb21wb25lbnQoc3BsaXRbaV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdFtpICsgMV0gfHwgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMgPSBmdW5jdGlvbiBjb21iaW5lUGFyYW1zKHBhcmFtcywgaGFzUGFyYW1zKSB7XG4gICAgaWYgKF90eXBlb2YocGFyYW1zKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgY29tYmluZWQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSAvL2Fsd2F5cyBoYXZlIHBhcmFtZXRlcnMgaW4gdGhlIHNhbWUgb3JkZXJcblxuXG4gICAga2V5cy5zb3J0KCk7XG5cbiAgICBpZiAoIWhhc1BhcmFtcykge1xuICAgICAgY29tYmluZWQgKz0gJz8nICsga2V5c1swXSArICc9JyArIHBhcmFtc1trZXlzWzBdXTtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICBmb3IgKDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbWJpbmVkICs9ICcmJyArIGtleXNbaV0gKyAnPScgKyBwYXJhbXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkO1xuICB9OyAvL3BhcnNlcyBzdHJpbmdzIGxpa2UgMWgzMG0yMHMgdG8gc2Vjb25kc1xuXG5cbiAgZnVuY3Rpb24gZ2V0TGV0dGVyVGltZSh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRvdGFsU2Vjb25kcyA9IDA7XG4gICAgdmFyIHRpbWVWYWx1ZXMgPSB7XG4gICAgICAncyc6IDEsXG4gICAgICAnbSc6IDEgKiA2MCxcbiAgICAgICdoJzogMSAqIDYwICogNjAsXG4gICAgICAnZCc6IDEgKiA2MCAqIDYwICogMjQsXG4gICAgICAndyc6IDEgKiA2MCAqIDYwICogMjQgKiA3XG4gICAgfTtcbiAgICB2YXIgdGltZVBhaXJzOyAvL2V4cGFuZCB0byBcIjEgaCAzMCBtIDIwIHNcIiBhbmQgc3BsaXRcblxuICAgIHRpbWVTdHJpbmcgPSB0aW1lU3RyaW5nLnJlcGxhY2UoLyhbc21oZHddKS9nLCAnICQxICcpLnRyaW0oKTtcbiAgICB0aW1lUGFpcnMgPSB0aW1lU3RyaW5nLnNwbGl0KCcgJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVQYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdG90YWxTZWNvbmRzICs9IHBhcnNlSW50KHRpbWVQYWlyc1tpXSwgMTApICogdGltZVZhbHVlc1t0aW1lUGFpcnNbaSArIDFdIHx8ICdzJ107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdGFsU2Vjb25kcztcbiAgfSAvL3BhcnNlcyBzdHJpbmdzIGxpa2UgMTozMDoyMCB0byBzZWNvbmRzXG5cblxuICBmdW5jdGlvbiBnZXRDb2xvblRpbWUodGltZVN0cmluZykge1xuICAgIHZhciB0b3RhbFNlY29uZHMgPSAwO1xuICAgIHZhciB0aW1lVmFsdWVzID0gWzEsIDEgKiA2MCwgMSAqIDYwICogNjAsIDEgKiA2MCAqIDYwICogMjQsIDEgKiA2MCAqIDYwICogMjQgKiA3XTtcbiAgICB2YXIgdGltZVBhaXJzID0gdGltZVN0cmluZy5zcGxpdCgnOicpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lUGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsU2Vjb25kcyArPSBwYXJzZUludCh0aW1lUGFpcnNbaV0sIDEwKSAqIHRpbWVWYWx1ZXNbdGltZVBhaXJzLmxlbmd0aCAtIGkgLSAxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG90YWxTZWNvbmRzO1xuICB9XG5cbiAgdmFyIGdldFRpbWUgPSBmdW5jdGlvbiBnZXRUaW1lKHRpbWVTdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHRpbWVTdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodGltZVN0cmluZy5tYXRjaCgvXihcXGQrW3NtaGR3XT8pKyQvKSkge1xuICAgICAgcmV0dXJuIGdldExldHRlclRpbWUodGltZVN0cmluZyk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVTdHJpbmcubWF0Y2goL14oXFxkKzo/KSskLykpIHtcbiAgICAgIHJldHVybiBnZXRDb2xvblRpbWUodGltZVN0cmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgdmFyIHV0aWwgPSB7XG4gICAgZ2V0UXVlcnlQYXJhbXM6IGdldFF1ZXJ5UGFyYW1zLFxuICAgIGNvbWJpbmVQYXJhbXM6IGNvbWJpbmVQYXJhbXMsXG4gICAgZ2V0VGltZTogZ2V0VGltZVxuICB9O1xuXG4gIHZhciBnZXRRdWVyeVBhcmFtcyQxID0gdXRpbC5nZXRRdWVyeVBhcmFtcztcblxuICBmdW5jdGlvbiBVcmxQYXJzZXIoKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYXJyID0gWydwYXJzZVByb3ZpZGVyJywgJ3BhcnNlJywgJ2JpbmQnLCAnY3JlYXRlJ107IF9pIDwgX2Fyci5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBrZXkgPSBfYXJyW19pXTtcbiAgICAgIHRoaXNba2V5XSA9IHRoaXNba2V5XS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMucGx1Z2lucyA9IHt9O1xuICB9XG5cbiAgdmFyIHVybFBhcnNlciA9IFVybFBhcnNlcjtcblxuICBVcmxQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvdmlkZXIgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzooPzpodHRwcz86KT9cXC9cXC8pPyg/OlteLl0rXFwuKT8oXFx3KylcXC4vaSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVXJsUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHByb3ZpZGVyID0gdGhpcy5wYXJzZVByb3ZpZGVyKHVybCk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgcGx1Z2luID0gdGhpcy5wbHVnaW5zW3Byb3ZpZGVyXTtcblxuICAgIGlmICghcHJvdmlkZXIgfHwgIXBsdWdpbiB8fCAhcGx1Z2luLnBhcnNlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IHBsdWdpbi5wYXJzZS5jYWxsKHBsdWdpbiwgdXJsLCBnZXRRdWVyeVBhcmFtcyQxKHVybCkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gcmVtb3ZlRW1wdHlQYXJhbWV0ZXJzKHJlc3VsdCk7XG4gICAgICByZXN1bHQucHJvdmlkZXIgPSBwbHVnaW4ucHJvdmlkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBVcmxQYXJzZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zW3BsdWdpbi5wcm92aWRlcl0gPSBwbHVnaW47XG5cbiAgICBpZiAocGx1Z2luLmFsdGVybmF0aXZlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbHVnaW4uYWx0ZXJuYXRpdmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW4uYWx0ZXJuYXRpdmVzW2ldXSA9IHBsdWdpbjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgVXJsUGFyc2VyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAob3ApIHtcbiAgICBpZiAoX3R5cGVvZihvcCkgIT09ICdvYmplY3QnIHx8IF90eXBlb2Yob3AudmlkZW9JbmZvKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHZpID0gb3AudmlkZW9JbmZvO1xuICAgIHZhciBwYXJhbXMgPSBvcC5wYXJhbXM7XG4gICAgdmFyIHBsdWdpbiA9IHRoaXMucGx1Z2luc1t2aS5wcm92aWRlcl07XG4gICAgcGFyYW1zID0gcGFyYW1zID09PSAnaW50ZXJuYWwnID8gdmkucGFyYW1zIDogcGFyYW1zIHx8IHt9O1xuXG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgb3AuZm9ybWF0ID0gb3AuZm9ybWF0IHx8IHBsdWdpbi5kZWZhdWx0Rm9ybWF0OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cbiAgICAgIGlmIChwbHVnaW4uZm9ybWF0cy5oYXNPd25Qcm9wZXJ0eShvcC5mb3JtYXQpKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uZm9ybWF0c1tvcC5mb3JtYXRdLmFwcGx5KHBsdWdpbiwgW3ZpLCBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICBmdW5jdGlvbiByZW1vdmVFbXB0eVBhcmFtZXRlcnMocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdC5wYXJhbXMgJiYgT2JqZWN0LmtleXMocmVzdWx0LnBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBkZWxldGUgcmVzdWx0LnBhcmFtcztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIHBhcnNlciA9IG5ldyB1cmxQYXJzZXIoKTtcbiAgdmFyIGJhc2UgPSBwYXJzZXI7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMSA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBDYW5hbFBsdXMoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICdjYW5hbHBsdXMnO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdlbWJlZCc7XG4gICAgdGhpcy5mb3JtYXRzID0ge1xuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nXG4gICAgfTtcbiAgfVxuXG4gIENhbmFsUGx1cy5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIGRlbGV0ZSBwYXJhbXMudmlkO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgQ2FuYWxQbHVzLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuVklERU8sXG4gICAgICBpZDogcGFyYW1zLnZpZFxuICAgIH07XG4gICAgcmVzdWx0LnBhcmFtcyA9IF90aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpO1xuXG4gICAgaWYgKCFyZXN1bHQuaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBDYW5hbFBsdXMucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cDovL3BsYXllci5jYW5hbHBsdXMuZnIvZW1iZWQvJztcbiAgICBwYXJhbXMudmlkID0gdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkMShwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBDYW5hbFBsdXMoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMiA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBDb3ViKCkge1xuICAgIHRoaXMucHJvdmlkZXIgPSAnY291Yic7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgQ291Yi5wcm90b3R5cGUucGFyc2VVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzplbWJlZHx2aWV3KVxcLyhbYS16QS1aXFxkXSspL2kpO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIENvdWIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICBpZDogdGhpcy5wYXJzZVVybCh1cmwpXG4gICAgfTtcblxuICAgIGlmICghcmVzdWx0LmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKGJhc2VVcmwsIHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkMihwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2NvdWIuY29tL3ZpZXcvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnLy9jb3ViLmNvbS9lbWJlZC8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IENvdWIoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMyA9IHV0aWwuY29tYmluZVBhcmFtcyxcbiAgICAgIGdldFRpbWUkMSA9IHV0aWwuZ2V0VGltZTtcblxuICBmdW5jdGlvbiBEYWlseW1vdGlvbigpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ2RhaWx5bW90aW9uJztcbiAgICB0aGlzLmFsdGVybmF0aXZlcyA9IFsnZGFpJ107XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwic2hvcnRcIjogdGhpcy5jcmVhdGVTaG9ydFVybCxcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybCxcbiAgICAgIGltYWdlOiB0aGlzLmNyZWF0ZUltYWdlVXJsXG4gICAgfTtcbiAgICB0aGlzLm1lZGlhVHlwZXMgPSB7XG4gICAgICBWSURFTzogJ3ZpZGVvJ1xuICAgIH07XG4gIH1cblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLnBhcnNlVGltZShwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgcGFyYW1zLnN0YXJ0ID0gZ2V0VGltZSQxKHBhcmFtcy5zdGFydCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2VVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzpcXC92aWRlb3xseSlcXC8oW0EtWmEtejAtOV0rKS9pKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiBfdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zKSxcbiAgICAgIGlkOiBfdGhpcy5wYXJzZVVybCh1cmwpXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0LmlkID8gcmVzdWx0IDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVVcmwgPSBmdW5jdGlvbiAoYmFzZSwgdmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2UgKyB2aS5pZCArIGNvbWJpbmVQYXJhbXMkMyhwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVTaG9ydFVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2RhaS5seS8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2RhaWx5bW90aW9uLmNvbS92aWRlby8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnaHR0cHM6Ly93d3cuZGFpbHltb3Rpb24uY29tL2VtYmVkL3ZpZGVvLycsIHZpLCBwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVJbWFnZVVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHBzOi8vd3d3LmRhaWx5bW90aW9uLmNvbS90aHVtYm5haWwvdmlkZW8vJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBEYWlseW1vdGlvbigpKTtcblxuICB2YXIgY29tYmluZVBhcmFtcyQ0ID0gdXRpbC5jb21iaW5lUGFyYW1zLFxuICAgICAgZ2V0VGltZSQyID0gdXRpbC5nZXRUaW1lO1xuXG4gIGZ1bmN0aW9uIFR3aXRjaCgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3R3aXRjaCc7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbycsXG4gICAgICBTVFJFQU06ICdzdHJlYW0nLFxuICAgICAgQ0xJUDogJ2NsaXAnXG4gICAgfTtcbiAgfVxuXG4gIFR3aXRjaC5wcm90b3R5cGUuc2VwZXJhdGVJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcmU6IGlkWzBdLFxuICAgICAgaWQ6IGlkLnN1YnN0cigxKVxuICAgIH07XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5wYXJzZUNoYW5uZWwgPSBmdW5jdGlvbiAocmVzdWx0LCBwYXJhbXMpIHtcbiAgICB2YXIgY2hhbm5lbCA9IHBhcmFtcy5jaGFubmVsIHx8IHBhcmFtcy51dG1fY29udGVudCB8fCByZXN1bHQuY2hhbm5lbDtcbiAgICBkZWxldGUgcGFyYW1zLnV0bV9jb250ZW50O1xuICAgIGRlbGV0ZSBwYXJhbXMuY2hhbm5lbDtcbiAgICByZXR1cm4gY2hhbm5lbDtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0LCBwYXJhbXMpIHtcbiAgICB2YXIgbWF0Y2g7XG4gICAgbWF0Y2ggPSB1cmwubWF0Y2goLyhjbGlwc1xcLik/dHdpdGNoXFwudHZcXC8oPzooPzp2aWRlb3NcXC8oXFxkKykpfChcXHcrKSg/OlxcL2NsaXBcXC8oXFx3KykpPykvaSk7XG5cbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0pIHtcbiAgICAgIC8vdmlkZW9cbiAgICAgIHJlc3VsdC5pZCA9ICd2JyArIG1hdGNoWzJdO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnZpZGVvKSB7XG4gICAgICAvL3ZpZGVvIGVtYmVkXG4gICAgICByZXN1bHQuaWQgPSBwYXJhbXMudmlkZW87XG4gICAgICBkZWxldGUgcGFyYW1zLnZpZGVvO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmNsaXApIHtcbiAgICAgIC8vY2xpcHMgZW1iZWRcbiAgICAgIHJlc3VsdC5pZCA9IHBhcmFtcy5jbGlwO1xuICAgICAgcmVzdWx0LmlzQ2xpcCA9IHRydWU7XG4gICAgICBkZWxldGUgcGFyYW1zLmNsaXA7XG4gICAgfSBlbHNlIGlmIChtYXRjaCAmJiBtYXRjaFsxXSAmJiBtYXRjaFszXSkge1xuICAgICAgLy9jbGlwcy50d2l0Y2gudHYvaWRcbiAgICAgIHJlc3VsdC5pZCA9IG1hdGNoWzNdO1xuICAgICAgcmVzdWx0LmlzQ2xpcCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChtYXRjaCAmJiBtYXRjaFszXSAmJiBtYXRjaFs0XSkge1xuICAgICAgLy90d2l0Y2gudHYvY2hhbm5lbC9jbGlwL2lkXG4gICAgICByZXN1bHQuY2hhbm5lbCA9IG1hdGNoWzNdO1xuICAgICAgcmVzdWx0LmlkID0gbWF0Y2hbNF07XG4gICAgICByZXN1bHQuaXNDbGlwID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoICYmIG1hdGNoWzNdKSB7XG4gICAgICByZXN1bHQuY2hhbm5lbCA9IG1hdGNoWzNdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5wYXJzZU1lZGlhVHlwZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgbWVkaWFUeXBlO1xuXG4gICAgaWYgKHJlc3VsdC5pZCkge1xuICAgICAgaWYgKHJlc3VsdC5pc0NsaXApIHtcbiAgICAgICAgbWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLkNMSVA7XG4gICAgICAgIGRlbGV0ZSByZXN1bHQuaXNDbGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlZJREVPO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVzdWx0LmNoYW5uZWwpIHtcbiAgICAgIG1lZGlhVHlwZSA9IHRoaXMubWVkaWFUeXBlcy5TVFJFQU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhVHlwZTtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkMihwYXJhbXMudCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQgPSBfdGhpcy5wYXJzZVVybCh1cmwsIHJlc3VsdCwgcGFyYW1zKTtcbiAgICByZXN1bHQuY2hhbm5lbCA9IF90aGlzLnBhcnNlQ2hhbm5lbChyZXN1bHQsIHBhcmFtcyk7XG4gICAgcmVzdWx0Lm1lZGlhVHlwZSA9IF90aGlzLnBhcnNlTWVkaWFUeXBlKHJlc3VsdCk7XG4gICAgcmVzdWx0LnBhcmFtcyA9IF90aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQuY2hhbm5lbCB8fCByZXN1bHQuaWQgPyByZXN1bHQgOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJyc7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuU1RSRUFNICYmIHZpLmNoYW5uZWwpIHtcbiAgICAgIHVybCA9ICdodHRwczovL3R3aXRjaC50di8nICsgdmkuY2hhbm5lbDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPICYmIHZpLmlkKSB7XG4gICAgICB2YXIgc2VwID0gdGhpcy5zZXBlcmF0ZUlkKHZpLmlkKTtcbiAgICAgIHVybCA9ICdodHRwczovL3R3aXRjaC50di92aWRlb3MvJyArIHNlcC5pZDtcblxuICAgICAgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgICBwYXJhbXMudCA9IHBhcmFtcy5zdGFydCArICdzJztcbiAgICAgICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkNMSVAgJiYgdmkuaWQpIHtcbiAgICAgIGlmICh2aS5jaGFubmVsKSB7XG4gICAgICAgIHVybCA9ICdodHRwczovL3d3dy50d2l0Y2gudHYvJyArIHZpLmNoYW5uZWwgKyAnL2NsaXAvJyArIHZpLmlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsID0gJ2h0dHBzOi8vY2xpcHMudHdpdGNoLnR2LycgKyB2aS5pZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ0KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vcGxheWVyLnR3aXRjaC50di8nO1xuXG4gICAgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlNUUkVBTSAmJiB2aS5jaGFubmVsKSB7XG4gICAgICBwYXJhbXMuY2hhbm5lbCA9IHZpLmNoYW5uZWw7XG4gICAgfSBlbHNlIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5WSURFTyAmJiB2aS5pZCkge1xuICAgICAgcGFyYW1zLnZpZGVvID0gdmkuaWQ7XG5cbiAgICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgICAgcGFyYW1zLnQgPSBwYXJhbXMuc3RhcnQgKyAncyc7XG4gICAgICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5DTElQICYmIHZpLmlkKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9jbGlwcy50d2l0Y2gudHYvZW1iZWQnO1xuICAgICAgcGFyYW1zLmNsaXAgPSB2aS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ0KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFR3aXRjaCgpKTtcblxuICB2YXIgY29tYmluZVBhcmFtcyQ1ID0gdXRpbC5jb21iaW5lUGFyYW1zLFxuICAgICAgZ2V0VGltZSQzID0gdXRpbC5nZXRUaW1lO1xuXG4gIGZ1bmN0aW9uIFZpbWVvKCkge1xuICAgIHRoaXMucHJvdmlkZXIgPSAndmltZW8nO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gWyd2aW1lb3BybycsICd2aW1lb2NkbiddO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmwsXG4gICAgICBpbWFnZTogdGhpcy5jcmVhdGVJbWFnZVVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgVmltZW8ucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0KSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8odmltZW8oPzpjZG58cHJvKT8pXFwuY29tXFwvKD86KD86Y2hhbm5lbHNcXC9bXFx3XSt8KD86KD86YWxidW1cXC9cXGQrfGdyb3Vwc1xcL1tcXHddK3xzdGFmZlxcL2ZyYW1lKVxcLyk/dmlkZW9zPylcXC8pPyhcXGQrKSg/Ol8oXFxkKykoPzp4KFxcZCspKT8pPyhcXC5cXHcrKT8vaSk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5pZCA9IG1hdGNoWzJdO1xuXG4gICAgaWYgKG1hdGNoWzFdID09PSAndmltZW9jZG4nKSB7XG4gICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgcmVzdWx0LmltYWdlV2lkdGggPSBwYXJzZUludChtYXRjaFszXSk7XG5cbiAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgLy9oZWlnaHQgY2FuIG9ubHkgYmUgc2V0IHdoZW4gd2lkdGggaXMgYWxzbyBzZXRcbiAgICAgICAgICByZXN1bHQuaW1hZ2VIZWlnaHQgPSBwYXJzZUludChtYXRjaFs0XSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzdWx0LmltYWdlRXh0ZW5zaW9uID0gbWF0Y2hbNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBWaW1lby5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLnBhcnNlVGltZShwYXJhbXMpO1xuICB9O1xuXG4gIFZpbWVvLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy50KSB7XG4gICAgICBwYXJhbXMuc3RhcnQgPSBnZXRUaW1lJDMocGFyYW1zLnQpO1xuICAgICAgZGVsZXRlIHBhcmFtcy50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpXG4gICAgfTtcbiAgICByZXN1bHQgPSB0aGlzLnBhcnNlVXJsKHVybCwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0LmlkID8gcmVzdWx0IDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIFZpbWVvLnByb3RvdHlwZS5jcmVhdGVVcmwgPSBmdW5jdGlvbiAoYmFzZVVybCwgdmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2aS5pZDtcbiAgICB2YXIgc3RhcnRUaW1lID0gcGFyYW1zLnN0YXJ0O1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNShwYXJhbXMpO1xuXG4gICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgdXJsICs9ICcjdD0nICsgc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLmNyZWF0ZUxvbmdVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnaHR0cHM6Ly92aW1lby5jb20vJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJy8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBWaW1lby5wcm90b3R5cGUuY3JlYXRlSW1hZ2VVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwczovL2kudmltZW9jZG4uY29tL3ZpZGVvLycgKyB2aS5pZDtcblxuICAgIGlmICh2aS5pbWFnZVdpZHRoICYmIHZpLmltYWdlSGVpZ2h0KSB7XG4gICAgICB1cmwgKz0gJ18nICsgdmkuaW1hZ2VXaWR0aCArICd4JyArIHZpLmltYWdlSGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodmkuaW1hZ2VXaWR0aCkge1xuICAgICAgdXJsICs9ICdfJyArIHZpLmltYWdlV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHZpLmltYWdlRXh0ZW5zaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZpLmltYWdlRXh0ZW5zaW9uID0gJy53ZWJwJztcbiAgICB9XG5cbiAgICB1cmwgKz0gdmkuaW1hZ2VFeHRlbnNpb247XG4gICAgZGVsZXRlIHZpLmltYWdlRXh0ZW5zaW9uO1xuICAgIHVybCArPSBjb21iaW5lUGFyYW1zJDUocGFyYW1zKTtcbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIGJhc2UuYmluZChuZXcgVmltZW8oKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkNiA9IHV0aWwuY29tYmluZVBhcmFtcyxcbiAgICAgIGdldFRpbWUkNCA9IHV0aWwuZ2V0VGltZTtcblxuICBmdW5jdGlvbiBXaXN0aWEoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICd3aXN0aWEnO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gW107XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybCxcbiAgICAgIGVtYmVkanNvbnA6IHRoaXMuY3JlYXRlRW1iZWRKc29ucFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbycsXG4gICAgICBFTUJFRFZJREVPOiAnZW1iZWR2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5wYXJzZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Oig/Om1lZGlhc3xpZnJhbWUpXFwvfHd2aWRlbz0pKFtcXHctXSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5wYXJzZUNoYW5uZWwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzooPzpodHRwcz86KT9cXC9cXC8pPyhbXi5dKilcXC53aXN0aWFcXC4vKTtcbiAgICB2YXIgY2hhbm5lbCA9IG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY2hhbm5lbCA9PT0gJ2Zhc3QnIHx8IGNoYW5uZWwgPT09ICdjb250ZW50Jykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbDtcbiAgfTtcblxuICBXaXN0aWEucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMsIHJlc3VsdCkge1xuICAgIGlmIChwYXJhbXMud3RpbWUpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNChwYXJhbXMud3RpbWUpO1xuICAgICAgZGVsZXRlIHBhcmFtcy53dGltZTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnd2aWRlbyA9PT0gcmVzdWx0LmlkKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnd2aWRlbztcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUucGFyc2VNZWRpYVR5cGUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdC5pZCAmJiByZXN1bHQuY2hhbm5lbCkge1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5WSURFTztcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5pZCkge1xuICAgICAgZGVsZXRlIHJlc3VsdC5jaGFubmVsO1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5FTUJFRFZJREVPO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBXaXN0aWEucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIGlkOiB0aGlzLnBhcnNlVXJsKHVybCksXG4gICAgICBjaGFubmVsOiB0aGlzLnBhcnNlQ2hhbm5lbCh1cmwpXG4gICAgfTtcbiAgICByZXN1bHQucGFyYW1zID0gdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zLCByZXN1bHQpO1xuICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLnBhcnNlTWVkaWFUeXBlKHJlc3VsdCk7XG5cbiAgICBpZiAoIXJlc3VsdC5pZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMsIHVybCkge1xuICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIHBhcmFtcy53dGltZSA9IHBhcmFtcy5zdGFydDtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNihwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly8nICsgdmkuY2hhbm5lbCArICcud2lzdGlhLmNvbS9tZWRpYXMvJyArIHZpLmlkO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCh2aSwgcGFyYW1zLCB1cmwpO1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgISh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5WSURFTyB8fCB2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5FTUJFRFZJREVPKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vZmFzdC53aXN0aWEuY29tL2VtYmVkL2lmcmFtZS8nICsgdmkuaWQ7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKHZpLCBwYXJhbXMsIHVybCk7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5jcmVhdGVFbWJlZEpzb25wVXJsID0gZnVuY3Rpb24gKHZpKSB7XG4gICAgaWYgKCF2aS5pZCB8fCAhKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPIHx8IHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkVNQkVEVklERU8pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiAnaHR0cHM6Ly9mYXN0Lndpc3RpYS5jb20vZW1iZWQvbWVkaWFzLycgKyB2aS5pZCArICcuanNvbnAnO1xuICB9O1xuXG4gIGJhc2UuYmluZChuZXcgV2lzdGlhKCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDcgPSB1dGlsLmNvbWJpbmVQYXJhbXM7XG5cbiAgZnVuY3Rpb24gWW91a3UoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICd5b3VrdSc7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIGVtYmVkOiB0aGlzLmNyZWF0ZUVtYmVkVXJsLFxuICAgICAgXCJsb25nXCI6IHRoaXMuY3JlYXRlTG9uZ1VybCxcbiAgICAgIGZsYXNoOiB0aGlzLmNyZWF0ZUZsYXNoVXJsLFxuICAgICAgXCJzdGF0aWNcIjogdGhpcy5jcmVhdGVTdGF0aWNVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nXG4gICAgfTtcbiAgfVxuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Oig/OmVtYmVkfHNpZClcXC98dl9zaG93XFwvaWRffFZpZGVvSURTPSkoW2EtekEtWjAtOV0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZVBhcmFtZXRlcnMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5WaWRlb0lEUykge1xuICAgICAgZGVsZXRlIHBhcmFtcy5WaWRlb0lEUztcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuVklERU8sXG4gICAgICBpZDogX3RoaXMucGFyc2VVcmwodXJsKSxcbiAgICAgIHBhcmFtczogX3RoaXMucGFyc2VQYXJhbWV0ZXJzKHBhcmFtcylcbiAgICB9O1xuXG4gICAgaWYgKCFyZXN1bHQuaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBZb3VrdS5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKGJhc2VVcmwsIHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNyhwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgWW91a3UucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHA6Ly9wbGF5ZXIueW91a3UuY29tL2VtYmVkLycsIHZpLCBwYXJhbXMpO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHA6Ly92LnlvdWt1LmNvbS92X3Nob3cvaWRfJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgWW91a3UucHJvdG90eXBlLmNyZWF0ZVN0YXRpY1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwOi8vc3RhdGljLnlvdWt1LmNvbS92MS4wLjA2Mzgvdi9zd2YvbG9hZGVyLnN3Zj9WaWRlb0lEUz0nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBZb3VrdS5wcm90b3R5cGUuY3JlYXRlRmxhc2hVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwOi8vcGxheWVyLnlvdWt1LmNvbS9wbGF5ZXIucGhwL3NpZC8nICsgdmkuaWQgKyAnL3Yuc3dmJztcbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ3KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFlvdWt1KCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDggPSB1dGlsLmNvbWJpbmVQYXJhbXMsXG4gICAgICBnZXRUaW1lJDUgPSB1dGlsLmdldFRpbWU7XG5cbiAgZnVuY3Rpb24gWW91VHViZSgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3lvdXR1YmUnO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gWyd5b3V0dScsICd5dGltZyddO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcInNob3J0XCI6IHRoaXMuY3JlYXRlU2hvcnRVcmwsXG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmwsXG4gICAgICBzaG9ydEltYWdlOiB0aGlzLmNyZWF0ZVNob3J0SW1hZ2VVcmwsXG4gICAgICBsb25nSW1hZ2U6IHRoaXMuY3JlYXRlTG9uZ0ltYWdlVXJsXG4gICAgfTtcbiAgICB0aGlzLmltYWdlUXVhbGl0aWVzID0ge1xuICAgICAgJzAnOiAnMCcsXG4gICAgICAnMSc6ICcxJyxcbiAgICAgICcyJzogJzInLFxuICAgICAgJzMnOiAnMycsXG4gICAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG4gICAgICBIUURFRkFVTFQ6ICdocWRlZmF1bHQnLFxuICAgICAgU0RERUZBVUxUOiAnc2RkZWZhdWx0JyxcbiAgICAgIE1RREVGQVVMVDogJ21xZGVmYXVsdCcsXG4gICAgICBNQVhSRVNERUZBVUxUOiAnbWF4cmVzZGVmYXVsdCdcbiAgICB9O1xuICAgIHRoaXMuZGVmYXVsdEltYWdlUXVhbGl0eSA9IHRoaXMuaW1hZ2VRdWFsaXRpZXMuSFFERUZBVUxUO1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nLFxuICAgICAgUExBWUxJU1Q6ICdwbGF5bGlzdCcsXG4gICAgICBTSEFSRTogJ3NoYXJlJyxcbiAgICAgIENIQU5ORUw6ICdjaGFubmVsJ1xuICAgIH07XG4gIH1cblxuICBZb3VUdWJlLnByb3RvdHlwZS5wYXJzZVZpZGVvVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaCgvKD86KD86dnx2aXxiZXx2aWRlb3N8ZW1iZWQpXFwvKD8hdmlkZW9zZXJpZXMpfCg/OnZ8Y2kpPSkoW1xcdy1dezExfSkvaSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUucGFyc2VDaGFubmVsVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIC8vIE1hdGNoIGFuIG9wYXF1ZSBjaGFubmVsIElEXG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC9cXC9jaGFubmVsXFwvKFtcXHctXSspLyk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBtYXRjaFsxXSxcbiAgICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTFxuICAgICAgfTtcbiAgICB9IC8vIE1hdGNoIGEgdmFuaXR5IGNoYW5uZWwgbmFtZSBvciBhIHVzZXIgbmFtZS4gVXNlciB1cmxzIGFyZSBkZXByZWNhdGVkIGFuZFxuICAgIC8vIGN1cnJlbnRseSByZWRpcmVjdCB0byB0aGUgY2hhbm5lbCBvZiB0aGF0IHNhbWUgbmFtZS5cblxuXG4gICAgbWF0Y2ggPSB1cmwubWF0Y2goL1xcLyg/OmN8dXNlcilcXC8oW1xcdy1dKykvKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbWF0Y2hbMV0sXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLkNIQU5ORUxcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMsIHJlc3VsdCkge1xuICAgIGlmIChwYXJhbXMuc3RhcnQgfHwgcGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNShwYXJhbXMuc3RhcnQgfHwgcGFyYW1zLnQpO1xuICAgICAgZGVsZXRlIHBhcmFtcy50O1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMudiA9PT0gcmVzdWx0LmlkKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnY7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5saXN0ID09PSByZXN1bHQuaWQpIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMubGlzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLnBhcnNlTWVkaWFUeXBlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQucGFyYW1zLmxpc3QpIHtcbiAgICAgIHJlc3VsdC5saXN0ID0gcmVzdWx0LnBhcmFtcy5saXN0O1xuICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMubGlzdDtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmlkICYmICFyZXN1bHQucGFyYW1zLmNpKSB7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlZJREVPO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0Lmxpc3QpIHtcbiAgICAgIGRlbGV0ZSByZXN1bHQuaWQ7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnBhcmFtcy5jaSkge1xuICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMuY2k7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlNIQVJFO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgY2hhbm5lbFJlc3VsdCA9IHRoaXMucGFyc2VDaGFubmVsVXJsKHVybCk7XG5cbiAgICBpZiAoY2hhbm5lbFJlc3VsdCkge1xuICAgICAgcmV0dXJuIGNoYW5uZWxSZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBpZDogdGhpcy5wYXJzZVZpZGVvVXJsKHVybClcbiAgICAgIH07XG4gICAgICByZXN1bHQucGFyYW1zID0gdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zLCByZXN1bHQpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZU1lZGlhVHlwZShyZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlU2hvcnRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwczovL3lvdXR1LmJlLycgKyB2aS5pZDtcblxuICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIHVybCArPSAnI3Q9JyArIHBhcmFtcy5zdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLmNyZWF0ZUxvbmdVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHZhciB1cmwgPSAnJztcbiAgICB2YXIgc3RhcnRUaW1lID0gcGFyYW1zLnN0YXJ0O1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTCkge1xuICAgICAgaWYgKHZpLmlkKSB7XG4gICAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vY2hhbm5lbC8nICsgdmkuaWQ7XG4gICAgICB9IGVsc2UgaWYgKHZpLm5hbWUpIHtcbiAgICAgICAgdXJsICs9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9jLycgKyB2aS5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUICYmIHZpLmxpc3QpIHtcbiAgICAgIHBhcmFtcy5mZWF0dXJlID0gJ3NoYXJlJztcbiAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vcGxheWxpc3QnO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gJiYgdmkuaWQpIHtcbiAgICAgIHBhcmFtcy52ID0gdmkuaWQ7XG4gICAgICB1cmwgKz0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoJztcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlNIQVJFICYmIHZpLmlkKSB7XG4gICAgICBwYXJhbXMuY2kgPSB2aS5pZDtcbiAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vc2hhcmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodmkubGlzdCkge1xuICAgICAgcGFyYW1zLmxpc3QgPSB2aS5saXN0O1xuICAgIH1cblxuICAgIHVybCArPSBjb21iaW5lUGFyYW1zJDgocGFyYW1zKTtcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgIT09IHRoaXMubWVkaWFUeXBlcy5QTEFZTElTVCAmJiBzdGFydFRpbWUpIHtcbiAgICAgIHVybCArPSAnI3Q9JyArIHN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkJztcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5QTEFZTElTVCAmJiB2aS5saXN0KSB7XG4gICAgICBwYXJhbXMubGlzdFR5cGUgPSAncGxheWxpc3QnO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gJiYgdmkuaWQpIHtcbiAgICAgIHVybCArPSAnLycgKyB2aS5pZDsgLy9sb29wIGhhY2tcblxuICAgICAgaWYgKHBhcmFtcy5sb29wID09PSAnMScpIHtcbiAgICAgICAgcGFyYW1zLnBsYXlsaXN0ID0gdmkuaWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHZpLmxpc3QpIHtcbiAgICAgIHBhcmFtcy5saXN0ID0gdmkubGlzdDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ4KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBZb3VUdWJlLnByb3RvdHlwZS5jcmVhdGVJbWFnZVVybCA9IGZ1bmN0aW9uIChiYXNlVXJsLCB2aSwgcGFyYW1zKSB7XG4gICAgaWYgKCF2aS5pZCB8fCB2aS5tZWRpYVR5cGUgIT09IHRoaXMubWVkaWFUeXBlcy5WSURFTykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZpLmlkICsgJy8nO1xuICAgIHZhciBxdWFsaXR5ID0gcGFyYW1zLmltYWdlUXVhbGl0eSB8fCB0aGlzLmRlZmF1bHRJbWFnZVF1YWxpdHk7XG4gICAgcmV0dXJuIHVybCArIHF1YWxpdHkgKyAnLmpwZyc7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlU2hvcnRJbWFnZVVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW1hZ2VVcmwoJ2h0dHBzOi8vaS55dGltZy5jb20vdmkvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlTG9uZ0ltYWdlVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbWFnZVVybCgnaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBZb3VUdWJlKCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDkgPSB1dGlsLmNvbWJpbmVQYXJhbXMsXG4gICAgICBnZXRUaW1lJDYgPSB1dGlsLmdldFRpbWU7XG5cbiAgZnVuY3Rpb24gU291bmRDbG91ZCgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3NvdW5kY2xvdWQnO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFRSQUNLOiAndHJhY2snLFxuICAgICAgUExBWUxJU1Q6ICdwbGF5bGlzdCcsXG4gICAgICBBUElUUkFDSzogJ2FwaXRyYWNrJyxcbiAgICAgIEFQSVBMQVlMSVNUOiAnYXBpcGxheWxpc3QnXG4gICAgfTtcbiAgfVxuXG4gIFNvdW5kQ2xvdWQucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0KSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzptXFwuKT9zb3VuZGNsb3VkXFwuY29tXFwvKD86KFtcXHctXSspXFwvKHNldHNcXC8pPykoW1xcdy1dKykvaSk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5jaGFubmVsID0gbWF0Y2hbMV07XG5cbiAgICBpZiAobWF0Y2hbMV0gPT09ICdwbGF5bGlzdHMnIHx8IG1hdGNoWzJdKSB7XG4gICAgICAvL3BsYXlsaXN0XG4gICAgICByZXN1bHQubGlzdCA9IG1hdGNoWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3RyYWNrXG4gICAgICByZXN1bHQuaWQgPSBtYXRjaFszXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFNvdW5kQ2xvdWQucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNihwYXJhbXMudCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBTb3VuZENsb3VkLnByb3RvdHlwZS5wYXJzZU1lZGlhVHlwZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0LmlkKSB7XG4gICAgICBpZiAocmVzdWx0LmNoYW5uZWwgPT09ICd0cmFja3MnKSB7XG4gICAgICAgIGRlbGV0ZSByZXN1bHQuY2hhbm5lbDtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMudXJsO1xuICAgICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLkFQSVRSQUNLO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0Lm1lZGlhVHlwZSA9IHRoaXMubWVkaWFUeXBlcy5UUkFDSztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0Lmxpc3QpIHtcbiAgICAgIGlmIChyZXN1bHQuY2hhbm5lbCA9PT0gJ3BsYXlsaXN0cycpIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5jaGFubmVsO1xuICAgICAgICBkZWxldGUgcmVzdWx0LnBhcmFtcy51cmw7XG4gICAgICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLm1lZGlhVHlwZXMuQVBJUExBWUxJU1Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0ID0gdGhpcy5wYXJzZVVybCh1cmwsIHJlc3VsdCk7XG4gICAgcmVzdWx0LnBhcmFtcyA9IHRoaXMucGFyc2VQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gICAgcmVzdWx0ID0gdGhpcy5wYXJzZU1lZGlhVHlwZShyZXN1bHQpO1xuXG4gICAgaWYgKCFyZXN1bHQuaWQgJiYgIXJlc3VsdC5saXN0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgdmFyIHVybCA9ICcnO1xuICAgIHZhciBzdGFydFRpbWUgPSBwYXJhbXMuc3RhcnQ7XG4gICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5UUkFDSyAmJiB2aS5pZCAmJiB2aS5jaGFubmVsKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS8nICsgdmkuY2hhbm5lbCArICcvJyArIHZpLmlkO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuUExBWUxJU1QgJiYgdmkubGlzdCAmJiB2aS5jaGFubmVsKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS8nICsgdmkuY2hhbm5lbCArICcvc2V0cy8nICsgdmkubGlzdDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkFQSVRSQUNLICYmIHZpLmlkKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzLycgKyB2aS5pZDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkFQSVBMQVlMSVNUICYmIHZpLmxpc3QpIHtcbiAgICAgIHVybCA9ICdodHRwczovL2FwaS5zb3VuZGNsb3VkLmNvbS9wbGF5bGlzdHMvJyArIHZpLmxpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkOShwYXJhbXMpO1xuXG4gICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgdXJsICs9ICcjdD0nICsgc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8nO1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVBJVFJBQ0sgJiYgdmkuaWQpIHtcbiAgICAgIHBhcmFtcy51cmwgPSAnaHR0cHMlM0EvL2FwaS5zb3VuZGNsb3VkLmNvbS90cmFja3MvJyArIHZpLmlkO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVBJUExBWUxJU1QgJiYgdmkubGlzdCkge1xuICAgICAgcGFyYW1zLnVybCA9ICdodHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3BsYXlsaXN0cy8nICsgdmkubGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ5KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFNvdW5kQ2xvdWQoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkYSA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBUZWFjaGVyVHViZSgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3RlYWNoZXJ0dWJlJztcbiAgICB0aGlzLmFsdGVybmF0aXZlcyA9IFtdO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nLFxuICAgICAgQVVESU86ICdhdWRpbycsXG4gICAgICBET0NVTUVOVDogJ2RvY3VtZW50JyxcbiAgICAgIENIQU5ORUw6ICdjaGFubmVsJyxcbiAgICAgIENPTExFQ1RJT046ICdjb2xsZWN0aW9uJyxcbiAgICAgIEdST1VQOiAnZ3JvdXAnXG4gICAgfTtcbiAgfVxuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQubGlzdCA9IHRoaXMucGFyc2VQbGF5bGlzdChwYXJhbXMpO1xuICAgIHJlc3VsdC5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC9cXC8oYXVkaW98dmlkZW98ZG9jdW1lbnR8dXNlclxcL2NoYW5uZWx8Y29sbGVjdGlvbnxncm91cClcXC8oPzpbXFx3LV0rLSk/KFxcdyspLyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLnBhcnNlTWVkaWFUeXBlKG1hdGNoWzFdKTtcbiAgICByZXN1bHQuaWQgPSBtYXRjaFsyXTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5wYXJzZVBsYXlsaXN0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXNbJ3BsYXlsaXN0LWlkJ10pIHtcbiAgICAgIHZhciBsaXN0ID0gcGFyYW1zWydwbGF5bGlzdC1pZCddO1xuICAgICAgZGVsZXRlIHBhcmFtc1sncGxheWxpc3QtaWQnXTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVGVhY2hlclR1YmUucHJvdG90eXBlLnBhcnNlTWVkaWFUeXBlID0gZnVuY3Rpb24gKG1lZGlhVHlwZU1hdGNoKSB7XG4gICAgc3dpdGNoIChtZWRpYVR5cGVNYXRjaCkge1xuICAgICAgY2FzZSAnYXVkaW8nOlxuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVR5cGVzLkFVRElPO1xuXG4gICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhVHlwZXMuVklERU87XG5cbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5ET0NVTUVOVDtcblxuICAgICAgY2FzZSAndXNlci9jaGFubmVsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5DSEFOTkVMO1xuXG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5DT0xMRUNUSU9OO1xuXG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhVHlwZXMuR1JPVVA7XG4gICAgfVxuICB9O1xuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cudGVhY2hlcnR1YmUuY29tLyc7XG5cbiAgICBpZiAodmkubGlzdCkge1xuICAgICAgcGFyYW1zWydwbGF5bGlzdC1pZCddID0gdmkubGlzdDtcbiAgICB9XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTCkge1xuICAgICAgdXJsICs9ICd1c2VyL2NoYW5uZWwvJztcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsICs9IHZpLm1lZGlhVHlwZSArICcvJztcbiAgICB9XG5cbiAgICB1cmwgKz0gdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkYShwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgVGVhY2hlclR1YmUucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cudGVhY2hlcnR1YmUuY29tL2VtYmVkLyc7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gfHwgdmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVVESU8pIHtcbiAgICAgIHVybCArPSB2aS5tZWRpYVR5cGUgKyAnLycgKyB2aS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyRhKHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFRlYWNoZXJUdWJlKCkpO1xuXG4gIHZhciBsaWIgPSBiYXNlO1xuXG4gIHJldHVybiBsaWI7XG5cbn0pKSk7XG4iXSwic291cmNlUm9vdCI6IiJ9