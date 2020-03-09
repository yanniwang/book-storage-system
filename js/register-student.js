var ip = '47.98.42.85:9999';
var register_student = '';
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    register_student = ip + register_student;
}

$(document).ready(function () {
    var register_username = $('#register_username').val();
    var register_password = $('#register_password').val();
    var repeat_register_password = $('#repeat_register_password').val();
    var teacher_name = $('#teacher-name').val();
    var grade = $('#grade').val();
    var collage = $('#collage').val();
    var student_class = $('#class').val();
    var param = {};

    param['username'] = register_username;
    param['password'] = register_password;
    param['teacher_name'] = teacher_name;
    param['grade'] = grade;
    param['collage'] = collage;
    param['class'] = student_class;
    param['roleId'] = '2';

    $('#register').click(function () {
        if (!!register_username && !!register_password && !!repeat_register_password && !!teacher_name && !!grade && !!collage && !!student_class) {
            if (register_password !== repeat_register_password) {
                alert('两次输入密码不一致');
                $('#register_username').val('');
                $('#repeat_register_password').val('');
            } else {
                $.ajax({
                    url: register_url,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        param
                    }),
                    success: function (result) {
                        if (!!result && result.result === 'success') {
                            console.log(result);

                        } else {
                            alert(result['message']);
                        }
                    }
                })
            }
        }
    })


});