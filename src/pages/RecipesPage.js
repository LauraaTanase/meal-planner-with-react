import React from "react";
import RecipesPageContainer from "../containers/RecipesPageContainer";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipesPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />

      <div className="container my-4">
        <h1 className="text-center mb-4">Recipes</h1>
        <RecipesPageContainer />
      </div>
      <FooterComponent />
    </div>
  );
};

export default RecipesPage;
