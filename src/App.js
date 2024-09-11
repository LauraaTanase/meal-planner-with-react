import React from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent.js";
import RecipesPage from "./pages/RecipesPage.js";
import HomePage from "./pages/HomePage.js"
import MealPlanCalendar from "./components/MealCalendarComponent.js";


function App() {
return(
    <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
       <Route path="/Recipes" element={<RecipesPage/>}/>
       <Route path="/meal-planning" element={<MealPlanCalendar/>}/>
      </Routes>
    </div>
  </Router>
)
}

export default App;
