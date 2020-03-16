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
      .val();
    saveDrink(element, selectedDrink);
  });

  function getDrinks() {
    var options = {
      drinkCount: 1,
      alcohol: true,
      alcoholType: ""
    };
    console.log(options);
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    var drinksList = [];
    // $("#drinks-view").empty();
    for (i = 0; i < 1; i++) {
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
    // Construct HTML card with drink info
    var block = `<div class="col s12 m5">
                      <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img class="activator" src="${img}">
                        </div>
                        <div class="card-content">
                          <span class="card-title activator grey-text text-darken-4">${drink}<i class="material-icons right">more_vert</i></span>
                          <p><a class="save-drink"><i class="material-icons hoverable">save_alt</i></a></p>
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

  function saveDrink(element, selectedDrink) {
    if (savedDrinks.includes(selectedDrink)) {
      return;
    } else {
      savedDrinks.push(selectedDrink);
      console.log(element);
      element.find('.material-icons').text('check_circle');
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
