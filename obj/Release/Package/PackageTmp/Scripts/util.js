
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
let link = window.location.href.split('/');
let currentRoomName = link[6];
let virtDir = link[3];
let siteLocation;
if (virtDir != "tset") {
    siteLocation = 'http://' + window.location.host;

}
else {
    siteLocation = 'http://' + window.location.host + '/' + virtDir;
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

function charNameclick( roomName ) {
    console.log(roomName);
    $.connection.groupHubs.state.currentChatRoom = roomName
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


    function openCreateModal() {
        $.ajaxSetup({ cache: false });
        $.ajax({
            url: siteLocation + '/Room/CreateChatRoom',
            type: 'get',
            cache: false,
            async: true,
            success: function (result) {
                $('#dialogContent').html(result);
                $('#modDialog').modal('show');
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
                //alert(msg);
            }
        });

    }
    function openJoinModal() {
        $.ajaxSetup({ cache: false });
        $.ajax({
            url: siteLocation + '/Room/JoinChatRoom',
            type: 'get',
            cache: false,
            async: true,
            success: function (result) {
                $('#dialogContent').html(result);
                $('#modDialog').modal('show');
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
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("Failed: " + errorThrown);
        }).always(function (a, textStatus, b) {
            alert("Final status: " + textStatus);
        });
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
    let room = $('#createText').val();
    if (room.length != 0) {
        console.log(room);
        console.log(siteLocation +'/Room/JoinRoom?roomName=' + room);
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
    let room = $('#joinRoomText').val();
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
//    let roomName = $('#joinRoomText').val();
//    $.connection.groupHubs.server.joinRoom(roomName);
//
//    loadMessageView(roomName)
//} 
$('body').on('click', '.createBtn', function () {
    let msg = $('#createText').val();
    if (msg.length != 0) {
        console.log(msg);

        $('#createText').val('');

    }
});

function writeLinkInput() {
    var input = $("#write_link").val();
    if (input.includes("youtube") && (input.includes("watch") || input.includes("list"))) {
        $.connection.groupHubs.server.getVideosFromLink( input );

    }
};

$('body').on('click', '.link_send_btn', function () {
    let msg = $('#write_link').val();
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
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
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
        let tech;
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
    videopl.playlistUi();

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
$(function () {
    var chat = $.connection.groupHubs;
    var tryingToReconnect = false;
    let isServerChangePlaylist = false;
    let isChangeItem = false;
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
    }
    chat.client.groupPlay = function () {
        videopl.play();
    }
    chat.client.groupPause = function () {
        videopl.pause();
    }
    chat.client.timeUpdate = function (time) {
        serverCurrentTimeCall = 1;
        videopl.currentTime(time);
    }
    chat.client.forceTimeUpdateServer = function () {
        
        $.connection.groupHubs.server.updateRoomTime(currentRoomName, videopl.currentTime());
    }
    let timeToSet = 0.0;
    let setPlaylistIndexTimeSet = false;
    chat.client.setPlaylistIndexTime = function (index, time) {
        if (index != videopl.playlist.currentIndex()) {
            isServerChangePlaylist = true;
            videopl.playlist.currentItem(index)
            console.log("442" + isServerChangePlaylist);
            setPlaylistIndexTimeSet = true;
            timeToSet = time;
        }
        else {
            setPlaylistIndexTimeSet = true;
            timeToSet = time;
        }
      //  videopl.playlist.currentItem(index)

        
    }
    chat.client.previewVideoFromLink = function (videos) {
        if (index != videopl.playlist.currentIndex()) {
            isServerChangePlaylist = true;
            videopl.playlist.currentItem(index)
            console.log("442" + isServerChangePlaylist);
            setPlaylistIndexTimeSet = true;
            timeToSet = time;
        }
        else {
            setPlaylistIndexTimeSet = true;
            timeToSet = time;
        }
      //  videopl.playlist.currentItem(index)

        
    }

    chat.client.previewLoadedVideos = function (videos) {

        var vid = JSON.parse(source);
      //  videopl.playlist.currentItem(index)

        document.getElementById("playlist-ui2")(videos);
        
    }

    chat.client.changeVideoSource = function (source) {
        var vid = JSON.parse(source);
        //alert(typeof source);
        //vid.forEach(function (item, i, arr) {
        //    alert(i + ": " + item.src + " (массив:" + arr + ")");
        //});
        //var videosrc = [];
        console.log( source );
        //console.log( vid );
        isServerChangePlaylist = true;
        console.log("334" + isServerChangePlaylist);
        videopl.src(vid[0].src);
        videopl.playlist(vid);
        videopl.playlist.autoadvance(1);
        videopl.playlist.repeat(false);
        //videopl.src({ type: "video/youtube", src: source });
    }
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
                    <div class="received_msg sender_name">` +
                            name +
                    `</div>
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
                <span class="time_date"> @msg.sendDate </span>
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
        }
        chat.server.joinRoom(currentRoomName);
        chat.server.requestTimeSynch(currentRoomName, userName);
        chat.server.updateUsersInRoom(currentRoomName);
        $('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');
        console.log(userName);
        console.log(userName);


    }
    function updateScroll() {
        var element = document.getElementById("msg_history");
        element.scrollTop = element.scrollHeight;

    }
    // Добавляем нового пользователя
    chat.client.onNewUserConnected = function (id, name) {

        AddUser(id, name);
    }
    chat.client.synchWith = function (name) {
        //console.log("User " +name + " time " +videopl.currentTime());
        //$.connection.groupHubs.server.setTimeForOtherClient(name, videopl.currentTime);
        chat.server.setTimeForOtherClient(name, videopl.currentTime(), videopl.playlist.currentIndex() );
    }

    // Удаляем пользователя
    chat.client.onUserDisconnected = function ( userName) {
        if (currentRoomAnmin.userName == userName) {
            chat.groupHubs.server.switchAdminForRoom(currentRoomName, userName);
        }
        //$('#' + id).remove();
    }
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
    }
    
    chat.client.changePlaylistItem = function (id) {
        if (id != videopl.playlist.currentIndex()) {
            console.log("442" + isServerChangePlaylist);
            isServerChangePlaylist = true;
            videopl.playlist.currentItem(id);
            videopl.currentTime(0.0);
        }

    }
    videopl.on("playlistitem", function (id, jd) {

        if (!isServerChangePlaylist && jd.playlistItemId_ != videopl.playlist.currentIndex() ) {
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

        console.log("sourceset" );
        
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

        console.log("loadedmetadata" );
        
    });
    videopl.on("ready", function () {

        console.log("ready" );
        
    });
    videopl.on("canplay", function () {

        console.log("canplay" );
        
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
        //alert('There was an error');
        console.error(e);
    });;
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