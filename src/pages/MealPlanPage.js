import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

const MealPlanPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
    setMealPlanForDate(mealPlans[formattedDate] || []);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`); // Navigăm la pagina detaliilor rețetei
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Meal Planning</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-0 shadow-sm"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">Recipes for {selectedDate.toDateString()}</h2>
          {mealPlanForDate.length > 0 ? (
            <div className="row">
              {mealPlanForDate.map((recipe, index) => (
                <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="card">
                    <img src={recipe.image} alt={recipe.title} className="card-img-top" style={{ width: '100%' }} />
                    <div className="card-body">
                      <h5 className="card-title">{recipe.title}</h5>
                      <button className="btn btn-primary" onClick={() => handleRecipeClick(recipe.id)}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recipes planned for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanPage;
