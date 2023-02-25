// Stakes are stored in BB decimals in the react state 
// but should be stored as 10NL string values in db and for display
export const bbToStrMap = {
    ".1": "10NL",
    ".2": "20NL",
    ".25": "25NL",
    ".5": "50NL",
    "2": "1/2 Live",
    "3": "1/3 Live",
    "5": "2/5 Live"
}

export const strToStakesMap = {
    "10NL":".1",
    "20NL":".2",
    "25NL":".25",
    "50NL":".5",
    "1/2 Live":"2",
    "1/3 Live":"3",
    "2/5 Live":"5"
}

