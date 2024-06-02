import { Fragment } from "react";
import Navbar from "./Navbar/navbar";
import HomeSection from "./homeSection/homeSection";
import CaloriesText from "./caloriesText/caloriesText";
import ToolsSection from "./ToolsSection/toolsSection";
import Footer from "./footer/footer";

export default function LandingPage(){
    return (
        <Fragment>
            <Navbar />
            <HomeSection />
            <CaloriesText />
            <ToolsSection /> 
            <Footer />
        </Fragment>
    )
}