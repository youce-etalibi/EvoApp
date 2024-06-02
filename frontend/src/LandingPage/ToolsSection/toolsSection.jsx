import { Fragment } from "react";
import "./toolsSection.css";
import { Link } from "react-router-dom";

export default function ToolsSection() {


  return (
    <Fragment>
      <div className="parentToolsSection">
        <div className="headerTools">
          <h1>Tools for your goals</h1>
          <p>
            Are you trying to lose weight, tone up, lower your BMI or improve
            your overall health? We give you the right features to achieve this.
          </p>
        </div>
        <div className="parentArrow">
          <img src="/assets/toolsPNGS/Arrow.png" className="arrowTools" />
          <div className="parentSubscribe">
            <h1 id="titleSubscribeTools">Welcome to our community</h1>
            <Link to="/auth/sign-up">
              <button>Let's Begin</button>
              <img src="/assets/toolsPNGS/click.png" className="clickPNG" />
            </Link>
          </div>
        </div>  
        <div className="contentTools">
          <div className="rowTool">
            <div className="sectionIMGtool">
              <div>
                <div className="patternImgsTools">
                  <img
                    src="/assets/toolsPNGS/pattern1.png"
                    className="patternTool1"
                  />
                </div>
                <img src="/assets/toolsPNGS/img1.png" className="toolsImg1" />
              </div>
            </div>
            <div className="sectionTEXTtool textTool1">
              <h2>Exercise. Track. Transform.</h2>
              <p>
                Creating and following a personalized exercise plan helps you stay motivated and monitor your progress, making it easier to reach your fitness goals.
              </p>
              <img src="/assets/toolsPNGS/illustrator1.png" className="illustrator1Tool"/>
            </div>
          </div>
          <div className="rowTool tool2">
            <div className="sectionIMGtool2">
              <div>
                <div className="patternImgsTools2">
                  <img
                    src="/assets/toolsPNGS/pattern2.png"
                    className="patternTool2"
                  />
                </div>
                <img src="/assets/toolsPNGS/img2.png" className="toolsImg2" />
              </div>
            </div>
            <div className="sectionTEXTtool textTool2">
              <h2 id="h2left">Calculate. Adjust.</h2>
              <p id="pleft">
                Accurately tracking your calorie intake helps you make informed dietary choices and supports your journey towards a healthier lifestyle.
              </p>
              <img src="/assets/toolsPNGS/illustrator2.png" className="illustrator2Tool"/>
            </div>
          </div>
          <div className="rowTool tool3">
            <div className="sectionIMGtool">
              <div>
                <div className="patternImgsTools">
                  <img
                    src="/assets/toolsPNGS/pattern3.png"
                    className="patternTool1"
                  />
                </div>
                <img src="/assets/toolsPNGS/img3.png" className="toolsImg1" />
              </div>
            </div>
            <div className="sectionTEXTtool textTool2">
              <h2>Browse. Buy. Benefit.</h2>
              <p>
                Discover a range of high-quality fitness products designed to enhance your workout experience and support your health and wellness journey.
              </p>
              <img src="/assets/toolsPNGS/illustrator3.png" className="illustrator3Tool"/>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
