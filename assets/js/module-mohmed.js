//Mohmed google maps api
$(document).ready(function () {

    var lat;
    var long;
    var queryURL;
    var data = [];


    $('.sidenav').sidenav();

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {

                lat = position.coords.latitude
                long = position.coords.longitude
                queryURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyDjJeZWvxxMbymDJSMvXpXphLrD4lxDP84`
                gmap();
            });

        } else {
            $(`#g-maps`).text("Geolocation is not supported by this browser.")
        }
    }

    function gmap() {

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.results.length; i++) {
                data.push({
                    name: response.results[i].name,
                    opennow: response.results[i].opening_hours.open_now,
                    photo: response.results[i].photos.html_attributions

                })

            }

        })

    }

    getLocation();




});