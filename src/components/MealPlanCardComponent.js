import React from 'react';

  // Verificăm dacă mealPlan are datele necesare
  //  if (!mealPlan || !mealPlan.breakfast || !mealPlan.lunch || !mealPlan.dinner) {
  //    return <div>Loading...</div>; // Mesaj de fallback până când datele sunt disponibile
  //  }

// Componentă reutilizabilă pentru secțiuni de Meal Plan (Breakfast, Lunch, Dinner)
const MealSection = ({ title, recipes }) => {
  return (
    <div className="mb-3">
      <h6 className="text-primary">{title}</h6>
      {recipes && recipes.length > 0 ? (
        <ul className="list-group">
          {recipes.map((recipe, index) => (
            <li key={index} className="list-group-item d-flex align-items-center">
              <img
                src={recipe.image}
                alt={recipe.label}
                className="img-thumbnail me-2"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              {recipe.label}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes for {title.toLowerCase()}.</p>
      )}
    </div>
  );
};

const MealPlanCardComponent = ({ mealPlan }) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5>{mealPlan.title || 'Meal Plan'}</h5>
      </div>
      <div className="card-body">
        {/* Secțiuni reutilizabile pentru Breakfast, Lunch și Dinner */}
        <MealSection title="Breakfast" recipes={mealPlan.breakfast} />
        <MealSection title="Lunch" recipes={mealPlan.lunch} />
        <MealSection title="Dinner" recipes={mealPlan.dinner} />
      </div>
    </div>
  );
};

export default MealPlanCardComponent;