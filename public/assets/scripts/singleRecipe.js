$(document).ready(function(){
  var url = window.location.search.substring(1);
  var recipeId = url.split('=')[1]

  // for dom manipulation:
  $.ajax('/db_test/recipeTest2.json', {
      method: "GET",
      contentType: "application/json"
    })
    .then(recipes => {
      console.log(recipes)
      var recipe = recipes.filter(function(r){
        return r.recipe_id === parseInt(recipeId);
      })
      console.log(recipe)
      alert(recipe.recipe_id)
    })

  //// actual get request
  // $.ajax('/recipes/'+recipeId, {
  //     method: "GET",
  //     contentType: "application/json"
  //   })
  //   .then(recipe => {
  //
  //   })
})
