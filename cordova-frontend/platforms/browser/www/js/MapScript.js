/**
 * Created by MachinaDeus on 28/04/2016.
 */
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";


//Only Temp Script, Should probly be combined later when doing the html dynamically
console.log("här");
var map;
var testPos = {
    lat: 59.4069349,
    lng: 17.945128
};
console.log("innan initMap");
function initMap() {
    var mapCanvas = document.getElementById('map');
        mapOptions = {
        center: {lat: 666, lng: 666},
        zoom: 15, disableDefaultUI: true
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);

    // Sets the Map Style (Colors and  Stuff
    var Style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{visibility: 'off'}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
    map.setOptions({styles: Style});

   // markerTest();
    $.getJSON("http://localhost:9000" + "/getTowers", function (marker){
        $.each(marker,function(i, mark) {


            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            var addmark = new google.maps.Marker({
                position: loadpos = {
                    lat: mark.latCoordDD,
                    lng: mark.longCoordDD
                },
                map: map,
                icon: iconBase + 'schools_maps.png'})
            addmark.setPosition(loadpos);
        })})

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
    $("#map").addClass("map-loaded");
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


        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var addmark = new google.maps.Marker({
            position: loadpos = {
                lat: mark.latCoordDD,
                lng: mark.longCoordDD
            },
            map: map,
            icon: iconBase + 'schools_maps.png'})
            addmark.setPosition(loadpos);
        })
})}

