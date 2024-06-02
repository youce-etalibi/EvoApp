import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Translate } from "./homeTranslate";
import { LangueContext } from "../../Context/LangueContext";
import { gsap } from "gsap";

export default function Home() {
  
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".sous_title",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );

    tl.fromTo(
      ".illustatorHome",
      { x: "-150%", scale: 0.1, duration: 0.3 },
      { x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
    );

    tl.fromTo(
      ".illustrator2",
      { x: "-150%", scale: 0.1, duration: 0.3 },
      { x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
    );
    tl.fromTo(
      ".title",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );

    tl.fromTo(
      ".vector1",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );

    tl.fromTo(
      ".vector2",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );

    tl.fromTo(
      ".illustrator3",
      { x: "-150%", scale: 0.1, duration: 0.3 },
      { x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
    );

    tl.fromTo(
      ".paragraphe",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );
    tl.fromTo(
      ".illustrator4",
      { x: "-150%", scale: 0.1, duration: 0.3 },
      { x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
    );

    tl.fromTo(
      ".btnSeeMoreServices",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );
    tl.fromTo(
      ".illustrator5",
      { x: "-150%", scale: 0.1, duration: 0.3 },
      { x: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
    );
    tl.fromTo(
      ".btnScrollV2",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );

    tl.fromTo(
      ".illustrator1",
      { yPercent: 150, opacity: 0, ease: "power4", duration: 0.3 },
      { yPercent: 0, opacity: 1, ease: "power4", duration: 0.3 }
    );
  }, []);

  function handleScroll() {
    const scrollTarget = document.getElementById("scrolbtnFn");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }

  const { langue } = useContext(LangueContext);

  const Home = Translate.Home.find((lang) => lang.id === langue);

  return (
    <Fragment>
      <div
        className={`parentHomev2 ${langue === "ar" ? "reverseContent" : ""}`}
      >
        <div className="parentText">
          <img
            src="./assets/illustrationsRemoveBg/Vector6.png"
            className="vector1"
          />
          <img
            src="./assets/illustrationsRemoveBg/Vector7.png"
            className="vector2"
          />
          <h3 className="sous_title">{Home.sous_title}</h3>
          <h1 className="title">{Home.title}</h1>
          <p className="paragraphe">{Home.text}</p>
          <div className="parentBtnsV2">
            <Link to="/">
              <button className="btnSeeMoreServices">{Home.btn}</button>
            </Link>
            <Link to="/">
              <button
                className="btnScrollV2"
                id="scrolbtnFn"
                onClick={handleScroll}
              >
                <div className="pointV2">.</div>
              </button>
            </Link>
          </div>
        </div>
        <div className="parentimg">
          <img
            src="./assets/illustrationsRemoveBg/illu.webp"
            className={`illustatorHome ${
              langue === "ar" ? "illustatorArabe" : ""
            }`}
          />
          <img
            src="./assets/illustrationsRemoveBg/i9.png"
            className="illustrator1"
          />
          <img
            src="./assets/illustrationsRemoveBg/i9.png"
            className="illustrator2"
          />
          <img
            src="./assets/illustrationsRemoveBg/i10.png"
            className="illustrator5"
          />
          <img
            src="./assets/illustrationsRemoveBg/i11.png"
            className="illustrator3"
          />
          <img
            src="./assets/illustrationsRemoveBg/i12.png"
            className="illustrator4"
          />
        </div>
      </div>
    </Fragment>
  );
}
