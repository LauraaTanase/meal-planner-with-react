// src/pages/RecipeDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Obținem ID-ul rețetei din URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Verificăm dacă rețeta este în localStorage
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
    const foundRecipe = Object.values(mealPlans).flat().find(recipe => recipe.id === id);

    if (foundRecipe) {
      setRecipe(foundRecipe);
    } else {
      // Dacă rețeta nu este în localStorage, facem un apel API
      fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=8732cadd74534cf790c607e69fa6a4ab`)
        .then(response => response.json())
        .then(data => setRecipe(data))
        .catch(error => console.error("Error fetching recipe details:", error));
    }
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">{recipe.title}</h1>
      <div className="text-center mb-4">
        <img src={recipe.image} alt={recipe.title} className="img-fluid" style={{ maxWidth: '600px' }} />
      </div>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map(ingredient => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
};

export default RecipeDetailPage;
