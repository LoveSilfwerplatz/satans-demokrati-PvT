/**
 * Created by Theo on 06/05/2016.
 */
var debug = true;
var play_url = debug ? "http://localhost:9000" : "https://satans-demokrati-72.herokuapp.com";

SC.initialize({
    client_id: '6a0f1d47b7df82417d31a6947ab0032c',
    redirect_uri: 'http://localhost:9000/callback'
});

function addOption(selectbox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectbox.append(optn);
}

// initiate auth popup, then populate page with username, profile text and list of uploaded tracks.
$("#connect").on("click", function () {
    SC.connect().then(function () {
        return SC.get('/me');
    }).then(function (me) {
        $("#username").text(me.username);
        $("#description").text(me.description);
        $("#tracks").removeAttr('disabled');
    }).then(function () {
        return SC.get('/me/tracks');
    }).then(function (tracks) {
        $(tracks).each(function (index, track) {
            addOption($("#tracks"), track.title, track.id);
        });
    });
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