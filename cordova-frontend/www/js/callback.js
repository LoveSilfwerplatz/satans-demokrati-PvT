/**
 * Created by Theo on 10/05/2016.
 */
$("#closer").on("load", function(){
    window.setTimeout(window.opener.SC.connectCallback, 1);
};