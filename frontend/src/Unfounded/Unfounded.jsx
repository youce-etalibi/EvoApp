import React from 'react'
import { Link } from 'react-router-dom'
import "./Unfounded.css"
export default function Unfounded() {
  return (
    <div className='NotFound'>
      <img src="/frontend/public/"  className='notFoundImagee' alt='notFounded' />
      <h1 className="notFoundTitle">Page not found</h1>
      <p className="notFoundText">The page you are looking for may have been moved, renamed, or perhaps never existed.</p>
      <div className='button-containerr'><Link to="/"><button className='notFoundToHome'>Home</button></Link></div>
      
    </div>
  )
}