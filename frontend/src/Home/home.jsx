import { Fragment } from "react";
import './home.css'
import HeaderHome from "./headerHome/headerHome";
import ContentHome from "./contentHome/contentHome";

export default function Home(){

    return (
        <Fragment>
            <HeaderHome />
            <ContentHome />
        </Fragment>
    )
}