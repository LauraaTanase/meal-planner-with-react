import React from "react";
import RecipeDetailPageContainer from "../containers/RecipeDetailPageContainer";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const RecipeDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />
      <div className="container flex-grow-1 py-5">
        <RecipeDetailPageContainer />
      </div>
      <FooterComponent className="mt-auto" />
    </div>
  );
};

export default RecipeDetailPage;
