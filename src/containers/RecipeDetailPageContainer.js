import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const appId = '02ee30ec'; // ID-ul tău API Edamam
    const appKey = '507a040a3ded74c77bff2f59827b078e'; // Cheia ta API
    const query = 'pasta'; // Cuvântul cheie pentru căutare
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.hits) {
          setRecipes(data.hits); // Folosește data.hits în loc de data.meals
        } else {
          console.error("No recipes found");
          setRecipes([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      });
  }, []);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recipe.label}</h1>
      <img src={recipe.image} alt={recipe.label} />
      <p>{recipe.description}</p>
      {/* Aici poți adăuga mai multe detalii despre rețetă */}
    </div>
  );
};

export default RecipeDetailPage;
