import React, { useEffect, useState } from 'react'
import axios from "axios";
import moment from 'moment';

export default function Home() {
    const [hands, setHands] = useState([]);

    // Loads specified data on pageload
    useEffect(() => {
        loadHands();
    }, []);

    const loadHands = async () => {
        const results = await axios.get("http://localhost:8080/gethands");
        setHands(results.data);
        // console.log(typeof(results.data[0].date));
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
                                            <button className="btn btn-outline-dark">
                                                History
                                            </button>
                                        </td>
                                        <td><a href={hand.link} rel="noreferrer" target="_blank">Link</a></td>
                                        <td>
                                            <button className="btn btn-outline-dark">
                                                Notes
                                            </button>
                                        </td>
                                        
                                        <td style={{color: parseFloat(hand.result) < 0 ? "red" : "green"}}>{hand.result}$</td>

                                        <td>
                                            <button className="btn btn-primary mx-2">View</button>
                                            <button className="btn btn-outline-primary mx-2">Edit</button>
                                            <button className="btn btn-danger mx-2">Delete</button>
                                        </td>
                                    </tr>
                            ))}
                            
                        </tbody>
                    </table>
            </div>
        </div>
  )
}


