$(document).ready(function () {
    $("#submitLogin").click(function () {
        //collect the user data
        var data = {};
        data.Email = $("#login").val();
        data.Password = $("#password").val();
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: "/Account/Login",
            method: "POST",
            data: {
                model: data,
                __RequestVerificationToken: token,
                returnUrl: "Room/Chat"   // you can modify the returnUrl value here
            },
            success: function () {
                alert("success");
            },
            error: function () {
                alert("fail");
            }
        })
    })

})
$.ajax({
    url: '/Account/Login',
    dataType: 'html',
    success: function (data) {
        $('#currentForm').html(data);
    }
});
function registerClick() {
    $.ajax({
        url: '/Account/Register',
        dataType: 'html',
        success: function (data) {
            $('#currentForm').html(data);
        }
    })
}


