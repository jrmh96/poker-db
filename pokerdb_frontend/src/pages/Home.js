import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ModalFunctionalComponentExample from './ModalFunctionalComponentExample';
import ModalComp from './ModalComp';

export default function Home() {
    // All hands from backend
    const [hands, setHands] = useState([]);

    // Modal status and data showing notes and history
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({
        type: "", // history or notes
        data: ""
    });

    const handleRowClick = (buttonSelection, dataType) => {
        setSelectedData({
            type: buttonSelection,
            data: dataType
        });
        setShowModal(true);
    }

    const toggleModal = () => {
        setSelectedData({type: "", data: ""});
        setShowModal(false);
    }

    // Loads specified data on pageload
    useEffect(() => {
        loadHands();
    }, []);

    const loadHands = async () => {
        const results = await axios.get("http://localhost:8080/gethands");
        setHands(results.data);
    }

    // Delete use function
    const {id} = useParams();
    const deleteHand = async(id) => {
        // Warn user before deleting

        const results = await axios.delete(`http://localhost:8080/hand/${id}`);
        loadHands();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Date</th>
                            <th scope="col">Cards</th>
                            <th scope="col">Position</th>
                            <th scope="col">Stakes</th>
                            <th scope="col">Hand History</th>
                            <th scope="col">Playback Link</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Result</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            hands.map((hand, index) => (
                                <tr key={index}>
                                    <th scope="row" key={index}>{index+1}</th>
                                    <td>{moment(hand.date).format("M/D/YYYY")}</td>
                                    <td>{hand.cards}</td>
                                    <td>{hand.position}</td>
                                    <td>{hand.stakes}</td>
                                    <td>
                                        <button className="btn btn-outline-dark" onClick={() => handleRowClick("History", hand.history)}>
                                            History
                                        </button>
                                    </td>
                                    <td><a href={hand.link} rel="noreferrer" target="_blank">Link</a></td>
                                    <td>
                                        <button className="btn btn-outline-dark" onClick={() => handleRowClick("Notes", hand.notes)}>
                                            Notes
                                        </button>
                                    </td>
                                    
                                    <td style={{color: parseFloat(hand.result) < 0 ? "red" : "green"}}>{hand.result}$</td>

                                    <td>
                                        <button className="btn btn-primary mx-2">View</button>
                                        <Link className="btn btn-outline-primary mx-2" 
                                        to={`/editHand/${hand.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={() => {if (window.confirm('Are you sure you wish to delete this hand?')) deleteHand(hand.id)}}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-3">
                <Modal 
                    show={showModal} 
                    onHide={toggleModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedData.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{selectedData.data}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
  )
}


