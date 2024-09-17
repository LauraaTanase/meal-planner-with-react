import React from "react";

const MealDetailComponent = ({ instructions, data }) => {
  // Verifică dacă `data` este definit înainte de a accesa proprietăți
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className="card-body">
        <h5 className="card-title">Instructions</h5>
        {Array.isArray(instructions) ? (
          instructions.map((instructionRow, index) => (
            <p className="card-text" key={index}>
              {instructionRow}
            </p>
          ))
        ) : (
          <p className="card-text">
            {instructions}
          </p>
        )}
      </div>

      <div className="card-body">
        <h5 className="card-title">Ingredients</h5>
        <ul className="list-group list-group-flush">
          {Array.from({ length: 20 }).map((_, i) => {
            const ingredient = data[`strIngredient${i + 1}`];
            const measure = data[`strMeasure${i + 1}`];
            if (ingredient && ingredient.trim() !== "") {
              return (
                <li className="list-group-item" key={i}>
                  {ingredient} : {measure}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    </>
  );
};

export default MealDetailComponent;
