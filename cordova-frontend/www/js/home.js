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
        document.getElementById("home-mute-button").src = "img/Icons/Satans_Knapp_Mute.png";
    }
    else if(!!(document.getElementById("home-mute-button"))){
        document.getElementById("home-mute-button").src = "img/Icons/Satans_Knapp_Sound.png";
    }
});

$(document).ready(function(){
    muted = false;
});

var logOut = function() {
    var token =  window.localStorage.getItem("token");
    var data = "";
    window.localStorage.setItem("token", data);
    $.mobile.changePage("login.html");
};