import React, { Fragment } from "react";
import './modal.css';
import ExercicesWOForm from "./exercicesWoFrom/exercicesWoFrom";

export default function ModalCreateWO({ closeModal }) {
    return (
        <Fragment>
            <div className="parentModalCreateWO">
                <div className="modalContent">
                    <button onClick={closeModal} id="btnCloseCWO"><i className='bx bx-arrow-back' ></i></button>
                    <h1>Create workout</h1>
                    <div className="ContentCW">
                        <ExercicesWOForm close={closeModal} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
