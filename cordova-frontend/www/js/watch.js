var radio;
var searching;
var geoLoc;
var watchID;
var lastPos;
$( document ).ready(function() {
    bind();
});

    function bind() {
        radio = $('#radio');
        searching = false;
        lastPos = {
            lat: null,
            long:  null
        }
    };

    function onSuccess(pos) {
        if(lastPos.lat == null && lastPos.long == null){

            lastPos.lat = pos.coords.latitude;
            lastPos.long = pos.coords.longitude;
            tryPos();
        }else if(lastPos.lat == pos.coords.latitude &&
                    lastPos.long == pos.coords.longitude){
            //Do nothing
        }else{
            lastPos.lat = pos.coords.latitude;
            lastPos.long = pos.coords.longitude;
            tryPos();
        }
    };

    function tryPos(){
        
    };

    function errorHandler(err) {
        if(err.code == 1) {
            alert("Error: Access is denied!");
        }

        else if( err.code == 2) {
            alert("Error: Position is unavailable!");
        }
    };

    function startWatch(){

        if(!searching){
            if (navigator.geolocation) {
                // timeout at 30 seconds
                var options = {timeout: 30000};
                geoLoc = navigator.geolocation;
                watchID = this.geoLoc.watchPosition(onSuccess, errorHandler, options);
            }

            else {
                alert("This browser does not support geolocation!");
            }
        }else{
            navigator.geolocation.clearWatch(watchID);
        }
        change();

    };

    function change(){

        if(!searching){
            radio.html('<p>Stop</p>');
            searching = true;
        }else{
            radio.html('<p>Find station</p>');
            searching = false;
        }

    };

