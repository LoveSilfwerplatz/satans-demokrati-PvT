/*

$(document).ready(function(){
    $(this).ignoreContentEnabled=true;
});


$(document).on("mobileinit", function () {
    $.mobile.ignoreContentEnabled=true;
});

*/

function logout() {
    var token =  window.localStorage.getItem("token");
    var data = "";
    window.localStorage.setItem("token", data);
    $.mobile.changePage("login.html");
}