import React, { Fragment, useState } from "react";
import './btnAdd.css'
import { Link } from "react-router-dom";
import ModalCreateWO from "../Modal/modal";

export default function BtnAdd(){
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Fragment>
                <div className="parentbuttonAddwork" onClick={openModal}>
                    <i className='bx bxs-add-to-queue'></i> <h4>Create Workout</h4>
                </div>
            {modalVisible && <ModalCreateWO closeModal={closeModal} />} 
        </Fragment>
    )
}
