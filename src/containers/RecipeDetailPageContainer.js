import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

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

}