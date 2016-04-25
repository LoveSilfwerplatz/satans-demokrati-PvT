/**
 * Created by carl-johanlindblad on 2016-04-19.
 */


var newUser = function(){
    var reqxuest = new XMLHttpRequest();
    reqxuest.open("POST", "https://satans-demokrati-72.herokuapp.com/addUsers", true);
    reqxuest.send("send");

}

var getUsers = function(){
    console.log('test213');
    var xreq = new XMLHttpRequest();
    xreq.open("GET", "https://satans-demokrati-72.herokuapp.com/getUsers", true);
    xreq.onreadystatechange= function() {

        if (xreq.readyState == 4) {
            if (xreq.status == 200 || xreq.status == 0) {
                var result = JSON.parse(xreq.responseText);
                console.log(result);
            }
        }
    }
    xreq.send();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('getUser').addEventListener('click', getUsers, false);
});
var fetchStuffFromDB = function() {

    // bara för test, det här borde göras med jQuery istället
    var request = new XMLHttpRequest();
    request.open("GET", "https://satans-demokrati-72.herokuapp.com/test", true);


    request.onreadystatechange= function() {

        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var result = JSON.parse(request.responseText);
                console.log(result);
                var data = "<table cellspacing='0'>";
                for (i = 0; i < result.length; i++) {
                    data += "<tr style='border: 1px solid black'>";
                    data += "<td>";

                    // Json key
                    data += result[i].name;

                    data += "</td>";
                    data += "</tr>";
                    data += "<tr>";
                    data += "<td>";

                    // Json key
                    data += '<a href="' + result[i].filepath + '">' + result[i].filepath + '</a>';

                    data += "</td>";
                    data += "</tr>"
                }
                data += "</table>";
                var div = document.getElementById("DBStuffz");
                div.innerHTML = data;

            }
        }
    }
    request.send();

}
var playStream =  function () {
    try {
        var myaudioURL = 'http://stream.4zzzfm.org.au:789/;';
        var myaudio = new Audio(myaudioURL);
        myaudio.id = 'playerMyAdio';
        myaudio.play();
    } catch (e) {
        alert('no audio support!');
    }
}