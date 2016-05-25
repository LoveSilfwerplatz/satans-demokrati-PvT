/**
 * Created by Theo on 06/05/2016.
 */
var debug = true;
/*
 To correctly change debug (for backend), change is needed in following JS-files:
 admin.js
 Soundcloud.js
 MapScript.js
 */
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";




SC.initialize({
    client_id: '6a0f1d47b7df82417d31a6947ab0032c',
    redirect_uri: debug + "/callback"
});

// Add entry to HTML dropdown menu.
function addOption(selectbox, value, text) {
    var optn = document.createElement("OPTION");
    optn.value = value;
    optn.text = text;
    selectbox.append(optn);
}

// initiate auth popup, then populate page with username and drop-down list of uploaded tracks.
$("#connect").on("click", function () {
    SC.connect().then(function () {
        return SC.get('/me');
    }).then(function (me) {
        $("#username").text(me.username);
        // $("#description").text(me.description);
    }).then(function () {
        return SC.get('/me/tracks');
    }).then(function (tracks) {
        $(tracks).each(function (index, track) {
            addOption($("#tracksDrop"), track.id, track.title, track.link);
        });
    });
});


$("#tracksDrop").change(function () {
    var drop = document.getElementById("tracksDrop");
    var currentName = this.options[this.selectedIndex].text;
    var currentID = drop.value;

    document.getElementById("trackName").value = currentName;
    document.getElementById("trackID").value = currentID;
});

$("#towerDrop").change(function(){
    var drop = document.getElementById("towerDrop");
    document.getElementById("towerName").value = drop.value;
});

/*Attempted upload function. Soundcloud API is only meant to allow uploading of sounds recorded within the app,
 * this is based on a workaround for an older version of the API found here:
 * http://stackoverflow.com/questions/13158717/uploading-song-to-soundcloud-account-using-javascript */
/*$('form').submit(function(e) {
 var fd = new FormData();
 SC.connect({
 connected: function () {
 SC.upload({
 track: {
 file: fd.append("track[asset_data]", $(this).find('input[name=file]').prop('files')[0]),
 title: fd.append("track[title]", $(this).find('input[name=title]').val()),
 sharing: private
 }
 })
 }
 });
 });*/