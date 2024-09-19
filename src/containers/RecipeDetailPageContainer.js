import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importă useNavigate
import MealVideoTutorial from "../components/MealVideoTutorial";
import MealImageComponent from "../components/MealImageComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RecipeDetailPageContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Creează o instanță a hook-ului useNavigate
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};
    const foundRecipe = Object.values(mealPlans)
      .flat()
      .find((recipe) => recipe.idMeal === id);

    if (foundRecipe) {
      setRecipe(foundRecipe);
      setLoading(false);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.meals && data.meals.length > 0) {
            setRecipe(data.meals[0]);
          } else {
            console.error("Recipe not found in API response");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching recipe details:", error);
          setLoading(false);
        });
    }
  }, [id]);

  // Funcția care navighează la RecipesPage când butonul este apăsat
  const goToRecipesPage = () => {
    navigate("/recipes"); // Redirecționează la pagina Recipes
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="sr-only"> </span>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return <div className="container text-center mt-5">Recipe not found.</div>;
  }

  const instructions = recipe.strInstructions
    ? recipe.strInstructions
        .split("\r\n")
        .map((step) => step.replace(/^Step \d+:/, "").trim())
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
        <button
          style={{ backgroundColor: "004526", color: "#fff" }}
          type="button"
          className="btn btn-md rounded-pill d-block mx-auto my-2"
          onClick={goToRecipesPage}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Recipes
        </button>

        {/* Left side: Recipe details */}
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

              {/* Instructions */}
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

              {/* Ingredients */}
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

        {/* Right side: Image and video */}
        <div className="col-md-4">
          {videoUrl && <MealVideoTutorial videoUrl={videoUrl} />}
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
