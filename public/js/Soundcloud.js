/**
 * Created by Theo on 06/05/2016.
 */
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

SC.initialize({
    client_id: '6a0f1d47b7df82417d31a6947ab0032c',
    redirect_uri: 'http://localhost:9000/callback'
});

// initiate auth popup.
// Supposed to autoclose after authenticating, but it's not doing that. Unsure why right now, probably some dumb mistake on my part.
$("#connect").on("click", function () {
    SC.connect().then(function () {
        return SC.get('/me');
    }).then(function (me) {
        alert('Hello, ' + me.username);
        $("#username").text(me.username);
        $("#description").val(me.description);
    })
});

/*$("#connect").on("click", function(){
 SC.connect(function(){
 SC.get("/me", function(me){
 $("#username").text(me.username);
 $("#description").val(me.description);
 });
 });
 });*/

/*$("#update").on("click", function () {
    SC.put("/me", {user: {description: $("#description").val()}}, function (response, error) {
        if (error) {
            alert("Some error occured: " + error.message);
        } else {
            alert("Profile description updated!");
        }
    });
});*/

// Stuff below is basically taken verbatim from Codecademy course, it's really no more than a placeholder right now.
$(document).ready(function () {
    /*$('#startRecording a').click(function(e){
     updateTimer(0);
     $('#startRecording').hide();
     $('#startRecording').show();
     e.preventDefault();
     SC.record({
     progress: function(ms, avgPeak){
     updateTimer(ms)
     }
     });
     });
     $('#stopRecording a').click(function(e){
     SC.recordStop;
     $('#playBack').show();
     $('#upload').show();
     $('#stopRecording').hide();
     e.preventDefault();
     });
     $('#playBack a').click(function(e){
     e.preventDefault();
     updateTimer(0);
     SC.recordPlay({
     progress: function(ms){
     updateTimer(ms);
     }
     });
     });*/
    $('#upload a').click(function (e) {
        e.preventDefault();
        SC.connect({
            connected: function () {
                SC.upload({
                    track: {
                        file: "fileGoesHere",
                        title: "My Codecademy recording",
                        sharing: "private"
                    }
                })
            }
        })
    })
});

// Helper methods for our UI.

function updateTimer(ms) {
    // update the timer text. Used when we're recording
    $('.status').text(SC.Helper.millisecondsToHMS(ms));
}

// Bogus comment, man