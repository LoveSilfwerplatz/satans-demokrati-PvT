/**
 * Created by andre on 2016-05-11.
 */

$(document).ready(function() {

        var token =  window.localStorage.getItem("token");
        // ait lets go
        $.ajax({
            type: "GET",
            beforeSend: function(request)
            {
                request.setRequestHeader("X-AUTH-TOKEN", token);

            },
            url: 'http://localhost:9000/sesh',
            success: function(data, status, request) {
                
                window.location.replace("index.html");
            },
            error: function(request, status, error) {
                console.log("Gick inte igenom");
            }
        });


})
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

                window.location.replace("index.html");

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

                window.location.replace("login.html");
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
    $('#sessions').click(function(e) {
        var token =  window.localStorage.getItem("token");
        // ait lets go
        $.ajax({
            type: "GET",
            beforeSend: function(request)
            {
                request.setRequestHeader("X-AUTH-TOKEN", token);

            },
            url: 'http://localhost:8000/',
            success: function(data, status, request) {
                console.log(data);
            },
            error: function(request, status, error) {
                console.log("Gick inte igenom");
            }
        });
    });
});