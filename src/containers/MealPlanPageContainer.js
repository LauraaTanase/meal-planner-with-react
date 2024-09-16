import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import MealPlanCardComponent from "../components/MealPlanCardComponent";

const MealPlanPageContainer = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};
    console.log("Meal plans for selected date:", mealPlans[formattedDate]);
    setMealPlanForDate(
      mealPlans[formattedDate] || { breakfast: [], lunch: [], dinner: [] }
    );
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleEdit = (mealPlan) => {
    console.log("Edit:", mealPlan);
  };

  const handleDelete = (mealPlan, mealType) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};

    // Remove the meal from the specific meal type (breakfast, lunch, or dinner)
    const updatedMeals = {
      ...mealPlans[formattedDate],
      [mealType]: mealPlans[formattedDate][mealType].filter(
        (item) => item.id !== mealPlan.id
      ),
    };

    mealPlans[formattedDate] = updatedMeals;
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
    setMealPlanForDate(updatedMeals);
  };

  const handleAddRecipeToMeal = (recipe) => {
    const mealType = prompt(
      "Which meal would you like to add this recipe to? (breakfast, lunch, dinner)"
    ).toLowerCase();
    const validMealTypes = ["breakfast", "lunch", "dinner"];

    if (!validMealTypes.includes(mealType)) {
      alert("Invalid meal type. Please enter breakfast, lunch, or dinner.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};

    const updatedMeals = {
      ...mealPlans[formattedDate],
      [mealType]: [...(mealPlans[formattedDate]?.[mealType] || []), recipe],
    };

    mealPlans[formattedDate] = updatedMeals;
    localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
    setMealPlanForDate(updatedMeals);
  };

  return (
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
                    key={mealPlan.id}
                  >
                    <MealPlanCardComponent
                      mealPlan={mealPlan}
                      onEdit={() => handleEdit(mealPlan)}
                      onDelete={() => handleDelete(mealPlan, mealType)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No {mealType} planned for this day.</p>
            )}
          </div>
        ))}

        {/* Button to add a recipe */}
        <button
          className="btn btn-danger"
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
                alert(`All meal plans for ${formattedDate} have been cleared.`);
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
  );
};

export default MealPlanPageContainer;
