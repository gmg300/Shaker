$(document).ready(function() {
  var savedDrinks = [];

  getSavedDrinks();
  getDrinks();

  $(document).on("click", ".save-drink", function(e) {
    e.preventDefault();
    var element = $(this);
    var selectedDrink = $(this)
      .closest(".card-content")
      .find(".card-title")
      .text();
    var drink = selectedDrink.substring(0, selectedDrink.length - 9);
    console.log(drink);
    saveDrink(element, drink);
  });

  function getDrinks() {
    var options = {
      drinkCount: 5,
      alcohol: true,
      alcoholType: ""
    };
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    var drinksList = [];
    // $("#drinks-view").empty();
    for (i = 0; i < options.drinkCount; i++) {
      // loop over ajax query for as many drinks as user specifies
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(res) {
        console.log(res.drinks[0]);
        renderDrinks(res);
      });
    }
  }

  function formatIngredients(res) {
    var ingredients = [
      {
        name: res.drinks[0].strIngredient1,
        amt: res.drinks[0].strMeasure1
      },
      {
        name: res.drinks[0].strIngredient2,
        amt: res.drinks[0].strMeasure2
      },
      {
        name: res.drinks[0].strIngredient3,
        amt: res.drinks[0].strMeasure3
      },
      {
        name: res.drinks[0].strIngredient4,
        amt: res.drinks[0].strMeasure4
      },
      {
        name: res.drinks[0].strIngredient5,
        amt: res.drinks[0].strMeasure5
      },
      {
        name: res.drinks[0].strIngredient6,
        amt: res.drinks[0].strMeasure6
      },
      {
        name: res.drinks[0].strIngredient7,
        amt: res.drinks[0].strMeasure7
      },
      {
        name: res.drinks[0].strIngredient8,
        amt: res.drinks[0].strMeasure8
      },
      {
        name: res.drinks[0].strIngredient9,
        amt: res.drinks[0].strMeasure9
      },
      {
        name: res.drinks[0].strIngredient10,
        amt: res.drinks[0].strMeasure10
      },
      {
        name: res.drinks[0].strIngredient11,
        amt: res.drinks[0].strMeasure11
      },
      {
        name: res.drinks[0].strIngredient12,
        amt: res.drinks[0].strMeasure12
      },
      {
        name: res.drinks[0].strIngredient13,
        amt: res.drinks[0].strMeasure13
      },
      {
        name: res.drinks[0].strIngredient14,
        amt: res.drinks[0].strMeasure14
      },
      {
        name: res.drinks[0].strIngredient15,
        amt: res.drinks[0].strMeasure15
      }
    ];
    var ingredientsList = "";
    for (i = 0; i < ingredients.length; i++) {
      if (ingredients[i].name !== null && ingredients[i].amt == null) {
        ingredientsList += `<li>${ingredients[i].name}</li>`;
      } else if (ingredients[i].name !== null && ingredients[i].amt !== null) {
        ingredientsList += `<li>${ingredients[i].amt} ${ingredients[i].name}</li>`;
      } else if (ingredients[i].name == null) {
        ingredientsList = ingredientsList;
      }
    }
    return ingredientsList;
  }

  function renderDrinks(res) {
    // Get basic drink info
    var drink = res.drinks[0].strDrink;
    var img = res.drinks[0].strDrinkThumb;
    var instructions = res.drinks[0].strInstructions;
    // Get drink ingredients and measurements, concatenate and format as list
    var formattedIngredients = formatIngredients(res);
    // Check if saved
    var saved = "";
    if(savedDrinks.includes(drink)) {
      saved = `<i class="save-drink fas fa-check-circle green-text text-lighten-2 fa-2x"></i>`
    } else {
      saved = `<i class="save-drink far fa-save red-text text-lighten-2 fa-2x"></i>`
    }
    // Construct HTML card with drink info
    var block = `<div class="col s12 m6">
                      <div class="card hoverable">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img class="activator" src="${img}">
                        </div>
                        <div class="card-content">
                          <span class="card-title activator grey-text text-darken-4">${drink}<i class="material-icons right">more_vert</i></span>
                          <p>${saved}</p>
                        </div>
                       <div class="card-reveal">
                         <span class="card-title grey-text text-darken-4">${drink} Recipe<i class="material-icons right">close</i></span>
                         <p>
                          ${instructions}
                         </p>
                         <span class="card-title grey-text text-darken-4">Ingredients:</span>
                         <ul>
                          ${formattedIngredients}
                         </ul>
                       </div>
                      </div>
                    </div>`;
    $("#drinks-view").prepend(block);
  }

  function saveDrink(element, drink) {
    if (savedDrinks.includes(drink)) {
      return;
    } else {
      savedDrinks.push(drink);
      element.removeClass('far fa-save red-text')
      element.addClass('fas fa-check-circle green-text');
      storeSavedDrinks();
      renderSavedDrinks();
    }
  }

  function storeSavedDrinks() {
    localStorage.setItem("savedDrinks", JSON.stringify(savedDrinks));
  }

  function getSavedDrinks() {
    var storedDrinks = JSON.parse(localStorage.getItem("savedDrinks"));
    if (storedDrinks == null) {
      savedDrinks = [];
    } else {
      savedDrinks = storedDrinks;
    }
    renderSavedDrinks();
  }

  function renderSavedDrinks() {}
});
