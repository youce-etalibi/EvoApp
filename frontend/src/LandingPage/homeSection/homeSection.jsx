import { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./homeSection.css";

export default function HomeSection() {
  const [rotatedText, setRotatedText] = useState("");

  useEffect(() => {
    const originalText = "JOIN TO COMMUNITY";
    const rotatedText = originalText.split("").map((letter, index) => (
      <span key={index} style={{ transform: `rotate(${index * 20}deg)` }}>
        {letter}
      </span>
    ));
    setRotatedText(rotatedText);
  }, []);

  return (
    <Fragment>
      <div className="parentHomeSection">
        <div className="sectionHomeRow1">
          <div className="leftTopHomeSection">
            <div>
              <h1 className="textSectionHome">
                Start your
                fitness journey with
                us today.
              </h1>
              <img src="/assets/homeSectionPNGS/lgate.png" className="lgatePNG" alt="lgate"/>
            </div>
          </div>
          <div className="RightTopHomeSection">
            <div>
              <img
                src="/assets/homeSectionPNGS/pattern.png"
                className="patternPNG"
                alt="pattern"
              />
              <img
                src="/assets/homeSectionPNGS/dumble.png"
                className="dumblePNG"
                alt="dumble"
              />
            </div>
          </div>
        </div>
        <div className="sectionHomeRow2">
          <div className="parentCicle">
            <div className="textCicle">
              <p className="rotatedText">{rotatedText}</p>
            </div>
            <i id="arrowSectionHome" className='bx bx-right-arrow-alt'></i>
          </div>
          <div className="leftSectionImages">
            <img src="/assets/homeSectionPNGS/fitguys.png" className="fitguysPNG" alt="fitguys"/>
            <p>At Evolution, we believe that every step counts on the path to a healthier, stronger you. Join us in shaping a community committed to evolution, empowerment, and excellence.</p>
          </div>
          <div className="rightSectionImages">
            <img src="/assets/homeSectionPNGS/fitbody.png" className="fitbodyPNG" alt="fitbody"/>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
