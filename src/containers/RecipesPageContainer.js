import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import RecipeCardComponent from "../components/RecipeCardComponent";
import SearchBarComponent from "../components/SearchBarComponent";
import MealPlanCardComponent from "../components/MealPlanCardComponent";

const RecipesPageContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  const fetchData = (searchValue) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.meals) {
          setRecipes(data.meals);
        } else {
          console.error("No recipes found");
          setRecipes([]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setRecipes([]);
      });
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const addToMealPlan = (recipe, mealType) => {
    const date = prompt("Select a date to add this recipe (YYYY-MM-DD)");
    if (date) {
      const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};

      const updatedMealPlans = {
        ...mealPlans,
        [date]: {
          ...mealPlans[date],
          [mealType]: [...(mealPlans[date]?.[mealType] || []), recipe],
        },
      };

      localStorage.setItem("mealPlans", JSON.stringify(updatedMealPlans));

      alert(
        `Recipe "${recipe.strMeal}" has been added to ${mealType} on ${date}!`
      );
      navigate("/meal-planning");
    }
  };

  return (
    <div className="container">
      <SearchBarComponent
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 mb-4"
              key={recipe.idMeal}
            >
              <RecipeCardComponent
                recipe={recipe}
                onAddToMealPlan={addToMealPlan}
              />
            </div>
          ))
        ) : (
          <p>No recipes available.</p>
        )}
      </div>
      
      {/* Meals results */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Example placeholder if you need to display meal plans */}
        
      </div>
    </div>
  );
};

export default RecipesPageContainer;
