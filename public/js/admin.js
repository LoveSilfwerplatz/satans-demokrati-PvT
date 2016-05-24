var debug = true;
/*
 To correctly change debug (for backend), change is needed in following JS-files:
 admin.js
 Soundcloud.js
 MapScript.js
 */
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";




//general buttons

$('#buttonBackToAdmin').click(function(){
    window.location.replace(play_url + "/adminT");
});

$('#buttonBackToBackend').click(function(){
    window.location.replace(play_url);
});

$('#buttonShowUsers').click(function(){
    window.location.replace(play_url + "/formUsers");
});

$('#buttonShowSounds').click(function(){
    window.location.replace(play_url + "/formSounds");
});

$('#buttonShowTowers').click(function(){
    window.location.replace(play_url + "/formTowers");
});

$('#buttonAddTower').click(function(){
    window.location.replace(play_url + "/addTower");
});

$('#buttonAddSound').click(function(){
    window.location.replace(play_url + "/addSound");
});


// state stuff for formatting users/sounds/towers on admin
var buttonState = $("#boxText").text().charAt(0).toUpperCase();

if(buttonState === "R"){
    buttonState = "VIEW ALL TOWERS";
} else if(buttonState === "L"){
    buttonState = "VIEW ALL SOUNDS";
} else if(buttonState === "A"){
    buttonState = "VIEW ALL USERS"

} else if(buttonState === ""){
    buttonState = "NOTHING TO DISPLAY"
}

$(document).ready(function() {
    $('#boxHeader').html(buttonState);
});



//addSoundView

function populate() {
    $.getJSON(play_url + "/getTowers", function (towers) {

        var $towerDrop = $("#towerDrop");
        $towerDrop.empty();
        $.each(towers, function(row , tower) {

            $towerDrop.append("<option>" + tower.name + "</option>");
            
        });
        map();
    });
}

function map(){
    var $towerDrop = $("#towerDrop");
    var name = $towerDrop.val();
    var lat, long;

    $.getJSON(play_url + "/getTowerByName?name="+name, function (towerOb) {
        $.each(towerOb, function(row , tower) {

            lat = tower.latCoordDD;
            long = tower.longCoordDD;

            if(lat != null && long != null){
                setMarker(lat, long, name);
            }
        });
    });
}