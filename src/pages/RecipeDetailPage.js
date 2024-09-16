import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const RecipeDetailPage = () => {
  const { recipeId } = useParams(); // Obține ID-ul rețetei din URL
  const [recipe, setRecipe] = useState(null); // Stochează detaliile rețetei

  useEffect(() => {
    const fetchRecipe = async () => {
      const apiKey = '8732cadd74534cf790c607e69fa6a4ab'; // Înlocuiește cu cheia ta API
      try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]); // Răspunde la schimbarea ID-ului rețetei

  // Dacă rețeta nu este încă disponibilă, afișează un mesaj de încărcare
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderComponent />
      <div className="container my-4">
        <h1 className="text-center mb-4">{recipe.title}</h1>
        <div className="text-center mb-4">
          <img src={recipe.image} alt={recipe.title} className="img-fluid" style={{ maxWidth: '600px' }} />
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.extendedIngredients.map(ingredient => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h3>Instructions:</h3>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default RecipeDetailPage;
