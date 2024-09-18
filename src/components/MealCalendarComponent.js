import React from "react";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";

const MealPlanCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [recipes, setRecipes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
  };

  const handleSearch = () => {
    const apiKey = "8732cadd74534cf790c607e69fa6a4ab";
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.results);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Planificare Mese</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="w-100"
          />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div className="search-bar w-100">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Caută rețete..."
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Caută
              </button>
            </div>
          </div>
        </div>
      </div>
      {selectedDate && (
        <div>
          <h2 className="mb-4">Rețete pentru {selectedDate.toDateString()}</h2>

          <div className="row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{recipe.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MealPlanCalendar;
