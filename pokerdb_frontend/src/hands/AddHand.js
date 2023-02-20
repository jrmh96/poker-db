import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddHand() {

    const [hand, setHand]=useState({
        date:"",
        cards:"",
        position:"",
        stakes:"",
        history:"",
        link:"",
        notes:"",
        result:""
    });

    let navigate=useNavigate();

    const{date, cards, position, stakes, history, link, notes, result} = hand;

    const onInputChange = (e) => {
        setHand({...hand, [e.target.name]:e.target.value});
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        console.log(JSON.stringify(hand));
        await axios.post("http://localhost:8080/addhand", hand, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            if(error.response) {
                console.log("The message sent: ")
                console.log(JSON.parse(error.config.data));
            }
        });
        navigate("/");
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Add Hand</h2>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <div className="form-outline w-50 justify-content-center">
                                <label htmlFor="date" className="form-label">
                                    Date
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Date"
                                    id="date"
                                    name="date"
                                    value={date}
                                    onChange={(e)=>onInputChange(e)}
                                    >
                                </input>
                                </div>
                                <br />
                                
                                <label htmlFor="cards" className="form-label">
                                    Cards
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cards"
                                    id="cards"
                                    name="cards"
                                    value={cards}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>

                                <br />
                                <label htmlFor="Position" className="form-label">
                                    Position
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Position"
                                    id="position"
                                    name="position"
                                    value={position}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>

                                <br />

                                <label htmlFor="Stakes" className="form-label">
                                    Stakes
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Stakes"
                                    id="stakes"
                                    name="stakes"
                                    value={stakes}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>

                                <br />
                                <label htmlFor="link" className="form-label">
                                    Playback Link
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Link to playback"
                                    id="link"
                                    name="link"
                                    value={link}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>

                                <br />
                                <label htmlFor="notes" className="form-label">
                                    Notes
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Notes"
                                    id="notes"
                                    name="notes"
                                    value={notes}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>

                                <br />
                                <label htmlFor="result" className="form-label">
                                    Result
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Result ($)"
                                    id="result"
                                    name="result"
                                    value={result}
                                    onChange={(e) => onInputChange(e)}
                                >
                                </input>
                                <br />
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                                <button type="submit" className="btn btn-outline-danger mx-4">Cancel</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}


