id("p1Rest").style.display = "none";
id("p2Rest").style.display = "none";
let turn = "white";
let used = [];
let state = 0;
id("p1").style.borderBottom = "1px solid black";
function id(id) {return document.getElementById(id)}
function makeBoard() {
    for (i = 0; i < 19; i++) {
        let row = document.createElement("div");
        row.id = "row" + i;
        row.setAttribute("class", "row");
        
        for (j = 0; j < 19; j++) {
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
                id("p2").style.borderBottom = "1px solid white";
                id("p1").style.borderBottom = "none";
            }
            else {
                turn = "white";
                id("p1").style.borderBottom = "1px solid black";
                id("p2").style.borderBottom = "none";
            }
            used.push(x + " " + y)
        }
    }
}

function resign(who) {
    if (state == 0) {
        id("p1Btn").style.display = "none";
        id("p2Btn").style.display = "none";
        if (who == 1) {
            id("cr1").innerHTML = "👑";
            alert("Player 2 has resigned, Player 1 is Victorius!!!");
            id("p1Rest").style.display = "block";            
            id("p2Rest").style.display = "block";
        }
        else {
            id("cr2").innerHTML = "👑";
            alert("Player 1 has resigned, Player 2 is Victorius!!!");
            id("p1Rest").style.display = "block";            
            id("p2Rest").style.display = "block";
        }
        state = 1;
    }
}

function restart() {
    state = 0;
    area.innerHTML = "";
    makeBoard();
    id("p1Btn").style.display = "block";
    id("p2Btn").style.display = "block";
    id("p1Rest").style.display = "none";            
    id("p2Rest").style.display = "none";
    id("cr1").innerHTML = "";
    id("cr2").innerHTML = "";
}

//var simpleAlert = document.querySelector(".simple-alert"); simpleAlert.addEventListener("click", function (e) { e.preventDefault(); injectTemplate(getBannerTemplate()); var btnClose = document.querySelector(".banner-close"); btnClose.addEventListener("click", function (closeEvt) { var banner = document.querySelector(".banner"); banner.parentNode.removeChild(banner); }); }); 