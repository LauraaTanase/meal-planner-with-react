import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import MealPlanPageContainer from "../containers/MealPlanPageContainer";

const MealPlanPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />
      <h1 className="text-center mb-4">Meal Planning</h1>
      <MealPlanPageContainer /> {/* Include container component here */}
      <FooterComponent />
    </div>
  );
};

export default MealPlanPage;
