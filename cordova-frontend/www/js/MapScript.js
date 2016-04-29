/**
 * Created by MachinaDeus on 28/04/2016.
 */

//Only Temp Script, Should probly be combined later when doing the html dynamically
var map;
var testPos = {
    lat: 59.4069349,
    lng: 17.945128
};
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 1, lng: 10},
        zoom: 15, disableDefaultUI: true


    });
    // Sets the Map Style (Colors and  Stuff
    var Style = [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}]
    map.setOptions({styles: Style});
    
    markerTest();
    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocationa.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
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

var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
var marker = new google.maps.Marker({
    position:testPos,
    map: map,
    icon: iconBase + 'schools_maps.png'
})};

