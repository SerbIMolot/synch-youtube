/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Scripts/util.js":
/*!*************************!*\
  !*** ./Scripts/util.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_video_url_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-video-url-parser */ "./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js");
/* harmony import */ var js_video_url_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_video_url_parser__WEBPACK_IMPORTED_MODULE_0__);
﻿


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

/***/ }),

/***/ "./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js":
/*!*******************************************************************!*\
  !*** ./node_modules/js-video-url-parser/dist/jsVideoUrlParser.js ***!
  \*******************************************************************/
/***/ (function(module) {

(function (global, factory) {
   true ? module.exports = factory() :
  0;
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

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./Scripts/util.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zeW5jaHR1YmUvLi9TY3JpcHRzL3V0aWwuanMiLCJ3ZWJwYWNrOi8vc3luY2h0dWJlLy4vbm9kZV9tb2R1bGVzL2pzLXZpZGVvLXVybC1wYXJzZXIvZGlzdC9qc1ZpZGVvVXJsUGFyc2VyLmpzIiwid2VicGFjazovL3N5bmNodHViZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zeW5jaHR1YmUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc3luY2h0dWJlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zeW5jaHR1YmUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zeW5jaHR1YmUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zeW5jaHR1YmUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQzRDOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxDQUFDOztBQUVEOztBQUVBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLGtFQUFrRTs7QUFFbEcsQ0FBQzs7QUFFRDtBQUNBOztBQUVBLHVEQUF1RDtBQUN2RCw0QkFBNEI7QUFDNUIsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxFQUFFO0FBQ0YsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUEsR0FBRztBQUNIOztBQUVBOztBQUVBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLElBQUk7O0FBRUosR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEM7Ozs7Ozs7Ozs7QUNua0JBO0FBQ0EsRUFBRSxLQUE0RDtBQUM5RCxFQUFFLENBQ3VEO0FBQ3pELENBQUMscUJBQXFCOztBQUV0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBVSxpQkFBaUI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBLElBQUk7OztBQUdKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjs7QUFFbEI7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsc0JBQXNCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlFQUF5RSxrQkFBa0I7QUFDM0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0RBQW9EOztBQUVwRDtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5RkFBeUYsR0FBRztBQUM1RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTCx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7O1VDOXdDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsi77u/XHJcbmltcG9ydCB1cmxQYXJzZXIgZnJvbSBcImpzLXZpZGVvLXVybC1wYXJzZXJcIjtcclxuXHJcbmZ1bmN0aW9uIGNoZWNrRXJyUmVzcG9uc2UoeGhyKSB7XHJcblx0bGV0IGVyciA9IGV2YWwoXCIoXCIgKyB4aHIucmVzcG9uc2VUZXh0ICsgXCIpXCIpO1xyXG5cdGxldCBtc2cgPSAnJztcclxuXHRpZiAoeGhyLnN0YXR1cyA9PT0gMCkge1xyXG5cdFx0bXNnID0gJ05vdCBjb25uZWN0LlxcbiBWZXJpZnkgTmV0d29yay4nO1xyXG5cdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDQwNCkge1xyXG5cdFx0bXNnID0gJ1JlcXVlc3RlZCBwYWdlIG5vdCBmb3VuZC4gWzQwNF0nO1xyXG5cdH0gZWxzZSBpZiAoanFYSFIuc3RhdHVzID09IDUwMCkge1xyXG5cdFx0bXNnID0gJ0ludGVybmFsIFNlcnZlciBFcnJvciBbNTAwXS4nO1xyXG5cdH0gZWxzZSBpZiAoZXhjZXB0aW9uID09PSAncGFyc2VyZXJyb3InKSB7XHJcblx0XHRtc2cgPSAnUmVxdWVzdGVkIEpTT04gcGFyc2UgZmFpbGVkLic7XHJcblx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICd0aW1lb3V0Jykge1xyXG5cdFx0bXNnID0gJ1RpbWUgb3V0IGVycm9yLic7XHJcblx0fSBlbHNlIGlmIChleGNlcHRpb24gPT09ICdhYm9ydCcpIHtcclxuXHRcdG1zZyA9ICdBamF4IHJlcXVlc3QgYWJvcnRlZC4nO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRtc2cgPSAnVW5jYXVnaHQgRXJyb3IuJztcclxuXHR9XHJcblx0YWxlcnQobXNnICsgXCJcXG5SZXNwb25jZSB0ZXh0OiBcIiArIGVyci5NZXNzYWdlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0UGFyYW1zKHVybCkge1xyXG5cdGxldCBwYXJhbXMgPSB7fTtcclxuXHRsZXQgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdHBhcnNlci5ocmVmID0gdXJsO1xyXG5cdGxldCBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdGxldCBsZXRzID0gcXVlcnkuc3BsaXQoJyYnKTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGxldHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdGxldCBwYWlyID0gbGV0c1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0cGFyYW1zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5cclxubGV0IGxpbmsgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnLycpO1xyXG5sZXQgc2l0ZUxvY2F0aW9uO1xyXG5sZXQgY3VycmVudFJvb21OYW1lO1xyXG5jb25zdCBwcmV2aWV3VmlkZW9zID0gW107XHJcblxyXG5pZiAobGlua1s1XSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0Y3VycmVudFJvb21OYW1lID0gbGlua1s1XTtcclxuXHRsZXQgdmlydERpciA9IGxpbmtbM107XHJcblx0c2l0ZUxvY2F0aW9uID0gJ2h0dHBzOi8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgJy8nICsgdmlydERpcjtcclxuXHJcbn1cclxuZWxzZSB7XHJcblx0Y3VycmVudFJvb21OYW1lID0gbGlua1s0XTtcclxuXHRzaXRlTG9jYXRpb24gPSAnaHR0cHM6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3Q7XHJcbn1cclxuZnVuY3Rpb24gbG9hZENoYXRzVmlldygpIHtcclxuXHQkLmFqYXgoe1xyXG5cdFx0dXJsOiBzaXRlTG9jYXRpb24gKyAnL1Jvb20vVXBkYXRlR3JpZD9yb29tTmFtZT0nICsgcm9vbU5hbWUsXHJcblx0XHR0eXBlOiAncG9zdCcsXHJcblx0XHRjYWNoZTogZmFsc2UsXHJcblx0XHRhc3luYzogdHJ1ZSxcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0KTtcclxuXHRcdFx0JCgnI3BhcnRpYWxDaGF0cycpLmh0bWwocmVzdWx0KTtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG5cdFx0XHRjaGVja0VyclJlc3BvbnNlKHhocik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbiQoJ2JvZHknKS5vbignY2xpY2snLCAnLmNyZWF0ZUJ0bicsIGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgbXNnID0gJCgnI2NyZWF0ZVRleHQnKS52YWwoKTtcclxuXHRpZiAobXNnLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cclxuXHRcdCQoJyNjcmVhdGVUZXh0JykudmFsKCcnKTtcclxuXHJcblx0fVxyXG59KTtcclxuXHJcbiQoXCIjd3JpdGVfbGlua1wiKS5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcblx0bGV0ICRpdGVtID0gJCh0aGlzKTtcclxuXHRsZXQgaW5wdXQgPSAkaXRlbS52YWwoKTtcclxuXHRpZiAoaW5wdXQuaW5jbHVkZXMoXCJ5b3V0dWJlXCIpICYmIChpbnB1dC5pbmNsdWRlcyhcIndhdGNoXCIpIHx8IGlucHV0LmluY2x1ZGVzKFwibGlzdFwiKSkpIHtcclxuXHRcdCQoXCIjcHJldmlld19wbGF5bGlzdFwiKS5lbXB0eSgpO1xyXG5cdFx0cHJldmlld1ZpZGVvcy5sZW5ndGggPSAwO1xyXG5cdFx0bGV0IGxpbmtQYXJhbXMgPSBnZXRQYXJhbXMoaW5wdXQpO1xyXG5cdFx0bGV0IHBsYXlsaXN0VmlkcztcclxuXHRcdGxldCB1cmwgPSBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2xpc3RfYWpheD9zdHlsZT1qc29uJmFjdGlvbl9nZXRfbGlzdD0xJmxpc3Q9XCIgKyBsaW5rUGFyYW1zLmxpc3QgKyBcIiZpbmRleD1cIiArIDAgKyBcIiZobD1lblwiO1xyXG5cclxuXHRcdCQuY29ubmVjdGlvbi5ncm91cEh1YnMuc2VydmVyLmdldFZpZGVvc0Zyb21MaW5rKGlucHV0KTtcclxuXHJcblx0fSBlbHNlIHtcclxuXHRcdCQoXCIjcHJldmlld19wbGF5bGlzdFwiKS5lbXB0eSgpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbGVtZW50c19jb3VudFwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0cHJldmlld1ZpZGVvcy5sZW5ndGggPSAwO1xyXG5cclxuXHR9XHJcbn0pO1xyXG5cclxuJCgnYm9keScpLm9uKCdjbGljaycsICcubGlua19zZW5kX2J0bicsIGZ1bmN0aW9uICgpIHtcclxuXHRsZXQgbXNnID0gJCgnI3dyaXRlX2xpbmsnKS52YWwoKTtcclxuXHRpZiAobXNnLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRjb25zb2xlLmxvZyhtc2cpO1xyXG5cdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuY2hhbmdlVmlkZW9Tb3VyY2UoY3VycmVudFJvb21OYW1lLCBtc2cpLmRvbmUoZnVuY3Rpb24gKHZpZGVvcykge1xyXG5cdFx0XHQvLyBhbGVydChcIkFkZGVkXCIpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH1cclxufSk7XHJcblxyXG4kKCdib2R5Jykub24oJ2NsaWNrJywgJy55dHAtc3VnZ2VzdGlvbi1saW5rJywgZnVuY3Rpb24gKCkge1xyXG5cclxufSk7XHJcbiQoJyN2aWQxJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG59KTtcclxuJCgnLnl0cC1zdWdnZXN0aW9uLWltYWdlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG59KTtcclxuJCgnLnl0cC1zdWdnZXN0aW9uLW92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbn0pO1xyXG5mdW5jdGlvbiBwbGF5bGlzdEJ1dHRvblByZXNzKCkge1xyXG5cdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9PSAnMHB4JyB8fCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9PSAnJykge1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlsaXN0LXVpJykuc3R5bGUud2lkdGggPSAnMjAlJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdF9zbGlkZScpLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzIwJSc7XHJcblx0fVxyXG5cdGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLndpZHRoID09ICcyMCUnKSB7XHJcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKS5zdHlsZS53aWR0aCA9ICcwJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdC11aScpLnN0eWxlLmhlaWdodCA9ICcwJztcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdF9zbGlkZScpLnN0eWxlLm1hcmdpblJpZ2h0ID0gJzAlJztcclxuXHR9XHJcbn1cclxuXHJcbihmdW5jdGlvbiAoJCwgc3IpIHtcclxuXHRsZXQgZGVib3VuY2UgPSBmdW5jdGlvbiAoZnVuYywgdGhyZXNob2xkLCBleGVjQXNhcCkge1xyXG5cdFx0bGV0IHRpbWVvdXQ7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcclxuXHRcdFx0bGV0IG9iaiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcblx0XHRcdGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XHJcblx0XHRcdFx0aWYgKCFleGVjQXNhcClcclxuXHRcdFx0XHRcdGZ1bmMuYXBwbHkob2JqLCBhcmdzKTtcclxuXHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHRpbWVvdXQpXHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG5cdFx0XHRlbHNlIGlmIChleGVjQXNhcClcclxuXHRcdFx0XHRmdW5jLmFwcGx5KG9iaiwgYXJncyk7XHJcblxyXG5cdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB0aHJlc2hvbGQgfHwgMTAwKTtcclxuXHRcdH07XHJcblx0fTtcclxuXHQvLyBzbWFydHJlc2l6ZSBcclxuXHRqUXVlcnkuZm5bc3JdID0gZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbiA/IHRoaXMuYmluZCgncmVzaXplJywgZGVib3VuY2UoZm4pKSA6IHRoaXMudHJpZ2dlcihzcik7IH07XHJcblxyXG59KShqUXVlcnksICdzbWFydHJlc2l6ZScpO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvbnVubG9hZFwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdGxldCBjb25maXJtYXRpb25NZXNzYWdlID0gXCJcXG8vXCI7XHJcblxyXG5cdChlIHx8IHdpbmRvdy5ldmVudCkucmV0dXJuVmFsdWUgPSBjb25maXJtYXRpb25NZXNzYWdlOyAvL0dlY2tvICsgSUVcclxuXHRyZXR1cm4gY29uZmlybWF0aW9uTWVzc2FnZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9XZWJraXQsIFNhZmFyaSwgQ2hyb21lXHJcbn0pO1xyXG4kKGRvY3VtZW50KS5vbignb251bmxvYWQnLCBmdW5jdGlvbiAoKSB7XHJcblx0JC5hamF4KHtcclxuXHRcdHVybDogXCIvQWNjb3VudC9Mb2dPZmZcIixcclxuXHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdH0sXHJcblx0XHRlcnJvcjogZnVuY3Rpb24gKHhociwgc3RhdHVzLCBlcnJvcikge1xyXG5cdFx0XHRjaGVja0VyclJlc3BvbnNlKHhocik7XHJcblx0XHR9XHJcblx0XHRcclxuXHR9KTtcclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uIGxvZ0RhdGEoKSB7XHJcblx0bmF2aWdhdG9yLnNlbmRCZWFjb24oXCIvQWNjb3VudC9Mb2dPZmZcIiwgbnVsbCk7XHJcbn0pO1xyXG4kKGRvY3VtZW50KS5vbignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xyXG5cdCQuYWpheCh7XHJcblx0XHR1cmw6IFwiL0FjY291bnQvTG9nT2ZmXCIsXHJcblx0XHRzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHR9LFxyXG5cdFx0ZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHN0YXR1cywgZXJyb3IpIHtcclxuXHRcdFx0Y2hlY2tFcnJSZXNwb25zZSh4aHIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KTtcclxuZnVuY3Rpb24gYWRkVG9QbGF5bGlzdCh2aWRlb0FycmF5KSB7XHJcblx0dmlkZW9wbC5wbGF5bGlzdChBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh2aWRlb3BsLnBsYXlsaXN0KCksIHZpZGVvQXJyYXkpKTtcclxufVxyXG5pZiAoY3VycmVudFJvb21OYW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHJcblx0bGV0IHZpZGVvcGwgPSB2aWRlb2pzKCd2aWQxJyk7XHJcblxyXG5cdGxldCBzZXJ2ZXJDdXJyZW50VGltZUNhbGwgPSAwO1xyXG5cclxuXHR2aWRlb3BsLm9uKCdwbGF5aW5nJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuZ3JvdXBQbGF5KGN1cnJlbnRSb29tTmFtZSk7XHJcblx0fSk7XHJcblx0dmlkZW9wbC5vbigncGF1c2UnLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRjb25zb2xlLmxvZygnVEVTVFNFTVQ6IE9TRU1UOiBPTVNFVCcpO1xyXG5cdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuZ3JvdXBQYXVzZShjdXJyZW50Um9vbU5hbWUpO1xyXG5cdH0pO1xyXG5cdHZpZGVvcGwub24oJ2NhbnBsYXknLCAoZXZlbnQpID0+IHtcclxuXHR9KTtcclxuXHJcblxyXG5cdHZpZGVvcGwub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb29tX25hbWVcIikuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0fSk7XHJcblx0dmlkZW9wbC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vbV9uYW1lXCIpLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdH0pO1xyXG5cdGxldCBteU1pZGRsZXdhcmUgPSBmdW5jdGlvbiAodmlkZW9wbCkge1xyXG5cdFx0bGV0IHRlY2g7XHJcblx0XHRsZXQgcHJldkN1cnJlbnRUaW1lO1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHNldFNvdXJjZTogZnVuY3Rpb24gKHNyY09iaiwgbmV4dCkge1xyXG5cdFx0XHRcdG5leHQobnVsbCwgc3JjT2JqKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y3VycmVudFRpbWU6IGZ1bmN0aW9uIChjdCkge1xyXG5cdFx0XHRcdHByZXZDdXJyZW50VGltZSA9IGN0O1xyXG5cdFx0XHRcdHJldHVybiBjdDtcclxuXHRcdFx0fSxcclxuXHRcdFx0c2V0Q3VycmVudFRpbWU6IGZ1bmN0aW9uICh0aW1lKSB7XHJcblx0XHRcdFx0aWYgKHNlcnZlckN1cnJlbnRUaW1lQ2FsbCA9PSAwKSB7XHJcblx0XHRcdFx0XHQkLmNvbm5lY3Rpb24uZ3JvdXBIdWJzLnNlcnZlci50aW1lVXBkYXRlKGN1cnJlbnRSb29tTmFtZSwgdGltZSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aW1lKTtcclxuXHRcdFx0XHRcdHByZXZDdXJyZW50VGltZSA9IHRpbWU7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGltZTtcclxuXHRcdFx0XHR9IGVsc2UgaWYgKHNlcnZlckN1cnJlbnRUaW1lQ2FsbCA9PSAxKSB7XHJcblx0XHRcdFx0XHRwcmV2Q3VycmVudFRpbWUgPSB0aW1lO1xyXG5cdFx0XHRcdFx0c2VydmVyQ3VycmVudFRpbWVDYWxsID0gMDtcclxuXHRcdFx0XHRcdHJldHVybiB0aW1lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdC8vIFJlcXVpcmVkIGZvciBtaWRkbGV3YXJlLiBTaW1wbHkgcGFzc2VzIGFsb25nIHRoZSBzb3VyY2VcclxuXHRcdFx0bG9hZGVkZGF0YTogZnVuY3Rpb24gKHRpbWUpIHtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHR2aWRlb2pzLnVzZSgnKicsIG15TWlkZGxld2FyZSk7XHJcblx0dmlkZW9wbC5wbGF5bGlzdChbXSk7XHJcblx0dmlkZW9wbC5wbGF5bGlzdFVpKHtcclxuXHRcdGVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtdWknKVxyXG5cdH0pO1xyXG5cclxuXHRmdW5jdGlvbiBub3RpZnlVc2VyT2ZUcnlpbmdUb1JlY29ubmVjdCgpIHtcclxuXHR9XHJcblx0ZnVuY3Rpb24gbm90aWZ5VXNlck9mQ29ubmVjdGlvblByb2JsZW0oKSB7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIG5vdGlmeVVzZXJPZkRpc2Nvbm5lY3QoKSB7XHJcblx0fVxyXG5cdGZ1bmN0aW9uIGFkZEVsZW1lbnRQcmV2aWV3KHZpZGVvc0pzb24pIHtcclxuXHRcdGxldCB2aWRlb3MgPSBKU09OLnBhcnNlKHZpZGVvc0pzb24pO1xyXG5cdFx0bGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aWV3X3BsYXlsaXN0XCIpO1xyXG5cdFx0dmlkZW9zLmZvckVhY2godmlkZW8gPT4ge1xyXG5cdFx0XHRsZXQgbmV3X3ZpZGVvID1cclxuXHRcdFx0XHQkKGA8bGkgY2xhc3M9XCJwbGF5bGlzdF9pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlb19ibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBpY3R1cmUgY2xhc3M9XCJ2aWRlb190aHVtYm5haWxcIj5gK1xyXG5cdFx0XHRcdFx0YDxzb3VyY2Ugc3Jjc2V0PVwiYCArIHZpZGVvLnRodW1ibmFpbFswXS5zcmNzZXQgKyBgXCIgdHlwZT1cImAgKyB2aWRlby50aHVtYm5haWxbMF0udHlwZSArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGFsdD1cIlwiIHNyYz1cImAgKyB2aWRlby50aHVtYm5haWxbMV0uc3JjICsgYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9waWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aW1lX2RhdGVcIiBpZD1cIm1zZ190aW1lXCI+YCArIHZpZGVvLmR1cmF0aW9uICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5gKS5hZGRDbGFzcygncGxheWxpc3RfaXRlbScpO1xyXG5cdFx0XHRuZXdfdmlkZW8uYXBwZW5kVG8oJyNwcmV2aWV3X3BsYXlsaXN0Jyk7XHJcblx0XHR9KTtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWxlbWVudHNfY291bnRcIikuaW5uZXJIVE1MID0gJCgnI3ByZXZpZXdfcGxheWxpc3QgbGknKS5sZW5ndGg7XHJcblx0fVxyXG5cdCQoZnVuY3Rpb24gKCkge1xyXG5cdFx0bGV0IHJvb21WaWRlb0lkcztcclxuXHRcdGxldCBjaGF0ID0gJC5jb25uZWN0aW9uLmdyb3VwSHVicztcclxuXHRcdGxldCB0cnlpbmdUb1JlY29ubmVjdCA9IGZhbHNlO1xyXG5cdFx0bGV0IGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdGxldCBpc0NoYW5nZUl0ZW0gPSBmYWxzZTtcclxuXHRcdCQuY29ubmVjdGlvbi5odWIucmVjb25uZWN0ZWQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0cnlpbmdUb1JlY29ubmVjdCA9IGZhbHNlO1xyXG5cdFx0fSk7XHJcblx0XHQkLmNvbm5lY3Rpb24uaHViLnJlY29ubmVjdGluZyhmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRyeWluZ1RvUmVjb25uZWN0ID0gdHJ1ZTtcclxuXHRcdFx0bm90aWZ5VXNlck9mVHJ5aW5nVG9SZWNvbm5lY3QoKTtcclxuXHRcdH0pO1xyXG5cdFx0JC5jb25uZWN0aW9uLmh1Yi5jb25uZWN0aW9uU2xvdyhmdW5jdGlvbiAoKSB7XHJcblx0XHRcdG5vdGlmeVVzZXJPZkNvbm5lY3Rpb25Qcm9ibGVtKCk7XHJcblx0XHR9KTtcclxuXHRcdCQuY29ubmVjdGlvbi5odWIuZGlzY29ubmVjdGVkKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRyeWluZ1RvUmVjb25uZWN0KSB7XHJcblx0XHRcdFx0bm90aWZ5VXNlck9mRGlzY29ubmVjdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGNoYXQuY2xpZW50LnNldFRpbWUgPSBmdW5jdGlvbiAodGltZSkge1xyXG5cdFx0XHR2aWRlby5jdXJyZW50VGltZSh0aW1lKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5ncm91cFBsYXkgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZpZGVvcGwucGxheSgpO1xyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50Lmdyb3VwUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZpZGVvcGwucGF1c2UoKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC50aW1lVXBkYXRlID0gZnVuY3Rpb24gKHRpbWUpIHtcclxuXHRcdFx0c2VydmVyQ3VycmVudFRpbWVDYWxsID0gMTtcclxuXHRcdFx0dmlkZW9wbC5jdXJyZW50VGltZSh0aW1lKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5hZGRWaWRlb1RvUGxheWxpc3QgPSBmdW5jdGlvbiAodmlkZW9Kc29uKSB7XHJcblx0XHRcdGxldCB2aWRlbyA9IEpTT04ucGFyc2UodmlkZW9Kc29uKTtcclxuXHRcdFx0bGV0IGN1cnJlbnRQbGF5bGlzdCA9IHZpZGVvcGwucGxheWxpc3QoKTtcclxuXHRcdFx0Y3VycmVudFBsYXlsaXN0LnB1c2godmlkZW8pO1xyXG5cdFx0XHR2aWRlb3BsLnBsYXlsaXN0KGN1cnJlbnRQbGF5bGlzdCk7XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuYWRkVmlkZW9BcnJheVRvUGxheWxpc3QgPSBmdW5jdGlvbiAodmlkZW9BcnJheUpzb24pIHtcclxuXHRcdFx0bGV0IHZpZGVvQXJyYXkgPSBKU09OLnBhcnNlKHZpZGVvQXJyYXlKc29uKTtcclxuXHRcdFx0bGV0IGN1cnJlbnRQbGF5bGlzdCA9IHZpZGVvcGwucGxheWxpc3QoKTtcclxuXHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoY3VycmVudFBsYXlsaXN0LCB2aWRlb0FycmF5KTtcclxuXHRcdFx0dmlkZW9wbC5wbGF5bGlzdChjdXJyZW50UGxheWxpc3QpO1xyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50LmZvcmNlVGltZVVwZGF0ZVNlcnZlciA9IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdCQuY29ubmVjdGlvbi5ncm91cEh1YnMuc2VydmVyLnVwZGF0ZVJvb21UaW1lKGN1cnJlbnRSb29tTmFtZSwgdmlkZW9wbC5jdXJyZW50VGltZSgpKTtcclxuXHRcdH07XHJcblx0XHRsZXQgdGltZVRvU2V0ID0gMC4wO1xyXG5cdFx0bGV0IHNldFBsYXlsaXN0SW5kZXhUaW1lU2V0ID0gZmFsc2U7XHJcblx0XHRjaGF0LmNsaWVudC5zZXRQbGF5bGlzdEluZGV4VGltZSA9IGZ1bmN0aW9uIChpbmRleCwgdGltZSkge1xyXG5cdFx0XHRpZiAoaW5kZXggIT0gdmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SW5kZXgoKSkge1xyXG5cdFx0XHRcdGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgPSB0cnVlO1xyXG5cdFx0XHRcdHZpZGVvcGwucGxheWxpc3QuY3VycmVudEl0ZW0oaW5kZXgpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiNDQyXCIgKyBpc1NlcnZlckNoYW5nZVBsYXlsaXN0KTtcclxuXHRcdFx0XHRzZXRQbGF5bGlzdEluZGV4VGltZVNldCA9IHRydWU7XHJcblx0XHRcdFx0dGltZVRvU2V0ID0gdGltZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRzZXRQbGF5bGlzdEluZGV4VGltZVNldCA9IHRydWU7XHJcblx0XHRcdFx0dGltZVRvU2V0ID0gdGltZTtcclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQucHJldmlld1ZpZGVvRnJvbUxpbmsgPSBmdW5jdGlvbiAodmlkZW9zKSB7XHJcblx0XHRcdGlmIChpbmRleCAhPSB2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJbmRleCgpKSB7XHJcblx0XHRcdFx0aXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCA9IHRydWU7XHJcblx0XHRcdFx0dmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SXRlbShpbmRleCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCI0NDJcIiArIGlzU2VydmVyQ2hhbmdlUGxheWxpc3QpO1xyXG5cdFx0XHRcdHNldFBsYXlsaXN0SW5kZXhUaW1lU2V0ID0gdHJ1ZTtcclxuXHRcdFx0XHR0aW1lVG9TZXQgPSB0aW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHNldFBsYXlsaXN0SW5kZXhUaW1lU2V0ID0gdHJ1ZTtcclxuXHRcdFx0XHR0aW1lVG9TZXQgPSB0aW1lO1xyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0JCgnI3ByZXZpZXdfcGxheWxpc3QnKS5vbignY2xpY2snLCAnLnBsYXlsaXN0X2l0ZW0nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGxldCBpbmRleCA9IHBhcnNlSW50KHRoaXMuaWQucmVwbGFjZSgvW15cXGQuXS9nLCAnJykpO1xyXG5cdFx0XHRsZXQgdmlkZW9Kc29uID0gcHJldmlld1ZpZGVvc1tpbmRleF07XHJcblx0XHRcdGNoYXQuc2VydmVyLmFkZFZpZGVvVG9Sb29tKGN1cnJlbnRSb29tTmFtZSwgdmlkZW9Kc29uKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdGNoYXQuY2xpZW50LnByZXZpZXdMb2FkZWRWaWRlb3MgPSBmdW5jdGlvbiAodmlkZW9zSnNvbiwgaXNTYW1lUGxheWxpc3QpIHtcclxuXHJcblx0XHRcdGxldCB2aWRlb3MgPSBKU09OLnBhcnNlKHZpZGVvc0pzb24pO1xyXG5cclxuXHRcdFx0bGV0IHBsYXlsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aWV3X3BsYXlsaXN0XCIpO1xyXG5cdFx0XHRsZXQgaWQgPSAwO1xyXG5cdFx0XHR2aWRlb3MuZm9yRWFjaCh2aWRlbyA9PiB7XHJcblx0XHRcdFx0cHJldmlld1ZpZGVvcy5wdXNoKEpTT04uc3RyaW5naWZ5KHZpZGVvKSk7XHJcblx0XHRcdFx0bGV0IHZpZGVvSiA9IEpTT04uc3RyaW5naWZ5KHZpZGVvKTtcclxuXHRcdFx0XHRsZXQgbmV3X3ZpZGVvID1cclxuXHRcdFx0XHRcdCQoYDxsaSBjbGFzcz1cInBsYXlsaXN0X2l0ZW1cIiAgaWQ9XCJwcmV2aWV3X3ZpZGVvX2AgKyBpZCArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInZpZGVvX2RhdGFfYCArIGlkICsgYFwiIHZhbHVlPVwiYCArIHZpZGVvSiArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9fYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBpY3R1cmUgY2xhc3M9XCJ2aWRlb190aHVtYm5haWxcIj5gK1xyXG5cdFx0XHRcdFx0XHRgPHNvdXJjZSBzcmNzZXQ9XCJgICsgdmlkZW8udGh1bWJuYWlsWzBdLnNyY3NldCArIGBcIiB0eXBlPVwiYCArIHZpZGVvLnRodW1ibmFpbFswXS50eXBlICsgYFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBhbHQ9XCJcIiBzcmM9XCJgICsgdmlkZW8udGh1bWJuYWlsWzFdLnNyYyArIGBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9waWN0dXJlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpbWVfZGF0ZVwiIGlkPVwibXNnX3RpbWVcIj5gICsgdmlkZW8uZHVyYXRpb24gKyBgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9saT5gKS5hZGRDbGFzcygncGxheWxpc3RfaXRlbScpO1xyXG5cdFx0XHRcdG5ld192aWRlby5hcHBlbmRUbygnI3ByZXZpZXdfcGxheWxpc3QnKTtcclxuXHRcdFx0XHRpZCsrO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbGVtZW50c19jb3VudFwiKS5pbm5lckhUTUwgPSAkKCcjcHJldmlld19wbGF5bGlzdCBsaScpLmxlbmd0aDtcclxuXHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuY2hhbmdlVmlkZW9Tb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlKSB7XHJcblx0XHRcdGxldCB2aWQgPSBKU09OLnBhcnNlKHNvdXJjZSk7XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhzb3VyY2UpO1xyXG5cclxuXHRcdFx0aXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCA9IHRydWU7XHJcblxyXG5cdFx0XHR2aWRlb3BsLnNyYyh2aWRbMF0uc3JjKTtcclxuXHRcdFx0dmlkZW9wbC5wbGF5bGlzdCh2aWQpO1xyXG5cdFx0XHR2aWRlb3BsLnBsYXlsaXN0LmF1dG9hZHZhbmNlKDEpO1xyXG5cdFx0XHR2aWRlb3BsLnBsYXlsaXN0LnJlcGVhdChmYWxzZSk7XHJcblxyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50LmFkZE1lc3NhZ2UgPSBmdW5jdGlvbiAobmFtZSwgbWVzc2FnZSwgcm9vbU5hbWUsIHRpbWUpIHtcclxuXHRcdFx0aWYgKHJvb21OYW1lID09IGN1cnJlbnRSb29tTmFtZSkge1xyXG5cclxuXHRcdFx0XHRsZXQgbmV3X21lc3NhZ2UgPVxyXG5cdFx0XHRcdFx0JChgPGxpIGNsYXNzPVwiaW5jb21pbmdfbXNnXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmVjZWl2ZWRfbXNnXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJlY2VpdmVkX21zZyBzZW5kZXJfbmFtZVwiPmAgKyBuYW1lICsgYDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyZWNlaXZlZF93aXRoZF9tc2dcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+YCArXHJcblx0XHRcdFx0XHRcdG1lc3NhZ2UgK1xyXG5cdFx0XHRcdFx0XHRgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCIgaWQ9XCJtc2dfdGltZVwiPmAgKyB0aW1lICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPmApLmFkZENsYXNzKCdpbmNvbWluZ19tc2cnKTtcclxuXHRcdFx0XHRuZXdfbWVzc2FnZS5hcHBlbmRUbygnI21zZ19oaXN0b3J5Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bG9hZENoYXRzVmlldygpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0Y2hhdC5jbGllbnQuYWRkQ2FsbGVyTWVzc2FnZSA9IGZ1bmN0aW9uIChuYW1lLCBtZXNzYWdlLCB0aW1lKSB7XHJcblxyXG5cdFx0XHQkKCcjbXNnX2hpc3RvcnknKS5hcHBlbmQoYDxsaSBjbGFzcz1cIm91dGdvaW5nX21zZ1wiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZW50X21zZ1wiPlxyXG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm91dGdvaW5nX21zZyBzZW5kZXJfbmFtZVwiPlxyXG5cdFx0XHRcdFx0XHQ8cD5gICtcclxuXHRcdFx0XHRuYW1lICtcclxuXHRcdFx0XHRgPC9wPlxyXG5cdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwicmVjZWl2ZWRfd2l0aGRfbXNnXCI+XHJcblx0XHRcdFx0XHRcdDxwPmAgK1xyXG5cdFx0XHRcdG1lc3NhZ2UgK1xyXG5cdFx0XHRcdGA8L3A+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwidGltZV9kYXRlXCI+YCArIHRpbWUgKyBgPC9zcGFuPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2xpPmApO1xyXG5cdFx0XHR1cGRhdGVTY3JvbGwoKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Y2hhdC5jbGllbnQub25Db25uZWN0ZWQgPSBmdW5jdGlvbiAoaWQsIHVzZXJOYW1lKSB7XHJcblxyXG5cclxuXHRcdFx0JCgnI2NoYXRCb2R5Jykuc2hvdygpO1xyXG5cclxuXHRcdFx0JCgnI2hkSWQnKS52YWwoaWQpO1xyXG5cdFx0XHQkKCcjdXNlcm5hbWUnKS52YWwodXNlck5hbWUpO1xyXG5cdFx0XHRpZiAoY3VycmVudFJvb21OYW1lICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRjaGF0LnNlcnZlci51cGRhdGVQbGF5bGlzdChjdXJyZW50Um9vbU5hbWUpO1xyXG5cdFx0XHRcdHVwZGF0ZVNjcm9sbCgpO1xyXG5cdFx0XHRcdGNoYXQuc2VydmVyLmpvaW5Sb29tKGN1cnJlbnRSb29tTmFtZSk7XHJcblx0XHRcdFx0Y2hhdC5zZXJ2ZXIucmVxdWVzdFRpbWVTeW5jaChjdXJyZW50Um9vbU5hbWUsIHVzZXJOYW1lKTtcclxuXHRcdFx0XHRjaGF0LnNlcnZlci51cGRhdGVVc2Vyc0luUm9vbShjdXJyZW50Um9vbU5hbWUpO1xyXG5cdFx0XHRcdCQoJyNoZWFkZXInKS5odG1sKCc8aDM+0JTQvtCx0YDQviDQv9C+0LbQsNC70L7QstCw0YLRjCwgJyArIHVzZXJOYW1lICsgJzwvaDM+Jyk7XHJcblx0XHRcdH1cclxuXHRcdFx0Y29uc29sZS5sb2codXNlck5hbWUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZyh1c2VyTmFtZSk7XHJcblxyXG5cclxuXHRcdH07XHJcblx0XHRmdW5jdGlvbiB1cGRhdGVTY3JvbGwoKSB7XHJcblx0XHRcdGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtc2dfaGlzdG9yeVwiKTtcclxuXHRcdFx0ZWxlbWVudC5zY3JvbGxUb3AgPSBlbGVtZW50LnNjcm9sbEhlaWdodDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Y2hhdC5jbGllbnQub25OZXdVc2VyQ29ubmVjdGVkID0gZnVuY3Rpb24gKGlkLCBuYW1lKSB7XHJcblxyXG5cdFx0XHRBZGRVc2VyKGlkLCBuYW1lKTtcclxuXHRcdH07XHJcblx0XHRjaGF0LmNsaWVudC5zeW5jaFdpdGggPSBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0XHRjaGF0LnNlcnZlci5zZXRUaW1lRm9yT3RoZXJDbGllbnQobmFtZSwgdmlkZW9wbC5jdXJyZW50VGltZSgpLCB2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJbmRleCgpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0Y2hhdC5jbGllbnQub25Vc2VyRGlzY29ubmVjdGVkID0gZnVuY3Rpb24gKHVzZXJOYW1lKSB7XHJcblx0XHRcdGlmIChjdXJyZW50Um9vbUFubWluLnVzZXJOYW1lID09IHVzZXJOYW1lKSB7XHJcblx0XHRcdFx0Y2hhdC5ncm91cEh1YnMuc2VydmVyLnN3aXRjaEFkbWluRm9yUm9vbShjdXJyZW50Um9vbU5hbWUsIHVzZXJOYW1lKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRjaGF0LmNsaWVudC51cGRhdGVVc2Vyc0luUm9vbSA9IGZ1bmN0aW9uIChyb29tSnNvbikge1xyXG5cdFx0XHRsZXQgcm9vbSA9IEpTT04ucGFyc2Uocm9vbUpzb24pO1xyXG5cclxuXHRcdFx0bGV0IG5ld1VzZXJMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyLWxpc3RcIik7XHJcblx0XHRcdG5ld1VzZXJMaXN0LmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRcdHJvb20uVXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcclxuXHRcdFx0XHRsZXQgbmV3VXNlckxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHRcdFx0XHRpZiAocm9vbS5BZG1pbi5Vc2VyTmFtZSA9PT0gdXNlci5Vc2VyTmFtZSkge1xyXG5cclxuXHRcdFx0XHRcdG5ld1VzZXJMaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1c2VyLlVzZXJOYW1lICsgXCJBZG1pblwiKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdG5ld1VzZXJMaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1c2VyLlVzZXJOYW1lKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdG5ld1VzZXJMaXN0LmFwcGVuZENoaWxkKG5ld1VzZXJMaSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fTtcclxuXHRcdGNoYXQuY2xpZW50LmNoYW5nZVBsYXlsaXN0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0XHRpZiAoaWQgIT0gdmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SW5kZXgoKSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiNDQyXCIgKyBpc1NlcnZlckNoYW5nZVBsYXlsaXN0KTtcclxuXHRcdFx0XHRpc1NlcnZlckNoYW5nZVBsYXlsaXN0ID0gdHJ1ZTtcclxuXHRcdFx0XHR2aWRlb3BsLnBsYXlsaXN0LmN1cnJlbnRJdGVtKGlkKTtcclxuXHRcdFx0XHR2aWRlb3BsLmN1cnJlbnRUaW1lKDAuMCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cdFx0dmlkZW9wbC5vbihcInBsYXlsaXN0aXRlbVwiLCBmdW5jdGlvbiAoaWQsIGpkKSB7XHJcblxyXG5cdFx0XHRpZiAoIWlzU2VydmVyQ2hhbmdlUGxheWxpc3QgJiYgamQucGxheWxpc3RJdGVtSWRfICE9IHZpZGVvcGwucGxheWxpc3QuY3VycmVudEluZGV4KCkpIHtcclxuXHJcblx0XHRcdFx0JC5jb25uZWN0aW9uLmdyb3VwSHVicy5zZXJ2ZXIuY2hhbmdlUGxheWxpc3RJdGVtKGN1cnJlbnRSb29tTmFtZSwgdmlkZW9wbC5wbGF5bGlzdC5jdXJyZW50SW5kZXgoKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCkge1xyXG5cdFx0XHRcdGlzU2VydmVyQ2hhbmdlUGxheWxpc3QgPSBmYWxzZTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIjQ1OFwiICsgaXNTZXJ2ZXJDaGFuZ2VQbGF5bGlzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0dmlkZW9wbC5vbihcInNvdXJjZXNldFwiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmxvZyhcInNvdXJjZXNldFwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdHZpZGVvcGwub24oXCJsb2Fkc3RhcnRcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoc2V0UGxheWxpc3RJbmRleFRpbWVTZXQpIHtcclxuXHRcdFx0XHR2aWRlb3BsLmN1cnJlbnRUaW1lKHRpbWVUb1NldCk7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJsb2Fkc3RhcnRcIik7XHJcblx0XHRcdFx0c2V0UGxheWxpc3RJbmRleFRpbWVTZXQgPSBmYWxzZTtcclxuXHRcdFx0XHR2aWRlb3BsLnBsYXkoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cdFx0dmlkZW9wbC5vbihcImxvYWRlZG1ldGFkYXRhXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKFwibG9hZGVkbWV0YWRhdGFcIik7XHJcblxyXG5cdFx0fSk7XHJcblx0XHR2aWRlb3BsLm9uKFwicmVhZHlcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0Y29uc29sZS5sb2coXCJyZWFkeVwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdHZpZGVvcGwub24oXCJjYW5wbGF5XCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKFwiY2FucGxheVwiKTtcclxuXHJcblx0XHR9KTtcclxuXHRcdCQuY29ubmVjdGlvbi5odWIuc3RhcnQoKS5kb25lKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJodWIgaXMgcmVhZHlcIik7XHJcblxyXG5cdFx0XHQkKCdib2R5Jykub24oJ2NsaWNrJywgJy5tc2dfc2VuZF9idG4nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0bGV0IG1zZyA9ICQoJyN3cml0ZV9tc2cnKS52YWwoKTtcclxuXHRcdFx0XHRpZiAobXNnLmxlbmd0aCAhPSAwKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhjdXJyZW50Um9vbU5hbWUpO1xyXG5cdFx0XHRcdFx0Y2hhdC5zZXJ2ZXIuc2VuZEdyb3VwTWVzc2FnZShjdXJyZW50Um9vbU5hbWUsIG1zZyk7XHJcblx0XHRcdFx0XHQkKCcjd3JpdGVfbXNnJykudmFsKCcnKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHJcblx0XHR9KS5mYWlsKGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZSk7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufVxyXG5mdW5jdGlvbiBodG1sRW5jb2RlKHZhbHVlKSB7XHJcblx0bGV0IGVuY29kZWRWYWx1ZSA9ICQoJzxkaXYgLz4nKS50ZXh0KHZhbHVlKS5odG1sKCk7XHJcblx0cmV0dXJuIGVuY29kZWRWYWx1ZTtcclxufVxyXG5mdW5jdGlvbiBBZGRVc2VyKGlkLCBuYW1lKSB7XHJcblxyXG5cdGxldCB1c2VySWQgPSAkKCcjaGRJZCcpLnZhbCgpO1xyXG5cclxuXHRpZiAodXNlcklkICE9IGlkKSB7XHJcblxyXG5cdFx0JChcIiNjaGF0dXNlcnNcIikuYXBwZW5kKCc8cCBpZD1cIicgKyBpZCArICdcIj48Yj4nICsgbmFtZSArICc8L2I+PC9wPicpO1xyXG5cdH1cclxufSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbCA9IGdsb2JhbCB8fCBzZWxmLCBnbG9iYWwudXJsUGFyc2VyID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7XG4gICAgICBfdHlwZW9mID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIF90eXBlb2YgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3R5cGVvZihvYmopO1xuICB9XG5cbiAgdmFyIGdldFF1ZXJ5UGFyYW1zID0gZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbXMocXMpIHtcbiAgICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cblxuICAgIHFzID0gcXMuc3BsaXQoJysnKS5qb2luKCcgJyk7XG4gICAgdmFyIHBhcmFtcyA9IHt9O1xuICAgIHZhciBtYXRjaCA9IHFzLm1hdGNoKC8oPzpbP10oPzpbXj1dKyk9KD86W14mI10qKSg/OlsmXSg/OltePV0rKT0oPzpbXiYjXSopKSooPzpbI10uKik/KXwoPzpbI10uKikvKTtcbiAgICB2YXIgc3BsaXQ7XG5cbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICBzcGxpdCA9IG1hdGNoWzBdLnN1YnN0cigxKS5zcGxpdCgvWyYjPV0vKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BsaXQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIHBhcmFtc1tkZWNvZGVVUklDb21wb25lbnQoc3BsaXRbaV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChzcGxpdFtpICsgMV0gfHwgJycpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMgPSBmdW5jdGlvbiBjb21iaW5lUGFyYW1zKHBhcmFtcywgaGFzUGFyYW1zKSB7XG4gICAgaWYgKF90eXBlb2YocGFyYW1zKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgY29tYmluZWQgPSAnJztcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwYXJhbXMpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSAvL2Fsd2F5cyBoYXZlIHBhcmFtZXRlcnMgaW4gdGhlIHNhbWUgb3JkZXJcblxuXG4gICAga2V5cy5zb3J0KCk7XG5cbiAgICBpZiAoIWhhc1BhcmFtcykge1xuICAgICAgY29tYmluZWQgKz0gJz8nICsga2V5c1swXSArICc9JyArIHBhcmFtc1trZXlzWzBdXTtcbiAgICAgIGkgKz0gMTtcbiAgICB9XG5cbiAgICBmb3IgKDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbWJpbmVkICs9ICcmJyArIGtleXNbaV0gKyAnPScgKyBwYXJhbXNba2V5c1tpXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkO1xuICB9OyAvL3BhcnNlcyBzdHJpbmdzIGxpa2UgMWgzMG0yMHMgdG8gc2Vjb25kc1xuXG5cbiAgZnVuY3Rpb24gZ2V0TGV0dGVyVGltZSh0aW1lU3RyaW5nKSB7XG4gICAgdmFyIHRvdGFsU2Vjb25kcyA9IDA7XG4gICAgdmFyIHRpbWVWYWx1ZXMgPSB7XG4gICAgICAncyc6IDEsXG4gICAgICAnbSc6IDEgKiA2MCxcbiAgICAgICdoJzogMSAqIDYwICogNjAsXG4gICAgICAnZCc6IDEgKiA2MCAqIDYwICogMjQsXG4gICAgICAndyc6IDEgKiA2MCAqIDYwICogMjQgKiA3XG4gICAgfTtcbiAgICB2YXIgdGltZVBhaXJzOyAvL2V4cGFuZCB0byBcIjEgaCAzMCBtIDIwIHNcIiBhbmQgc3BsaXRcblxuICAgIHRpbWVTdHJpbmcgPSB0aW1lU3RyaW5nLnJlcGxhY2UoLyhbc21oZHddKS9nLCAnICQxICcpLnRyaW0oKTtcbiAgICB0aW1lUGFpcnMgPSB0aW1lU3RyaW5nLnNwbGl0KCcgJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVQYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgdG90YWxTZWNvbmRzICs9IHBhcnNlSW50KHRpbWVQYWlyc1tpXSwgMTApICogdGltZVZhbHVlc1t0aW1lUGFpcnNbaSArIDFdIHx8ICdzJ107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdGFsU2Vjb25kcztcbiAgfSAvL3BhcnNlcyBzdHJpbmdzIGxpa2UgMTozMDoyMCB0byBzZWNvbmRzXG5cblxuICBmdW5jdGlvbiBnZXRDb2xvblRpbWUodGltZVN0cmluZykge1xuICAgIHZhciB0b3RhbFNlY29uZHMgPSAwO1xuICAgIHZhciB0aW1lVmFsdWVzID0gWzEsIDEgKiA2MCwgMSAqIDYwICogNjAsIDEgKiA2MCAqIDYwICogMjQsIDEgKiA2MCAqIDYwICogMjQgKiA3XTtcbiAgICB2YXIgdGltZVBhaXJzID0gdGltZVN0cmluZy5zcGxpdCgnOicpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aW1lUGFpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsU2Vjb25kcyArPSBwYXJzZUludCh0aW1lUGFpcnNbaV0sIDEwKSAqIHRpbWVWYWx1ZXNbdGltZVBhaXJzLmxlbmd0aCAtIGkgLSAxXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG90YWxTZWNvbmRzO1xuICB9XG5cbiAgdmFyIGdldFRpbWUgPSBmdW5jdGlvbiBnZXRUaW1lKHRpbWVTdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHRpbWVTdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBpZiAodGltZVN0cmluZy5tYXRjaCgvXihcXGQrW3NtaGR3XT8pKyQvKSkge1xuICAgICAgcmV0dXJuIGdldExldHRlclRpbWUodGltZVN0cmluZyk7XG4gICAgfVxuXG4gICAgaWYgKHRpbWVTdHJpbmcubWF0Y2goL14oXFxkKzo/KSskLykpIHtcbiAgICAgIHJldHVybiBnZXRDb2xvblRpbWUodGltZVN0cmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIDA7XG4gIH07XG5cbiAgdmFyIHV0aWwgPSB7XG4gICAgZ2V0UXVlcnlQYXJhbXM6IGdldFF1ZXJ5UGFyYW1zLFxuICAgIGNvbWJpbmVQYXJhbXM6IGNvbWJpbmVQYXJhbXMsXG4gICAgZ2V0VGltZTogZ2V0VGltZVxuICB9O1xuXG4gIHZhciBnZXRRdWVyeVBhcmFtcyQxID0gdXRpbC5nZXRRdWVyeVBhcmFtcztcblxuICBmdW5jdGlvbiBVcmxQYXJzZXIoKSB7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYXJyID0gWydwYXJzZVByb3ZpZGVyJywgJ3BhcnNlJywgJ2JpbmQnLCAnY3JlYXRlJ107IF9pIDwgX2Fyci5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBrZXkgPSBfYXJyW19pXTtcbiAgICAgIHRoaXNba2V5XSA9IHRoaXNba2V5XS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMucGx1Z2lucyA9IHt9O1xuICB9XG5cbiAgdmFyIHVybFBhcnNlciA9IFVybFBhcnNlcjtcblxuICBVcmxQYXJzZXIucHJvdG90eXBlLnBhcnNlUHJvdmlkZXIgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzooPzpodHRwcz86KT9cXC9cXC8pPyg/OlteLl0rXFwuKT8oXFx3KylcXC4vaSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVXJsUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICBpZiAodHlwZW9mIHVybCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHByb3ZpZGVyID0gdGhpcy5wYXJzZVByb3ZpZGVyKHVybCk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgcGx1Z2luID0gdGhpcy5wbHVnaW5zW3Byb3ZpZGVyXTtcblxuICAgIGlmICghcHJvdmlkZXIgfHwgIXBsdWdpbiB8fCAhcGx1Z2luLnBhcnNlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlc3VsdCA9IHBsdWdpbi5wYXJzZS5jYWxsKHBsdWdpbiwgdXJsLCBnZXRRdWVyeVBhcmFtcyQxKHVybCkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gcmVtb3ZlRW1wdHlQYXJhbWV0ZXJzKHJlc3VsdCk7XG4gICAgICByZXN1bHQucHJvdmlkZXIgPSBwbHVnaW4ucHJvdmlkZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBVcmxQYXJzZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zW3BsdWdpbi5wcm92aWRlcl0gPSBwbHVnaW47XG5cbiAgICBpZiAocGx1Z2luLmFsdGVybmF0aXZlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbHVnaW4uYWx0ZXJuYXRpdmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1twbHVnaW4uYWx0ZXJuYXRpdmVzW2ldXSA9IHBsdWdpbjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgVXJsUGFyc2VyLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAob3ApIHtcbiAgICBpZiAoX3R5cGVvZihvcCkgIT09ICdvYmplY3QnIHx8IF90eXBlb2Yob3AudmlkZW9JbmZvKSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHZpID0gb3AudmlkZW9JbmZvO1xuICAgIHZhciBwYXJhbXMgPSBvcC5wYXJhbXM7XG4gICAgdmFyIHBsdWdpbiA9IHRoaXMucGx1Z2luc1t2aS5wcm92aWRlcl07XG4gICAgcGFyYW1zID0gcGFyYW1zID09PSAnaW50ZXJuYWwnID8gdmkucGFyYW1zIDogcGFyYW1zIHx8IHt9O1xuXG4gICAgaWYgKHBsdWdpbikge1xuICAgICAgb3AuZm9ybWF0ID0gb3AuZm9ybWF0IHx8IHBsdWdpbi5kZWZhdWx0Rm9ybWF0OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5cbiAgICAgIGlmIChwbHVnaW4uZm9ybWF0cy5oYXNPd25Qcm9wZXJ0eShvcC5mb3JtYXQpKSB7XG4gICAgICAgIHJldHVybiBwbHVnaW4uZm9ybWF0c1tvcC5mb3JtYXRdLmFwcGx5KHBsdWdpbiwgW3ZpLCBPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICBmdW5jdGlvbiByZW1vdmVFbXB0eVBhcmFtZXRlcnMocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdC5wYXJhbXMgJiYgT2JqZWN0LmtleXMocmVzdWx0LnBhcmFtcykubGVuZ3RoID09PSAwKSB7XG4gICAgICBkZWxldGUgcmVzdWx0LnBhcmFtcztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIHBhcnNlciA9IG5ldyB1cmxQYXJzZXIoKTtcbiAgdmFyIGJhc2UgPSBwYXJzZXI7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMSA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBDYW5hbFBsdXMoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICdjYW5hbHBsdXMnO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdlbWJlZCc7XG4gICAgdGhpcy5mb3JtYXRzID0ge1xuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nXG4gICAgfTtcbiAgfVxuXG4gIENhbmFsUGx1cy5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIGRlbGV0ZSBwYXJhbXMudmlkO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgQ2FuYWxQbHVzLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuVklERU8sXG4gICAgICBpZDogcGFyYW1zLnZpZFxuICAgIH07XG4gICAgcmVzdWx0LnBhcmFtcyA9IF90aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpO1xuXG4gICAgaWYgKCFyZXN1bHQuaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBDYW5hbFBsdXMucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cDovL3BsYXllci5jYW5hbHBsdXMuZnIvZW1iZWQvJztcbiAgICBwYXJhbXMudmlkID0gdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkMShwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBDYW5hbFBsdXMoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMiA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBDb3ViKCkge1xuICAgIHRoaXMucHJvdmlkZXIgPSAnY291Yic7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgQ291Yi5wcm90b3R5cGUucGFyc2VVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzplbWJlZHx2aWV3KVxcLyhbYS16QS1aXFxkXSspL2kpO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIENvdWIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICBpZDogdGhpcy5wYXJzZVVybCh1cmwpXG4gICAgfTtcblxuICAgIGlmICghcmVzdWx0LmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKGJhc2VVcmwsIHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkMihwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2NvdWIuY29tL3ZpZXcvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgQ291Yi5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnLy9jb3ViLmNvbS9lbWJlZC8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IENvdWIoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkMyA9IHV0aWwuY29tYmluZVBhcmFtcyxcbiAgICAgIGdldFRpbWUkMSA9IHV0aWwuZ2V0VGltZTtcblxuICBmdW5jdGlvbiBEYWlseW1vdGlvbigpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ2RhaWx5bW90aW9uJztcbiAgICB0aGlzLmFsdGVybmF0aXZlcyA9IFsnZGFpJ107XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwic2hvcnRcIjogdGhpcy5jcmVhdGVTaG9ydFVybCxcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybCxcbiAgICAgIGltYWdlOiB0aGlzLmNyZWF0ZUltYWdlVXJsXG4gICAgfTtcbiAgICB0aGlzLm1lZGlhVHlwZXMgPSB7XG4gICAgICBWSURFTzogJ3ZpZGVvJ1xuICAgIH07XG4gIH1cblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLnBhcnNlVGltZShwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgcGFyYW1zLnN0YXJ0ID0gZ2V0VGltZSQxKHBhcmFtcy5zdGFydCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2VVcmwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzpcXC92aWRlb3xseSlcXC8oW0EtWmEtejAtOV0rKS9pKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6IHVuZGVmaW5lZDtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiBfdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zKSxcbiAgICAgIGlkOiBfdGhpcy5wYXJzZVVybCh1cmwpXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0LmlkID8gcmVzdWx0IDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVVcmwgPSBmdW5jdGlvbiAoYmFzZSwgdmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2UgKyB2aS5pZCArIGNvbWJpbmVQYXJhbXMkMyhwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVTaG9ydFVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2RhaS5seS8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwczovL2RhaWx5bW90aW9uLmNvbS92aWRlby8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBEYWlseW1vdGlvbi5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnaHR0cHM6Ly93d3cuZGFpbHltb3Rpb24uY29tL2VtYmVkL3ZpZGVvLycsIHZpLCBwYXJhbXMpO1xuICB9O1xuXG4gIERhaWx5bW90aW9uLnByb3RvdHlwZS5jcmVhdGVJbWFnZVVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHBzOi8vd3d3LmRhaWx5bW90aW9uLmNvbS90aHVtYm5haWwvdmlkZW8vJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBEYWlseW1vdGlvbigpKTtcblxuICB2YXIgY29tYmluZVBhcmFtcyQ0ID0gdXRpbC5jb21iaW5lUGFyYW1zLFxuICAgICAgZ2V0VGltZSQyID0gdXRpbC5nZXRUaW1lO1xuXG4gIGZ1bmN0aW9uIFR3aXRjaCgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3R3aXRjaCc7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbycsXG4gICAgICBTVFJFQU06ICdzdHJlYW0nLFxuICAgICAgQ0xJUDogJ2NsaXAnXG4gICAgfTtcbiAgfVxuXG4gIFR3aXRjaC5wcm90b3R5cGUuc2VwZXJhdGVJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiB7XG4gICAgICBwcmU6IGlkWzBdLFxuICAgICAgaWQ6IGlkLnN1YnN0cigxKVxuICAgIH07XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5wYXJzZUNoYW5uZWwgPSBmdW5jdGlvbiAocmVzdWx0LCBwYXJhbXMpIHtcbiAgICB2YXIgY2hhbm5lbCA9IHBhcmFtcy5jaGFubmVsIHx8IHBhcmFtcy51dG1fY29udGVudCB8fCByZXN1bHQuY2hhbm5lbDtcbiAgICBkZWxldGUgcGFyYW1zLnV0bV9jb250ZW50O1xuICAgIGRlbGV0ZSBwYXJhbXMuY2hhbm5lbDtcbiAgICByZXR1cm4gY2hhbm5lbDtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0LCBwYXJhbXMpIHtcbiAgICB2YXIgbWF0Y2g7XG4gICAgbWF0Y2ggPSB1cmwubWF0Y2goLyhjbGlwc1xcLik/dHdpdGNoXFwudHZcXC8oPzooPzp2aWRlb3NcXC8oXFxkKykpfChcXHcrKSg/OlxcL2NsaXBcXC8oXFx3KykpPykvaSk7XG5cbiAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMl0pIHtcbiAgICAgIC8vdmlkZW9cbiAgICAgIHJlc3VsdC5pZCA9ICd2JyArIG1hdGNoWzJdO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLnZpZGVvKSB7XG4gICAgICAvL3ZpZGVvIGVtYmVkXG4gICAgICByZXN1bHQuaWQgPSBwYXJhbXMudmlkZW87XG4gICAgICBkZWxldGUgcGFyYW1zLnZpZGVvO1xuICAgIH0gZWxzZSBpZiAocGFyYW1zLmNsaXApIHtcbiAgICAgIC8vY2xpcHMgZW1iZWRcbiAgICAgIHJlc3VsdC5pZCA9IHBhcmFtcy5jbGlwO1xuICAgICAgcmVzdWx0LmlzQ2xpcCA9IHRydWU7XG4gICAgICBkZWxldGUgcGFyYW1zLmNsaXA7XG4gICAgfSBlbHNlIGlmIChtYXRjaCAmJiBtYXRjaFsxXSAmJiBtYXRjaFszXSkge1xuICAgICAgLy9jbGlwcy50d2l0Y2gudHYvaWRcbiAgICAgIHJlc3VsdC5pZCA9IG1hdGNoWzNdO1xuICAgICAgcmVzdWx0LmlzQ2xpcCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChtYXRjaCAmJiBtYXRjaFszXSAmJiBtYXRjaFs0XSkge1xuICAgICAgLy90d2l0Y2gudHYvY2hhbm5lbC9jbGlwL2lkXG4gICAgICByZXN1bHQuY2hhbm5lbCA9IG1hdGNoWzNdO1xuICAgICAgcmVzdWx0LmlkID0gbWF0Y2hbNF07XG4gICAgICByZXN1bHQuaXNDbGlwID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKG1hdGNoICYmIG1hdGNoWzNdKSB7XG4gICAgICByZXN1bHQuY2hhbm5lbCA9IG1hdGNoWzNdO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5wYXJzZU1lZGlhVHlwZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgbWVkaWFUeXBlO1xuXG4gICAgaWYgKHJlc3VsdC5pZCkge1xuICAgICAgaWYgKHJlc3VsdC5pc0NsaXApIHtcbiAgICAgICAgbWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLkNMSVA7XG4gICAgICAgIGRlbGV0ZSByZXN1bHQuaXNDbGlwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlZJREVPO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocmVzdWx0LmNoYW5uZWwpIHtcbiAgICAgIG1lZGlhVHlwZSA9IHRoaXMubWVkaWFUeXBlcy5TVFJFQU07XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lZGlhVHlwZTtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkMihwYXJhbXMudCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQgPSBfdGhpcy5wYXJzZVVybCh1cmwsIHJlc3VsdCwgcGFyYW1zKTtcbiAgICByZXN1bHQuY2hhbm5lbCA9IF90aGlzLnBhcnNlQ2hhbm5lbChyZXN1bHQsIHBhcmFtcyk7XG4gICAgcmVzdWx0Lm1lZGlhVHlwZSA9IF90aGlzLnBhcnNlTWVkaWFUeXBlKHJlc3VsdCk7XG4gICAgcmVzdWx0LnBhcmFtcyA9IF90aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpO1xuICAgIHJldHVybiByZXN1bHQuY2hhbm5lbCB8fCByZXN1bHQuaWQgPyByZXN1bHQgOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVHdpdGNoLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJyc7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuU1RSRUFNICYmIHZpLmNoYW5uZWwpIHtcbiAgICAgIHVybCA9ICdodHRwczovL3R3aXRjaC50di8nICsgdmkuY2hhbm5lbDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPICYmIHZpLmlkKSB7XG4gICAgICB2YXIgc2VwID0gdGhpcy5zZXBlcmF0ZUlkKHZpLmlkKTtcbiAgICAgIHVybCA9ICdodHRwczovL3R3aXRjaC50di92aWRlb3MvJyArIHNlcC5pZDtcblxuICAgICAgaWYgKHBhcmFtcy5zdGFydCkge1xuICAgICAgICBwYXJhbXMudCA9IHBhcmFtcy5zdGFydCArICdzJztcbiAgICAgICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkNMSVAgJiYgdmkuaWQpIHtcbiAgICAgIGlmICh2aS5jaGFubmVsKSB7XG4gICAgICAgIHVybCA9ICdodHRwczovL3d3dy50d2l0Y2gudHYvJyArIHZpLmNoYW5uZWwgKyAnL2NsaXAvJyArIHZpLmlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsID0gJ2h0dHBzOi8vY2xpcHMudHdpdGNoLnR2LycgKyB2aS5pZDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ0KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBUd2l0Y2gucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vcGxheWVyLnR3aXRjaC50di8nO1xuXG4gICAgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlNUUkVBTSAmJiB2aS5jaGFubmVsKSB7XG4gICAgICBwYXJhbXMuY2hhbm5lbCA9IHZpLmNoYW5uZWw7XG4gICAgfSBlbHNlIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5WSURFTyAmJiB2aS5pZCkge1xuICAgICAgcGFyYW1zLnZpZGVvID0gdmkuaWQ7XG5cbiAgICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgICAgcGFyYW1zLnQgPSBwYXJhbXMuc3RhcnQgKyAncyc7XG4gICAgICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5DTElQICYmIHZpLmlkKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9jbGlwcy50d2l0Y2gudHYvZW1iZWQnO1xuICAgICAgcGFyYW1zLmNsaXAgPSB2aS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ0KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFR3aXRjaCgpKTtcblxuICB2YXIgY29tYmluZVBhcmFtcyQ1ID0gdXRpbC5jb21iaW5lUGFyYW1zLFxuICAgICAgZ2V0VGltZSQzID0gdXRpbC5nZXRUaW1lO1xuXG4gIGZ1bmN0aW9uIFZpbWVvKCkge1xuICAgIHRoaXMucHJvdmlkZXIgPSAndmltZW8nO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gWyd2aW1lb3BybycsICd2aW1lb2NkbiddO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmwsXG4gICAgICBpbWFnZTogdGhpcy5jcmVhdGVJbWFnZVVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgVmltZW8ucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0KSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8odmltZW8oPzpjZG58cHJvKT8pXFwuY29tXFwvKD86KD86Y2hhbm5lbHNcXC9bXFx3XSt8KD86KD86YWxidW1cXC9cXGQrfGdyb3Vwc1xcL1tcXHddK3xzdGFmZlxcL2ZyYW1lKVxcLyk/dmlkZW9zPylcXC8pPyhcXGQrKSg/Ol8oXFxkKykoPzp4KFxcZCspKT8pPyhcXC5cXHcrKT8vaSk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5pZCA9IG1hdGNoWzJdO1xuXG4gICAgaWYgKG1hdGNoWzFdID09PSAndmltZW9jZG4nKSB7XG4gICAgICBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgcmVzdWx0LmltYWdlV2lkdGggPSBwYXJzZUludChtYXRjaFszXSk7XG5cbiAgICAgICAgaWYgKG1hdGNoWzRdKSB7XG4gICAgICAgICAgLy9oZWlnaHQgY2FuIG9ubHkgYmUgc2V0IHdoZW4gd2lkdGggaXMgYWxzbyBzZXRcbiAgICAgICAgICByZXN1bHQuaW1hZ2VIZWlnaHQgPSBwYXJzZUludChtYXRjaFs0XSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmVzdWx0LmltYWdlRXh0ZW5zaW9uID0gbWF0Y2hbNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBWaW1lby5wcm90b3R5cGUucGFyc2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLnBhcnNlVGltZShwYXJhbXMpO1xuICB9O1xuXG4gIFZpbWVvLnByb3RvdHlwZS5wYXJzZVRpbWUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy50KSB7XG4gICAgICBwYXJhbXMuc3RhcnQgPSBnZXRUaW1lJDMocGFyYW1zLnQpO1xuICAgICAgZGVsZXRlIHBhcmFtcy50O1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLlZJREVPLFxuICAgICAgcGFyYW1zOiB0aGlzLnBhcnNlUGFyYW1ldGVycyhwYXJhbXMpXG4gICAgfTtcbiAgICByZXN1bHQgPSB0aGlzLnBhcnNlVXJsKHVybCwgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0LmlkID8gcmVzdWx0IDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIFZpbWVvLnByb3RvdHlwZS5jcmVhdGVVcmwgPSBmdW5jdGlvbiAoYmFzZVVybCwgdmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IGJhc2VVcmwgKyB2aS5pZDtcbiAgICB2YXIgc3RhcnRUaW1lID0gcGFyYW1zLnN0YXJ0O1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNShwYXJhbXMpO1xuXG4gICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgdXJsICs9ICcjdD0nICsgc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLmNyZWF0ZUxvbmdVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCgnaHR0cHM6Ly92aW1lby5jb20vJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgVmltZW8ucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJy8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBWaW1lby5wcm90b3R5cGUuY3JlYXRlSW1hZ2VVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwczovL2kudmltZW9jZG4uY29tL3ZpZGVvLycgKyB2aS5pZDtcblxuICAgIGlmICh2aS5pbWFnZVdpZHRoICYmIHZpLmltYWdlSGVpZ2h0KSB7XG4gICAgICB1cmwgKz0gJ18nICsgdmkuaW1hZ2VXaWR0aCArICd4JyArIHZpLmltYWdlSGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodmkuaW1hZ2VXaWR0aCkge1xuICAgICAgdXJsICs9ICdfJyArIHZpLmltYWdlV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHZpLmltYWdlRXh0ZW5zaW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZpLmltYWdlRXh0ZW5zaW9uID0gJy53ZWJwJztcbiAgICB9XG5cbiAgICB1cmwgKz0gdmkuaW1hZ2VFeHRlbnNpb247XG4gICAgZGVsZXRlIHZpLmltYWdlRXh0ZW5zaW9uO1xuICAgIHVybCArPSBjb21iaW5lUGFyYW1zJDUocGFyYW1zKTtcbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIGJhc2UuYmluZChuZXcgVmltZW8oKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkNiA9IHV0aWwuY29tYmluZVBhcmFtcyxcbiAgICAgIGdldFRpbWUkNCA9IHV0aWwuZ2V0VGltZTtcblxuICBmdW5jdGlvbiBXaXN0aWEoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICd3aXN0aWEnO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gW107XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIFwibG9uZ1wiOiB0aGlzLmNyZWF0ZUxvbmdVcmwsXG4gICAgICBlbWJlZDogdGhpcy5jcmVhdGVFbWJlZFVybCxcbiAgICAgIGVtYmVkanNvbnA6IHRoaXMuY3JlYXRlRW1iZWRKc29ucFVybFxuICAgIH07XG4gICAgdGhpcy5tZWRpYVR5cGVzID0ge1xuICAgICAgVklERU86ICd2aWRlbycsXG4gICAgICBFTUJFRFZJREVPOiAnZW1iZWR2aWRlbydcbiAgICB9O1xuICB9XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5wYXJzZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Oig/Om1lZGlhc3xpZnJhbWUpXFwvfHd2aWRlbz0pKFtcXHctXSspLyk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5wYXJzZUNoYW5uZWwgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzooPzpodHRwcz86KT9cXC9cXC8pPyhbXi5dKilcXC53aXN0aWFcXC4vKTtcbiAgICB2YXIgY2hhbm5lbCA9IG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY2hhbm5lbCA9PT0gJ2Zhc3QnIHx8IGNoYW5uZWwgPT09ICdjb250ZW50Jykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbDtcbiAgfTtcblxuICBXaXN0aWEucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMsIHJlc3VsdCkge1xuICAgIGlmIChwYXJhbXMud3RpbWUpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNChwYXJhbXMud3RpbWUpO1xuICAgICAgZGVsZXRlIHBhcmFtcy53dGltZTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnd2aWRlbyA9PT0gcmVzdWx0LmlkKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnd2aWRlbztcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUucGFyc2VNZWRpYVR5cGUgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKHJlc3VsdC5pZCAmJiByZXN1bHQuY2hhbm5lbCkge1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5WSURFTztcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5pZCkge1xuICAgICAgZGVsZXRlIHJlc3VsdC5jaGFubmVsO1xuICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5FTUJFRFZJREVPO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBXaXN0aWEucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKHVybCwgcGFyYW1zKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgIGlkOiB0aGlzLnBhcnNlVXJsKHVybCksXG4gICAgICBjaGFubmVsOiB0aGlzLnBhcnNlQ2hhbm5lbCh1cmwpXG4gICAgfTtcbiAgICByZXN1bHQucGFyYW1zID0gdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zLCByZXN1bHQpO1xuICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLnBhcnNlTWVkaWFUeXBlKHJlc3VsdCk7XG5cbiAgICBpZiAoIXJlc3VsdC5pZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMsIHVybCkge1xuICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIHBhcmFtcy53dGltZSA9IHBhcmFtcy5zdGFydDtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG4gICAgfVxuXG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNihwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly8nICsgdmkuY2hhbm5lbCArICcud2lzdGlhLmNvbS9tZWRpYXMvJyArIHZpLmlkO1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVybCh2aSwgcGFyYW1zLCB1cmwpO1xuICB9O1xuXG4gIFdpc3RpYS5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgISh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5WSURFTyB8fCB2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5FTUJFRFZJREVPKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vZmFzdC53aXN0aWEuY29tL2VtYmVkL2lmcmFtZS8nICsgdmkuaWQ7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKHZpLCBwYXJhbXMsIHVybCk7XG4gIH07XG5cbiAgV2lzdGlhLnByb3RvdHlwZS5jcmVhdGVFbWJlZEpzb25wVXJsID0gZnVuY3Rpb24gKHZpKSB7XG4gICAgaWYgKCF2aS5pZCB8fCAhKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPIHx8IHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkVNQkVEVklERU8pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiAnaHR0cHM6Ly9mYXN0Lndpc3RpYS5jb20vZW1iZWQvbWVkaWFzLycgKyB2aS5pZCArICcuanNvbnAnO1xuICB9O1xuXG4gIGJhc2UuYmluZChuZXcgV2lzdGlhKCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDcgPSB1dGlsLmNvbWJpbmVQYXJhbXM7XG5cbiAgZnVuY3Rpb24gWW91a3UoKSB7XG4gICAgdGhpcy5wcm92aWRlciA9ICd5b3VrdSc7XG4gICAgdGhpcy5kZWZhdWx0Rm9ybWF0ID0gJ2xvbmcnO1xuICAgIHRoaXMuZm9ybWF0cyA9IHtcbiAgICAgIGVtYmVkOiB0aGlzLmNyZWF0ZUVtYmVkVXJsLFxuICAgICAgXCJsb25nXCI6IHRoaXMuY3JlYXRlTG9uZ1VybCxcbiAgICAgIGZsYXNoOiB0aGlzLmNyZWF0ZUZsYXNoVXJsLFxuICAgICAgXCJzdGF0aWNcIjogdGhpcy5jcmVhdGVTdGF0aWNVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nXG4gICAgfTtcbiAgfVxuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZVVybCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICB2YXIgbWF0Y2ggPSB1cmwubWF0Y2goLyg/Oig/OmVtYmVkfHNpZClcXC98dl9zaG93XFwvaWRffFZpZGVvSURTPSkoW2EtekEtWjAtOV0rKS8pO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZVBhcmFtZXRlcnMgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgaWYgKHBhcmFtcy5WaWRlb0lEUykge1xuICAgICAgZGVsZXRlIHBhcmFtcy5WaWRlb0lEUztcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuVklERU8sXG4gICAgICBpZDogX3RoaXMucGFyc2VVcmwodXJsKSxcbiAgICAgIHBhcmFtczogX3RoaXMucGFyc2VQYXJhbWV0ZXJzKHBhcmFtcylcbiAgICB9O1xuXG4gICAgaWYgKCFyZXN1bHQuaWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBZb3VrdS5wcm90b3R5cGUuY3JlYXRlVXJsID0gZnVuY3Rpb24gKGJhc2VVcmwsIHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkIHx8IHZpLm1lZGlhVHlwZSAhPT0gdGhpcy5tZWRpYVR5cGVzLlZJREVPKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSBiYXNlVXJsICsgdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkNyhwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgWW91a3UucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHA6Ly9wbGF5ZXIueW91a3UuY29tL2VtYmVkLycsIHZpLCBwYXJhbXMpO1xuICB9O1xuXG4gIFlvdWt1LnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmwoJ2h0dHA6Ly92LnlvdWt1LmNvbS92X3Nob3cvaWRfJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgWW91a3UucHJvdG90eXBlLmNyZWF0ZVN0YXRpY1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJsKCdodHRwOi8vc3RhdGljLnlvdWt1LmNvbS92MS4wLjA2Mzgvdi9zd2YvbG9hZGVyLnN3Zj9WaWRlb0lEUz0nLCB2aSwgcGFyYW1zKTtcbiAgfTtcblxuICBZb3VrdS5wcm90b3R5cGUuY3JlYXRlRmxhc2hVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwOi8vcGxheWVyLnlvdWt1LmNvbS9wbGF5ZXIucGhwL3NpZC8nICsgdmkuaWQgKyAnL3Yuc3dmJztcbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ3KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFlvdWt1KCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDggPSB1dGlsLmNvbWJpbmVQYXJhbXMsXG4gICAgICBnZXRUaW1lJDUgPSB1dGlsLmdldFRpbWU7XG5cbiAgZnVuY3Rpb24gWW91VHViZSgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3lvdXR1YmUnO1xuICAgIHRoaXMuYWx0ZXJuYXRpdmVzID0gWyd5b3V0dScsICd5dGltZyddO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcInNob3J0XCI6IHRoaXMuY3JlYXRlU2hvcnRVcmwsXG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmwsXG4gICAgICBzaG9ydEltYWdlOiB0aGlzLmNyZWF0ZVNob3J0SW1hZ2VVcmwsXG4gICAgICBsb25nSW1hZ2U6IHRoaXMuY3JlYXRlTG9uZ0ltYWdlVXJsXG4gICAgfTtcbiAgICB0aGlzLmltYWdlUXVhbGl0aWVzID0ge1xuICAgICAgJzAnOiAnMCcsXG4gICAgICAnMSc6ICcxJyxcbiAgICAgICcyJzogJzInLFxuICAgICAgJzMnOiAnMycsXG4gICAgICBERUZBVUxUOiAnZGVmYXVsdCcsXG4gICAgICBIUURFRkFVTFQ6ICdocWRlZmF1bHQnLFxuICAgICAgU0RERUZBVUxUOiAnc2RkZWZhdWx0JyxcbiAgICAgIE1RREVGQVVMVDogJ21xZGVmYXVsdCcsXG4gICAgICBNQVhSRVNERUZBVUxUOiAnbWF4cmVzZGVmYXVsdCdcbiAgICB9O1xuICAgIHRoaXMuZGVmYXVsdEltYWdlUXVhbGl0eSA9IHRoaXMuaW1hZ2VRdWFsaXRpZXMuSFFERUZBVUxUO1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nLFxuICAgICAgUExBWUxJU1Q6ICdwbGF5bGlzdCcsXG4gICAgICBTSEFSRTogJ3NoYXJlJyxcbiAgICAgIENIQU5ORUw6ICdjaGFubmVsJ1xuICAgIH07XG4gIH1cblxuICBZb3VUdWJlLnByb3RvdHlwZS5wYXJzZVZpZGVvVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIHZhciBtYXRjaCA9IHVybC5tYXRjaCgvKD86KD86dnx2aXxiZXx2aWRlb3N8ZW1iZWQpXFwvKD8hdmlkZW9zZXJpZXMpfCg/OnZ8Y2kpPSkoW1xcdy1dezExfSkvaSk7XG4gICAgcmV0dXJuIG1hdGNoID8gbWF0Y2hbMV0gOiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUucGFyc2VDaGFubmVsVXJsID0gZnVuY3Rpb24gKHVybCkge1xuICAgIC8vIE1hdGNoIGFuIG9wYXF1ZSBjaGFubmVsIElEXG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC9cXC9jaGFubmVsXFwvKFtcXHctXSspLyk7XG5cbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlkOiBtYXRjaFsxXSxcbiAgICAgICAgbWVkaWFUeXBlOiB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTFxuICAgICAgfTtcbiAgICB9IC8vIE1hdGNoIGEgdmFuaXR5IGNoYW5uZWwgbmFtZSBvciBhIHVzZXIgbmFtZS4gVXNlciB1cmxzIGFyZSBkZXByZWNhdGVkIGFuZFxuICAgIC8vIGN1cnJlbnRseSByZWRpcmVjdCB0byB0aGUgY2hhbm5lbCBvZiB0aGF0IHNhbWUgbmFtZS5cblxuXG4gICAgbWF0Y2ggPSB1cmwubWF0Y2goL1xcLyg/OmN8dXNlcilcXC8oW1xcdy1dKykvKTtcblxuICAgIGlmIChtYXRjaCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZTogbWF0Y2hbMV0sXG4gICAgICAgIG1lZGlhVHlwZTogdGhpcy5tZWRpYVR5cGVzLkNIQU5ORUxcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMsIHJlc3VsdCkge1xuICAgIGlmIChwYXJhbXMuc3RhcnQgfHwgcGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNShwYXJhbXMuc3RhcnQgfHwgcGFyYW1zLnQpO1xuICAgICAgZGVsZXRlIHBhcmFtcy50O1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMudiA9PT0gcmVzdWx0LmlkKSB7XG4gICAgICBkZWxldGUgcGFyYW1zLnY7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5saXN0ID09PSByZXN1bHQuaWQpIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMubGlzdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyYW1zO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLnBhcnNlTWVkaWFUeXBlID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIGlmIChyZXN1bHQucGFyYW1zLmxpc3QpIHtcbiAgICAgIHJlc3VsdC5saXN0ID0gcmVzdWx0LnBhcmFtcy5saXN0O1xuICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMubGlzdDtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0LmlkICYmICFyZXN1bHQucGFyYW1zLmNpKSB7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlZJREVPO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0Lmxpc3QpIHtcbiAgICAgIGRlbGV0ZSByZXN1bHQuaWQ7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnBhcmFtcy5jaSkge1xuICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMuY2k7XG4gICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlNIQVJFO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgY2hhbm5lbFJlc3VsdCA9IHRoaXMucGFyc2VDaGFubmVsVXJsKHVybCk7XG5cbiAgICBpZiAoY2hhbm5lbFJlc3VsdCkge1xuICAgICAgcmV0dXJuIGNoYW5uZWxSZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICBpZDogdGhpcy5wYXJzZVZpZGVvVXJsKHVybClcbiAgICAgIH07XG4gICAgICByZXN1bHQucGFyYW1zID0gdGhpcy5wYXJzZVBhcmFtZXRlcnMocGFyYW1zLCByZXN1bHQpO1xuICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZU1lZGlhVHlwZShyZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlU2hvcnRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIGlmICghdmkuaWQgfHwgdmkubWVkaWFUeXBlICE9PSB0aGlzLm1lZGlhVHlwZXMuVklERU8pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIHVybCA9ICdodHRwczovL3lvdXR1LmJlLycgKyB2aS5pZDtcblxuICAgIGlmIChwYXJhbXMuc3RhcnQpIHtcbiAgICAgIHVybCArPSAnI3Q9JyArIHBhcmFtcy5zdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLmNyZWF0ZUxvbmdVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHZhciB1cmwgPSAnJztcbiAgICB2YXIgc3RhcnRUaW1lID0gcGFyYW1zLnN0YXJ0O1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTCkge1xuICAgICAgaWYgKHZpLmlkKSB7XG4gICAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vY2hhbm5lbC8nICsgdmkuaWQ7XG4gICAgICB9IGVsc2UgaWYgKHZpLm5hbWUpIHtcbiAgICAgICAgdXJsICs9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9jLycgKyB2aS5uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUICYmIHZpLmxpc3QpIHtcbiAgICAgIHBhcmFtcy5mZWF0dXJlID0gJ3NoYXJlJztcbiAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vcGxheWxpc3QnO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gJiYgdmkuaWQpIHtcbiAgICAgIHBhcmFtcy52ID0gdmkuaWQ7XG4gICAgICB1cmwgKz0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoJztcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLlNIQVJFICYmIHZpLmlkKSB7XG4gICAgICBwYXJhbXMuY2kgPSB2aS5pZDtcbiAgICAgIHVybCArPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vc2hhcmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodmkubGlzdCkge1xuICAgICAgcGFyYW1zLmxpc3QgPSB2aS5saXN0O1xuICAgIH1cblxuICAgIHVybCArPSBjb21iaW5lUGFyYW1zJDgocGFyYW1zKTtcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgIT09IHRoaXMubWVkaWFUeXBlcy5QTEFZTElTVCAmJiBzdGFydFRpbWUpIHtcbiAgICAgIHVybCArPSAnI3Q9JyArIHN0YXJ0VGltZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsO1xuICB9O1xuXG4gIFlvdVR1YmUucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICB2YXIgdXJsID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkJztcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5QTEFZTElTVCAmJiB2aS5saXN0KSB7XG4gICAgICBwYXJhbXMubGlzdFR5cGUgPSAncGxheWxpc3QnO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gJiYgdmkuaWQpIHtcbiAgICAgIHVybCArPSAnLycgKyB2aS5pZDsgLy9sb29wIGhhY2tcblxuICAgICAgaWYgKHBhcmFtcy5sb29wID09PSAnMScpIHtcbiAgICAgICAgcGFyYW1zLnBsYXlsaXN0ID0gdmkuaWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHZpLmxpc3QpIHtcbiAgICAgIHBhcmFtcy5saXN0ID0gdmkubGlzdDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ4KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBZb3VUdWJlLnByb3RvdHlwZS5jcmVhdGVJbWFnZVVybCA9IGZ1bmN0aW9uIChiYXNlVXJsLCB2aSwgcGFyYW1zKSB7XG4gICAgaWYgKCF2aS5pZCB8fCB2aS5tZWRpYVR5cGUgIT09IHRoaXMubWVkaWFUeXBlcy5WSURFTykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgdXJsID0gYmFzZVVybCArIHZpLmlkICsgJy8nO1xuICAgIHZhciBxdWFsaXR5ID0gcGFyYW1zLmltYWdlUXVhbGl0eSB8fCB0aGlzLmRlZmF1bHRJbWFnZVF1YWxpdHk7XG4gICAgcmV0dXJuIHVybCArIHF1YWxpdHkgKyAnLmpwZyc7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlU2hvcnRJbWFnZVVybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlSW1hZ2VVcmwoJ2h0dHBzOi8vaS55dGltZy5jb20vdmkvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgWW91VHViZS5wcm90b3R5cGUuY3JlYXRlTG9uZ0ltYWdlVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVJbWFnZVVybCgnaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJywgdmksIHBhcmFtcyk7XG4gIH07XG5cbiAgYmFzZS5iaW5kKG5ldyBZb3VUdWJlKCkpO1xuXG4gIHZhciBjb21iaW5lUGFyYW1zJDkgPSB1dGlsLmNvbWJpbmVQYXJhbXMsXG4gICAgICBnZXRUaW1lJDYgPSB1dGlsLmdldFRpbWU7XG5cbiAgZnVuY3Rpb24gU291bmRDbG91ZCgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3NvdW5kY2xvdWQnO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFRSQUNLOiAndHJhY2snLFxuICAgICAgUExBWUxJU1Q6ICdwbGF5bGlzdCcsXG4gICAgICBBUElUUkFDSzogJ2FwaXRyYWNrJyxcbiAgICAgIEFQSVBMQVlMSVNUOiAnYXBpcGxheWxpc3QnXG4gICAgfTtcbiAgfVxuXG4gIFNvdW5kQ2xvdWQucHJvdG90eXBlLnBhcnNlVXJsID0gZnVuY3Rpb24gKHVybCwgcmVzdWx0KSB7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC8oPzptXFwuKT9zb3VuZGNsb3VkXFwuY29tXFwvKD86KFtcXHctXSspXFwvKHNldHNcXC8pPykoW1xcdy1dKykvaSk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5jaGFubmVsID0gbWF0Y2hbMV07XG5cbiAgICBpZiAobWF0Y2hbMV0gPT09ICdwbGF5bGlzdHMnIHx8IG1hdGNoWzJdKSB7XG4gICAgICAvL3BsYXlsaXN0XG4gICAgICByZXN1bHQubGlzdCA9IG1hdGNoWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3RyYWNrXG4gICAgICByZXN1bHQuaWQgPSBtYXRjaFszXTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFNvdW5kQ2xvdWQucHJvdG90eXBlLnBhcnNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICBpZiAocGFyYW1zLnQpIHtcbiAgICAgIHBhcmFtcy5zdGFydCA9IGdldFRpbWUkNihwYXJhbXMudCk7XG4gICAgICBkZWxldGUgcGFyYW1zLnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfTtcblxuICBTb3VuZENsb3VkLnByb3RvdHlwZS5wYXJzZU1lZGlhVHlwZSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICBpZiAocmVzdWx0LmlkKSB7XG4gICAgICBpZiAocmVzdWx0LmNoYW5uZWwgPT09ICd0cmFja3MnKSB7XG4gICAgICAgIGRlbGV0ZSByZXN1bHQuY2hhbm5lbDtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5wYXJhbXMudXJsO1xuICAgICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLkFQSVRSQUNLO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0Lm1lZGlhVHlwZSA9IHRoaXMubWVkaWFUeXBlcy5UUkFDSztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVzdWx0Lmxpc3QpIHtcbiAgICAgIGlmIChyZXN1bHQuY2hhbm5lbCA9PT0gJ3BsYXlsaXN0cycpIHtcbiAgICAgICAgZGVsZXRlIHJlc3VsdC5jaGFubmVsO1xuICAgICAgICBkZWxldGUgcmVzdWx0LnBhcmFtcy51cmw7XG4gICAgICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLm1lZGlhVHlwZXMuQVBJUExBWUxJU1Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGVzLlBMQVlMSVNUO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiAodXJsLCBwYXJhbXMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0ID0gdGhpcy5wYXJzZVVybCh1cmwsIHJlc3VsdCk7XG4gICAgcmVzdWx0LnBhcmFtcyA9IHRoaXMucGFyc2VQYXJhbWV0ZXJzKHBhcmFtcyk7XG4gICAgcmVzdWx0ID0gdGhpcy5wYXJzZU1lZGlhVHlwZShyZXN1bHQpO1xuXG4gICAgaWYgKCFyZXN1bHQuaWQgJiYgIXJlc3VsdC5saXN0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUuY3JlYXRlTG9uZ1VybCA9IGZ1bmN0aW9uICh2aSwgcGFyYW1zKSB7XG4gICAgdmFyIHVybCA9ICcnO1xuICAgIHZhciBzdGFydFRpbWUgPSBwYXJhbXMuc3RhcnQ7XG4gICAgZGVsZXRlIHBhcmFtcy5zdGFydDtcblxuICAgIGlmICh2aS5tZWRpYVR5cGUgPT09IHRoaXMubWVkaWFUeXBlcy5UUkFDSyAmJiB2aS5pZCAmJiB2aS5jaGFubmVsKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS8nICsgdmkuY2hhbm5lbCArICcvJyArIHZpLmlkO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuUExBWUxJU1QgJiYgdmkubGlzdCAmJiB2aS5jaGFubmVsKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9zb3VuZGNsb3VkLmNvbS8nICsgdmkuY2hhbm5lbCArICcvc2V0cy8nICsgdmkubGlzdDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkFQSVRSQUNLICYmIHZpLmlkKSB7XG4gICAgICB1cmwgPSAnaHR0cHM6Ly9hcGkuc291bmRjbG91ZC5jb20vdHJhY2tzLycgKyB2aS5pZDtcbiAgICB9IGVsc2UgaWYgKHZpLm1lZGlhVHlwZSA9PT0gdGhpcy5tZWRpYVR5cGVzLkFQSVBMQVlMSVNUICYmIHZpLmxpc3QpIHtcbiAgICAgIHVybCA9ICdodHRwczovL2FwaS5zb3VuZGNsb3VkLmNvbS9wbGF5bGlzdHMvJyArIHZpLmxpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkOShwYXJhbXMpO1xuXG4gICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgdXJsICs9ICcjdD0nICsgc3RhcnRUaW1lO1xuICAgIH1cblxuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgU291bmRDbG91ZC5wcm90b3R5cGUuY3JlYXRlRW1iZWRVcmwgPSBmdW5jdGlvbiAodmksIHBhcmFtcykge1xuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93LnNvdW5kY2xvdWQuY29tL3BsYXllci8nO1xuICAgIGRlbGV0ZSBwYXJhbXMuc3RhcnQ7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVBJVFJBQ0sgJiYgdmkuaWQpIHtcbiAgICAgIHBhcmFtcy51cmwgPSAnaHR0cHMlM0EvL2FwaS5zb3VuZGNsb3VkLmNvbS90cmFja3MvJyArIHZpLmlkO1xuICAgIH0gZWxzZSBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVBJUExBWUxJU1QgJiYgdmkubGlzdCkge1xuICAgICAgcGFyYW1zLnVybCA9ICdodHRwcyUzQS8vYXBpLnNvdW5kY2xvdWQuY29tL3BsYXlsaXN0cy8nICsgdmkubGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyQ5KHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFNvdW5kQ2xvdWQoKSk7XG5cbiAgdmFyIGNvbWJpbmVQYXJhbXMkYSA9IHV0aWwuY29tYmluZVBhcmFtcztcblxuICBmdW5jdGlvbiBUZWFjaGVyVHViZSgpIHtcbiAgICB0aGlzLnByb3ZpZGVyID0gJ3RlYWNoZXJ0dWJlJztcbiAgICB0aGlzLmFsdGVybmF0aXZlcyA9IFtdO1xuICAgIHRoaXMuZGVmYXVsdEZvcm1hdCA9ICdsb25nJztcbiAgICB0aGlzLmZvcm1hdHMgPSB7XG4gICAgICBcImxvbmdcIjogdGhpcy5jcmVhdGVMb25nVXJsLFxuICAgICAgZW1iZWQ6IHRoaXMuY3JlYXRlRW1iZWRVcmxcbiAgICB9O1xuICAgIHRoaXMubWVkaWFUeXBlcyA9IHtcbiAgICAgIFZJREVPOiAndmlkZW8nLFxuICAgICAgQVVESU86ICdhdWRpbycsXG4gICAgICBET0NVTUVOVDogJ2RvY3VtZW50JyxcbiAgICAgIENIQU5ORUw6ICdjaGFubmVsJyxcbiAgICAgIENPTExFQ1RJT046ICdjb2xsZWN0aW9uJyxcbiAgICAgIEdST1VQOiAnZ3JvdXAnXG4gICAgfTtcbiAgfVxuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICh1cmwsIHBhcmFtcykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQubGlzdCA9IHRoaXMucGFyc2VQbGF5bGlzdChwYXJhbXMpO1xuICAgIHJlc3VsdC5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdmFyIG1hdGNoID0gdXJsLm1hdGNoKC9cXC8oYXVkaW98dmlkZW98ZG9jdW1lbnR8dXNlclxcL2NoYW5uZWx8Y29sbGVjdGlvbnxncm91cClcXC8oPzpbXFx3LV0rLSk/KFxcdyspLyk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJlc3VsdC5tZWRpYVR5cGUgPSB0aGlzLnBhcnNlTWVkaWFUeXBlKG1hdGNoWzFdKTtcbiAgICByZXN1bHQuaWQgPSBtYXRjaFsyXTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5wYXJzZVBsYXlsaXN0ID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgIGlmIChwYXJhbXNbJ3BsYXlsaXN0LWlkJ10pIHtcbiAgICAgIHZhciBsaXN0ID0gcGFyYW1zWydwbGF5bGlzdC1pZCddO1xuICAgICAgZGVsZXRlIHBhcmFtc1sncGxheWxpc3QtaWQnXTtcbiAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgVGVhY2hlclR1YmUucHJvdG90eXBlLnBhcnNlTWVkaWFUeXBlID0gZnVuY3Rpb24gKG1lZGlhVHlwZU1hdGNoKSB7XG4gICAgc3dpdGNoIChtZWRpYVR5cGVNYXRjaCkge1xuICAgICAgY2FzZSAnYXVkaW8nOlxuICAgICAgICByZXR1cm4gdGhpcy5tZWRpYVR5cGVzLkFVRElPO1xuXG4gICAgICBjYXNlICd2aWRlbyc6XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhVHlwZXMuVklERU87XG5cbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5ET0NVTUVOVDtcblxuICAgICAgY2FzZSAndXNlci9jaGFubmVsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5DSEFOTkVMO1xuXG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcbiAgICAgICAgcmV0dXJuIHRoaXMubWVkaWFUeXBlcy5DT0xMRUNUSU9OO1xuXG4gICAgICBjYXNlICdncm91cCc6XG4gICAgICAgIHJldHVybiB0aGlzLm1lZGlhVHlwZXMuR1JPVVA7XG4gICAgfVxuICB9O1xuXG4gIFRlYWNoZXJUdWJlLnByb3RvdHlwZS5jcmVhdGVMb25nVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cudGVhY2hlcnR1YmUuY29tLyc7XG5cbiAgICBpZiAodmkubGlzdCkge1xuICAgICAgcGFyYW1zWydwbGF5bGlzdC1pZCddID0gdmkubGlzdDtcbiAgICB9XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQ0hBTk5FTCkge1xuICAgICAgdXJsICs9ICd1c2VyL2NoYW5uZWwvJztcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsICs9IHZpLm1lZGlhVHlwZSArICcvJztcbiAgICB9XG5cbiAgICB1cmwgKz0gdmkuaWQ7XG4gICAgdXJsICs9IGNvbWJpbmVQYXJhbXMkYShwYXJhbXMpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgVGVhY2hlclR1YmUucHJvdG90eXBlLmNyZWF0ZUVtYmVkVXJsID0gZnVuY3Rpb24gKHZpLCBwYXJhbXMpIHtcbiAgICBpZiAoIXZpLmlkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciB1cmwgPSAnaHR0cHM6Ly93d3cudGVhY2hlcnR1YmUuY29tL2VtYmVkLyc7XG5cbiAgICBpZiAodmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuVklERU8gfHwgdmkubWVkaWFUeXBlID09PSB0aGlzLm1lZGlhVHlwZXMuQVVESU8pIHtcbiAgICAgIHVybCArPSB2aS5tZWRpYVR5cGUgKyAnLycgKyB2aS5pZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB1cmwgKz0gY29tYmluZVBhcmFtcyRhKHBhcmFtcyk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICBiYXNlLmJpbmQobmV3IFRlYWNoZXJUdWJlKCkpO1xuXG4gIHZhciBsaWIgPSBiYXNlO1xuXG4gIHJldHVybiBsaWI7XG5cbn0pKSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlXG5fX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9TY3JpcHRzL3V0aWwuanNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9