var ip = 'http://47.98.42.85:9099';
var register_url = '/bookOrdering/user/register';
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    register_url = ip + register_url;
}

$(function () {
    $('#register').click(function () {
        if ($.trim($('#register_password').val()) === $.trim($('#repeat_register_password').val())) {
            $.ajax({
                url: register_url,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    "userId": $('#register_userId').val(),
                    "userName": $('#register_username').val(),
                    "password": $('#register_password').val(),
                    "roleId": "1",
                    "state": "0"
                }),
                contentType: 'application/json; charset=UTF-8',
                success: function (result) {
                    if (!!result) {
                        window.location.href = '../register/register-success.html';
                    } else {
                        alert(result['data']);
                    }
                }
            })
        } else {
            alert('两次输入密码不一致');
            $('#repeat_register_password').val('');
        }
    });
});
