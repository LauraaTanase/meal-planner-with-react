import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import HomePageContainer from "../containers/HomePageContainer";

function HomePage() {
  return (
    <div className="d-flex flex-column">
      <HeaderComponent />
      
      <HomePageContainer />

      <FooterComponent />
    </div>
  );
}

export default HomePage;
