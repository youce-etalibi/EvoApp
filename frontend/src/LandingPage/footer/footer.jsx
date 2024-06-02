import React, { Fragment } from "react";
import './footer.css';

export default function Footer() {
    return (
        <Fragment>
            <div className="parentFooter">
                <div className="arraySocialMedia">
                    <a href="#" >
                        <i className='bx bxl-instagram-alt'></i>
                    </a>
                    <a href="#" >
                        <i className='bx bxl-facebook-circle' ></i>
                    </a>
                    <a href="#" >
                        <i className='bx bxl-linkedin' ></i>
                    </a>
                    <a href="#" >
                        <i className='bx bxl-whatsapp' ></i>
                    </a>
                </div>
                <div className="copyright">
                    <h4>
                        <i className='bx bx-copyright'></i> Copyright Evolution, Int.
                    </h4>
                </div>
            </div>
        </Fragment>
    )
}