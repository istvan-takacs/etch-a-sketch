let mouseDown = false;
let squareColor = "black";

document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);


function createDisplay(size) {
    const squareContainer = document.querySelector(".square-container")
    squareContainer.innerHTML = "";
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        squareContainer.appendChild(row);
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            colorSquare(square, squareColor);
            row.appendChild(square);
        } 
    }
}

function colorSquare(square) {
    square.addEventListener("mouseenter", () => {
        if (mouseDown) {
            square.style.backgroundColor = squareColor;
        }
    })
    square.addEventListener("mousedown", () => {
        square.style.backgroundColor = squareColor;
    })
}

function manipulateGridBySlider() {
    let slider = document.getElementById("gridSize");
    let slideContainer = document.querySelector(".slidecontainer")
    // let buttonContainer = document.querySelector(".button-container");
    let sliderOutput = document.createElement("p");
    sliderOutput.setAttribute("id", "gridSizeText");
    sliderOutput.textContent = slider.value + " x " + slider.value;
    slideContainer.appendChild(sliderOutput);


    // Update the current slider value (each time you drag the slider handle)
    slider.addEventListener("input", function() {
    sliderOutput.textContent = this.value;
    });

    slider.addEventListener("change", function() {
        createDisplay(this.value);
    });

}

function addClearButton() {
    let buttonContainer = document.querySelector(".button-container");
    let clearButton = document.createElement("button");
    clearButton.setAttribute("class", "clear-button")
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", function() {
        let size = document.querySelector("#gridSizeText").textContent
        createDisplay(size);
    })
    buttonContainer.appendChild(clearButton);
}

function addPalette() {
    let buttonContainer = document.querySelector(".button-container");
    let paletteContainer = document.createElement("div");
    paletteContainer.setAttribute("id", "palette");
    buttonContainer.appendChild(paletteContainer);
    let paletteDesc = document.createElement("h2");
    paletteDesc.textContent = "Palette";
    paletteContainer.appendChild(paletteDesc);
    let paletteButtonContainer =  document.createElement("div");
    paletteContainer.appendChild(paletteButtonContainer);

    let arr = ["black", "red", "orange", "yellow", "green", "blue", "purple", "pink"];
    arr.forEach(color => {
        let colorButton = document.createElement("button");
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener("click", function() {
            squareColor = color;
        })
        paletteButtonContainer.appendChild(colorButton); 
    });
}


manipulateGridBySlider()
createDisplay(16)
addClearButton()
addPalette()
