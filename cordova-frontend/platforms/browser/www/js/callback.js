/**
 * Created by Theo on 10/05/2016.
 */
/*
 $("#closer").on("load", function(){
 window.setTimeout(window.opener.SC.connectCallback, 1);
 }
*/

window.addEventListener('load', closeFunc());

var closeFunc = function(){
    window.setTimeout(SC.connectCallback, 1);
}