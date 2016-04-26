// set to true for local play framework development
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

var myaudio = new Audio();
var myaudioURL = null;
// false = locally, true = on server ?
var playing = false;

$(document).ready(function() {
   fetchStuffFromDB();
});

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
        + '" onclick="swapRadio(\' '
        + radio.name
        + '\',\''
        + radio.filepath + '\')">'
        + radio.name
        + '</a></li>';
}

function swapRadio(radioName, filepath) {

    myaudioURL = filepath;
    playStream();
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