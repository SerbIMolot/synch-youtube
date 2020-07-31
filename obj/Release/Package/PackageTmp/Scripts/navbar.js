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
    $('#create_new_room').on('click', function () {
        openCreateModal();
    });
    $('#join_room').on('click', function () {
        openJoinModal();
    });
});