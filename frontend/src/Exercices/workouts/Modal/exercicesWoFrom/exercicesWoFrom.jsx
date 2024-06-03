import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import './exercicesWoFrom.css';
import Modal from './modal/modal'; // Import the Modal component
import WorkOutForm from '../workoutForm/workOutForm'; // Import the WorkOutForm component

export default function ExercicesWOForm({ close }) {
    const idAuth = localStorage.getItem('id_active');
    const [exercises, setExercises] = useState([]);
    const [favoriteExercises, setFavoriteExercises] = useState([]);
    const [cartExercises, setCartExercises] = useState([]); // State to manage cart exercises
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisesPerPage] = useState(4); // Number of exercises to display per page
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [selectedExercise, setSelectedExercise] = useState(null); // State to manage selected exercise
    const [showFavorites, setShowFavorites] = useState(false); // State to toggle between all and favorite exercises
    const [showCart, setShowCart] = useState(false); // State to show/hide cart
    const [favoriteCount, setFavoriteCount] = useState(0); // State to keep track of favorite exercises count

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await axios.get('https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json');
                setExercises(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    useEffect(() => {
        const fetchFavoriteExercises = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/favorite-exercice/?id=${idAuth}`);
                const favoriteExerciseIds = response.data.map(fav => fav.exercice_id);
                const favoriteEx = exercises.filter(ex => favoriteExerciseIds.includes(ex.id));
                setFavoriteExercises(favoriteEx);
                setFavoriteCount(favoriteEx.length); // Update favorite count
            } catch (error) {
                console.error('Error fetching favorite exercises:', error);
            }
        };

        if (!loading) {
            fetchFavoriteExercises();
        }
    }, [loading, exercises]);

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset current page when search query changes
    };

    // Function to handle detail button click
    const handleDetailClick = (exercise) => {
        setSelectedExercise(exercise);
        setShowModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Toggle between all exercises and favorite exercises
    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
        setShowCart(false); // Ensure cart is hidden when favorites are toggled
        setCurrentPage(1); // Reset to the first page
    };

    // Toggle cart visibility
    const toggleCart = () => {
        setShowCart(!showCart);
        setShowFavorites(false); // Ensure favorites are hidden when cart is toggled
        setCurrentPage(1); // Reset to the first page
    };

    // Function to add exercise to cart
    const handleAddToCart = (exercise) => {
        if (cartExercises.some(cartEx => cartEx.id === exercise.id)) {
            // If exercise is already in the cart, remove it
            setCartExercises(cartExercises.filter(cartEx => cartEx.id !== exercise.id));
        } else {
            // If exercise is not in the cart, add it
            setCartExercises([...cartExercises, exercise]);
        }
    };

    // Filter exercises based on search query
    const filteredExercises = (showFavorites ? favoriteExercises : showCart ? cartExercises : exercises).filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Logic to get current exercises based on pagination
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    // Logic to change page
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Fragment>
            <div className="parentModalAddWorkout">
            <div className="parentWxercicesWOForm">
                <div className="headerExercicesCW">
                    <span>
                        <h2>{showFavorites ? 'Favorite Exercises' : showCart ? 'Cart' : 'Choose Exercises'}</h2>
                        <p>{filteredExercises.length} Exercises</p>
                    </span>
                    <span className="parentLeftHeaderCEW">
                        <div className="parentSearchBarExCWO">
                            <i className='bx bx-search' ></i>
                            <input 
                                type="text" 
                                placeholder="Search by name" 
                                value={searchQuery} 
                                onChange={handleSearchChange} 
                                />
                        </div>
                        <button onClick={toggleFavorites} id={showFavorites ? "btnFavoriteExwO" : null}>
                            <i className='bx bx-book-heart'></i>
                            <div id="countArrayRed">{favoriteCount}</div>
                        </button>
                        <button onClick={toggleCart} id={showCart ? "btnFavoriteExwO" : null}>  
                            <i className='bx bxs-basket'></i>
                            <div id="countArrayRed">{cartExercises.length}</div>
                        </button>
                    </span>
                </div>
                <div className="bodyExercicesCW">
                    <ul className="ulBodyExercicesCW">
                        {currentExercises.map((item, index) => (
                            <li key={index}>
                                <div>
                                    <span className="parnetImgExCW">
                                        <img src={`https://ik.imagekit.io/yuhonas/${item.images[0]}`} alt={item.name} />
                                    </span>
                                    <span className="infoExerciceCWR">
                                        <h3>{item.name}</h3>
                                        <p>{item.level}</p>
                                    </span>
                                </div>
                                <span className="parentControlesAddEx">
                                    <button onClick={() => handleDetailClick(item)}><i className='bx bx-info-circle' ></i></button>
                                    <button onClick={() => handleAddToCart(item)}>
                                        {cartExercises.some(cartEx => cartEx.id === item.id) 
                                            ? <i className='bx bxs-trash-alt'></i> 
                                            : <i className='bx bx-plus-circle'></i>}
                                    </button>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <div id="paginationPersonalTraining">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                            id="btnPaginate"
                        >
                            &lt;
                        </button>
                        <span>{currentPage} of {Math.ceil(filteredExercises.length / exercisesPerPage)}</span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)}
                            id="btnPaginate"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            {showModal && <Modal exercise={selectedExercise} onClose={handleCloseModal} />}
            <WorkOutForm cartExercises={cartExercises} onClose={close} />
                                </div>
        </Fragment>
    );
}
