var ip = '47.98.42.85:9999';
var login_url = 'bookOrdering/login';
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

$(document).ready(function () {
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
        console.log(111)
        //获取验证码输入值
        let check_code = $('#check_code');

        let username = $('#username').val();
        let password = $('#password').val();
        let param = {};
        param['userId'] = username;
        param['password'] = password;

        //获取验证码产生值
        let check_code_generator = $('#check_code_generator');
        if (check_code[0].value.toLocaleLowerCase() === check_code_generator[0].innerText.toLocaleLowerCase()) {
            if ($('input:checked').attr('id') === 'user_admin') {
                $.ajax({
                    url: login_url,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        param
                    }),
                    success: function (result) {
                        console.log(result);
                        if (!!result && result.result === 'success') {
                            //存入session中
                            window.sessionStorage.setItem("bookStorage.token", result['item']['token']);
                            window.location.href = '../admin/admin-page.html';
                        } else {
                            alert(result['message']);
                        }
                    }
                })
            } else if ($('input:checked').attr('id') === 'user_teacher') {
                $.ajax({
                    url: login_url,
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify({
                        param
                    }),
                    success: function (result) {
                        if (!!result && result.result === 'success') {
                            //存入session中
                            window.sessionStorage.setItem("bookStorage.token", result['item']['token']);
                            window.location.href = '../admin/admin-page.html';
                        } else {
                            alert(result['message']);
                        }
                    }
                })
            } else if ($('input:checked').attr('id') === 'user_student') {
                $.ajax({
                    url: login_url,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify({
                        param
                    }),
                    success: function (result) {
                        if (!!result && result.result === 'success') {
                            //存入session中
                            window.sessionStorage.setItem("bookStorage.token", result['item']['token']);
                            window.location.href = '../admin/admin-page.html';
                        } else {
                            alert(result['message']);
                        }
                    }
                })
            }

            // if ($("#user_admin").attr('checked', 2)) {
            //     window.open('../admin/admin-page.html');
            // }
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