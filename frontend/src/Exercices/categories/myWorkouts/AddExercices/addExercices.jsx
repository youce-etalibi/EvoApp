import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';  
import './addExercices.css'

export default function AddExercices() {
    const {id} = useParams();
    const navigate = useNavigate();

    const idAuth = localStorage.getItem('id_active');
    const [exercises, setExercises] = useState([]);
    const [cartExercises, setCartExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [exercisesPerPage] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');
    const [submitVisible, setSubmitVisible] = useState(false);

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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleAddToCart = (exercise) => {
        setCartExercises([...cartExercises, exercise]);
        setSubmitVisible(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/workouts/${id}/add-exercises`, {
                exercises: cartExercises.map(exercise => ({ id: exercise.id }))
            });
            navigate('/exercices/overview');
            console.log('Exercises added to workout successfully:', response.data);
        } catch (error) {
            console.error('Error adding exercises to workout:', error);
        }
    };

    const filteredExercises = exercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Fragment>
            <div className="parenAddExercices">
                <div className="AddExercicesChild">
                    <div className="header">
                        <h2><Link to='/exercices/overview' id="LinkBack"><i className='bx bx-left-arrow-alt'></i></Link> Choose Exercises</h2>
                    </div>
                    <div className="">
                        <ul className="ulAddExercices">
                            {currentExercises.map((item, index) => (
                                <li key={index}>
                                    <div className="parentInfoAddExercices">
                                        <img src={`https://ik.imagekit.io/yuhonas/${item.images[0]}`} alt={item.name} />
                                        <div>
                                        <h3>{item.name}</h3>
                                        <p>{item.level}</p>
                                    </div>
                                    </div>

                                    <button onClick={() => handleAddToCart(item)} id="btnIndoAddExercices">
                                        {cartExercises.some(cartEx => cartEx.id === item.id) 
                                            ? <i className='bx bxs-trash-alt'></i> 
                                            : <i className='bx bx-plus-circle'></i>}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div id="paginationPersonalTraining">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)} 
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>
                            <span>{currentPage} of {Math.ceil(filteredExercises.length / exercisesPerPage)}</span>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)} 
                                disabled={currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)}
                            >
                                &gt;
                            </button>
                        </div>
                        {submitVisible && (
                            <button onClick={handleSubmit} id="SubmitAddEX">Add</button>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
