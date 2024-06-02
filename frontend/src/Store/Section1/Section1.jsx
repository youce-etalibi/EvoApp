import React from 'react'
import './Section1.css'
import { Link } from 'react-router-dom'
export const Section1 = () => {
    return (
        <div id='section1-store'>
            <div className='section1-title'>
                <h1>select your style now </h1>
                <img src="/store/Rectangle.svg" className='rectangle' alt="" />
            </div>
            <div className='section1-images'>
                <img src="/store/section1.png" className='section1img' alt="" />
                <img src="/store/shoes.png"  className='section1shoes' alt="" />
            </div>
            <div className='shopNowSection'>
                <h2>
                    TOP CLASS RUNNING SHOES
                </h2>
                <h2>
                    CLASSIC & CASUAL SNEAKER
                </h2>
                <h2>
                    BEST SHOES FOR RUNNING 2022
                </h2>
                <h2>
                    TOP RATED SHOES
                </h2>

                <h2>
                    HIGH-QUALITY SNEAKER    </h2>

            </div>
            <Link to="/shop">
            <button className='btnStoreSection1'>
                Shop Now
            </button>
            </Link>
            <div className='section1-apparel'>
                <div>
                    <img src="/store/menimage.png" className='menimage' alt="" />
                    <h3>Men apparel</h3>
            <Link to="/store/shop-mens">
                    <button className='btnStoreSection1'>
                        Shop Now
                    </button>
            </Link>
                </div>

                <div>
                    <img src="/store/womenimage.png" className='womenimage' alt="" />
                    <h3>Women apparel</h3>
            <Link to="/store/shop-womens">
                    <button className='btnStoreSection1'>
                        Shop Now
                    </button>
            </Link>
                </div>
            </div>
            <div id='section2-store'>
       <img src="/store/section2.png" alt="" />
            </div>

        </div>
    )
}
