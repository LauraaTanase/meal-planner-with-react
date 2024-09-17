import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCardComponent from "../components/RecipeCardComponent";
import SearchBarComponent from "../components/SearchBarComponent";

const RecipesPageContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  const fetchData = (searchValue) => {
    setLoading(true); 
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
      })
      .finally(() => {
        setLoading(false); 
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
      
      {loading ? ( 
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default RecipesPageContainer;
