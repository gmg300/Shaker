$(document).ready(function() {
getRandomDrinks();

function getRandomDrinks() {
    var options = [];
    var queryURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    var drinksList = [];
    for(i= 0; i < 10; i++) {
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(res) {
            console.log(res);
        });
    }  
}

});