import React, { useState, useEffect } from 'react';
import RecipeCardComponent from '../components/RecipeCardComponent';
import { useNavigate } from 'react-router-dom';

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]); // Rețete obținute din API
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  // Fetch rețete din API folosind .then()
  useEffect(() => {
    const apiKey = '8732cadd74534cf790c607e69fa6a4ab';

    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=10`)
      .then(response => response.json())
      .then(data => {
        if (data && data.results) {
          setRecipes(data.results);
        } else {
          console.error("No recipes found");
        }
      })
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  const addToMealPlan = (recipe) => {
    setSelectedRecipe(recipe);
    const date = prompt("Select a date to add this recipe (YYYY-MM-DD)"); // Simulare selecție dată
    if (date) {
      setSelectedDate(date);

      // Stocăm rețeta în localStorage pentru data selectată
      const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
      const updatedMealPlans = { 
        ...mealPlans, 
        [date]: [...(mealPlans[date] || []), recipe] 
      };
      localStorage.setItem('mealPlans', JSON.stringify(updatedMealPlans));

      alert(`Recipe "${recipe.title}" has been added for the date ${date}!`);

      // Navigăm către pagina Meal Plan
      navigate('/meal-planning');
    }
  };

  return (
    <div className="container">
      <h1>Recipes</h1>
      <div className="row">
        {recipes && recipes.length > 0 ? (
          recipes.map(recipe => (
            <div className="col-md-4" key={recipe.id}>
              <RecipeCardComponent recipe={recipe} />
              <button className="btn btn-primary mt-2" onClick={() => addToMealPlan(recipe)}>
                Add to Meal Plan
              </button>
            </div>
          ))
        ) : (
          <p>No recipes available.</p> // Mesaj de fallback în caz că nu există rețete
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
