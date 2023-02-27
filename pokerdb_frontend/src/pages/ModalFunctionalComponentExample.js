import { useState, useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

function ModalFunctionalComponentExample({ inputData }) {
    const modalRef = useRef()

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show();
    }

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = Modal.getInstance(modalEle)
        bsModal.hide()
    }

    return (
        <div className="addEmployee">
            <button type="button" className="btn btn-primary" onClick={showModal}>Add Employee</button>
            <div className="modal fade" ref={modalRef} tabIndex="-1" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {inputData.handnotes}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFunctionalComponentExample

