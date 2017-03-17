$(document).ready(function(){
  var url = window.location.search.substring(1);
  var recipeId = url.split('=')[1]



  $.ajax('https://grecipeal.herokuapp.com/recipe/'+recipeId, {
      method: "GET",
      contentType: "application/json"
    })
    .then(mainRecipe => {
      console.log(mainRecipe)
      // var img = mainRecipe.url
      var recipeName = mainRecipe.name
      var authorId = mainRecipe.author_id

      // console.log(recipes)
      // var recipe = recipes.filter(function(r){
      //   return r.id === parseInt(recipeId);
      // })[0]
      /////////// This is where the actual get request.then will start
      // $('.recipeImg').attr('src', img)


      // console.log(recipe)

      $.ajax('https://grecipeal.herokuapp.com/author', {
          method: "GET",
          contentType: "application/json"
        })
        .then(users => {
          var author = users.filter(function(a){
            return a.id === parseInt(authorId)
          })[0]
          // console.log(author)
          // $('.mainRecipeAuthorName').text(author.name);
        })

        $.ajax('https://grecipeal.herokuapp.com/step', {
          method: "GET",
          contentType: "application/json"
        })
        .then(recipeSteps => {
          var steps = recipeSteps.filter(function(s){
            console.log(s)
            return s.recipe_id === parseInt(recipeId)
          })
          // console.log(steps)
          steps.forEach(function(individualStep, index){
            // console.log(individualStep.step)
            var stepNumberSnip = '<span class="stepNumber">'+individualStep.number+'</span>'
            var stepSnip = '<textarea rows="8" cols="80">'+individualStep.description+'</textarea>'
            var removeButton = '<button type="button" class="btn btn-default removeStep">Remove Step</button>'
            var htmlSnip = '<div class="singularStep">' + stepNumberSnip + stepSnip + removeButton + '</div>'
            $('.stepsDiv').append(htmlSnip)
          })

        })
    })

  $.ajax('https://grecipeal.herokuapp.com/ingredient_recipe', {
      method:"GET",
      contentType:"application/json"
    })
    .then(recIng => {
      // console.log(recIng)
      var ingredientsWithQuantity = recIng.filter(function(r){

        return r.recipe_id === parseInt(recipeId);
      })
      $.ajax('https://grecipeal.herokuapp.com/ingredient', {
          method:"GET",
          contentType:"application/json"
        })
        .then(ingredientArr => {
          ingredientsWithQuantity.forEach(function(ing){
            var ingredientName = ingredientArr.filter(function(ingWithInfo){
              return ingWithInfo.id === ing.ingredient_id
            })[0].name
            var quantitySnip = '<input type="number" class="ingredientQuantity" value="'+ing.quantity+'">'
            var ingredientUnits = ing.units
            var unitsSnip = '<input type="text" class="ingredientUnits" value="'+ing.unit+'">'

            var ingNameSnip = '<input type="text" class="ingredientName" value="'+ingredientName+'">'
            var removeIngredient ='<button type="button" class="btn btn-default removeIngredient">Remove</button>'

            var htmlSnip ='<div class="singularIngredient">' + quantitySnip + unitsSnip + ingNameSnip + removeIngredient + '</div>'
            $('.ingredientsDiv').append(htmlSnip)
          })
        })
    })
    .catch(err => console.log(err))

    $('.addStep').click(function(){
      var $stepNums = $('.stepNumber')
      // console.log($stepNums[1])
      // $stepNums.forEach(function(step){
      //   console.log(step)
      // })
      // for (var i=0; i<$stepNums.length; i++) {
      //   console.log($('[stepNumber="'+(i+1).toString()+'"]'))
      // }
      // console.log($stepNums)
      var stepNumberSnip = '<span class="stepNumber">'+$stepNums.length+'</span>'
      var stepSnip = '<textarea rows="8" cols="80"></textarea>'
      var removeButton = '<button type="button" class="btn btn-default removeStep 1">Remove Step</button>'
      var htmlSnip = '<div class="singularStep">' + stepNumberSnip + stepSnip + removeButton + '</div>'
      $('.stepsDiv').append(htmlSnip)
      // console.log($(".removeStep")[0].classList)
      console.log($('.removeStep'))
    })

    $('.addIngredient').click(function(){
      var quantitySnip = '<input type="number" class="ingredientQuantity" value="">'
      var unitsSnip = '<input type="text" class="ingredientUnits" value="">'

      var ingNameSnip = '<input type="text" class="ingredientName" value="">'
      var removeIngredient ='<button type="button" class="btn btn-default removeIngredient">Remove</button>'

      var htmlSnip ='<div class="singularIngredient">' + quantitySnip + unitsSnip + ingNameSnip + removeIngredient + '</div>'
      $('.ingredientsDiv').append(htmlSnip)
    })

    // $('.removeIngredient').on('click', function(){
    //   alert("removeIngredient clicked")
    // })
    // $(".removeStep").click(function(){
    //   alert("anything")
    // })
    // $('.btn').click(function(){
    //   alert("button clicked")
    // })
    $(document).on('click', '.removeStep', function(){
      $(this).parent().hide()
    })

    $(document).on('click', '.removeIngredient', function(){
      $(this).parent().hide()
    })


})
