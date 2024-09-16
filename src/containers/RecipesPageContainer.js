import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCardComponent from "../components/RecipeCardComponent";

const RecipesPageContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = "507a040a3ded74c77bff2f59827b078e";
    const appId = "02ee30ec";
    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${apiKey}&mealType=Breakfast&calories=2300&imageSize=THUMBNAIL&field=image`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Actualizează starea cu rețetele primite
        if (data && data.hits) {
          setRecipes(data.hits); // Folosește data.hits
        } else {
          console.error("No recipes found");
          setRecipes([]); // Setează rețetele la un array gol dacă nu găsește nimic
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setRecipes([]); // Setează rețetele la un array gol în caz de eroare
      });
  }, []); // Array-ul gol pentru a rula doar o singură dată la montare

  const addToMealPlan = (recipe, mealType) => {
    const date = prompt("Select a date to add this recipe (YYYY-MM-DD)");
    if (date) {
      const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};
      
      // Structură separată pe mealType (breakfast, lunch, dinner)
      const updatedMealPlans = {
        ...mealPlans,
        [date]: {
          ...mealPlans[date],
          [mealType]: [...(mealPlans[date]?.[mealType] || []), recipe], // Adăugăm în secțiunea specifică (breakfast, lunch, dinner)
        },
      };
      
      localStorage.setItem("mealPlans", JSON.stringify(updatedMealPlans));
  
      alert(`Recipe "${recipe.label}" has been added to ${mealType} on ${date}!`);
      navigate("/meal-planning"); // Navigăm către pagina de Meal Planning
    }
  };

  return (
    <div className="row">
      {recipes.length > 0 ? (
        recipes.map(({ recipe }) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={recipe.uri}>
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
  );
};

export default RecipesPageContainer;
