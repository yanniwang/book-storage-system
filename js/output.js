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
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    $('#admin-tb tbody').append('<tr><td>' + data[i].index_id + '</td><td>' + data[i].book_name + '</td><td>' + data[i].price + '</td></tr>')
                }
            }
        }
    })
});
