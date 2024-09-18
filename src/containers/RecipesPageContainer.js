import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCardComponent from '../components/RecipeCardComponent';
import SearchBarComponent from '../components/SearchBarComponent';


const RecipesPageContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(searchValue);
  }, [searchValue]);

  const fetchData = (searchValue) => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.meals) {
          setRecipes(data.meals);
        } else {
          console.error('No recipes found');
          setRecipes([]);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setRecipes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const addToMealPlan = (recipe, mealType) => {
    setSelectedMealType(mealType);
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (selectedDate && selectedRecipe && selectedMealType) {
      const mealPlans = JSON.parse(localStorage.getItem('mealPlans')) || {};

      const updatedMealPlans = {
        ...mealPlans,
        [selectedDate]: {
          ...mealPlans[selectedDate],
          [selectedMealType]: [
            ...(mealPlans[selectedDate]?.[selectedMealType] || []),
            selectedRecipe,
          ],
        },
      };

      localStorage.setItem('mealPlans', JSON.stringify(updatedMealPlans));

      setShowModal(false); 
      navigate('/meal-planning');
    }
  };

  return (
    <div className="container">
      <SearchBarComponent
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
      />

      {loading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="row">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 mb-4"
                key={recipe.idMeal}
              >
                <RecipeCardComponent
                  recipe={recipe}
                  onAddToMealPlan={addToMealPlan}
                />
              </div>
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      )}

      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select a Date for Meal Plan</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleModalSubmit}
              >
                Add to Meal Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesPageContainer;
