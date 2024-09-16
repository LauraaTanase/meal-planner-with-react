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

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};
    setMealPlanForDate(
      mealPlans[formattedDate] || { breakfast: [], lunch: [], dinner: [] }
    );
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            className="border-0 shadow-sm rounded"
          />
        </div>
        <div className="col-md-8">
          <h2 className="mb-4">Meal Plan for {selectedDate.toDateString()}</h2>

          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div key={mealType}>
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
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No {mealType} planned for this day.</p>
              )}
            </div>
          ))}

          {/* Button to clear all meal plans for the selected date */}
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
                  delete mealPlans[formattedDate]; // Șterge planurile pentru data selectată
                  localStorage.setItem("mealPlans", JSON.stringify(mealPlans)); // Actualizează localStorage
                  setMealPlanForDate({ breakfast: [], lunch: [], dinner: [] }); // Resetează starea locală
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
  );
};

export default MealPlanPageContainer;
