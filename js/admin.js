var ip = 'http://47.98.42.85:9099';
var token = window.sessionStorage.getItem('token');
// console.log(token)
var teacher_url = '/bookOrdering/allBook';
var delete_url = '/bookOrdering/deleteBookInfo';
var update_url = '/bookOrdering/updateBookInfo';
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    teacher_url = ip + teacher_url;
    delete_url = ip + delete_url;
    update_url = ip + update_url;
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
        dataType: 'JSON',
        headers: headersObj,
        contentType: 'application/json; charset=UTF-8',
        success: function (result) {
            if (!!result) {
                let data = result.data;
                for (let i = 0; i < data.length; i++) {
                    $('#admin-tb tbody').append('<tr class="' + data[i].index_id + '"><td>' + data[i].index_id + '</td><td>' + data[i].book_name + '</td><td>' + data[i].price + '</td><td>' + data[i].total + '</td><td>' + data[i].remainder + '</td><td><div style="margin-left: 30%; width: 4rem; height: 1.5rem; line-height: 1.5rem; background-color: #00c1de; border-radius: 0.4rem; cursor: pointer; font-size: 0.8rem;" class="' + data[i].index_id + '">查看订单</div></td><td><input class="change" id="' + data[i].index_id + '" type="button" value="修改"></td><td><button style="height: 1.5rem; width: 3rem;" class="' + data[i].index_id + '" type="button">删除</button></td></tr>')
                }

                //操作中删除的效果
                $('button').click(function () {
                    var index_id = $(this).attr('class');

                    $.ajax({
                        url: delete_url,
                        type: 'POST',
                        dataType: 'JSON',
                        headers: headersObj,
                        data: JSON.stringify({
                            "indexId": index_id
                        }),
                        contentType: 'application/json; charset=UTF-8',
                        success: function (result) {
                            if (!!result) {
                                console.log(result)
                            }
                        }
                    })
                });

                //查看订单
                $('table div').click(function () {
                    window.open('../orders/order-1.html');
                });

                //更新书籍信息
                $('input.change').click(function () {
                    $('.update').css('display', 'block');
                    var id = $(this).attr('id');

                    var update_indexId = $('#update_indexId');
                    var update_book_name = $('#update_book_name');
                    var update_author = $('#update_author');
                    var update_synopsis = $('#update_synopsis');
                    var update_price = $('#update_price');
                    var update_total = $('#update_total');
                    var update_remainder = $('#update_remainder');

                    //点击确认修改按钮
                    $('#update_submit').click(function () {
                        if (id === update_indexId.val()) {
                            if (!!update_indexId.val() && !!update_book_name.val() && !!update_author.val() && !!update_synopsis.val() && !!update_price.val() && !!update_total.val() && !!update_remainder.val()) {
                                $.ajax({
                                    url: update_url,
                                    type: 'POST',
                                    dataType: 'json',
                                    headers: headersObj,
                                    contentType: 'application/json; charset=UTF-8',
                                    data: JSON.stringify({
                                        "indexId": id,
                                        "bookName": update_book_name.val(),
                                        "author": update_author.val(),
                                        "synopsis": update_synopsis.val(),
                                        "price": update_price.val(),
                                        "total": update_total.val(),
                                        "remainder": update_remainder.val()
                                    }),
                                    success: function (result) {
                                        if (!!result) {
                                            console.log(result);
                                            $('.update').css('display', 'none');
                                        }
                                    }
                                })
                            }
                        }
                    })
                })
            }
        }
    });

    $('#add').click(function () {
        window.open('../extra/add.html');
    });
});
