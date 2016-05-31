var radio;              //Html radio "button"
var searching, found;   //Booleans
var geoLoc;             //HTML5 geolocation object
var watchID;            //Var created to end watchPosition upon "Stop" "Button" press
var lastPos;            //Used to preemptively kill unnecesary position checks
var watch_play_url;     //URL
var myaudio = new Audio();
var myaudioURL = null;
var playing = false;
var defaultTower = "None" ;// Default vaule should be None, otherwise it will not no what to do!
var currentTower;// Will Be set to other vaules during script.

$( document ).ready(function() {
    bind();
});

function bind() {
    radio = $('#radio');
    searching = false;
    lastPos = {
        lat: null,
        long:  null
    };
    found = false;
    watch_play_url = "http://localhost:9000";
}

function posHandler(pos) {
    console.log("ping");
    if(lastPos.lat == pos.coords.latitude &&
        lastPos.long == pos.coords.longitude){
        //Do nothing
    }else{
        lastPos.lat = pos.coords.latitude;
        lastPos.long = pos.coords.longitude;

        tryPos(pos);
    }
}

function tryPos(pos){
    console.log("New position");
    $.getJSON(watch_play_url + "/getTowers", function (towers) {
        console.log("Retrieved JSON");
        $.each(towers, function(i, tower) {

            console.log("TestStart \n userPos: " + pos.coords.latitude + ", " + pos.coords.longitude + "\n towerPos: " + tower.latCoordDD + ", " + tower.longCoordDD + "\n");

            var towerPos = new google.maps.LatLng(tower.latCoordDD, tower.longCoordDD);
            var userPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

            if (google.maps.geometry.spherical.computeDistanceBetween(userPos,towerPos) <= tower.range) {
                console.log(tower.name+' => is in searchArea');
                var token = window.localStorage.getItem("token");

                $.getJSON(watch_play_url + "/getUserByToken?token="+token, function (userName) {
                    try {
                        $.get(watch_play_url + "/addTowerToUser?userName="+userName+"&towerName="+tower.name);
                    }catch(err){
                        console.log(err);
                    }
                });

                alert("Tower found!");


                if (currentTower != tower.name){
                    $.getJSON(watch_play_url + "/getTowerSounds?towerId="+tower.id, function (towerSounds) {
                        currentTower = tower.name;
                        playRadio(towerSounds);

                    })}

            }
            else{
                console.log(tower.name + " Not Found");
                if(currentTower != defaultTower);
                $.getJSON(watch_play_url + "/getDefaultBroadcast?", function (defaultBroadcast) {
                    currentTower = defaultTower;
                    playRadio(defaultBroadcast);
                })

            }
            console.log(" ");

            if(found) {
                return false;
            }
        })

    })
}

function startWatch(){

    if(!searching){
        if (navigator.geolocation) {
            // timeout at 30 seconds
            var options = {timeout: 30000};
            geoLoc = navigator.geolocation;
            watchID = this.geoLoc.watchPosition(posHandler, errorHandler, options);
        }
        else {
            alert("This browser does not support geolocation!");
        }
    }else{
        navigator.geolocation.clearWatch(watchID);
    }
    change();

}

function change(){

    if(!searching){
        radio.html('<p>Stop</p>');
        searching = true;
    }else{
        radio.html('<p>Find station</p>');
        searching = false;
    }

}

function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    }

    else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function playRadio(towerAudio) {
    if (playing == true)
        fadeout();
    else {
        myaudioURL = "http://api.soundcloud.com/tracks/" + towerAudio[0].id + "/stream?client_id=6a0f1d47b7df82417d31a6947ab0032c";
        try {
            myaudio = new Audio(myaudioURL);

            //myaudio.id = 'playerMyAdio';
            myaudio.volume = 1;
            myaudio.play();
            playing = true;
            myaudio.addEventListener("ended", function () {
                // For looping the sound
                myaudio.load();
                myaudio.play();
            })
        } catch (e) {
            alert('no audio support!');
        }

    }
}


function fadeout() {
    fadeoutAudio();

};

function fadeoutAudio () {

    var fadeAudio = setInterval(function () {
        var tempaudiovar = myaudio.volume;

        if ((tempaudiovar - 0.1 > 0.0)) {
            console.log("Fading");
            myaudio.volume -= 0.1;
        }
        else {
            console.log("ClearFade");
            clearInterval(fadeAudio);
            myaudio.pause();
        }
    }, 200);
}


//Untested
function fadeinAudio () {

    var fadeAudio = setInterval(function () {
        var tempaudiovar = myaudio.volume;

        if ((tempaudiovar + 0.1 < 1.0)) {
            console.log("Fading");
            myaudio.volume += 0.1;
        }
        else {
            console.log("ClearFade");
            clearInterval(fadeAudio);
            myaudio.pause();
        }
    }, 200);
}