$(document).ready(function () {


    var lat;
    var long;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                lat = position.coords.latitude
                long = position.coords.longitude

                $(`#g-maps`).append(`<iframe width="100%" height="540" frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/search?q=bars%20near%20me&key=AIzaSyDjJeZWvxxMbymDJSMvXpXphLrD4lxDP84" allowfullscreen></iframe>`)

            });
            initMap()

        } else {
            $(`#g-maps`).text("Geolocation is not supported by this browser.")
        }
    }

    getLocation();




});