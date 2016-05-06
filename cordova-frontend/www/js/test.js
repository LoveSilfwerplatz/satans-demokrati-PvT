// Kör allt i document.ready

$(document).ready(function() {
    $('#login-form').submit(function(e) {
        console.log("NU KÖR VI"); // pröva logga in så ser vi ifall de här ens kör kkk
        e.preventDefault();

        var formData = $("#login-form").serializeArray();
        var URL = $("#login-form").attr("action");

        $.post(URL,
            formData,
            function(data, textStatus, jqXHR) {
                console.log(data);
                window.localStorage.setItem("token", data);
                // token har vi för att göra inloggade request sen aa testa kk
                window.location.replace("map.html"); //så typ? aa kk vi sec

                // För att hämta var value = window.localStorage.getItem("token");
            }).fail(function(jqXHR, textStatus, errorThrown) {
                Materialize.toast("Wrong password/username provided.", 10000); // Testa
        });
    });

    $('#register-form').submit(function(e) {
        e.preventDefault();

        var formData = $("#register-form").serializeArray();
        var URL = $("#register-form").attr("action");

        $.post(URL,
            formData,
            function(data, textStatus, jqXHR)
            {
                window.localStorage.setItem("token", data);
                // För att hämta var value = window.localStorage.getItem("token");
            }).fail(function(jqXHR, textStatus, errorThrown)
        {

        });
    });

    $('#secure-test').click(function(e) {
        var token =  window.localStorage.getItem("token");
        // ait lets go
        $.ajax({
            type: "GET",
            beforeSend: function(request)
            {
                request.setRequestHeader("X-AUTH-TOKEN", token);
            },
            url: 'http://localhost:9000/securedContent',
            success: function(data, status, request) {
                console.log(data);
            },
            error: function(request, status, error) {
                console.log("Gick inte igenom");
            }
        });
    });
});



// set to true for local play framework development
var debug = false;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

var myaudio = new Audio();
var myaudioURL = null;
var playing = false;

$(document).ready(function() {
   fetchStuffFromDB();
});

// register onclick function for list items in #radioList
$('#radioList').on('click', 'li', function() {
    
    // remove active css class from all list items
    $('#radioList li').removeClass('active-radio-choice');

    // get the element we just clicked and add active css class to it
    $(this).addClass('active-radio-choice');
});

function fetchStuffFromDB() {
    $.getJSON(play_url + "/test", function (radios) {
        // empty List
        $('#radioList').empty();

        //add to list
        $.each(radios, function (i, radio) {
            $('#radioList').append(generateRadioLink(radio));
        });
        // refresh list ( Seem to not do anything atm)
        $('#radioList').listview("refresh");

    });


}
function generateRadioLink(radio) {
    // Suppose to make the object into proper format, Not sure if working
    return '<li><a href="javascript:void(0)'
        + '" onclick="swapRadio(\' '
        + radio.name
        + '\',\''
        + radio.filepath + '\')">'
        + radio.name
        + '</a></li>';
}

function swapRadio(radioName, filepath) {

    myaudioURL = filepath;
    playStream();
}

var playStream = function () {
    if (!playing) {
        try {

            myaudio = new Audio(myaudioURL);
            myaudio.id = 'playerMyAdio';
            myaudio.play();
            playing = true;
            document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Paus.png";
            myaudio.addEventListener("ended", function(){
                stopStream()
                document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
            })
        } catch (e) {
            alert('no audio support!');
        }
    } else {
        playing = false;
        myaudio.src = "";
        document.getElementById("ppButtonImg").src = "img/Satan_Knapp_Play.png";
    }

}
function stopStream() {
    playing = false;
    myaudio.src = "";

}



//var signUp = function(){
  //  var reqxuest = new XMLHttpRequest();
  //  reqxuest.open("POST", "http://localhost:8000/index.html", true);
  //  reqxuest.send("send");
//}

var getUsers = function(){
    console.log('test213');
    var xreq = new XMLHttpRequest();
    xreq.open("POST", "https://satans-demokrati-72.herokuapp.com/signUp", true);
    xreq.send();
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('getUser').addEventListener('click', getUsers, false);
})
$.post()


//testskit ftp 165 hby kenta kofot
var takeMeAway = function(){
    console.log("aids");
    //den här reroutar ju  ska ja göra en sån bara? aa kk k
    window.location.replace("form.html");
};

var mapTest = function(){
    window.location.replace("map.html");
    location.reload();
    // alert("reloaded!");
};

var goToAudio = function(){
    window.location.replace("audio.html");
    location.reload();
   // alert("reloaded!");
};

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('takeMeAway').addEventListener('click',takeMeAway,false);
});

/*
$("#plsstop").on('submit', function() {
    //window.location.replace("http://localhost:9000/signUp")
    $email = $("#eemail").val();
    $password = $("#ppassword").val();
    $name = $("#nname").val();
    console.log($.getJSON($email, $password, $name));
    $.ajax({
        url: 'http://localhost:9000/signUp',
        data: $this.serialize(),
        type: 'POST'
    });
    return false;
});
*/

// var formData = $("#myform").serializeArray();
// var URL = $("#myform").attr("action");
// $.post(URL,
//     formData,
//     function(data, textStatus, jqXHR)
//     {
//         //data: Data from server.
//     }).fail(function(jqXHR, textStatus, errorThrown)
// {
//
// });
