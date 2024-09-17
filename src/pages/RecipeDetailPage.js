import React from "react";
import RecipeDetailPageContainer from "../containers/RecipeDetailPageContainer";
import { useParams } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const RecipeDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="container-fluid">
      <HeaderComponent />
      <div className="py-5">
        <div className="container">
          <RecipeDetailPageContainer />
        </div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
