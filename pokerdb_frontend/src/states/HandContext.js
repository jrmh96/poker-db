// Functions to manage hand info as react state here

export const emptyHand = {
    date: new Date(),
    cards: "",
    position: "",
    stakeString: "",
    stakeDecimal: "",
    history: "",
    link: "",
    notes: "",
    result: ""
}

export const defaultHand = {
    date: new Date(),
    cards: "",
    position: "SB",
    stakeString: "10NL",
    stakeDecimal: ".1",
    history: "",
    link: "",
    notes: "",
    result: ""
}

export function updateHandOnChange(evt, dispatchFn) {
    const passedEvent = {};
    if (evt instanceof Date) {
        passedEvent["date"] = evt;
    } else if (evt.target.name === "stakes") {
        const selectedStakes = evt.target[evt.target.selectedIndex];
        passedEvent["stakeString"] = selectedStakes.value;
        passedEvent["stakeDecimal"] = parseFloat(selectedStakes.id);
    } else {
        passedEvent[evt.target.name] = evt.target.value;
    }

    dispatchFn({
        type: 'update',
        field: passedEvent
    });
}

export function handReducer(currentHand, action) {
    // Return updated hand state
    switch (action.type) {
        case 'update': {
            return ({ ...currentHand, ...action.field });
        }
        case 'clear': {
            return defaultHand;
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}

export function formatDate(date){
    // input: javascript Date object
    // output: "YYYY-mm-dd" string rep. of date
    // Java backend needs date in this format
    const month = date.getMonth() + 1;
    const sDate = date.getFullYear().toString() + "-" + month.toString() + "-" + date.getDate().toString();
    return sDate;
}

