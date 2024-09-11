import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";
import RecipeCard from "../components/RecipeCardComponent";
import MealPlanCard from "../components/MealPlanCardComponent";

function HomePage() {
    return(
        <div className="container-fluid">
<HeaderComponent/>
{/* <RecipeCard/>
<MealPlanCard/> */}
<FooterComponent/>

        </div>
    );
};

export default HomePage