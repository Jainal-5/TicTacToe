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

//difficulty
var EASY = 0
var NORMAL = 1
var HARD = 2
var difficulty = EASY

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
            //this shows the dialog again.
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
    //if the oponent is already a computer
    //let the user select difficulty
    if(oponent === COMPUTER){
        showDifficultyDialog()
    }

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
    var index = null
    var x = null
    var y = null

    //check for difficulty
    if (difficulty === EASY) {
        index = computerEasy()
    } else if (difficulty === NORMAL) {
        index = computerNormal()

        //There is no blocking moves
        if (index === null) {
            index = computerEasy()
        }
    } else if (difficulty === HARD) {
        index = computerHard()

        if (index === null) {
            index = computerNormal()
        }

        if (index === null) {
            index = computerEasy()
        }
    } else {
        alert(`Somethings wrong with the difficulty\nDifficulty: ${difficulty}`)
    }

    //if index is not null
    if (index !== null) {
        x = index[0]
        y = index[1]
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

//to do... Add different computer difficulty.
function computerEasy() {
    var x = Math.floor(Math.random() * 3)
    var y = Math.floor(Math.random() * 3)

    return [x,
        y]
}

//normal
function computerNormal() {
    //Todo implement a blocking mechanics

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //only do the operation on
            //empty cell
            if (table[i][j] === E) {
                //temporarily set X to the
                //cell. Then check it if
                //if it a winning move for
                //X. If it is, then block
                //it.
                table[i][j] = X

                //temporarily set current
                //to X, cause that is how
                //our check algorithm
                //works
                current = X

                if (check()) {
                    //change the table and
                    //cell back
                    table[i][j] = E
                    current = O

                    //return as index
                    return [i,
                        j]
                }

                //change the table and
                //cell back after the check
                table[i][j] = E
                current = O
            }
        }
    }

    return null
}

//hard computer
function computerHard() {
    //check for winning move for the computer

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            //same algorithm as normal

            if (table[i][j] === E) {
                table[i][j] = O
                current = O

                if (check()) {
                    table[i][j] = E
                    current = O

                    return [i,
                        j]
                }

                table[i][j] = E
                current = O
            }
        }
    }

    return null
}

//show a dialog where user select difficulty
//level.
function showDifficultyDialog() {
    var dialog = document.getElementsByClassName("dialog")[1]

    dialog.style.scale = "1"
    dialog.style.visibility = "visible"
}

function closeDifficultyDialog() {
    var dialog = document.getElementsByClassName("dialog")[1]

    dialog.style.scale = "0"

    dialog.addEventListener("transitioned", function() {
        dialog.style.visibility = "hidden"
    })
}

function setDifficulty(level) {
    difficulty = level

    closeDifficultyDialog()
}

showDifficultyDialog()