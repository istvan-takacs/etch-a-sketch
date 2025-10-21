let gridSize = 16;
let mouseDown = false;


function createDisplay(size=gridSize) {
    const squareContainer = document.querySelector(".square-container")
    squareContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        squareContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            colorSquare(square);
            row.appendChild(square);
        } 
    }
}

function colorSquare(square) {
    document.addEventListener("mousedown", () => {
        mouseDown = true;
    })
    document.addEventListener("mouseup", () => {
        mouseDown = false;
    })

    square.addEventListener("mouseenter", () => {
        if (mouseDown) {
            square.style["background-color"] = "black";
        }
    })
    square.addEventListener("mousedown", () => {
        square.style["background-color"] = "black";
    })
}

function manipulateGridBySlider() {
    let slider = document.getElementById("gridSize");
    let buttonContainer = document.querySelector(".button-container");
    let sliderOutput = document.createElement("p");
    sliderOutput.textContent = slider.value;
    buttonContainer.appendChild(sliderOutput);


    // Update the current slider value (each time you drag the slider handle)
    slider.addEventListener("mouseup", function() {
        sliderOutput.textContent = this.value;
        createDisplay(size=this.value)
    })
    slider.addEventListener("mousemove", function() {
        if (mouseDown) {
            sliderOutput.textContent = this.value;
        }
    })
}


manipulateGridBySlider()
createDisplay()
