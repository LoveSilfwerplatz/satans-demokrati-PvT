/**
 * Created by MachinaDeus on 28/04/2016.
 */

var debug = true;
/*
 To correctly change debug (for backend), change is needed in following JS-files:
 admin.js
 Soundcloud.js
 MapScript.js
 */
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";




//Only Temp Script, Should probly be combined later when doing the html dynamically
var map;
var TestPos = {
    lat: 60.124271,
    lng: 19.994100
};
function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 60.124271, lng: 19.994100},
        zoom: 15, disableDefaultUI: true


    });



    // Sets the Map Style (Colors and  Stuff
    var Style = [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#ffffff"}]
    }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{"color": "#000000"}, {"lightness": 13}]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
    }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#08304b"}]}, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
    }, {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{visibility: 'off'}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    }, {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
    }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}]
    }, {"featureType": "transit", "elementType": "all", "stylers": [{"color": "#146474"}]}, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#021019"}]
    }]
    map.setOptions({styles: Style});



    infoWindow = new google.maps.InfoWindow({map: map});
    var iconBase = 'public/images/WirelessTowerStandard.png';
    $.getJSON(play_url + '/getTowers', function(tower) {
        $.each( tower, function(i, value) {
            var marker = new google.maps.Marker({

                position: new google.maps.LatLng (value.latCoordDD, value.longCoordDD),
                map: map,
                icon: iconBase


            });
            var circle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                center: new google.maps.LatLng (value.latCoordDD, value.longCoordDD),
                map: map,
                radius: value.range*2.0


            });

        });


    });

    // Try HTML5 geolocationa.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');

        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    testRange();
    google.maps.event.addListener(map, "click", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        // populate yor box/field with lat, lng
        $("#latitude").val(lat)
        $("#longitude").val(lng)
        console.log(lat, lng);
    });






}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

// Marker Test, HardCoded Location untiil BackEnd gets back with help to convert To json



function clicker(){
    $( document ).ready(function() {
        console.log( "ready!" );
    });
    //$('mapTest').css( 'cursor', 'crosshair' );
};

var back = function(){
    window.location.replace(play_url);

};


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('back').addEventListener('click',back,false);
});

 function rangeCalc(recPosition){
     $.getJSON(play_url + "/getTowers", function (towers){
         $.each(towers,function(i, tower) {
             console.log("TestStart " + recPosition.lng + " " + recPosition.lat);
             var towerPos = new google.maps.LatLng(tower.latCoordDD,tower.longCoordDD);
             var playerPos = new google.maps.LatLng(recPosition.lat,recPosition.lng);
             if (google.maps.geometry.spherical.computeDistanceBetween(playerPos,towerPos) <= tower.range) {
                 console.log(tower.name+' => is in searchArea');
             }
             else{
                 console.log(tower.name + " Not Found");
             }
             console.log(" ");


         })
     })


}

function testRange(){

    var Testpos2 = {
        lat: 60.4069349,
        lng: 19.945128
    };
    var Testpos3 = {
        lat: 59.4069349,
        lng: 17.945128
    };
    var Testpos4 = {
        lat: 59.4069349,
        lng: 13.945128
    };
    console.log("Test");
    rangeCalc(TestPos);
   // console.log("Test2");
   // rangeCalc(Testpos2);
   // console.log("Test3");
   // rangeCalc(Testpos3);
   // console.log("Test4");
   // rangeCalc(Testpos4);
   // prompt("TEST AVS");
}
