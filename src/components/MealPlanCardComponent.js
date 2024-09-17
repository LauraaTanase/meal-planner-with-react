import React from 'react';
import { useNavigate } from 'react-router-dom';

const MealPlanCardComponent = ({ strMeal, strThumb, idMeal }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${idMeal}`); 
  };

  return (
    <div className="card mb-4 shadow-md border-0 rounded" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="card-body d-flex align-items-center">
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
