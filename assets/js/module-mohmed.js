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

            // Trail G-maps current location
            //Code Reference Google  Maps Api
            //https://developers.google.com/maps/documentation/javascript/places
        
            var map, infoWindow;

            function initMap() {
                map = new google.maps.Map(document.getElementById('g-mapz'), {
                    center: {
                        lat: -34.397,
                        lng: 150.644
                    },
                    zoom: 6
                });
                infoWindow = new google.maps.InfoWindow;

                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        infoWindow.setPosition(pos);
                        infoWindow.setContent('Location found.');
                        infoWindow.open(map);
                        map.setCenter(pos);
                    }, function () {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
                }
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
                infoWindow.open(map);
                }
                // ends


                getLocation();




            });

 