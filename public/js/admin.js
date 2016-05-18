//general buttons
$(document).ready(function() {
    $("#wrap").mouseenter(function(){
        $("#wrap").fadeTo("fast", 1);
    });
    $("#wrap").mouseleave(function(){
        $("#wrap").fadeTo("fast", 0.5);
    });

});


var buttonBackToAdmin = function(){
    window.location.replace("http://localhost:9000/adminT");

};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonBackToAdmin').addEventListener('click',buttonBackToAdmin,false);
});


var buttonBackToBackend = function(){
    window.location.replace("http://localhost:9000/");

};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonBackToBackend').addEventListener('click',buttonBackToBackend,false);
});


var buttonShowUsers = function(){
    window.location.replace("http://localhost:9000/formUsers");
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonShowUsers').addEventListener('click',buttonShowUsers,false);
});


var buttonShowSounds = function(){
    window.location.replace("http://localhost:9000/formSounds");
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonShowSounds').addEventListener('click',buttonShowSounds,false);
});


var buttonShowTowers = function(){
    window.location.replace("http://localhost:9000/formTowers");
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonShowTowers').addEventListener('click',buttonShowTowers,false);
});


var buttonAddTower = function(){
    window.location.replace("http://localhost:9000/addTower");
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonAddTower').addEventListener('click',buttonAddTower,false);
});


var buttonAddSound = function(){
    window.location.replace("http://localhost:9000/addSound");
};
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonAddSound').addEventListener('click',buttonAddSound,false);
});

//adminView




/*Admin
;
:
;*/






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
var play_url = "http://localhost:9000";

function populate() {
    $.getJSON(play_url + "/getTowers", function (towers) {

        var $towerDrop = $("#towerDrop");
        $towerDrop.empty();
        $.each(towers, function(row , object) {
            $.each(object, function(column, value){
                if(column == "name") {
                    $towerDrop.append("<option>" + value + "</option>");
                }
            });
        });
        map();
    });
};

function map(){
    var $towerDrop = $("#towerDrop");
    var tower = $towerDrop.val();
    var lat;
    var long;

    $.getJSON(play_url + "/hgiqktjZuxt?name="+tower, function (towerOb) {
        $.each(towerOb, function(row , object) {
            $.each(object, function(column, value) {
                if (column == "latCoordDD") {
                    lat = value;
                }
                else if(column == "longCoordDD"){
                    long = value;
                }
            });
            if(lat != null && long != null){
                setMarker(lat, long, tower);
            }
        });
    });
};