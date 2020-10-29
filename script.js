let valid = false;
let boardsize = 19;
let passes = 0;
let trapped = [];
let prisonersW = 0;
let prisonersB = 0;
let trappedCells = [];
/*while (!valid) {
    boardsize = prompt("Please enter a board size (7, 9, 11, 13, 17, 19)");
    if (boardsize <= 19 && boardsize >= 7 && boardsize % 2 == 1) {
        valid = true;
    }
}*/

let grid = {
    white: [],
    black: []
}

id("p1Rest").style.visibility = "hidden";
id("p2Rest").style.visibility = "hidden";
id("p2Pass").style.visibility = "hidden";
let turn = "black";
let used = [];
let state = 0;
id("p1").style.borderBottom = "1px solid white";
function id(id) {return document.getElementById(id)}
function makeBoard() {
    for (i = 0; i < boardsize; i++) {
        let row = document.createElement("div");
        row.id = "row" + i;
        row.setAttribute("class", "row");
        
        for (j = 0; j < boardsize; j++) {
            let cell = document.createElement("span");
            let input = document.createElement("button");
            let img = document.createElement("img");
            img.id = "cellIMG";
            input.setAttribute("id", j + " " + i);
            input.setAttribute("class", "button");
            img.setAttribute('draggable', false);
            input.setAttribute("onclick", "place(" + j + "," + i + ", 1)");
            input.setAttribute("oncontextmenu", "javascript:place(" + j + "," + i + ", 3);" + "return false;");
            if (i == 0 && j != 0 && j != boardsize - 1) {
                img.setAttribute("src", "images/t.png");
            }
            else if (i == boardsize - 1 && j != 0 && j != boardsize - 1) {
                img.setAttribute("src", "images/b.png");
            }
            else if (j == 0) {
                if (i == 0 && j == 0) {
                    img.setAttribute("src", "images/tl.png");
                }
                else if (j == 0 && i == boardsize - 1) {
                    img.setAttribute("src", "images/bl.png");
                }
                else {
                    img.setAttribute("src", "images/l.png");     
                }
            }
            else if (j == boardsize - 1) {
                if (i == 0) {
                    img.setAttribute("src", "images/tr.png");
                }
                else if (i == boardsize - 1) {
                    img.setAttribute("src", "images/br.png");
                }
                else {
                    img.setAttribute("src", "images/r.png");
                }
            }
            else if (j != 0 && i != 0) {
                img.setAttribute("src", "images/cell.png")
            }
            input.appendChild(img);
            cell.id = "cell" + j;
            cell.setAttribute("class", "cell");
            cell.appendChild(input);
            row.appendChild(cell);
        }
        area.appendChild(row);
    }
}

makeBoard();

function place(x, y, t) {
    let go = true;
    used.forEach(element => {
        if (element == x + " " + y) {
            console.log("USED");
            go = false;
        } 
    });
    console.log("T", t, go);
    if (t == 3 && !go) {
        id(x + " " + y).style.backgroundColor = "rgba(0, 0, 0, 0)";
        for (i = 0; i < used.length; i++) {
            console.log(used[i], x + " " + y)
            if (used[i] == x + " " + y) {
                used.splice(i, 1);
            }
        }
    }
    else if (t == 1 && go) {
        if (state == 0) {
            passes = 0;
            
            if (go) {
                //console.log("X: ", x, "Y", y);
                id(x + " " + y).style.backgroundColor = turn;
                if (turn == "white") {
                    turn = "black";
                    id("p1Pass").style.visibility = "visible";
                    id("p2Pass").style.visibility = "hidden";
                    id("p1").style.borderBottom = "1px solid white";
                    id("p2").style.borderBottom = "none";
                    grid.white.push(x + " " + y);
                }
                else {
                    turn = "white";
                    id("p1Pass").style.visibility = "hidden";
                    id("p2Pass").style.visibility = "visible";
                    id("p2").style.borderBottom = "1px solid black";
                    id("p1").style.borderBottom = "none";
                    grid.black.push(x + " " + y);
                }
                used.push(x + " " + y)
            }
        }   
    }
    //console.log(used);
}

function resign(who) {
    if (state == 0) {
        id("p1Btn").style.visibility = "hidden";
        id("p2Btn").style.visibility = "hidden";
        id("p1Pass").style.visibility = "hidden";
        id("p2Pass").style.visibility = "hidden";
        if (who == 1) {
            id("cr1").innerHTML = "👑";
            alert("Player 2 has resigned, Player 1 is Victorius!!!");
            id("p1Rest").style.visibility = "visible";            
            id("p2Rest").style.visibility = "visible";
        }
        else if (who == 0) {
            id("cr2").innerHTML = "👑";
            alert("Player 1 has resigned, Player 2 is Victorius!!!");
            id("p1Rest").style.visibility = "visible";            
            id("p2Rest").style.visibility = "visible";
        }
        else {
            let winner = check();
            if (winner != "tie") {
                alert("The Game Has ended " + winner + " is victorious");
            }
            else {
                alert("The game has ended in a tie");
                id("cr1").innerHTML = "👑";
                id("cr2").innerHTML = "👑";
                id("p1Rest").style.visibility = "visible";            
                id("p2Rest").style.visibility = "visible";
            }
        }
        state = 1;
    }
}

