import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import MealPlanCardComponent from '../components/MealPlanCardComponent';

const MealPlanPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
    console.log('Meal plans for selected date:', mealPlans[formattedDate]);
    setMealPlanForDate(mealPlans[formattedDate] || []);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleEdit = (mealPlan) => {
    // Logica pentru editare
    console.log('Edit:', mealPlan);
  };

  const handleDelete = (mealPlan) => {
    // Logica pentru ștergere
    console.log('Delete:', mealPlan);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Meal Planning</h1>
      <div className="row">
        <div className="col-md-4 mb-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-0 shadow-sm rounded"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">Recipes for {selectedDate.toDateString()}</h2>
          {mealPlanForDate.length > 0 ? (
            <div className="row">
              {mealPlanForDate.map((mealPlan) => (
                <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={mealPlan.day}>
                  <MealPlanCardComponent
                    mealPlan={mealPlan}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
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
