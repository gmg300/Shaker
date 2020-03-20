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
                console.log(queryURL)
                // gmap();
                //  beg 
                var map;
                var service;
                var infowindow;

                function initialize() {
                    var pyrmont = new google.maps.LatLng(41, -87);

                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 15
                    });

                    var request = {
                        location: pyrmont,
                        radius: '500',
                        types: ['bar']
                    };

                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                }
                google.maps.event.addDomListener(window, "load", initialize);

                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            console.log(place.name);
                            console.log(place.place_id);
                            createMarker(results[i]);
                        }
                    }
                }
                initialize();

                // end
            });

        } else {
            $(`#g-maps`).text("Geolocation is not supported by this browser.")
        }
    }

    function gmap() {

        $.ajax({
            crossDomain: true,
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)

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