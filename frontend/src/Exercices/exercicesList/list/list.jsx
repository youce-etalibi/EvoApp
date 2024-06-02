import React, { Fragment, useEffect, useState } from "react";
import "./list.css";
import axios from "axios";
import Modal from "../../categories/arrayExercices/modal/modal";

export default function List(props) {
  const [exercises, setExercises] = useState(props.exercises);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false); 
  const [selectedExercise, setSelectedExercise] = useState(null); 
  const itemsPerPage = 9; 

  useEffect(() => {
    setExercises(props.exercises);
  }, [props.exercises]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (exercises.length === 0) {
    return <div className="parentListExercices">
        <span class="loaderSkiliton"></span>
        <span class="loaderSkiliton"></span>
    </div>;
  }

  const totalPages = Math.ceil(exercises.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle opening the modal
  const handleOpenModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedExercise(null);
    setShowModal(false);
  };

  return (
    <Fragment>
      <div className="parentListExercices">
        <div className="exercises-flex">
          {currentItems.map((item, index) => (
            <div
              className="exercise-item"
              key={index}
              onClick={() => handleOpenModal(item)}
            >
              {item.images && item.images.length > 0 ? (
                <div className="parentImageExerciceThu">
                  <img
                    src={`https://ik.imagekit.io/yuhonas/${item.images[0]}`}
                    alt={item.name}
                  />
                  <i className="bx bx-window-open"></i>
                </div>
              ) : (
                <div className="parentImageExerciceThu">
                    <div><i class='bx bx-image-alt'></i></div>
                </div>
              )}
              <h4>{item.name}</h4>
              <p>
                {item.level}, <span>{item.secondaryMuscles[0]}</span>
              </p>
            </div>
          ))}
        </div>
        <div id="paginationPersonalTraining">
          <div className="pagination">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              id="btnPaginate"
            >
              &lt;
            </button>
            <span>
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages}
              id="btnPaginate"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div>

      </div>
      {showModal && selectedExercise && (
        <Modal exercise={selectedExercise} onClose={handleCloseModal} />
      )}
    </Fragment>
  );
}
