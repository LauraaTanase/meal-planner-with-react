import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const RecipeDetailPage = () => {
  const { id } = useParams(); // Obține ID-ul rețetei din parametrii URL
  const [recipe, setRecipe] = useState(null); // Stochează detaliile rețetei
  const [loading, setLoading] = useState(true); // Stochează starea de încărcare

  useEffect(() => {
    const appId = '02ee30ec'; // ID-ul tău API Edamam
    const appKey = '507a040a3ded74c77bff2f59827b078e'; // Cheia ta API
    const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data.recipe);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Afișează un mesaj de încărcare dacă datele sunt încă în curs de obținere
  }

  if (!recipe) {
    return <div>Recipe not found.</div>; // Afișează un mesaj dacă rețeta nu a fost găsită
  }

  return (
    <div>
      <HeaderComponent />
      <div className="container my-4">
        <h1 className="text-center mb-4">{recipe.label}</h1>
        <div className="text-center mb-4">
          <img src={recipe.image} alt={recipe.label} className="img-fluid" style={{ maxWidth: '600px' }} />
        </div>
        <div className="row">
          <div className="col-md-6">
            <h3>Ingredients:</h3>
            <ul>
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li> // Folosește indexul pentru cheia elementului
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
