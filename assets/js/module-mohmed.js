//Mohmed google maps api


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position)
            $(`#g-maps`).append(`
        <iframe width="745" height="450" frameborder="0" style="border:0"
src="https://www.google.com/maps/embed/v1/search?q=bars%20near%20me&key=AIzaSyDjJeZWvxxMbymDJSMvXpXphLrD4lxDP84" allowfullscreen></iframe>
        `)
        });
        $(`#g-maps`).attr(`style`, `text-align: center`)

    } else {
        $(`#g-maps`).text("Geolocation is not supported by this browser.")
    }
}

getLocation();