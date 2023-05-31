import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../add-edit-special.scss';
import { strToStakesMap } from '../utils/stakesFunctions.js';
import { useReducer } from 'react';
import { handReducer, emptyHand, updateHandOnChange } from '../states/HandContext';
import PinInput from 'react-pin-input';

export default function EditHand() {

    const {id} = useParams(); // User url input parameter

    // Date from string, note that
    // new Date(dateString) won't work unless
    // dateString is in format YYYY-MM-DDTHH:mm:ss.sssZ (from docs)
    const dateFromString = (dateString) => {
        const [year, month, day] = dateString.split("-").map(part => parseInt(part));
        return new Date(year, month-1, day);
    }

    // Hand states and managers defined in HandContext.js
    const [hand, dispatch] = useReducer(handReducer, emptyHand);
    const [loaded, setLoaded] = useState(false); // Whether hand has been loaded or not

    // Set up all states
    // Backend stores results as dollars, so initialize button state as dollars
    const [units, setUnits] = useState("Dollars");

    // Wrap setUnits so that screen doesn't scroll
    const setUnitWrapper = (e) => {
        e.preventDefault();
        setUnits(e.target.name);
    }

    const onInputChange = (e) => {
        updateHandOnChange(e, dispatch);
    }

    // Pull hand information from backend
    const loadHand = async () => {
        const startingHand = await axios.get(`http://localhost:8080/hand/${id}`);
        startingHand.data.stakeDecimal = strToStakesMap[startingHand.data.stakes];
        startingHand.data.stakeString = startingHand.data.stakes;

        dispatch({
            type: "update",
            field: startingHand.data
        });
    }

    useEffect(() => {
        loadHand().then(() => {
            setLoaded(true);
        });
    });

    const calculateResults = () => {
        const stakesNumber = parseFloat(hand.stakeDecimal);
        let resultNumber = parseFloat(hand.result);
        if (isNaN(stakesNumber) || isNaN(resultNumber)) {
            throw new TypeError("BB or result value is not valid: " + resultNumber + " " + stakesNumber);
        }
        if (units === "BB") {
            resultNumber *= stakesNumber;
        }

        return resultNumber.toString();
    }

    const cancel = (e) => {
        dispatch({
            type: 'clear'
        });
        navigate("/");
    }

    // Submit to axios
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        let objToPut = hand;

        // Calculate results in dollars and change stakes to string (e.g. 50NL)
        objToPut.result = calculateResults();
        objToPut.stakes = hand.stakeString;
        await axios.put(`http://localhost:8080/hand/${id}`, objToPut, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            if (error.response) {
                console.log("Error message sent from onSubmit: ")
                console.log(JSON.parse(error.config.data));
            }
        });
        navigate("/");
    }

    const UnitButton = () => {
        return (
            <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
            >
                Units ({units})
            </button>
        )
    }

    return !loaded ? null : (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="textCenter m-4">Edit Hand</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <div className="row my-3">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <DatePicker
                                            selected={dateFromString(hand.date)}
                                            id="datePicker"
                                            name="date"
                                            onChange={(e) => onInputChange(e)}
                                            showIcon
                                        />
                                        <label className="form-label" htmlFor="datePicker">Date</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <PinInput
                                            length={4}
                                            initialValue={hand.cards}
                                            type="custom"
                                            onChange={
                                                (val, _) => {
                                                    const evt = { target: {} };
                                                    evt.target = { name: 'cards', value: val };
                                                    onInputChange(evt);
                                                }
                                            }
                                            autoSelect={true}
                                        />
                                        <label className="form-label" htmlFor="cards">Cards (e.g. Ad5d)</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <select className="form-select"
                                            defaultValue={hand.position}
                                            aria-label="Select Position"
                                            id="position"
                                            name="position"
                                            onChange={(e) => onInputChange(e)}>
                                            <option name="SB" value="SB">SB</option>
                                            <option name="BB" value="BB">BB</option>
                                            <option name="UTG" value="UTG">UTG</option>
                                            <option name="UTG+1" value="UTG+1">UTG+1</option>
                                            <option name="MP" value="MP">MP</option>
                                            <option name="LJ" value="LJ">LJ</option>
                                            <option name="HJ" value="HJ">HJ</option>
                                            <option name="CO" value="CO">CO</option>
                                            <option name="BTN" value="BTN">BTN</option>
                                        </select>

                                        <label className="form-label" htmlFor="position">Position</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <select className="form-select"
                                            defaultValue={hand.stakeString}
                                            aria-label="Select Stakes"
                                            id="stakes"
                                            name="stakes"
                                            onChange={(e) => onInputChange(e)}>
                                            <option value="10NL" id=".1">10NL Online</option>
                                            <option value="20NL" id=".2">20NL Online</option>
                                            <option value="25NL" id=".25">25NL Online</option>
                                            <option value="50NL" id=".5">50NL Online</option>
                                            <option value="100NL" id="1">100NL Online</option>
                                            <option value="200NL" id="2">200NL Online</option>
                                            <option value="500NL" id="5">500NL Online</option>
                                            <option value="1/2 Live" id="2">1/2 Live</option>
                                            <option value="1/3 Live" id="3">1/3 Live</option>
                                            <option value="2/5 Live" id="5">2/5 Live</option> 
                                        </select>
                                        <label className="form-label" htmlFor="stakes">BB ($)</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <textarea
                                        className="form-control"
                                        id="history"
                                        name="history"
                                        rows="6"
                                        value={hand.history}
                                        maxLength="400"
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    <p>Hand History (text, optional)</p>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            id="link"
                                            className="form-control"
                                            name="link"
                                            value={hand.link}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                        <label className="form-label" htmlFor="link">Playback Link</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-md-12">
                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        name="notes"
                                        rows="6"
                                        maxLength="600"
                                        value={hand.notes}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                    <p>Notes</p>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-md-4"></div>
                                <div className="col-md-3">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            id="result"
                                            className="form-control"
                                            name="result"
                                            value={hand.result}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                        <label className="form-label" htmlFor="result">Result</label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="dropdown">
                                        <UnitButton />
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><a className="col-md-2 dropdown-item" name="Dollars" onClick={(e) => setUnitWrapper(e)} href="#/">Dollars</a></li>
                                            <li><a className="col-md-2 dropdown-item" name="BB" onClick={(e) => setUnitWrapper(e)} href="#/">BB</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                            <button type="button" onClick={(e) => cancel(e)} className="btn btn-outline-danger mx-4">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
