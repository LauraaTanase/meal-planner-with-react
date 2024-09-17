import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import HomePageContainer from "../containers/HomePageContainer";

function HomePage() {
    return (
        <div className="container-fluid">
            <HeaderComponent />

            <div className="py-5">
                <div className="container">
                    <h2 className="mb-4 text-center">Featured Recipes & Meal Plans</h2>
<HomePageContainer/>
                </div>
            </div>

            <FooterComponent />
        </div>
    );
};

export default HomePage