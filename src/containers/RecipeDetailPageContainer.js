import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealVideoTutorial from "../components/MealVideoTutorial";
import MealImageComponent from "../components/MealImageComponent";

const RecipeDetailPageContainer = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};
    const foundRecipe = Object.values(mealPlans)
      .flat()
      .find((recipe) => recipe.idMeal == id);

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.meals && data.meals.length > 0) {
            setRecipe(data.meals[0]);
          } else {
            console.error("Recipe not found in API response");
          }
        })
        .catch((error) =>
          console.error("Error fetching recipe details:", error)
        );
    }
  }, [id]);

  if (!recipe) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  const instructions = recipe.strInstructions
    ? recipe.strInstructions.split("\r\n").map((step) => step.replace(/^Step \d+:/, '').trim())
    : [];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient, measure });
    }
  }

  const videoUrl = recipe.strYoutube;

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Partea stângă: Detalii despre rețetă */}
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{recipe.strMeal}</h5>
              <p className="card-text">
                <strong>Category:</strong> {recipe.strCategory}
              </p>
              <p className="card-text">
                <strong>Cuisine:</strong> {recipe.strArea}
              </p>

              {/* Instrucțiuni */}
              <h6 className="card-subtitle mb-2 text-muted">Instructions</h6>
              <ul className="list-unstyled">
                {instructions.length > 0 ? (
                  instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))
                ) : (
                  <li>No instructions available.</li>
                )}
              </ul>

              {/* Ingrediente */}
              <h6 className="card-subtitle mb-2 text-muted">Ingredients</h6>
              <ul className="list-unstyled">
                {ingredients.length > 0 ? (
                  ingredients.map((item, index) => (
                    <li key={`${item.ingredient}-${index}`}>
                      {item.ingredient} : {item.measure}
                    </li>
                  ))
                ) : (
                  <li>No ingredients found.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Partea dreaptă: Imagine și video */}
        <div className="col-md-4">
          {videoUrl && (
            <MealVideoTutorial videoUrl={videoUrl} />
          )}
          <div className="card mb-4">
            <div className="card-body p-0">
              <MealImageComponent
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPageContainer;
