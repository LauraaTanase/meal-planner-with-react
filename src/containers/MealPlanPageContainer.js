import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MealPlanCardComponent from "../components/MealPlanCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const MealPlanPageContainer = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlanForDate, setMealPlanForDate] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });
  const [loading, setLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

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
    setLoading(true);
    setSelectedDate(date);
  };

  const handleClearList = () => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const mealPlans = JSON.parse(localStorage.getItem("mealPlans")) || {};

    if (mealPlans[formattedDate]) {
      delete mealPlans[formattedDate];
      localStorage.setItem("mealPlans", JSON.stringify(mealPlans));
      setMealPlanForDate({
        breakfast: [],
        lunch: [],
        dinner: [],
      });
      setAlertMessage(`All meal plans for ${formattedDate} have been cleared.`);
      setShowAlert(true);
    } else {
      setAlertMessage(`No meal plans found for ${formattedDate}.`);
      setShowAlert(true);
    }
    setShowClearModal(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {["breakfast", "lunch", "dinner"].map((mealType) => (
                  <div key={mealType} className="col mb-4">
                    <h3 className="text-capitalize text-center mb-3">
                      {mealType}
                    </h3>
                    {mealPlanForDate[mealType]?.length > 0 ? (
                      <div className="d-flex flex-wrap justify-content-start">
                        {mealPlanForDate[mealType].map((mealPlan) => (
                          <div
                            className="card mb-3 me-3"
                            key={mealPlan.idMeal}
                            style={{ maxWidth: "300px", flex: "1 0 auto" }}
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
                      <div className="d-flex flex-wrap justify-content-start">
                        <p className="text-center mt-3">
                          <FontAwesomeIcon icon={faFaceSadTear} size="2x" />
                          <br />
                          No {mealType} planned for this day.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-danger mt-4"
              onClick={() => setShowClearModal(true)}
            >
              Clear List
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmare*/}
      <div className={`modal ${showClearModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showClearModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Clear List</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowClearModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to clear all meal plans for {selectedDate.toDateString()}?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowClearModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleClearList}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de alertă */}
      {showAlert && (
        <div className={`modal ${showAlert ? 'show d-block' : ''}`} tabIndex="-1" style={{ display: showAlert ? 'block' : 'none' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Alert</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseAlert}
                ></button>
              </div>
              <div className="modal-body">
                <p>{alertMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCloseAlert}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanPageContainer;
