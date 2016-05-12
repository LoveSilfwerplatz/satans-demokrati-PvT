var myaudio = new Audio();
var myaudioURL = null;
var playing = false;

$(document).ready(function() {
    //alert("audio.js körs!");
    // register onclick function for list items in #radioList
    $('#radioList').on('click', 'li', function() {
        // remove active css class from all list items
        $('#radioList li').removeClass('active-radio-choice');

        // get the element we just clicked and add active css class to it
        $(this).addClass('active-radio-choice');
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