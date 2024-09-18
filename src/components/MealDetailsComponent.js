import React from "react";

const MealDetailsComponent = ({ instructions, ingredients, data }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={data.strMealThumb}
              className="img-fluid rounded-start"
              alt={data.strMeal}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{data.strMeal}</h5>
              <p className="card-text">
                <strong>Category:</strong> {data.strCategory}
              </p>
              <p className="card-text">
                <strong>Cuisine:</strong> {data.strArea}
              </p>
            </div>
          </div>
        </div>
      </div>

{/* //Cardul pentru instructiuni  */}
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Instructions</h5>
          {Array.isArray(instructions) && instructions.length > 0 ? (
            instructions.map((instructionRow, index) => (
              <p className="card-text" key={index}>
                {instructionRow}
              </p>
            ))
          ) : (
            <p className="card-text">{instructions}</p>
          )}
        </div>
      </div>

      {/* Cardul pentru ingrediente */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ingredients</h5>
          <ul className="list-group list-group-flush">
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <li
                  className="list-group-item"
                  key={`${item.ingredient}-${item.measure}-${index}`}
                >
                  {item.ingredient} : {item.measure}
                </li>
              ))
            ) : (
              <li className="list-group-item">No ingredients found.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealDetailsComponent;
