/**
 * Created by carl-johanlindblad on 2016-04-19.
 */
var fetchStuffFromDB = function() {

    console.log("ett");
    var request = new XMLHttpRequest();
    console.log("två");
    request.open("GET", "https://satans-demokrati-72.herokuapp.com/test", true);
    console.log("tre");
    request.onreadystatechange = function() {
        console.log("fyra");
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var data = JSON.parse(request.responseText);
                console.log(data);
            }
        }
    }
    request.send();

}
