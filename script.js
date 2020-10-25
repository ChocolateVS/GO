let valid = false;
let boardsize 
while (!valid) {
    boardsize = prompt("Please enter a board size (7, 9, 11, 13, 17, 19)");
    if (boardsize <= 19 && boardsize >= 7 && boardsize % 2 == 1) {
        valid = true;
    }
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
            input.setAttribute('draggable', false);
            img.setAttribute("onclick", "place(" + j + "," + i + ")");
            if (i == 0 && j != 0 && j != 18) {
                img.setAttribute("src", "images/t.png");
            }
            else if (i == 18 && j != 0 && j != 18) {
                img.setAttribute("src", "images/b.png");
            }
            else if (j == 0) {
                if (i == 0 && j == 0) {
                    img.setAttribute("src", "images/tl.png");
                }
                else if (j == 0 && i == 18) {
                    img.setAttribute("src", "images/bl.png");
                }
                else {
                    img.setAttribute("src", "images/l.png");     
                }
            }
            else if (j == 18) {
                if (i == 0) {
                    img.setAttribute("src", "images/tr.png");
                }
                else if (i == 18) {
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

function place(x, y) {
    if (state == 0) {
        let go = true;
        used.forEach(element => {
            if (element == x + " " + y) {
                console.log("USED");
                go = false;
            } 
        });
        if (go) {
                console.log("X: ", x, "Y", y);
            id(x + " " + y).style.backgroundColor = turn;
            if (turn == "white") {
                turn = "black";
                id("p1Pass").style.visibility = "visible";
                id("p2Pass").style.visibility = "hidden";
                id("p1").style.borderBottom = "1px solid white";
                id("p2").style.borderBottom = "none";
            }
            else {
                turn = "white";
                id("p1Pass").style.visibility = "hidden";
                id("p2Pass").style.visibility = "visible";
                id("p2").style.borderBottom = "1px solid black";
                id("p1").style.borderBottom = "none";
            }
            used.push(x + " " + y)
        }
    }
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
        else {
            id("cr2").innerHTML = "👑";
            alert("Player 1 has resigned, Player 2 is Victorius!!!");
            id("p1Rest").style.visibility = "visible";            
            id("p2Rest").style.visibility = "visible";
        }
        state = 1;
    }
}

function restart() {
    state = 0;
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
}

function pass(who) {
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
//var simpleAlert = document.querySelector(".simple-alert"); simpleAlert.addEventListener("click", function (e) { e.preventDefault(); injectTemplate(getBannerTemplate()); var btnClose = document.querySelector(".banner-close"); btnClose.addEventListener("click", function (closeEvt) { var banner = document.querySelector(".banner"); banner.parentNode.removeChild(banner); }); }); 