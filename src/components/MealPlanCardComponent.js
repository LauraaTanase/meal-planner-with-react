// components/MealPlanCard.js
import React from 'react';

const MealPlanCard = ({ mealPlan }) => {
  return (
    <div className="card mb-4">
      <div className="card-header bg-info text-white">
        <h5>{mealPlan.day}</h5>
      </div>
      <div className="card-body">
        <h6>Breakfast: {mealPlan.breakfast}</h6>
        <h6>Lunch: {mealPlan.lunch}</h6>
        <h6>Dinner: {mealPlan.dinner}</h6>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-secondary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
