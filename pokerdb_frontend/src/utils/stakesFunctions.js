// Stakes are stored as decimal numbers in the react state 
// but should be stored as string values in the db and for display

// The issue is that decimal number (5) to string value (500NL/ 2-5 Live) 
// is not one to one
export const bbToStrMap = {
    ".1": "10NL",
    ".2": "20NL",
    ".25": "25NL",
    ".5": "50NL",
    "1": "100NL",
    "2": "1/2 Live",
    "3": "1/3 Live",
    "5": "500NL"
}

export const strToStakesMap = {
    "10NL":".1",
    "20NL":".2",
    "25NL":".25",
    "50NL":".5",
    "100NL":"1",
    "500NL": "5",
    "1/2 Live":"2",
    "1/3 Live":"3",
    "2/5 Live":"5"
}

