import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealDetailComponent from "../components/MealDetailsComponent";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from '../components/FooterComponent'

const RecipeDetailPageContainer = () => {
  const { id } = useParams(); // Obținem ID-ul rețetei din URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
    const foundRecipe = Object.values(mealPlans).flat().find(recipe => recipe.idMeal === id);

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.meals && data.meals.length > 0) {
            setRecipe(data.meals[0]);
          } else {
            console.error("Recipe not found in API response");
          }
        })
        .catch(error => console.error("Error fetching recipe details:", error));
    }
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const instructions = recipe.strInstructions ? recipe.strInstructions.split('\r\n') : []; // Split the instructions into an array if it's a string
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="container">
      <HeaderComponent/>
      <MealDetailComponent 
        instructions={instructions}
        data={recipe}
      />
      <FooterComponent/>
    </div>
  );
};

export default RecipeDetailPageContainer;
