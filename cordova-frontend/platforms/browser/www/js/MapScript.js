/**
 * Created by MachinaDeus on 28/04/2016.
 */
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

//Only Temp Script, Should probly be combined later when doing the html dynamically
var map;
var testPos = {
    lat: 59.4069349,
    lng: 17.945128
};

// Hardcoded position for Kista C
var posKistaCentrum = {
    lat: 59.40265009817728,
    lng: 17.944733764648438
};

function initMap() {

    if(hardCodedPos){
        $("#kistaButton").hide();
        $("#gpsButton").show();
    } else {
        $("#kistaButton").show();
        $("#gpsButton").hide();
    }

    var mapCanvas = document.getElementById('map');
        mapOptions = {
            center: {lat: 59.40708413574698, lng: 17.94642448425293},
        zoom: 15, disableDefaultUI: true
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);



    // Sets the Map Style (Colors and  Stuff
    var Style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{visibility: 'off'}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
    map.setOptions({styles: Style});

    // get user information
    var token = window.localStorage.getItem("token");
    $.getJSON(play_url + "/getUserByToken?token=" + token, function (user) {

        // add user towers
        $.getJSON(play_url + "/getUserTowers?userName=" + user, function (userTowers) {
            console.log("User towers:");
            console.log(userTowers);
            $.each(userTowers, function(i, tower) {
                // var iconBase = 'img/WirelessTowerStandard.png';

                var markerIcon = new google.maps.MarkerImage('img/WirelessTowerStandard.png',
                                new google.maps.Size(30, 30),
                                new google.maps.Point(0, 0),
                                new google.maps.Point(15, 15));

                var addmark = new google.maps.Marker({
                    position: loadpos = {
                        lat: tower.lat_coord_dd,
                        lng: tower.long_coord_dd
                    },
                    map: map,
                    icon: markerIcon });
                addmark.setPosition(loadpos);
                var circle = new google.maps.Circle({
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 0.1,
                    strokeWeight: 2,
                    fillColor: '#FFFFFF',
                    fillOpacity: 0.15,
                    center: new google.maps.LatLng (tower.lat_coord_dd, tower.long_coord_dd),
                    map: map,
                    radius: tower.broadcast_range*2.0

                });
            });
        });

        // add fb friends towers
        $.getJSON(play_url + "/getFBFriendsTowers?userName=" + user, function (friendsTowers) {
            console.log("Friends towers:");
            console.log(friendsTowers);
            $.each(friendsTowers, function(i, tower) {
                // var iconBase = 'img/WirelessTowerFriend.png';

                var markerIcon = new google.maps.MarkerImage('img/WirelessTowerFriend.png',
                    new google.maps.Size(30, 30),
                    new google.maps.Point(0, 0),
                    new google.maps.Point(15, 15));

                var infoWindow = new google.maps.InfoWindow({
                   content: 'Hittad av: ' + tower.name
                });
                var addmark = new google.maps.Marker({
                    position: loadpos = {
                        lat: tower.lat_coord_dd,
                        lng: tower.long_coord_dd
                    },
                    map: map,
                    icon: markerIcon
                });
                addmark.addListener('click', function() {
                    infoWindow.open(map, addmark);
                });
                addmark.setPosition(loadpos);
                var circle = new google.maps.Circle({
                    strokeColor: '#FFFFFF',
                    strokeOpacity: 0.1,
                    strokeWeight: 2,
                    fillColor: '#FFFFFF',
                    fillOpacity: 0.15,
                    center: new google.maps.LatLng (tower.lat_coord_dd, tower.long_coord_dd),
                    map: map,
                    radius: tower.broadcast_range*2.0

                });
            });
        });

    });

    // old function
    $.getJSON("http://localhost:9000" + "/getTowers", function (marker){

        console.log("marker: ");
        console.log(marker);

        /*
        $.each(marker,function(i, mark) {

            var iconBase = 'img/WirelessTowerStandard.png';
            var addmark = new google.maps.Marker({
                position: loadpos = {
                    lat: mark.latCoordDD,
                    lng: mark.longCoordDD
                },
                map: map,
                icon: iconBase });
            addmark.setPosition(loadpos);
        })
        */
    });


    //var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            // Om hardcoded är true -> position Kista C annars --> position GPS
            if(!hardCodedPos){
                mapscript_pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            } else {
                mapscript_pos = posKistaCentrum;
            }

            var iconBase = 'http://maps.google.com/mapfiles/kml/shapes/man.png';

            var marker = new google.maps.Marker({
                position: mapscript_pos,
                map: map,
                icon: iconBase
            });


            // infoWindow.setPosition(pos);

            // If we want a text over the position uncomment the following:

            // if(!hardCodedPos){
            //     infoWindow.setContent('Location found.');
            //
            // } else {
            //     infoWindow.setContent('Din position (Hårdkodad i MapScript.js)');
            //
            // }


            map.setCenter(mapscript_pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

// Marker Test, HardCoded Location untiil BackEnd gets back with help to convert To json
function markerTest() {
    $.getJSON("http://localhost:9000" + "/getTowers", function (marker){
        $.each(marker,function(i, mark) {


        var iconBase = 'img/WirelessTowerStandard.png';
        var addmark = new google.maps.Marker({
            position: loadpos = {
                lat: mark.latCoordDD,
                lng: mark.longCoordDD
            },
            map: map,
            icon: iconBase});
            addmark.setPosition(loadpos);
        });
})}




// Set position to kista C
function defaultPosKista(){
    hardCodedPos = true;
    $("#gpsButton").show();
    $("#kistaButton").hide();
    
    initMap();

}

// Set position to GPS
function defaultPosGPS(){
    hardCodedPos = false;
    $("#gpsButton").hide();
    $("#kistaButton").show();

    initMap();
}





