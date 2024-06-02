import React, { useContext } from 'react';
import './Menu.css';
import { MenuContext } from '../../Context/MenuContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const Menu = () => {
    const { isactive } = useContext(MenuContext);

    return (
        <div className='menuu'>
            {isactive &&
                <ul className='listIcons'>
                    <li>
                        <Link to="/CaloriesCalculator">
                            <img src="/Icons/icon1.svg" alt="" />
                            <span className="tooltip">Calories Calculator</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/store">
                            <img src="/Icons/icon2.svg" alt="" />
                            <span className="tooltip">Store</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/exercices">
                            <img src="/Icons/icon3.svg" alt="" />
                            <span className="tooltip">Exercises</span>
                        </Link>
                    </li>
                </ul>
            }
        </div>
    );
};


