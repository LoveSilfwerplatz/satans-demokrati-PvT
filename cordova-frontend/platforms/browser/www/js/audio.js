// set to true for local play framework development
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

var soundInit;

// soundcloud init
SC.initialize({
    client_id: '6a0f1d47b7df82417d31a6947ab0032c',
    redirect_uri: "http://localhost:9000/callback"
});

$(document).ready(function() {
    if (!soundInit) {
        myaudio = new Audio();
        myaudioURL = null;
        playing = false;
        soundInit = true;
    }
    

    // register onclick function for list items in #radioList
    $('#radioList').on('click', 'li', function() {
        // remove active css class from all list items
        $('#radioList li').removeClass('active-radio-choice');

        // get the element we just clicked and add active css class to it
        $(this).addClass('active-radio-choice');

        console(isActive(myaudio));
    });

    fetchStuffFromDB();
});

/*
// register onclick function for list items in #radioList
$('#radioList').on('click', 'li', function() {
    // remove active css class from all list items
    $('#radioList li').removeClass('active-radio-choice');

    // get the element we just clicked and add active css class to it
    $(this).addClass('active-radio-choice');
});
*/

function fetchStuffFromDB() {

    $.getJSON(play_url + "/test", function (radios) {
        // empty List
        $('#radioList').empty();

        //add to list
        $.each(radios, function (i, radio) {
            $('#radioList').append(generateRadioLink(radio));
        });
        // refresh list ( Seem to not do anything atm)
        $('#radioList').listview("refresh");
    });
}

function generateRadioLink(radio) {
    // Suppose to make the object into proper format, Not sure if working
    return '<li><a href="javascript:void(0)'
        + '" onclick="swapRadio(\' ' + radio.name + '\',\'' + radio.filepath + '\')">'
        + '<img src="img/characters/03.jpg" />'
        + radio.name
        + '</a></li>';
}

function swapRadio(radioName, filepath) {
    myaudioURL = filepath;
    playStream();
}

function fadeout() {
//var beepTwo = $("#musicBeat");
//beepTwo[0].play();

  //  $("#dan").click(function () {
            console.log ("querty if paused");
        if (myaudio.paused == false) {
            console.log("Lower it!");
            // myaudio[0].animate({volume: 0}, 2000, 'swing', function () {
            console.log("Paused it!");
            fadeoutAudio();
            // });

        } else {
            console.log ("restart!");
            myaudio.volume = 1;
            myaudio.play();
            //myaudio[0].animate({volume: 1}, 2000);
        }
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



var playStream = function () {
    if (!playing) {
        try {
            myaudio = new Audio(myaudioURL);
            myaudio.id = 'playerMyAdio';
            myaudio.play();
            playing = true;
            document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Paus.png";
            myaudio.addEventListener("ended", function(){
                stopStream()
                document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
            })
        } catch (e) {
            alert('no audio support!');
        }
    } else {
        playing = false;
        myaudio.src = "";
        document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
    }
}

function stopStream() {
    playing = false;
    myaudio.src = "";
}

function muteStream(){
    fadeout();
    if(playing){
        if(myaudio.muted){
            myaudio.muted = false;
        }
        else{
            myaudio.muted = true;
        }
    }

}