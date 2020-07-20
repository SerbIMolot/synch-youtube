function openSlideMenu(){
    document.getElementById('menu').style.width = '25%';
      document.getElementById('content').style.width = '25%';
      document.getElementById('content').style.opacity = 0;
}
function closeSlideMenu() {
    document.getElementById('menu').style.width = '0';
      document.getElementById('content').style.width = '3%';
}
$('#open_menu').on('click', function () {
    if ($('#content').css('opacity') == 0) $('#content').css('opacity', 1);
    else $('#content').css('opacity', 0);
});
$('#create_new_room').on('click', function () {
    openCreateModal();
});
$('#join_room').on('click', function () {
    openJoinModal();
});