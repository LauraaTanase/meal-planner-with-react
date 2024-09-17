import React from 'react';
import { useNavigate } from 'react-router-dom';

const MealPlanCardComponent = ({ strMeal, strThumb, idMeal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${idMeal}`); 
  };

  return (
    <div
      className="card mb-4 shadow-sm border-0 rounded d-flex flex-column"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={strThumb}
        alt={strMeal}
        className="card-img-top img-fluid"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{strMeal}</h5>
      </div>
    </div>
  );
};

export default MealPlanCardComponent;
