function openSlideMenu(){
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
   // $.ajaxSetup({ cache: false });
    $.ajax({
        url: siteLocation + '/Room/CreateChatRoom',
        //url: siteLocation + "@Url.Action("CreateChatRoom", "Room")",
        type: 'GET',
        cache: true,
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
});
$('#join_room').on('click', function () {
   // $.ajaxSetup({ cache: false });
    $.ajax({
        //url: siteLocation + "@Url.Action("JoinChatRoom", "Room")",
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
});