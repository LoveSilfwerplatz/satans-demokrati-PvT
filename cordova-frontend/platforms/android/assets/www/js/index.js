/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $(document).ready(function() {
            $('#login-form').submit(function(e) {
                console.log("NU KÖR VI");
                var formData = $("#login-form").serializeArray();
                var URL = $("#login-form").attr("action");
                var name = $('#name').val();
                var password = $('#password').val();

                e.preventDefault();
                if (device.platform == 'Android') {


                    requestPlugin = function (str, callback) {
                        cordova.exec(callback, callback, "postrqplugin", "login", str);
                    };

                    requestPlugin(['https://satans-demokrati-72.herokuapp.com/login',
                        'name=' + name + '&password=' + password], function (echoValue) {


                        window.localStorage.setItem("token", echoValue);
                        if (echoValue == "fail") {
                            alert("Wrong name/password combination");
                        }
                        else {
                            window.location.replace("home.html");

                        }

                    });
                }
                else{
                    $.post(URL, formData, function(data, textStatus, jqXHR) {
                        console.log(data);
                        window.localStorage.setItem("token", data);
                        window.location.replace("home.html");

                        // För att hämta var value = window.localStorage.getItem("token");
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        alert("Wrong name/password combination");
                        //Materialize.toast("Wrong password/username provided.", 10000);

                    });

                }
            });
            $('#register-form').submit(function(e) {
                e.preventDefault();

                var name = $('#name').val();
                var password = $('#password').val();
                var email = $('#email').val();

                if (device.platform == 'Android') {
                    requestPlugin = function (str, callback) {
                        cordova.exec(callback, callback, "BackgroundMode", "login", str);
                    };

                    requestPlugin(['https://satans-demokrati-72.herokuapp.com/signin',
                        'email=' + email + '&password=' + password + '&name=' + name], function (echoValue) {


                        window.localStorage.setItem("token", echoValue);
                        if (echoValue == "fail") {
                            alert("Wrong name/password combination");

                        }
                        else {
                            window.location.replace("login.html");
                        }


                    });

                } else {
                    var formData = $("#register-form").serializeArray();
                    var URL = $("#register-form").attr("action");

                    $.post(URL,
                        formData,
                        function(data, textStatus, jqXHR)
                        {
                            window.localStorage.setItem("token", data);

                            window.location.replace("login.html");
                            // För att hämta var value = window.localStorage.getItem("token");
                        }).fail(function(jqXHR, textStatus, errorThrown){
                                alert("Username already exists!");

                    });
                }
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

                    window.location.replace("home.html");
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
                window.location.replace("form.html");
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
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log(id);
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();