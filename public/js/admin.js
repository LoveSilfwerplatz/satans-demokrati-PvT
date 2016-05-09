var buttonBackToAdmin = function(){
    window.location.replace("http://localhost:9000/adminT");

};


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('buttonBackToAdmin').addEventListener('click',buttonBackToAdmin,false);
});