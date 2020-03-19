$(function () {
    $('#submit').click(function () {
        var book_name = $('#name').val();
        var author = $('#author').val();
        var unit = $('#unit').val();
        var arr = [];
        if (!!book_name && !!author && !!unit) {
            arr.push(book_name);
            arr.push(author);
            arr.push(unit);
            window.localStorage.setItem('add_book', JSON.stringify(arr));
            window.location.href = 'add_book_success.html';
        }
    })

})
