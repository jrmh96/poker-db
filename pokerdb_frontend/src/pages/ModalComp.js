import { Modal, Button } from 'react-bootstrap';


function ModalComp({ inputData, show, toggleShow }) {
    return (
        <Modal show={show} onHide={toggleShow}>
            <Modal.Header closeButton>
                <Modal.Title>"Modal Title"</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ inputData }</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={toggleShow}>
                    Close
                </Button>
                <Button variant="primary" onClick={toggleShow}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComp;
