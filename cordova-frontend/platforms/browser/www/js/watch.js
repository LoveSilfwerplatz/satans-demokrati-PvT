var radio;              //Html radio "button"
var searching, found;   //Booleans
var geoLoc;             //HTML5 geolocation object
var watchID;            //Var created to end watchPosition upon "Stop" "Button" press
var lastPos;            //Used to preemptively kill unnecesary position checks
var play_url = "http://localhost:9000"; //URL

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
        found = false;
    };

    function onSuccess(pos) {
        if(lastPos.lat == pos.coords.latitude &&
                    lastPos.long == pos.coords.longitude){
            //Do nothing
        }else{
            lastPos.lat = pos.coords.latitude;
            lastPos.long = pos.coords.longitude;

            tryPos(pos);
        }
    };

    function tryPos(pos){

        $.getJSON(play_url + "/getTowers", function (towers) {
            $.each(towers, function(i, tower) {

                console.log("TestStart \n userPos: " + pos.coords.latitude + ", " + pos.coords.longitude + "\n towerPos: " + tower.latCoordDD + ", " + tower.longCoordDD + "\n");
                
                var towerPos = new google.maps.LatLng(tower.latCoordDD, tower.longCoordDD);
                var userPos = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                if (google.maps.geometry.spherical.computeDistanceBetween(userPos,towerPos) <= tower.range) {
                    console.log(tower.name+' => is in searchArea');
                    alert("Tower found!");
                }
                else{
                    console.log(tower.name + " Not Found");

                }
                console.log(" ");

                if(found) {
                    return false;
                }
            })

        })
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

