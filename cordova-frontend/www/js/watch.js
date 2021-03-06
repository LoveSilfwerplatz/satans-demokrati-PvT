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

    console.log("bind()");

    radio = $('#radio');
    searching = false;
    lastPos = {
        lat: null,
        long:  null
    };
    found = false;
    watch_play_url = "http://localhost:9000";
}

function startWatch(){

    console.log("startWatch()");

    if (!searching || playing) {
        if (hardCodedPos) {

            lastPos.lat == mapscript_pos.lat;
            lastPos.long == mapscript_pos.lng;
            posHandler({
                coords: {
                    latitude: mapscript_pos.lat,
                    longitude: mapscript_pos.lng
                }});
        }
        else if (navigator.geolocation) {
            // timeout at 30 seconds
            var options = {timeout: 30000};
            geoLoc = navigator.geolocation;
            watchID = this.geoLoc.watchPosition(posHandler, errorHandler, options);
        }
        else {
            alert("This browser does not support geolocation!");
        }
    } else {
        navigator.geolocation.clearWatch(watchID);
    }
    change();

}

function posHandler(pos) {

    console.log("posHandler()");

    console.log("ping");

    if(lastPos.lat == pos.coords.latitude &&
        lastPos.long == pos.coords.longitude){
        //Do nothing
    } else {
        lastPos.lat = pos.coords.latitude;
        lastPos.long = pos.coords.longitude;

        tryPos(pos);
    }
}

function tryPos(pos){

    console.log("tryPos()");

    console.log("New position");
    $.getJSON(watch_play_url + "/getTowers", function (towers) {
        console.log("Retrieved JSON");

        var foundtower = false;

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

                foundtower = true;

                // alert("Tower found!");


                if (currentTower != tower.name){
                    $.getJSON(watch_play_url + "/getTowerSounds?towerId="+tower.id, function (towerSounds) {
                        currentTower = tower.name;
                        playRadio(towerSounds[0].id);

                    })}

            }
            else {
                console.log(tower.name + " Not Found");
            }
            console.log(" ");

            if(found) {
                return false;
            }
        })

        if(!foundtower) {
            $.getJSON(watch_play_url + "/getDefaultBroadcast?", function (defaultBroadcast) {
                currentTower = defaultTower;
                playRadio(defaultBroadcast.id);
            })
        }

    })
}

function change(){

        console.log("change()");
        console.log("searching: ");
        console.log(searching);


        if(!searching){
            $('#radio').html('<video id="radioVideo" src="img/radio/Radio_2.mp4"  preload autoplay loop></video>');
            searching = true;
        }else{
            $('#radio').html('<img src="img/radio/Radio_av.png" />');
            searching = false;
        }

}

function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied!");
    }

    else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function playRadio(towerAudio) {

    console.log("playRadio()");

    /*if (playing == true)
        fadeout();
    else {*/

        myaudioURL = "http://api.soundcloud.com/tracks/" + towerAudio + "/stream?client_id=6a0f1d47b7df82417d31a6947ab0032c";
        try {
            // stop previous audio
            if (playing && !!myaudio) {
                myaudio.pause();
                myaudio.currentTime = 0;
            }

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

    /*}*/
}

var mutedRadio = false;
function muteRadio(obj){

    if(mutedRadio){
        obj.src = "img/Icons/Satans_Knapp_Sound.png";
        mutedRadio = false;
        if(playing)
            myaudio.muted = false;
    }
    else{
        obj.src = "img/Icons/Satans_Knapp_Mute.png";
        mutedRadio = true;
        if(playing)
            myaudio.muted = true;
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