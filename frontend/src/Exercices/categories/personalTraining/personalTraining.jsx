import React, { Fragment, useContext, useState } from 'react';
import { ExerciseContext } from '../../../Context/ExerciseContext';
import './personalTraining.css';

export default function PersonalTraining() {
  const { exercises, favoriteExerciseIds, loading, toggleFavorite } = useContext(ExerciseContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLevel, setCurrentLevel] = useState("");
  const itemsPerPage = 8;

  const filteredData = exercises.filter(exercise => favoriteExerciseIds.includes(exercise.id));
  const filteredByLevel = currentLevel ? filteredData.filter(item => item.level === currentLevel) : filteredData;
  const availableLevels = [...new Set(filteredData.map(item => item.level))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredByLevel.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredByLevel.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setCurrentLevel("");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div>
        <span className="loaderfavorites"></span>
        <span className="loaderfavorites"></span>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="parentComposantPersonalTraining">
        <div>
          <h3>Favorite Exercises</h3>
          <ul>
            <li>
              <button onClick={handleClearAll} id="clearAllBtn">All</button>
            </li>
            {availableLevels.includes("beginner") && (
              <li>
                <button
                  onClick={() => handleLevelClick("beginner")}
                  id={currentLevel === "beginner" ? "activeBtnPersonalTraining" : ""}
                >
                  Beginner
                </button>
              </li>
            )}
            {availableLevels.includes("intermediate") && (
              <li>
                <button
                  onClick={() => handleLevelClick("intermediate")}
                  id={currentLevel === "intermediate" ? "activeBtnPersonalTraining" : ""}
                >
                  Intermediate
                </button>
              </li>
            )}
            {availableLevels.includes("expert") && (
              <li>
                <button
                  onClick={() => handleLevelClick("expert")}
                  id={currentLevel === "expert" ? "activeBtnPersonalTraining" : ""}
                >
                  Expert
                </button>
              </li>
            )}
          </ul>
          <div className="parentExercicesPersonalTrainngMap">
            <table cellSpacing="7">
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) =>
                    index % 2 === 0 ? (
                      <tr key={index}>
                        <td>
                          <div>
                            <div className="parentImageExercicesPersonalT">
                              <img
                                src={`https://ik.imagekit.io/yuhonas/${item.images[0]}`}
                                alt={item.name}
                                className="imgThubmnailExercicesPT"
                              />
                              <button
                                className="btnFavoriteEx"
                                onClick={() => toggleFavorite(item.id)}
                              >
                                <i className={favoriteExerciseIds.includes(item.id) ? 'bx bxs-heart' : 'bx bx-heart'}></i>
                              </button>
                            </div>
                            <h6>{item.name}</h6>
                            <p>
                              <span>{item.level}</span>, {item.category}
                            </p>
                          </div>
                        </td>
                        {currentItems[index + 1] && (
                          <td>
                            <div>
                              <div className="parentImageExercicesPersonalT">
                                <img
                                  src={`https://ik.imagekit.io/yuhonas/${currentItems[index + 1].images[0]}`}
                                  alt={currentItems[index + 1].name}
                                  className="imgThubmnailExercicesPT"
                                />
                                <button
                                  className="btnFavoriteEx"
                                  onClick={() => toggleFavorite(currentItems[index + 1].id)}
                                >
                                  <i className={favoriteExerciseIds.includes(currentItems[index + 1].id) ? 'bx bxs-heart' : 'bx bx-heart'}></i>
                                </button>
                              </div>
                              <h6>{currentItems[index + 1].name}</h6>
                              <p>
                                <span>{currentItems[index + 1].level}</span>, {currentItems[index + 1].category}
                              </p>
                            </div>
                          </td>
                        )}
                      </tr>
                    ) : null
                  )
                ) : (
                  <tr>
                    <td colSpan="2">
                      <div className="parentFavoriteNotExiste">
                        <i className="bx bxs-notification-off"></i>
                        <h6>Favorite exercises do not exist</h6>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div id="paginationPersonalTraining">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            id="btnPaginate"
          >
            {"<"}
          </button>
          <div className="currentPage">{currentPage} of {totalPages}</div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            id="btnPaginate"
          >
            {">"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
