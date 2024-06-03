import React from 'react'
import { Link } from 'react-router-dom'

export const NavbarAdmin = () => {
  return (
    <div className='navbaradmin'>
   <Link to='/store'>
         <img className='logoimage' src="/Evolution.png" alt="Evolution" title="Evolution" />
     </Link>
    </div>
  )
}
