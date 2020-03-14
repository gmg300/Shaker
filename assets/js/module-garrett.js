$(document).ready(function() {
  getRandomDrinks();

  function getRandomDrinks() {
    var options = [];
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    var drinksList = [];
    // $("#drinks-view").empty();
    for (i = 0; i < 3; i++) {
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res) {
        console.log(res.drinks[0].strInstructions);
        var drink = res.drinks[0].strDrink;
        var img = res.drinks[0].strDrinkThumb;
        var instructions = res.drinks[0].strInstructions;
        var block = `<div class="card">
                          <div class="card-image waves-effect waves-block waves-light">
                              <img class="drink-image" src="${img}">
                          </div>
                          <div class="card-content">
                              <span class="card-title activator grey-text text-darken-4">${drink}<i class="material-icons right"></i></span>
                              <p><a href="#">This is a link</a></p>
                          </div>
                          <div class="card-reveal">
                              <span class="card-title grey-text text-darken-4">${drink} Recipe<i class="material-icons right">X</i></span>
                              <p>${instructions}</p>
                          </div>
                      </div>`;

        $("#drinks-view").prepend(block);
      });
    }
  }
});
