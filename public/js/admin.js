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
    buttonState = "VISA ALLA RADIOTORN";
} else if(buttonState === "L"){
    buttonState = "VISA ALLA SÄNDNINGAR";
} else if(buttonState === "A"){
    buttonState = "VISA ALLA ANVÄNDARE"

} else if(buttonState === ""){
    buttonState = "INGENTING ATT VISA"
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

function submitTower(){
    var $latitude = $("#latitude");
    var $longitude = $("#longitude");
    var $range = $("#towerRadius");
    var crossed = false;

    var addTower = new google.maps.LatLng($latitude.val(), $longitude.val());

    $.getJSON(play_url + "/getTowers", function (towers) {

        $.each(towers, function(row , tower) {

            var checkTower = new google.maps.LatLng(tower.latCoordDD, tower.longCoordDD);

            if (google.maps.geometry.spherical.computeDistanceBetween(addTower,checkTower) <= (($range.val()*2) + (tower.range*2))) {
                console.log("----INSIDE----\n----"+tower.name+"----");
                crossed = true;
                return false;
            }else{
                //DO NOTHING
                console.log("OUTSIDE");
            }

        });
        if(!crossed){
            console.log("Submit");
            document.myTower.submit();
        }else{
            var message = $('#message');
            message.html('<pre>Tornets räckvidd överlappar med andra torn!\nVar god minska räckvidden.</pre>');
            console.log("Not allowed");
        }
    });
}