function restart() {
    state = 0;
    grid = {
        white: [],
        black: []
    }
    used = [];
    area.innerHTML = "";
    makeBoard();
    id("p1Btn").style.visibility = "visible";
    id("p2Btn").style.visibility = "visible";
    id("p1Rest").style.visibility = "hidden";            
    id("p2Rest").style.visibility = "hidden";
    id("cr1").innerHTML = "";
    id("cr2").innerHTML = "";
    id("p1").style.borderBottom = "1px solid white";
    id("p2").style.borderBottom = "none";
    id("p2Pass").style.visibility = "hidden";
    id("p1Pass").style.visibility = "visible";
}

function pass(who) {
    passes++;
    if (passes == 2) {
        resign(2);
    }
    else {
        if (who == 0 && turn == "black") {
            turn = "white";
            id("p2").style.borderBottom = "1px solid black";
            id("p1").style.borderBottom = "none";
            id("p1Pass").style.visibility = "hidden";
            id("p2Pass").style.visibility = "visible";

        }
        else if (who == 1 && turn == "white") {
            turn = "black";
            id("p1").style.borderBottom = "1px solid white";
            id("p2").style.borderBottom = "none";
            id("p2Pass").style.visibility = "hidden";
            id("p1Pass").style.visibility = "visible";
        }
    }
}

function check() {
    grid.white.forEach(element => {
       let peiceState = checkAround("white", element); 
    });
    grid.black.forEach(element => {
       let peiceState = checkAround("black", element); 
    });
}
  
function checkAround(colT, peice) {
    let color;
    if (colT == "black") color = "white";
    else color = "black";
    let arr = peice.split(" ");
    let x = arr[0];
    let y = arr[1];
    let up = parseInt(y) - 1;
    let down = parseInt(y) + 1;
    let left = parseInt(x) - 1;
    let right = parseInt(x) + 1;
    let u = false;
    let d = false;
    let l = false;
    let r = false;
    let pT;
    let liberties = [];
    //console.log(up, down, left, right, boardsize);
    if (up < 0 && left < 0) pT = "tl"; //YEP
    else if (up < 0 && right == boardsize) pT = "tr"; //YEP
    else if (left < 0 && down == boardsize) pT = "bl"; //YEP
    else if (right == boardsize && down == boardsize) pT = "br"; //YEP
    else if (up < 0 && left > 0 && right < boardsize) pT = "t"; //YEP
    else if (left < 0 && up > 0 && down < boardsize) pT = "l";//YEP
    else if (right == boardsize && up > 0 && down < boardsize) pT = "r";
    else if (down == boardsize && left > 0 && right < boardsize) pT = "b";
    else pT = "cell";
    //console.log("TYPE", pT, x, y);
    //console.log(x + " " + up);
    if (getType(id(x + " " + up)) == color) {
        u = true;
    }
    else if (getType(id(x + " " + up)) == "empty") {
        liberties.push(x + " " + up);
    }
    if (getType(id(x + " " + down)) == color) {
        d = true;
    } 
    else if (getType(id(x + " " + down)) == "empty") {
        liberties.push(x + " " + down);
    }
    if (getType(id(left + " " + y)) == color) {
        l = true;
    } 
    else if (getType(id(left + " " + y)) == "empty") {
        liberties.push(left + " " + y);
    }
    if (getType(id(right + " " + y)) == color) {
        r = true;
    } 
    else if (getType(id(right + " " + y)) == "empty") {
        liberties.push(right + " " + y);
    }
    ///console.log(colT, u, d, l, r);
    if (u && d && l && r) {
        console.log(colT, "is trapped at", x, y);
    }
    /*else if (!u) {
        checkAround("white", x + " " + up);
    }
    else if (!d) {
        checkAround("white", x + " " + down);
    }
    else if (!l) {
        checkAround("white", left + " " + y);
    }
    else if (!r) {
        checkAround("white", right + " " + y);
    }*/
    console.log(liberties);
    liberties.forEach(e => {
        checkAround(colT, e);
    })
}
function getType(val) { 
    //if (id(val) != null) {
    let color = val.style.backgroundColor;
    if (color == "black" || color == "white") {
        return color;
    }
    return "empty";    
    //}
}
//var simpleAlert = document.querySelector(".simple-alert"); simpleAlert.addEventListener("click", function (e) { e.preventDefault(); injectTemplate(getBannerTemplate()); var btnClose = document.querySelector(".banner-close"); btnClose.addEventListener("click", function (closeEvt) { var banner = document.querySelector(".banner"); banner.parentNode.removeChild(banner); }); }); 