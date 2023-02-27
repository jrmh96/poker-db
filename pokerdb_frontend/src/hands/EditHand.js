import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../buttondropdown.css';
import { bbToStrMap, strToStakesMap } from '../utils/stakesFunctions.js';

export default function EditHand() {

    const {id} = useParams(); // User url input parameter

    // Format date util function
    const formatDate = (date) => {
        // input: javascript Date object
        // output: "YYYY-mm-dd" string rep. of date
        const month = date.getMonth() + 1;
        const sDate = date.getFullYear().toString() + "-" + month.toString() + "-" + date.getDate().toString();
        return sDate;
    }

    // Set up all states

    // Backend stores results as dollars, so initialize button state as dollars
    const [units, setUnits] = useState("Dollars");

    // Wrap setUnits so that screen doesn't scroll
    const setUnitWrapper = (e) => {
        e.preventDefault();
        setUnits(e.target.name);
    }

    // stakes in the context of this page will be values like ".1", ".5"
    // The string we submit to backend will be "10NL" "50NL" and the like
    const [hand, setHand] = useState({
        date: formatDate(new Date()),
        cards: "",
        position: "",
        stakes: "",
        history: "",
        link: "",
        notes: "",
        result: ""
    });

    // Set up references to default state values
    const { date, cards, position, stakes, h, link, notes, result } = hand;

    // Pull hand information from backend
    const loadHand = async () => {
        const startingHand = await axios.get(`http://localhost:8080/hand/${id}`);
        console.log(strToStakesMap);
        startingHand.data.stakes = strToStakesMap[startingHand.data.stakes];
        console.log(startingHand);
        setHand(startingHand.data);
    }

    useEffect(()=>{
        loadHand();
    }, []);

    const onInputChange = (e) => {
        const passedEvent = { name: "", value: "" }
        // Change react datepicker Date type to string
        if (e instanceof Date) {
            passedEvent["name"] = "date";
            passedEvent["value"] = formatDate(e);
        } else {
            passedEvent["name"] = e.target.name;
            passedEvent["value"] = e.target.value;
        }

        setHand({ ...hand, [passedEvent["name"]]: passedEvent["value"] });
    }

    const calculateResults = () => {
        const stakesNumber = parseFloat(stakes);
        let resultNumber = parseFloat(result);
        if (isNaN(stakesNumber) || isNaN(resultNumber)) {
            throw new TypeError("BB or result value is not valid");
        }
        if (units === "BB") {
            resultNumber *= stakesNumber;
        }

        return resultNumber.toString();
    }

    // Submit to axios
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        let objToPut = hand;

        // Calculate results in dollars and change stakes to string (e.g. 50NL)
        objToPut.result = calculateResults();
        objToPut.stakes = bbToStrMap[hand.stakes];
        await axios.put(`http://localhost:8080/hand/${id}`, objToPut, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(function (error) {
            if (error.response) {
                console.log("The message sent: ")
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

    return (
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
                                            selected={new Date(date)}
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
                                        <input
                                            type="text"
                                            id="cards"
                                            name="cards"
                                            value={cards}
                                            className="form-control"
                                            onChange={(e) => onInputChange(e)}
                                        />
                                        <label className="form-label" htmlFor="cards">Cards</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            value={position}
                                            className="form-control"
                                            onChange={(e) => onInputChange(e)}
                                        />
                                        <label className="form-label" htmlFor="position">Position</label>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-outline">
                                        <select className="form-select"
                                            value={stakes}
                                            aria-label="Select Stakes"
                                            id="stakes"
                                            name="stakes"
                                            onChange={(e) => onInputChange(e)}>
                                            <option value=".1">10NL Online</option>
                                            <option value=".2">20NL Online</option>
                                            <option value=".25">25NL Online</option>
                                            <option value=".5">50NL Online</option>
                                            <option value="2">1/2 Live</option>
                                            <option value="3">1/3 Live</option>
                                            <option value="5">2/5 Live</option>
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
                                        value={h}
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
                                        maxLength="400"
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
                                            <li><a className="col-md-2 dropdown-item" name="Dollars" onClick={(e) => setUnitWrapper(e)} href="#">Dollars</a></li>
                                            <li><a className="col-md-2 dropdown-item" name="BB" onClick={(e) => setUnitWrapper(e)} href="#">BB</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-primary">Submit</button>
                            <button type="submit" className="btn btn-outline-danger mx-4">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
