/**
 * Created by carl-johanlindblad on 2016-05-30.
 */
window.onload = function () {
    if (window.localStorage.getItem("token")) {
        $.mobile.changePage("home.html");
    } else {
        $.mobile.changePage("login.html");
    }
}