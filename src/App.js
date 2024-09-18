import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import RecipesPage from "./pages/RecipesPage.js";
import HomePage from "./pages/HomePage.js";
import MealPlanPage from "./pages/MealPlanPage.js";
import RecipeDetailPage from "./pages/RecipeDetailPage.js";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Recipes" element={<RecipesPage />} />
          <Route path="/meal-planning" element={<MealPlanPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />    
              </Routes>
      </div>
    </Router>
  );
}

export default App;
