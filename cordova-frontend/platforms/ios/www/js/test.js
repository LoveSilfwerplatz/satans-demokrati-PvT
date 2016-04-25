// set to true for local play framework development
var debug = false;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

var myaudio = new Audio();
var myaudioURL = null;
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
}

var playStream = function () {
    if (!playing) {
        try {

            myaudio = new Audio(myaudioURL);
            myaudio.id = 'playerMyAdio';
            myaudio.play();
            playing = true;
            $("#playButton").html("Pause");
        } catch (e) {
            alert('no audio support!');
        }
    } else {
        playing = false;
        myaudio.src = "";
        $("#playButton").html("Play");
    }

}
function stopStream() {
    playing = false;
    myaudio.src = "";

}