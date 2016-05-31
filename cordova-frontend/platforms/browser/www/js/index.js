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
var soundInit;
var paused;

$(document).on('pageinit', function() {
    if(myaudio.muted){
        document.getElementById("home-mute-button").src = "img/Icons/Satans_Knapp_Mute.png";
    }
    else if(!!(document.getElementById("home-mute-button"))){
        document.getElementById("home-mute-button").src = "img/Icons/Satans_Knapp_Sound.png";
    }

    if(!!(playing)){
        if(playing){
            if(!!(document.getElementById("ppButtonImg"))){
                if(paused){
                    document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
                }
                else{
                    document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Paus.png"; 
                }

            }

        }
        else{
            if(!!(document.getElementById("ppButtonImg"))) {
                document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
            }
        }
    }



    if(myaudio.muted){
        if(!!(document.getElementById("archive-mute-button"))){
            document.getElementById("archive-mute-button").src = "img/Icons/Satans_Knapp_Mute.png";
        }

    }
    else if(!!(document.getElementById("archive-mute-button"))){

        document.getElementById("archive-mute-button").src = "img/Icons/Satans_Knapp_Sound.png";

    }

});

$(document).ready(function(){
    muted = false;
    paused = false;
});