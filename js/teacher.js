var ip = 'http://47.98.42.85:9099';
var teacher_url = '/bookOrdering/allBook';
var token = window.sessionStorage.getItem('token');
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    teacher_url = ip + teacher_url;
}

var headersObj = {};
if (token !== null) {
    headersObj['token'] = "" + token;
    headersObj['Content-Type'] = "application/json";
}

console.log(token);

$(function () {
    $.ajax({
        url: teacher_url,
        type: 'POST',
        dataType: 'JSON',
        headers: headersObj,
        contentType: 'application/json; charset=UTF-8',
        success: function (result) {
            if (!!result) {
                let data = result.data;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    $('#admin-tb tbody').append('<tr class="' + data[i].book_name + '"><td>' + data[i].book_name + '</td><td>' + data[i].price + '</td><td>' + data[i].remainder + '</td><td>计算机学院计算机科学与技术专业1502</td><td><input class="check_btn ' + data[i].book_name + '" type="button" value="查看"></td><td><input class="operate_btn" id="' + data[i].book_name + '" type="button" value="撤回"></td></tr>')
                }

                //点击撤销申请按钮
                $('input[class=operate_btn]').click(function () {
                    var id = $(this).attr('id');
                    $("tr." + id).remove();
                });

                //从localStorage中拿出增添的书籍
                if (!!window.localStorage.getItem('add_book')) {
                    var name = JSON.parse(window.localStorage.getItem('add_book'))[0];
                    var unit = JSON.parse(window.localStorage.getItem('add_book'))[2];
                    console.log(name);
                    console.log(unit);
                    $('#admin-tb tbody').append('<tr class="' + name + '"><td>' + name + '</td><td>' + 55 + '</td><td>' + 465 + '</td><td>' + unit + '</td><td><input class="check_btn ' + name + '" type="button" value="查看"></td><td><input class="operate_btn" id="' + name + '" type="button" value="撤回"></td></tr>');
                    $('input#' + name).click(function () {
                        $('tr.' + name).remove();
                    });
                }
            }
        }
    });

    //点击新增书籍按钮
    $('#add_book').click(function () {
        window.open('../add_book_teacher/add_book_teacher.html');
    });
});


