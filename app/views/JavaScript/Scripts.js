var play_url = "http://localhost:9000";

$(document).ready(function() {

});
    
/*function fetch() {
    $.getJSON(play_url + "/getTowers", function (towers) {
        // empty List
        $('#towerList').empty();

        //add to list
        $.each(towers, function (name) {
            $('#towerList').append(populate(name));
        });


    });
}*/

function populate() {

/*    $("#text-one").change(function() {
        $("#text-two").load("textdata/" + $(this).val() + ".txt");
    });

    $("#json-one").change(function() {*/


    $.getJSON(play_url + "/getTowers", function (towers) {
            alert("FUNKAR!!!");
            var vals = [];

            vals = towers;

            var $towerDrop = $("#towerDrop");
            $towerDrop.empty();
            $.each(vals, function(lat, long, ID, name, id, range) {
                $towerDrop.append("<option>" + name + "</option>");
            });

        });
   // });

};
