/**
 * Created by MachinaDeus on 28/04/2016.
 */

//Only Temp Script, Should probly be combined later when doing the html dynamically

function initMap() {
    var mapDiv = document.getElementById('map')
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 44.540, lng: -78.546},
        zoom: 21
    });
}