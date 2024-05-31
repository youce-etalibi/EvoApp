import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import './personalTraining.css';
import { usePerformance } from "../categories";

export default function PersonalTraining() {
  const [exercises, setExercises] = useState([]);
  const [favoriteExerciseIds, setFavoriteExerciseIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLevel, setCurrentLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingFavorites, setUpdatingFavorites] = useState(false);
  const memberId = 1;
  const itemsPerPage = 8;
  const { Changed, setChanged } = usePerformance();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/favorite-exercice/${memberId}`);
        const exerciseIds = response.data.map(fav => fav.exercice_id);
        setFavoriteExerciseIds(exerciseIds);
      } catch (error) {
        console.error('Error fetching favorite exercises:', error);
      }
    };

    fetchFavorites();
  }, [memberId, Changed]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleToggleFavorite = async (exerciseId) => {
    const isFavorite = favoriteExerciseIds.includes(exerciseId);

    try {
      setUpdatingFavorites(true);
      if (isFavorite) {
        await axios.delete(`http://127.0.0.1:8000/api/favorite-exercice/${memberId}/${exerciseId}`);
        setFavoriteExerciseIds(prevIds => prevIds.filter(id => id !== exerciseId));
      } else {
        await axios.post(`http://127.0.0.1:8000/api/favorite-exercice`, { membre_id: memberId, exercice_id: exerciseId });
        setFavoriteExerciseIds(prevIds => [...prevIds, exerciseId]);
      }
      setChanged(prev => !prev);
    } catch (error) {
      console.error('Error updating favorite exercise:', error);
    } finally {
      setUpdatingFavorites(false);
    }
  };

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
                                onClick={() => handleToggleFavorite(item.id)}
                                disabled={updatingFavorites}
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
                                  onClick={() => handleToggleFavorite(currentItems[index + 1].id)}
                                  disabled={updatingFavorites}
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
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          <div className="currentPage">{currentPage} of {totalPages}</div>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </Fragment>
  );
}
