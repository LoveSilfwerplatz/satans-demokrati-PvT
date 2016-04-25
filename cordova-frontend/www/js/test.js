/**
 * Created by carl-johanlindblad on 2016-04-19.
 */
var myaudio = new Audio();
var myaudioURL = null;
var playing = false;

function fetchStuffFromDB() {
        $.getJSON("https://satans-demokrati-72.herokuapp.com/test", function(radios){
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
function generateRadioLink(radio){
    // Suppose to make the object into proper format, Not sure if working
    return '<li><a href="javascript:void(0)'
            +'" onclick="swapRadio(\' '
            + radio.name
            + '\',\''
            + radio.filepath + '\')">'
            + radio.name
            + '</a></li>';
}

function swapRadio(radioName, filepath){

    myaudioURL = filepath;
}

var playStream =  function () {
    if (!playing) {
        try {

            myaudio = new Audio(myaudioURL);
            myaudio.id = 'playerMyAdio';
            myaudio.play();
            playing = true;
        } catch (e) {
            alert('no audio support!');
        }
    }else{
        playing = false;
        myaudio.src ="";
    }

}
function stopStream() {
    playing = false;
    myaudio.src ="";
}