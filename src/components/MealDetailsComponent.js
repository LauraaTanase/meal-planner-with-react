import React from "react";

const MealDetailsComponent = ({ instructions, ingredients, data , strMealThumb}) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      {/* Afișăm instrucțiunile */}
      <div className="card-body">
        <h5 className="card-title">Instructions</h5>
        {Array.isArray(instructions) ? (
          instructions.map((instructionRow, index) => (
            <p className="card-text" key={index}>
              {instructionRow}
            </p>
          ))
        ) : (
          <p className="card-text">{instructions}</p>
        )}
      </div>

      {/* Afișăm ingredientele și măsurile */}
      <div className="card-body">
        <h5 className="card-title">Ingredients</h5>
        <ul className="list-group list-group-flush">
          {ingredients.map((ingredient,strThumb, index) => (
            <li className="list-group-item" key={index}>
              {ingredient.ingredient} : {ingredient.measure} : {strMealThumb}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MealDetailsComponent;
