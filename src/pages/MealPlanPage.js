import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

import MealPlanCardComponent from '../components/MealPlanCardComponent';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const MealPlanPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState([]);
  const navigate = useNavigate();

  // Funcție pentru a genera un ID unic (poți folosi și uuid)
  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  // Utilizează useEffect pentru a încărca planul de mese din localStorage
  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};
    const mealPlansForDate = mealPlans[formattedDate] || [];

    // Dacă nu au ID-uri unice, le generăm
    const updatedMealPlans = mealPlansForDate.map((mealPlan) => {
      if (!mealPlan.id) {
        mealPlan.id = generateUniqueId();
      }
      return mealPlan;
    });

    setMealPlanForDate(updatedMealPlans);
    // Actualizează localStorage cu noile ID-uri
    mealPlans[formattedDate] = updatedMealPlans;
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
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
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};

    // Filtrăm planul de mese pentru a elimina cel selectat
    const updatedMealPlans = mealPlans[formattedDate].filter((meal) => meal.id !== mealPlan.id);
    
    // Actualizează localStorage cu planul de mese șters
    mealPlans[formattedDate] = updatedMealPlans;
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));

    // Actualizează starea locală
    setMealPlanForDate(updatedMealPlans);
  };

  return (
    <div className="container-fluid my-4">
      <HeaderComponent />
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
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={mealPlan.id}>
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
      <FooterComponent />
    </div>
  );
};

export default MealPlanPage;
