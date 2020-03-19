var ip = 'http://47.98.42.85:9099';
var register_student = '/bookOrdering/user/register';
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    register_student = ip + register_student;
}

$(function () {
    $('#register').click(function () {
        if ($.trim($('#register_password').val()) === $.trim($('#repeat_register_password').val())) {
            $.ajax({
                url: register_student,
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({
                    "userId": $('#register_userId').val(),
                    "teacherId": $('#teacher_userId').val(),
                    "userName": $('#register_username').val(),
                    "password": $('#register_password').val(),
                    "grade": $('#grade').val(),
                    "collage": $('#collage').val(),
                    "clase": $('#class').val(),
                    "roleId": "2",
                    "state": "0"
                }),
                contentType: 'application/json; charset=UTF-8',
                success: function (result) {
                    console.log(result)
                    if (!!result && result.data === '成功添加用户') {
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
    })
});
