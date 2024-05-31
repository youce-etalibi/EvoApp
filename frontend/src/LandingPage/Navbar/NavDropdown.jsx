import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

export const NavDropdown = ({ link }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <li
      key={link.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {link.dropdown ? (
        <div>
          <Link className="cool-link" to={link.to}>
            {link.text}
          <i className='bx bxs-down-arrow arrow'></i></Link>
          
          {isDropdownOpen && (
            <ul>
              {link.dropdown.map((dropdownItem) => (
                <li className='items' key={dropdownItem.id}>
                  <Link className="cool-link-child" to={dropdownItem.to}>{dropdownItem.text}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <Link id={link.id} className="cool-link" to={link.to}>{link.text}</Link>
      )}
    </li>
  );
};


