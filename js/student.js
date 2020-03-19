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

$(function () {

    $.ajax({
        url: teacher_url,
        type: 'POST',
        dataType: 'json',
        headers: headersObj,
        contentType: 'application/json; charset=UTF-8',
        success: function (result) {
            if (!!result) {
                let data = result.data;
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    $('#admin-tb tbody').append('<tr class="' + data[i].book_name + '"><td>' + data[i].index_id + '</td><td>' + data[i].book_name + '</td><td>' + data[i].price + '</td><td>' + data[i].total + '</td><td>' + data[i].remainder + '</td><td><div class="check_btn" id="' + data[i].book_name + '">查看</div></div></td><td><input type="button" class="' + data[i].book_name + '" value="撤销申请"></td><td><button type="button" class="' + data[i].book_name + '">重新申请</button></td></tr>')
                }

                //查看书籍详情
                for (let i = 0; i < data.length; i++) {
                    $('div#' + data[i].book_name).mouseover(function () {
                        $('#show_book_info').text(data[i].synopsis);
                    });
                    $('div#' + data[i].book_name).mouseout(function () {
                        $('#show_book_info').text('');
                    });
                }

                //点击撤销申请按钮
                $('input').click(function () {
                    var this_class = $(this).attr('class');
                    $('button.' + this_class).css('background', 'rgb(211,211,211)');
                    $(this).css('background', 'red');
                });


                //点击重新申请按钮
                $('button').click(function () {
                    var this_class = $(this).attr('class');
                    $('input.' + this_class).css('background', 'rgb(211,211,211)');
                    $(this).css('background', 'green');
                });


                //打印订单信息
                $('#output').click(function () {
                    window.open('../output/output.html');
                })
            }
        }
    })

    //打印


});
