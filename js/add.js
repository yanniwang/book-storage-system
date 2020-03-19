var ip = 'http://47.98.42.85:9099';
var add_url = '/bookOrdering/addBook';
var token = window.sessionStorage.getItem('token');
if (window.location.hostname === '' || window.location.hostname === 'localhost') {
    add_url = ip + add_url;
}

var headersObj = {};
if (token !== null) {
    headersObj['token'] = "" + token;
    headersObj['Content-Type'] = "application/json";
}

$(function () {
    $('#submit').click(function () {
        $.ajax({
            url: add_url,
            type: 'POST',
            dataType: 'json',
            headers: headersObj,
            data: JSON.stringify({
                "indexId": $('#index').val(),
                "bookName": $('#name').val(),
                "author": $('#author').val(),
                "price": $('#price').val(),
                "total": $('#total').val(),
                "synopsis": $('#synopsis').val(),
                "remainder": $('#remainder').val(),
            }),
            contentType: 'application/json; charset=UTF-8',
            success: function (result) {
                if (!!result) {
                    console.log(result);
                    window.location.href = 'add_success.html';
                }
            }
        })
    });
});
