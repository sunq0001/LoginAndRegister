$(document).ready(function () {
    $('#logout').on('click', function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/validation/logout',
            data: { logout: 1 },
            success:function() {
                window.location = "http://localhost:3000";
            }
        })
    })
}); 