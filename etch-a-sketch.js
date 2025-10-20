const squareContainer = document.querySelector(".square-container")
let mouseDown = false;
document.addEventListener("mousedown", () => {
    mouseDown = true;
})
document.addEventListener("mouseup", () => {
    mouseDown = false;
})

function createDisplay() {
    for (let i = 0; i < 16; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        squareContainer.appendChild(row);
        for (let j = 0; j < 16; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            colorSquare(square);
            row.appendChild(square);
        } 
    }
}

function colorSquare(square) {
    square.addEventListener("mouseenter", () => {
        if (mouseDown) {
            square.style["background-color"] = "black";
        }
    })
    square.addEventListener("mousedown", () => {
        square.style["background-color"] = "black";
    })
}


createDisplay()
