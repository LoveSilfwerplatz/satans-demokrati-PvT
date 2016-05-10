
var map;
var infoWindow;

var pos = {
    lat: 59.326784654711666,
    lng: 18.071393966674805
};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15, disableDefaultUI: true

    });
    // Sets the Map Style (Colors and  Stuff
    var Style = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi","elementType":"labels","stylers":[{visibility: 'off'}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
    map.setOptions({styles: Style});

    infoWindow = new google.maps.InfoWindow({
        position: pos,
        map: map,
        content: "404"
    });

}

function setMarker(lat, long, tower) {

    pos.lat = lat;
    pos.lng = long;

    infoWindow.setPosition(pos);
    infoWindow.setContent(tower);
    map.setCenter();
    map.center = pos;

};

var back = function(){
    window.location.replace("http://localhost:9000/");

};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}