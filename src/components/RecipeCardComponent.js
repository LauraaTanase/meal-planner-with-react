import React from "react";

const RecipeCardComponent = ({ recipe, onAddToMealPlan }) => {
  return (
    <div className="card mb-4 shadow-sm d-flex flex-column h-100">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="card-img-top img-fluid"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column flex-grow-1">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">Some details about the recipe.</p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <a href={`/recipe/${recipe.id}`} className="btn btn-primary me-2">
            View Details
          </a>
          <div className="dropdown">
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add to Meal Plan
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onAddToMealPlan(recipe, "breakfast")}
                >
                  Add to Breakfast
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onAddToMealPlan(recipe, "lunch")}
                >
                  Add to Lunch
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => onAddToMealPlan(recipe, "dinner")}
                >
                  Add to Dinner
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardComponent;
