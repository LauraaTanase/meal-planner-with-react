import React from "react";
import "react-calendar/dist/Calendar.css";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import MealPlanPageContainer from "../containers/MealPlanPageContainer";

const MealPlanPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />
      <main className="flex-grow-1">
        <MealPlanPageContainer />
      </main>
      <FooterComponent />
    </div>
  );
};

export default MealPlanPage;
