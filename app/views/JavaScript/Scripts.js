var play_url = "http://localhost:9000";

$(document).ready(function() {

});

function populate() {

    $.getJSON(play_url + "/getTowers", function (towers) {


        var $towerDrop = $("#towerDrop");
        $towerDrop.empty();
        $.each(towers, function(index , value) {
            $.each(value, function(id, name){
                if(id == "name") {
                    $towerDrop.append("<option>" + name + "</option>");
                }
            });
        });
    });
};
