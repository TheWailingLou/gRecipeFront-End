$(document).ready(function(){
  $.ajax('/db_test/recipes.json', {
      method: "GET",
      contentType: "application/json"
    })
    .then(recipes => {
      recipes.forEach(function(recipe) {
        console.log(recipe)
        var recipeName = recipe.recipe_name
        var recipeId = recipe.recipe_id
        var authorId = recipe.author_id
        var author = recipe.author_name
        var recipeRating = recipe.average_rating
        var img = recipe.img

        var recipeName = '<a href="/recipes.html?recipeId='+recipeId+'"><h1>'+recipeName+'</h1></a>'
        var authorName = '<a href="/recipes.html?authorId='+authorId+'"><h1>'+author+'</h1></a>'
        var rating = '<div class="recipeStars">'
        for (var i =0; i < 5; i++) {
          if (i < Math.round(recipeRating)) {
            rating += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'
          } else {
            rating += '<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
          }
        }
        rating += '</div>'
        var infoDiv = '<div class="recipeInfoDiv">'+recipeName+rating+authorName+'</div>'
        var recipeImageDiv = '<div class="recipeImageDiv"><img src="'+img+'" alt="'+recipeName+'" class="recipeImg"></div>'
        var htmlInjection = '<div class="singleRecipe">'+recipeImageDiv+infoDiv+'</div>'
        $('.appendIngredient').append(htmlInjection)
      })
    })

    var $thing = $('.classThatHasInfo')
    for (var i = 0; i < $thing.length; i++) {
      $thing[i].val()
    }



})
