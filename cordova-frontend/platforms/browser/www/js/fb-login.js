var userId = {};
var accessToken = {};

$(document).ready(function() {

    $('#fb-button').click(function (e) {
        console.log("fb-button!!!");
        // console.log("NU KÖR VI");
        // e.preventDefault();
        //
        // var formData = $("#login-form").serializeArray();
        // var URL = $("#login-form").attr("action");
        //
        // $.post(URL, formData, function (data, textStatus, jqXHR) {
        //     console.log(data);
        //     window.localStorage.setItem("token", data);
        //     $.mobile.changePage("home.html");
        //
        //     // För att hämta var value = window.localStorage.getItem("token");
        // }).fail(function (jqXHR, textStatus, errorThrown) {
        //     alert(textStatus + " " + errorThrown);
        //     Materialize.toast("Wrong password/username provided.", 10000);
        //
        // });
    });
});

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        getUserData();
        $.mobile.changePage("home.html");
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1055229771200660',
        cookie: true,  // enable cookies to allow the server to access
                       // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.5' // use graph api version 2.5
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getUserData() {
    FB.api('/me?fields=id,name,first_name,last_name,email,friends', function (response) {
        console.log('response object: ');
        console.log(response);

        if (response.friends.data.length > 0) {

            var friends = "";
            for (friend in response.friends.data) {
                console.log(response.friends.data[friend]);
                friends += response.friends.data[friend].name;
                document.getElementById('status').innerHTML = 'Gemensamma vänner som använder appen: ' + friends;
            }
        }

        $.ajax({

            type: "POST",
            url: "localhost:9000/hasUser",
            dataType: "json",
            data: {
                'email': response.email
            },
            success: function(data) {
                console.log("hasUser:");
                console.log(data);
            },
        });

        /*
         $.ajax({
         type: "POST",
         url: "localhost:9000/fbSignIn",
         dataType: "json",
         data: {
         'name' : response.name,
         'email' : response.email
         },
         success: function() {
         alert("yezzz");
         }
         });*/
    });
}