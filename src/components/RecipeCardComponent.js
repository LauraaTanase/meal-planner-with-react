import React from 'react';

const RecipeCardComponent = ({ recipe }) => {
  // Verifică dacă recipe este definit și are un titlu și o imagine
  if (!recipe || !recipe.title || !recipe.image) {
    return <p>Recipe information is missing</p>;
  }

  return (
    <div className="card">
      <img src={recipe.image} alt={recipe.title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        {/* Poți adăuga și alte informații aici */}
      </div>
    </div>
  );
};

export default RecipeCardComponent;
