//possible value for the table
var E = 0;
var X = 1
var O = 2

//empty table
var table = [
    [E, E, E],
    [E, E, E],
    [E, E, E]
]

//current player
var current = X
var player = "X"

//state of the game
var ongoing = true

//scores
var xScore = 0
var oScore = 0
var drawScore = 0

//oponent
var COMPUTER = 0
var playerVSPlayer = 1
var oponent = COMPUTER

//initialize an Empty table
function initializeEmpTable() {
    // body...
    table = [[E,
        E,
        E],
        [E,
            E,
            E],
        [E,
            E,
            E]]

    var elements = document.getElementsByClassName("cell")

    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = ""
    }

    current = X
    player = "X"
    ongoing = true

    //display whose turn it is.
    var turn = document.getElementsByClassName("current")[0]

    turn.innerHTML = `It is ${player} turn`

}

//this is where we change the value of table
function printTable(index, element) {
    //check if the current index is Empty
    if (table[index[0]][index[1]] === E) {
        table[index[0]][index[1]] = current
        element.innerHTML = player
    } else {
        return "not empty"
    }
}

//check for Winner
function check() {
    //check the table horizontally,
    //vertically, and diagonally if the
    //value === current

    //horizontally
    if (table[0][0] === current && table[0][1] === current && table[0][2] === current
    ) {
        return true
        //mid
    } else if (table[1][0] === current && table[1][1] === current && table[1][2] === current) {
        return true
        //bottom
    } else if (table[2][0] === current && table[2][1] === current && table[2][2] === current) {
        return true
    }

    //vertically
    if (table[0][0] === current && table[1][0] === current && table[2][0] === current) {
        return true
    } else if (table[0][1] === current && table[1][1] === current && table[2][1] === current) {
        return true
    } else if (table[0][2] === current && table[1][2] === current && table[2][2] === current) {
        return true
    }

    //diagonally
    if (table[1][1] === current && table[0][2] === current && table[2][0] === current) {
        return true
    } else if (table[1][1] === current && table[0][0] === current && table[2][2] === current) {
        return true
    }

    //default
    return false
}

//check for draw
function isDraw() {
    //loop through the row in table
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            //check if there are still
            //empty cells
            if (table[i][j] === E) {
                return false
            }
        }
    }

    return true
}

//show dialog
function showDialog(message) {
    var dialog = document.getElementsByClassName("dialog")[0]
    var result = document.getElementById("result")

    dialog.style.scale = "1"
    dialog.style.visibility = "visible"
    result.innerHTML = message
}

function closeDialog() {
    var dialog = document.getElementsByClassName("dialog")[0]

    dialog.style.scale = "0"

    //add an event listener for
    //transitioned, it is triggered when
    //the transition is finished
    dialog.addEventListener("transitioned", function() {
        dialog.style.visibility = "hidden"
    })

}

//btnNo function
function btnNo() {
    closeDialog()
}

//btnYes
function btnYes() {
    var dialog = document.getElementsByClassName("dialog")[0]

    closeDialog()

    initializeEmpTable()
}

//scores
function setScores() {
    //elements
    var xScoreElement = document.getElementById('X')
    var oScoreElement = document.getElementById('O')

    //add scores
    xScore = current === X ? xScore + 1: xScore
    oScore = current === O ? oScore + 1: oScore

    xScoreElement.innerHTML = "X: " + xScore
    oScoreElement.innerHTML = "O: " + oScore
}

//resetScore
function resetScore() {
    xScore = 0
    oScore = 0
    drawScore = 0

    var xScoreElement = document.getElementById('X')
    var oScoreElement = document.getElementById('O')
    var drawScoreElement = document.getElementById('draw')

    xScoreElement.innerHTML = "X: " + xScore
    oScoreElement.innerHTML = "O: " + oScore
    drawScoreElement.innerHTML = "Draw: " + drawScore
}

//processGame
function processGame() {
    //check
    if (check()) {
        showDialog(`The winner is ${player}`)

        if (ongoing) {
            setScores()
        }

        ongoing = false

        return 0
    }

    if (isDraw()) {
        showDialog("Draw")

        //increase draw score
        drawScore++
        var drawScoreElement = document.getElementById('draw')

        draw.innerHTML = "Draw: " + drawScore

        ongoing = false
        return 0
    }

    //change player
    current = current === X ? O: X
    player = player === "X" ? "O": "X"

    //display whose turn it is.
    var turn = document.getElementsByClassName("current")[0]

    turn.innerHTML = `It is ${player} turn`

}

//button clicked
function btnClicked(id) {
    //get the element of the current
    //button
    var element = document.getElementById(id)

    //get the value of the current
    //button
    var value = element.attributes.value.value

    //check if the clicked cell
    //is empty
    if (isCellEmpty(value[0], value[1])) {
        //if ongoing, modify the table
        if (ongoing) {
            //if player vs player
            if (oponent === playerVSPlayer) {
                printTable(value, element)
                processGame()
            } else if (oponent === COMPUTER) {
                //todo... implement a computer
                //moves.
                //computer is O
                if (current === X) {
                    //it is our move
                    printTable(value, element)

                    processGame()

                    //prevent the computer from
                    //making a move after game
                    //ends
                    if (ongoing) {
                        computerMoves()
                        processGame()
                    }
                }
            } else {
                alert(`Something is wrong with the oponent\noponent: ${oponent}`)
            }
        } else {
            processGame()
        }
    } else {
        if (ongoing) {
            alert("Cell is not empty")
        } else {
            processGame()
        }
    }
}

function vsComputer() {
    alert("You are now Playing against Computer.")

    initializeEmpTable()

    resetScore()

    oponent = COMPUTER
}

function vsPlayer() {
    alert("You are now playing against player.")

    initializeEmpTable()

    resetScore()

    oponent = playerVSPlayer
}

//checks if empty cell
function isCellEmpty(x, y) {
    x = parseInt(x)
    y = parseInt(y)
    return table[x][y] === E ? true: false
}

//computerMoves
function computerMoves() {
    var x = null
    var y = null

    //check for player winning move then
    //block it
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //check the first empty cell
            //that we encounter
            if (isCellEmpty(i, j)) {

                //check for winning move
                //temporary add O
                table[i][j] = O
                current = O

                //check if it is a winning
                //move
                if (check()) {

                    //if it is. Get index
                    x = i
                    y = j
                }

                //temporarily add X
                //and change current to X
                table[i][j] = X
                current = X

                //if check
                if (check()) {
                    //get the index
                    //it will be used to
                    //block
                    x = i
                    y = j

                }

                //change back
                table[i][j] = E
                current = O
            }
        }
    }
    //if there is no blocking opportunity
    if (x === null && y === null) {
        //random from range 0 to 4
        x = Math.floor(Math.random() * 3)
        y = Math.floor(Math.random() * 3)
    }

    var element = ""

    //every cell
    var cells = document.getElementsByClassName("cell")

    //loop through cells, and get the
    //element that with value matching
    //the x and y
    for (var cell of cells) {
        if (cell.attributes.value.value === x.toString() + y.toString()) {
            element = cell
            break
        }
    }

    if (isCellEmpty(x, y)) {
        printTable([x, y], element)
    } else {
        return computerMoves()
    }
}