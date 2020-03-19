var ip = 'http://47.98.42.85:9099';
var login_url = '/bookOrdering/user/login';
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    login_url = ip + login_url;
}

//生成随机验证码
function GenerateCheckCode() {
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J'];
    let code = '';
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 30);
        code += arr[index];
    }
    document.getElementById('check_code_generator').innerHTML = code;
}

$(function () {
    //一进入页面生成验证码
    GenerateCheckCode();

    //点击换一张，重新生成验证码
    $("#change-check-code").click(function () {
        GenerateCheckCode();
    });

    //选择人员类型
    $('.radio').click(function () {
        let id = $(this).attr('id');
        $('input.radio').each(function (index, item) {
            if (item.id === id) {
                if (item.id === 'user_admin') {
                    $('#register').css('display', 'none');
                    $('.Remember_password_container').css('display', 'none');
                } else {
                    $('#register').css('display', 'block');
                    $('.Remember_password_container').css('display', 'block');
                }
            }
        });
    });

    //login
    $("#login").click(function () {
        //获取验证码输入值
        let check_code = $('#check_code');
        //获取验证码产生值
        let check_code_generator = $('#check_code_generator');

        if (check_code[0].value.toLocaleLowerCase() !== check_code_generator[0].innerText.toLocaleLowerCase()) {
            alert('验证码错误');
        } else {
            $.ajax({
                url: login_url,
                dataType: 'json',
                type: 'POST',
                data: JSON.stringify({
                    "userId": $('#username').val(),
                    "password": $('#password').val()
                }),
                contentType: 'application/json; charset=UTF-8',
                success: function (result) {
                    if (!!result) {
                        // console.log(result.data);
                        window.sessionStorage.setItem("token", result['data']);

                        if ($("#user_teacher:checked").val() === 'on') {
                            window.location.href = '../teacher/teacher-page.html';
                        } else if ($('#user_admin:checked').val() === 'on') {
                            window.location.href = '../admin/admin-page.html';
                        } else if ($('#user_student:checked').val() === 'on') {
                            window.location.href = '../student/student-page.html';
                        }
                    }
                }
            });
        }
    });

    //register
    $("#register").click(function () {
        if ($('input:checked').attr('id') === 'user_teacher') {
            window.location.href = '../register/register-page.html';
        } else if ($('input:checked').attr('id') === 'user_student') {
            window.location.href = '../register/register-page-student.html';
        } else {
            alert('请选择角色');
        }
    });

});
