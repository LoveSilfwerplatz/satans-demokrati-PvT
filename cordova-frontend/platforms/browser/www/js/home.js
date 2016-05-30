/*

$(document).ready(function(){
    $(this).ignoreContentEnabled=true;
});


$(document).on("mobileinit", function () {
    $.mobile.ignoreContentEnabled=true;
});

*/
var muted;

$(document).on('pageinit', function() {
    if(myaudio.muted){
        document.getElementById("home-mute-button").src = "img/characters/04.jpg";
    }
    else if(!!(document.getElementById("home-mute-button"))){
        document.getElementById("home-mute-button").src = "img/characters/01.jpg";
    }
});

$(document).ready(function(){
    muted = false;
});
function logout() {
    var token =  window.localStorage.getItem("token");
    var data = "";
    window.localStorage.setItem("token", data);
    $.mobile.changePage("login.html");
}