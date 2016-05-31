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