import React from 'react'
import './Essentiel.css'
import CountdownTimer from './Countdown'

export const Essentiel = () => {
    return (
        <div id='essentielParent'>

        <div className='essentiel'>
            <div className='left-essentiel'>
                <div >
                    <h1>
                        ESSENTIEL ITEMS FOR YOU.
                    </h1>
                    <p>ILorem ipsum is a placeholder text commonly
                        used to demonstrate the visual form of a documen</p>
                    <button className='btnEssentiel'>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
            <div className='section3-title'>
                <h1>New collection </h1>
                <img src="/store/Rectangle.svg" className='rectangle' alt="" />
            </div>
            <CountdownTimer />
        </div>
    )
}
