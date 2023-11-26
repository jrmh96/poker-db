/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from "axios";
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


export default function Home() {
    // All hands from backend
    const [hands, setHands] = useState([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sortBy, setSortBy] = useState('id');
    const [totalPages, setTotalPages] = useState(0);

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
        loadHands(page, size, sortBy);
    }, [page, size, sortBy]);

    async function loadHands(page, size, sortBy) {
        const results = await axios.get(`http://localhost:8080/gethands?page=${page}&size=${size}&sortBy=${sortBy}`);
        setHands(results.data.content);
        setTotalPages(results.data.totalPages);
    }
    const {id} = useParams();
    
    // Delete lambda function
    const deleteHand = async(id) => {
        // Warning before deleting request is in the html
        // Should probably add error checking here based on results code
        const results = await axios.delete(`http://localhost:8080/hand/${id}`);
        loadHands(page, size, sortBy);
    }

    return (
        <div className='container'> 
            <div className='py-4 col-10 mx-auto'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Date</th>
                            <th scope="col">Cards</th>
                            <th scope="col">Position</th>
                            <th scope="col">Stakes</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Playback Link</th>
                            <th scope="col">Result</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {
                            hands.map((hand, index) => (
                                <tr key={index}>
                                    <th scope="row" key={index}>{page*size + index + 1}</th>
                                    <td>[Tags]<br/> [More Tags]</td>
                                    <td>{moment(hand.date).format("MM/DD/YYYY")}</td>
                                    <td>{hand.cards}</td>
                                    <td>{hand.position}</td>
                                    <td>{hand.stakes}</td>
                                    <td>
                                        <button className="btn btn-outline-dark" onClick={() => handleRowClick("Notes", hand.notes)}>
                                            Notes
                                        </button>
                                    </td>
                                    <td><a href={hand.link} rel="noreferrer" target="_blank">Link</a></td>
                                    
                                    <td style={{color: parseFloat(hand.result) < 0 ? "red" : "green"}}>{hand.result}$</td>

                                    <td>
                                        <Link className="btn btn-outline-primary mx-2" 
                                        to={`/editHand/${hand.id}`}>Edit</Link>
                                        <button className="btn btn-danger mx-2" onClick={() => {if (window.confirm('Are you sure you wish to delete this hand?')) deleteHand(hand.id)}}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <Button onClick={() => setPage(page => page - 1)} disabled={hands.length === 0 || page === 0}>Previous Page</Button> {' '}
                    
                    <Button onClick={() => setPage(page => page + 1)} disabled={page === totalPages - 1}>Next Page</Button>
                </div>
            </div>
            <div className="py-3">
                <Modal 
                    show={showModal} 
                    onHide={toggleModal}
                    backdrop="static"
                    style={{"whiteSpace": "pre-line"}}
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


