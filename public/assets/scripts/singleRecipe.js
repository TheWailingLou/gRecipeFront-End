$(document).ready(function(){
  var url = window.location.search.substring(1);
  var recipeId = url.split('=')[1]

  // for dom manipulation:
  $.ajax('https://grecipeal.herokuapp.com/recipe/'+recipeId, {
      method: "GET",
      contentType: "application/json"
    })
    .then(mainRecipe => {
      console.log(mainRecipe)
      var img = mainRecipe.url
      var recipeName = mainRecipe.name
      var authorId = mainRecipe.author_id

      // console.log(recipes)
      // var recipe = recipes.filter(function(r){
      //   return r.id === parseInt(recipeId);
      // })[0]
      /////////// This is where the actual get request.then will start
      $('.recipeImg').attr('src', img)
      $('.recipeName').text(recipeName)

      // console.log(recipe)

      $.ajax('https://grecipeal.herokuapp.com/author', {
          method: "GET",
          contentType: "application/json"
        })
        .then(users => {
          console.log(users)
          var author = users.filter(function(a){
            return a.id === parseInt(authorId)
          })[0]
          // console.log(author)
          $('.mainRecipeAuthorName').text(author.name);
        })

      $.ajax('https://grecipeal.herokuapp.com/step', {
          method: "GET",
          contentType: "application/json"
        })
        .then(recipeSteps => {
          console.log(recipeSteps)
          var steps = recipeSteps.filter(function(s){
            console.log(s.recipe_id)
            return s.recipe_id === parseInt(recipeId)
          })
          console.log(steps)
          steps.forEach(function(individualStep, index){
            // console.log(individualStep.step)
            var htmlSnip = '<h3><span class="stepNumber">'+individualStep.number+'</span> '+individualStep.description+'</h3>'
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
      console.log(ingredientsWithQuantity)
      $.ajax('https://grecipeal.herokuapp.com/ingredient', {
          method:"GET",
          contentType:"application/json"
        })
        .then(ingredientArr => {
          ingredientsWithQuantity.forEach(function(ing){
            // console.log(ing.ingredient_id, ingredientArr[0].id)

            var ingredientName = ingredientArr.filter(function(ingWithInfo){
              // console.log(ingWithInfo.id === ing.ingredient_id)
              return ingWithInfo.id === ing.ingredient_id
            })[0].name
            // console.log(ingredientName)
            var ingredientQuantity = ing.quantity;
            var ingredientUnits = ing.unit
            var htmlSnip = '<h3>'+ingredientQuantity+ ' '+ ingredientUnits+' '+ingredientName+'</h3>'
            $('.ingredientsDiv').append(htmlSnip)
          })
        })
    })
    .catch(err => console.log(err))

  $.ajax('https://grecipeal.herokuapp.com/review', {
      method: "GET",
      contentType:"application/json"
    })
    .then(reviews => {
      reviewArr = reviews.filter(r => {
        return r.recipe_id === parseInt(recipeId)
      })

      reviewArr.forEach(function(singleReview){
        // console.log(singleReview.body)

        var ratingSnippet = '<div class="recipeRating">';
        for (var i =0; i < 5; i++) {
          if (i < Math.round(singleReview.rating)) {
            ratingSnippet += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'
          } else {
            ratingSnippet += '<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
          }
        }
        var reviewBodySnippet = '<p>'+singleReview.body+'</p>'
        ratingSnippet += '</div>'
        $.ajax('https://grecipeal.herokuapp.com/author', {
            method: "GET",
            contentType:"application/json"
          })
          .then(authors => {
            var reviewAuthor = authors.filter(function(user){
              return user.id === singleReview.author_id
            })[0]
            var authorSnippet = '<h2>'+reviewAuthor.name+'</h2>'
            var editButtons = '<div class="btn-group editDeleteButtons" role="group" aria-label="..."><button type="button" class="btn btn-default editRecipe" postId={{post_id}}>Edit</button><button type="button" class="btn btn-default deleteRecipe" postId={{post_id}}>Delete</button></div>'
            var reviewHTML = '<div class="singleReview">'+ratingSnippet+authorSnippet+reviewBodySnippet+editButtons+'</div>'
            $('.recipeComments').append(reviewHTML)
          })

      })

      var avgRating = reviewArr.reduce(function(acc, next){
        acc += parseInt(next.rating)
        return acc
      }, 0)/reviewArr.length
      var ratingSnippet = "";
      for (var i =0; i < 5; i++) {
        if (i < Math.round(avgRating)) {
          ratingSnippet += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>'
        } else {
          ratingSnippet += '<span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>'
        }
      }
      $('.recipeRating').append(ratingSnippet)
    })
    .catch(err => console.log(err))


  //// actual get request
  // $.ajax('/recipes/'+recipeId, {
  //     method: "GET",
  //     contentType: "application/json"
  //   })
  //   .then(recipe => {
  //
  //   })
  var rating = 1;
  var starIndex = 1;
  var ratingSet = false;
  var hoverAny = false;
  $('[star]').hover(function(){
    starIndex = parseInt($(this).attr('star'))
    for(var i=0; i<starIndex; i++){
      $('[star="'+(i+1).toString()+'"]').attr('class', 'glyphicon glyphicon-star')
    }


    // $(this).attr('class', 'glyphicon glyphicon-star')
  }, function(){

    if (hoverAny) {
      for(var i=0; i<starIndex; i++){
        $('[star="'+(i+1).toString()+'"]').attr('class', 'glyphicon glyphicon-star-empty')
      }
      hoverAny = false;
    } else {
      if (!ratingSet) {
        for(var i=0; i<starIndex; i++){
          $('[star="'+(i+1).toString()+'"]').attr('class', 'glyphicon glyphicon-star-empty')
        }
      } else {
        for(var i=0; i<5; i++){
          if (i < rating) {
            $('[star="'+(i+1).toString()+'"]').attr('class', 'glyphicon glyphicon-star')
          } else {
            $('[star="'+(i+1).toString()+'"]').attr('class', 'glyphicon glyphicon-star-empty')
          }
        }
      }
    }

  })
  $('[star]').click(function(){
    rating = parseInt($(this).attr('star'))
    ratingSet = true;
    console.log(rating)
  })

  $('.editRecipe').click(function(){
    location.href = "/editRecipe.html?recipeId="+recipeId
  })

})
