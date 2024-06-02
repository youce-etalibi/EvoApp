import { Fragment } from "react";
import './caloriesText.css';

export default function CaloriesText(){
    return (
        <Fragment>
            <div className="parentCaloriesText" >
                <div className="rightCalories" >
                    <div>
                        <img src="/assets/caloriesSectionPNGS/image1.webp" className="caloriesPNG"/>
                    </div>
                </div>
                <div className="leftCalories"> 
                    <img src="/assets/caloriesSectionPNGS/vector1.png" className="vector1"/>
                    <img src="/assets/caloriesSectionPNGS/vector0.png" className="vector0"/>
                    <h1>Log what you eat with over <br /> 14 million foods.</h1>
                    <img src="/assets/caloriesSectionPNGS/vector2.png" className="vector2"/>
                    <p>View calorie and nutrient analysis, compare serving sizes, and discover how the foods you eat support your goals.</p>
                </div>
            </div>
        </Fragment>
    )
}