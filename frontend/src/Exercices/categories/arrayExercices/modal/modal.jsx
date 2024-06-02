import React, { Fragment, useState, useEffect } from "react";
import "./modal.css";

export default function Modal({ exercise, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("modalOpen");

  useEffect(() => {
    setAnimationClass("modalOpen");
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === exercise.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? exercise.images.length - 1 : prevIndex - 1
    );
  };

  const handleClose = () => {
    setAnimationClass("modalClose");
    setTimeout(onClose, 2500); // Match the duration of the close animation
  };

  return (
    <Fragment>
      <div className={`parentModalArrayExercicesDetail ${animationClass}`}>
        <div className={`ModalExercicesDetailCategories`}>
          <div className="colImagesOfDetailExercices">
            <button className="prevButton" onClick={handlePrevImage}>
              &#10094;
            </button>
            <img
              src={`https://ik.imagekit.io/yuhonas/${exercise.images[currentImageIndex]}`}
              width={100}
              alt={`Exercise ${exercise.name}`}
              className="imgExercicesCategories"
            />
            <button className="nextButton" onClick={handleNextImage}>
              &#10095;
            </button>
          </div>
          <div className="colInfoDetailExercices">
            <div className="line">
              <span>
                <h2>{exercise.name}</h2>
              </span>
              <button onClick={handleClose}>
                <i className="bx bx-x"></i>
              </button>
            </div>
            <center>
              <ul>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bx-category"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Category</p>
                    <h5>{exercise.category}</h5>
                  </div>
                </li>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bx-line-chart"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Level</p>
                    <h5>{exercise.level}</h5>
                  </div>
                </li>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bxs-skull"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Force</p>
                    <h5>{exercise.force}</h5>
                  </div>
                </li>
              </ul>
              <br />
              <ul>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bx-dumbbell"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Equipment</p>
                    <h5>{exercise.equipment}</h5>
                  </div>
                </li>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bx-run"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Mechanic</p>
                    <h5>{exercise.mechanic}</h5>
                  </div>
                </li>
                <li>
                  <div className="parentIconDetailExercices">
                    <i className="bx bx-body"></i>
                  </div>
                  <div className="parentInfoDetailExercices">
                    <p>Muscles</p>
                    <h5>{exercise.primaryMuscles[0]}</h5>
                  </div>
                </li>
              </ul>
            </center>
            <div className="parentUlOfInstructionsExercices">
              <h5>Instructions : </h5>
              <div id="ulOfInstructionsExercices">
                {exercise.instructions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
