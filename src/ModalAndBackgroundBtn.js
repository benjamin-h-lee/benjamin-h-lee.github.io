import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FadeTransition from "./FadeTransition";


/*
props {
    btnContent,    jsx, to be used as button
    modalContent,  jsx, to be displayed in modal
    onShow,        function to be called on show
    onClose
}
*/
const ModalAndBackgroundBtn = (props) => {
    const MODAL_TRANSITION_TIME = 400;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        if (props.onClose !== undefined) props.onClose();
        FadeTransition( () => { setShow(false); }, MODAL_TRANSITION_TIME);
    }
    const handleShow = () => {
        if (props.onShow !== undefined) props.onShow();
        FadeTransition( () => { setShow(true); }, MODAL_TRANSITION_TIME);
    }
    return (
        <>
            <div className='modalBtn ratio ratio-1x1'>
                {props.btnContent}
                <Button onClick={handleShow}>
                </Button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                fullscreen
                animation={false}
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    {props.modalContent}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalAndBackgroundBtn;