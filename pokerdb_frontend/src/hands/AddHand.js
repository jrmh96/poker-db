import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../add-edit-special.scss';
import { useReducer } from 'react';

import { handReducer, defaultHand, updateHandOnChange, formatDate } from '../states/HandContext';
import PinInput from 'react-pin-input';

export default function AddHand() {

    // Hand states and managers defined in HandContext.js
    const [hand, dispatch] = useReducer(handReducer, defaultHand);

    const [units, setUnits] = useState("BB");

    // Set up references to default state values
    const { date, cards, position, stakeString, stakeDecimal, handhist, link, notes, result } = hand;

    // Wrap set units so that screen doesn't scroll
    const setUnitWrapper = (e) => {
        e.preventDefault();
        setUnits(e.target.name);
    }

    const onInputChange = (e) => {
        updateHandOnChange(e, dispatch);
    }

    const cancel = (e) => {
        navigate("/");
    }

    const calculateResults = () => {
        let resultNumber = parseFloat(result);
        if (isNaN(stakeDecimal) || isNaN(resultNumber)) {
            throw new TypeError("BB or result value is not valid");
        }
        if (units === "BB") {
            resultNumber *= stakeDecimal;
        }

        return resultNumber.toString();
    }

    // Submit to axios
    // onSubmit is double declared in EditHand.js - tech debt
    // Ideally I could define this once in HandContext.js or somewhere else
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        let objToPost = hand;
        objToPost.date = formatDate(hand.date);
        objToPost.result = calculateResults();
        objToPost.stakes = hand.stakeString;
        await axios.post("http://localhost:8080/addhand", objToPost, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            if (error.response) {
                console.log("Error message sent from onSubmit: ")
                console.log(error);
                console.log(JSON.parse(error.response.data));
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="textCenter m-4">Add Hand</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <div className="row my-3">
                                <div className="col-md-4"></div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <DatePicker 
                                            selected={date}
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
                                            initialValue={cards}
                                            type="custom"
                                            onChange={
                                                (val, _) => {
                                                    const evt = { target: {} };

                                                    const alternativeCase = string => string.split('')
                                                        .map((c, i) => i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()).join('');
                                                    val = alternativeCase(val);

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
                                            defaultValue={position}
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
                                            defaultValue={stakeString}
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
                                        value={handhist}
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
                                            value={link}  
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
                                        value={notes}
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
                                            value={result}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                        <label className="form-label" htmlFor="result">Result</label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="dropdown">
                                        <UnitButton />
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <li><a className="col-md-2 dropdown-item" name="BB" onClick={(e) => setUnitWrapper(e)} href="#/">BB</a></li>
                                            <li><a className="col-md-2 dropdown-item" name="Dollars" onClick={(e) => setUnitWrapper(e)} href="#/">Dollars</a></li>
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
