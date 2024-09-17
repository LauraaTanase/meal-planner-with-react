import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MealPlanCardComponent from "../components/MealPlanCardComponent";

const MealPlanPageContainer = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};


    setTimeout(() => {
      setMealPlanForDate(
        mealPlans[formattedDate] || { breakfast: [], lunch: [], dinner: [] }
      );
      setLoading(false); 
    }, 1000);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setLoading(true); // 
    setSelectedDate(date);
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-0 shadow-sm rounded"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4 text-center">
            Meal Plan for {selectedDate.toDateString()}
          </h2>

          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }} 
            >
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            ["breakfast", "lunch", "dinner"].map((mealType) => (
              <div key={mealType} className="mb-4">
                <h3 className="text-capitalize">{mealType}</h3>
                {mealPlanForDate[mealType]?.length > 0 ? (
                  <div className="row">
                    {mealPlanForDate[mealType].map((mealPlan) => (
                      <div
                        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                        key={mealPlan.idMeal}
                      >
                        <MealPlanCardComponent
                          strMeal={mealPlan.strMeal}
                          strThumb={mealPlan.strMealThumb}
                          idMeal={mealPlan.idMeal} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No {mealType} planned for this day.</p>
                )}
              </div>
            ))
          )}

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger mt-4"
              onClick={() => {
                const formattedDate = selectedDate.toISOString().split("T")[0];
                const mealPlans =
                  JSON.parse(localStorage.getItem("mealPlans")) || {};

                if (mealPlans[formattedDate]) {
                  const confirmClear = window.confirm(
                    "Are you sure you want to clear all meal plans for this day?"
                  );

                  if (confirmClear) {
                    delete mealPlans[formattedDate]; 
                    localStorage.setItem("mealPlans", JSON.stringify(mealPlans)); 
                    setMealPlanForDate({ breakfast: [], lunch: [], dinner: [] }); 
                    alert(
                      `All meal plans for ${formattedDate} have been cleared.`
                    );
                  }
                } else {
                  alert(`No meal plans found for ${formattedDate}.`);
                }
              }}
            >
              Clear List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanPageContainer;
