import React from "react";
import { Link } from "react-router-dom";
import '../assets/css/HomePageContainer.css'; 

export default function HomePageContainer() {
  return (
    <div className="page-cover d-flex align-items-center justify-content-end homepage">
      <div className="container text-center text-md-end">
        <div className="row justify-content-end">
          <div className="col-md-6">
            <h1 className="hero-title"><strong>Welcome to Meal Planner!</strong></h1>
            <p className="hero-description">
              Discover delicious recipes and easily plan your meals with our
              intuitive meal planning application. Whether you're looking for
              ideas for a single day, an entire week, or even a whole month, our
              app helps you organize your meals effortlessly.
            </p>
            <div className="mt-4 d-flex flex-column flex-md-row justify-content-md-end homepage">
              <Link to="/recipes" className="btn btn-light me-2 mb-2 mb-md-0 btn-homepage">
                Browse Recipes
              </Link>
              <Link to="/meal-planning" className="btn btn-light btn-homepage">
                Start Planning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
