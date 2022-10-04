const searchEl = document.getElementById("search"),
 submitEl = document.getElementById("submit"),
 randomEl = document.getElementById("random"),
 mealEl = document.getElementById("meals"),
 singleMeal = document.getElementById("single-meal"),
 resultHeading = document.getElementById("result-heading");

 function searchMeal(e) {
  e.preventDefault();

  singleMeal.innerHTML = "";
  const term = searchEl.value;

  if (term.trim()) {
   fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${term}`)
   .then (res => res.json())
   .then (data => {
    resultHeading.innerHTML = `<h2>Results for "${term}"</h2>`;

    if(data.meals === null ) {
        resultHeading.innerHTML = `<h2>There are no results for "${term}"</h2>`;
    } else {
        mealEl.innerHTML = data.meals.map(meal => 
            `<div class="meal">
              <img src = "${meal.strMealThumb}"/>
              <div class="meal-info" data-mealID = "${meal.idMeal}">
               <h3>${meal.strMeal}</h3>
              </div>
            </div>`
            )
            .join("");
    }
   })
   searchEl.value = ""
  }else {
    alert("please enter a search value")
  }
 }

 function getMealById(mealID) {
  fetch (`https://themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then (res => res.json())
  .then (data => {
    const meal = data.meals[0];

    addMeal(meal);
  })
 }

 function addMeal(meal) {
   const ingredient = [];

   for (let i = 0; i <= 20; i++) {
    if(meal[`ingredient${i}`]) {
       ingredient.push(`${meal[`strMeasure${i}`]} - ${meal[`strIngredient${i}`]}`)
    } else {
   break;
    }
   }

   singleMeal.innerHTML = `<div class= "single-meal">
      <h1>${meal.strMeal}</h1>
      <img src = "${meal.strMealThumb}"/>
      <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ol>
      ${ingredient.map(ing => `<li>${ing}</>`).join("")}
      <ol>
   <div/>`
 }

 submitEl.addEventListener("submit", searchMeal);

 mealEl.addEventListener("click", e => {
     const mealInfo = e.path.find(item => {
      if(item.classList) {
        return item.classList.contains("meal-info")
      } else {
        return false;
      }
    });

    if(mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealID");
      getMealById(mealID)
    }

 })
