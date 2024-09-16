import React from 'react';

const MealPlanCardComponent = ({ strMeal, strThumb }) => {
  return (
    <div className="card mb-4 shadow-md border-0 rounded">
      <div className="card-body">
        <img
          src={strThumb}
          alt={strMeal}
          className="img-thumbnail me-3 rounded"
          style={{ width: '120px', height: 'auto', objectFit: 'cover' }}
        />
        <span className="fw-bold">{strMeal}</span>
      </div>
    </div>
  );
};

export default MealPlanCardComponent;