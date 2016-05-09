//general buttons
var buttonBackToAdmin = function(){
    window.location.replace("http://localhost:9000/adminT");

};


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonBackToAdmin').addEventListener('click',buttonBackToAdmin,false);
});



//addSoundView
var play_url = "http://localhost:9000";

function populate() {
    $.getJSON(play_url + "/getTowers", function (towers) {

        var $towerDrop = $("#towerDrop");
        $towerDrop.empty();
        $.each(towers, function(row , object) {
            $.each(object, function(column, value){
                if(column == "name") {
                    $towerDrop.append("<option>" + value + "</option>");
                }
            });
        });
        map();
    });
};

function map(){
    var $towerDrop = $("#towerDrop");
    var tower = $towerDrop.val();
    var lat;
    var long;

    $.getJSON(play_url + "/hgiqktjZuxt?name="+tower, function (tower) {
        $.each(tower, function(row , object) {
            $.each(object, function(column, value) {
                if (column == "latCoordDD") {
                    lat = value;
                }
                else if(column == "longCoordDD"){
                    long = value;
                }
            });
        });
    });
};