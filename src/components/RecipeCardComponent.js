// components/RecipeCard.js
import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <img src={recipe.image} className="card-img-top" alt={recipe.title} />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">{recipe.description.substring(0, 100)}...</p>
        <ul className="list-group list-group-flush">
          {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
            <li key={index} className="list-group-item">{ingredient}</li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-primary">Vezi Detalii</button>
          <small className="text-muted">{recipe.time} minute</small>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
