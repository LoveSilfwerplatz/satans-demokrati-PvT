/**
 * Created by andre on 2016-05-11.
 */

$(document).ready(function() {




})

document.addEventListener('deviceready', function () {
    // cordova.plugins.backgroundMode is now available
    //cordova.plugins.backgroundMode.disable();
    //cordova.plugins.backgroundMode.enable();

}, false);
$(document).ready(function() {

    $('#login-form').submit(function(e) {
        console.log("NU KÖR VI");
        e.preventDefault();

        var formData = $("#login-form").serializeArray();
        var URL = $("#login-form").attr("action");


        
        $.post(URL, formData, function(data, textStatus, jqXHR) {
            console.log(data);
            window.localStorage.setItem("token", data);
            $.mobile.changePage("home.html");

            // För att hämta var value = window.localStorage.getItem("token");
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + " " + errorThrown);
            Materialize.toast("Wrong password/username provided.", 10000); 

        });
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

    $('#register-form').submit(function(e) {
        e.preventDefault();

        var formData = $("#register-form").serializeArray();
        var URL = $("#register-form").attr("action");

        $.post(URL,
            formData,
            function(data, textStatus, jqXHR)
            {
                window.localStorage.setItem("token", data);

                $.mobile.changePage("login.html");
                // För att hämta var value = window.localStorage.getItem("token");
            }).fail(function(jqXHR, textStatus, errorThrown)
        {

        });
    });
    
    var token =  window.localStorage.getItem("token");
    // ait lets go
    $.ajax({
        type: "GET",
        beforeSend: function(request)
        {
            request.setRequestHeader("X-AUTH-TOKEN", token);

        },
        url: 'https://satans-demokrati-72.herokuapp.com/sesh',
        success: function(data, status, request) {
            $.mobile.changePage("home.html");
        },
        error: function(request, status, error) {
            console.log("Gick inte igenom");
        }
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
            url: 'https://satans-demokrati-72.herokuapp.com/securedContent',
            success: function(data, status, request) {
                console.log(data);
            },
            error: function(request, status, error) {
                console.log("Gick inte igenom");
            }
        });
    });
    $('#register').click(function(e) {
        $.mobile.changePage("form.html");
    });
    $('#sessions').click(function(e) {
        var token =  window.localStorage.getItem("token");
        // ait lets go
        $.ajax({
            type: "GET",
            beforeSend: function(request)
            {
                request.setRequestHeader("X-AUTH-TOKEN", token);

            },
            url: 'https://satans-demokrati-72.herokuapp.com/',
            success: function(data, status, request) {
                console.log(data);
            },
            error: function(request, status, error) {
                console.log("Gick inte igenom");
            }
        });
    });
});
