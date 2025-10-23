// ============================================
// GLOBAL STATE
// ============================================
// Track whether mouse button is currently pressed
let mouseDown = false;

// Currently selected color from the palette
let squareColor = "black";

// Drawing mode flags - only one can be active at a time
let goCrazy = false;         // Random colors mode
let darkeningMode = false;   // Darkening mode
let lighteningMode = false;  // Lightening mode

// Available color palette for drawing
let palette = [
    "#000000", // black
    "#FFFFFF", // white  
    "#d5e4de", // pale gray
    "#8B4513", // brown
    "#800000", // maroon
    "#FF0000", // red
    "#FFA500", // orange
    "#FFFF00", // yellow
    "#00FF00", // lime
    "#008000", // green
    "#00FFFF", // cyan
    "#0000FF", // blue
    "#000080", // navy
    "#800080", // purple
    "#FF00FF", // magenta
    "#FFC0CB"  // pink
];


// ============================================
// MOUSE EVENT TRACKING
// ============================================
// Track mouse button state globally for drag drawing
document.addEventListener("mousedown", () => mouseDown = true);
document.addEventListener("mouseup", () => mouseDown = false);


// ============================================
// GRID CREATION
// ============================================
/**
 * Creates a grid of squares for drawing
 * @param {number} size - The dimensions of the grid (size x size)
 */
function createDisplay(size) {
    const squareContainer = document.querySelector(".square-container");
    squareContainer.innerHTML = "";
    
    // Create rows
    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        squareContainer.appendChild(row);
        
        // Create squares within each row
        for (let j = 0; j < size; j++) {
            let square = document.createElement("div");
            square.classList.add("square");
            colorSquare(square, squareColor);
            row.appendChild(square);
        } 
    }
}


// ============================================
// DRAWING LOGIC
// ============================================
/**
 * Attaches drawing event listeners to a square
 * Handles different drawing modes (normal, crazy, darken, lighten)
 * @param {HTMLElement} square - The square element to add drawing functionality to
 */
function colorSquare(square) {
    // Handle drawing while dragging (mouseenter with button pressed)
    square.addEventListener("mouseenter", () => {
        if (mouseDown && darkeningMode) {
            // Darken the current color by 10%
            const currentColor = square.style.backgroundColor || 'rgb(213, 228, 222)';
            const hexColor = rgbToHex(currentColor);
            square.style.backgroundColor = darkenColor(hexColor, -10);
            
        } else if (mouseDown && lighteningMode) {
            // Lighten the current color by 10%
            const currentColor = square.style.backgroundColor || 'rgb(213, 228, 222)';
            const hexColor = rgbToHex(currentColor);
            square.style.backgroundColor = darkenColor(hexColor, 10);
            
        } else if (mouseDown && goCrazy) {
            // Apply random color from palette
            square.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
            
        } else if (mouseDown) {
            // Normal drawing with selected color
            square.style.backgroundColor = squareColor;
        }
    });
    
    // Handle single click drawing
    square.addEventListener("mousedown", () => {
        if (darkeningMode) {
            const currentColor = square.style.backgroundColor || 'rgb(213, 228, 222)';
            const hexColor = rgbToHex(currentColor);
            square.style.backgroundColor = darkenColor(hexColor, -10);
            
        } else if (lighteningMode) {
            const currentColor = square.style.backgroundColor || 'rgb(213, 228, 222)';
            const hexColor = rgbToHex(currentColor);
            square.style.backgroundColor = darkenColor(hexColor, 10);
            
        } else if (goCrazy) {
            square.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
            
        } else {
            square.style.backgroundColor = squareColor;
        }
    });
}


// ============================================
// UI CONTROLS - SLIDER
// ============================================
/**
 * Initializes the grid size slider control
 * Creates display text and updates grid when slider changes
 */
function manipulateGridBySlider() {
    let slider = document.getElementById("gridSize");
    let slideContainer = document.querySelector(".slidecontainer");
    
    // Create and display the current grid size text
    let sliderOutput = document.createElement("p");
    sliderOutput.setAttribute("id", "gridSizeText");
    sliderOutput.textContent = slider.value + " x " + slider.value;
    slideContainer.appendChild(sliderOutput);

    // Update display text as slider moves
    slider.addEventListener("input", function() {
        sliderOutput.textContent = this.value + " x " + this.value;
    });

    // Recreate grid when slider is released
    slider.addEventListener("change", function() {
        createDisplay(this.value);
    });
}


// ============================================
// UI CONTROLS - CLEAR BUTTON
// ============================================
/**
 * Creates and initializes the clear button
 * Resets the grid to blank state when clicked
 */
function addClearButton() {
    let buttonContainer = document.querySelector(".button-container");
    let clearButton = document.createElement("button");
    clearButton.setAttribute("class", "clear-button");
    clearButton.textContent = "Clear";
    
    // Clear the grid by recreating it
    clearButton.addEventListener("click", function() {
        let size = document.querySelector(".slider").value;
        createDisplay(size);
    });
    
    buttonContainer.appendChild(clearButton);
}


// ============================================
// UI CONTROLS - COLOR PALETTE
// ============================================
/**
 * Creates the color palette interface
 * Generates a button for each color and handles color selection
 */
function addPalette() {
    let buttonContainer = document.querySelector(".button-container");
    
    // Create palette container
    let paletteContainer = document.createElement("div");
    paletteContainer.setAttribute("id", "palette");
    buttonContainer.appendChild(paletteContainer);
    
    // Add palette title
    let paletteDesc = document.createElement("h2");
    paletteDesc.textContent = "Palette";
    paletteContainer.appendChild(paletteDesc);
    
    // Create container for color buttons
    let paletteButtonContainer = document.createElement("div");
    paletteContainer.appendChild(paletteButtonContainer);

    // Create a button for each color in the palette
    palette.forEach(color => {
        let colorButton = document.createElement("button");
        colorButton.style.backgroundColor = color;
        
        colorButton.addEventListener("click", function() {
            // Set the selected color
            squareColor = color;
    
            // Update visual selection state
            document.querySelectorAll('#palette div button').forEach(btn => {
                btn.classList.remove('selected');
            });
            colorButton.classList.add('selected');
            
            // Deactivate all special modes
            darkeningMode = false;
            lighteningMode = false;
            goCrazy = false;
            document.querySelectorAll('.active').forEach(btn => {
                btn.classList.remove('active');
            });
        });
        
        paletteButtonContainer.appendChild(colorButton); 
    });
}


// ============================================
// UI CONTROLS - GO CRAZY MODE
// ============================================
/**
 * Creates and initializes the "Go Crazy" mode button
 * Toggles random color mode and deactivates other modes
 */
function addGoCrazy() {
    let buttonGoCrazy = document.createElement("button");
    buttonGoCrazy.setAttribute("id", "goCrazy");
    buttonGoCrazy.textContent = "Go Crazyy";
    let buttonContainer = document.querySelector(".button-container");
    buttonContainer.appendChild(buttonGoCrazy);
    
    buttonGoCrazy.addEventListener("click", function() {
        // Toggle crazy mode
        goCrazy = !goCrazy;
        
        // Update button visual state
        document.querySelectorAll('.active').forEach(btn => {
            btn.classList.remove('active');
        });
        buttonGoCrazy.classList.toggle("active"); 
        
        // Deactivate other modes
        darkeningMode = false;
        lighteningMode = false;
    });
}


// ============================================
// UI CONTROLS - DARKEN/LIGHTEN MODES
// ============================================
/**
 * Creates and initializes the darken and lighten mode buttons
 * These modes allow gradual darkening or lightening of colors
 */
function addDarkenLighten() {
    let buttonDarken = document.createElement("button");
    buttonDarken.setAttribute("id", "darken");
    buttonDarken.textContent = "Darken";
    
    let buttonLighten = document.createElement("button");
    buttonLighten.setAttribute("id", "lighten");
    buttonLighten.textContent = "Lighten";
    
    let buttonContainer = document.querySelector(".button-container");
    buttonContainer.appendChild(buttonLighten);
    buttonContainer.appendChild(buttonDarken);
    
    // Darken button - decreases brightness
    buttonDarken.addEventListener("click", function() {
        darkeningMode = !darkeningMode;
        
        // Update button visual state
        document.querySelectorAll('.active').forEach(btn => {
            btn.classList.remove('active');
        });
        buttonDarken.classList.toggle("active");
        
        // Deactivate other modes
        goCrazy = false;
        lighteningMode = false;
    });
    
    // Lighten button - increases brightness
    buttonLighten.addEventListener("click", function() {
        lighteningMode = !lighteningMode;
        
        // Update button visual state
        document.querySelectorAll('.active').forEach(btn => {
            btn.classList.remove('active');
        });
        buttonLighten.classList.toggle("active");
        
        // Deactivate other modes
        goCrazy = false;
        darkeningMode = false;
    });
}


// ============================================
// COLOR MANIPULATION UTILITIES
// ============================================
/**
 * Adjusts the brightness of a hex color by a percentage
 * @param {string} color - Hex color code (with or without #)
 * @param {number} percent - Percentage to adjust (+ve for lighter, -ve for darker)
 * @returns {string} - Adjusted hex color code
 */
function darkenColor(color, percent) {
    // Remove # and whitespace
    color = color.replace(/^\s*#|\s*$/g, "");

    // Convert 3-char hex to 6-char (e.g., E0F -> EE00FF)
    if (color.length == 3) {
        color = color.replace(/(.)/g, "$1$1");
    }

    // Extract RGB components
    const hexR = color.substring(0, 2);
    const hexG = color.substring(2, 4);
    const hexB = color.substring(4, 6);

    // Convert hex to decimal
    let r = parseInt(hexR, 16);
    let g = parseInt(hexG, 16);
    let b = parseInt(hexB, 16);

    // Handle invalid values
    if (isNaN(r)) r = 0;
    if (isNaN(g)) g = 0;
    if (isNaN(b)) b = 0;

    // Adjust each component by percentage
    const newR = Math.min(255, Math.floor(r + (r * percent) / 100));
    const newG = Math.min(255, Math.floor(g + (g * percent) / 100));
    const newB = Math.min(255, Math.floor(b + (b * percent) / 100));

    // Convert back to hex
    const newHexRColor = `${newR.toString(16)}`.padStart(2, "0");
    const newHexGColor = `${newG.toString(16)}`.padStart(2, "0");
    const newHexBColor = `${newB.toString(16)}`.padStart(2, "0");

    return "#" + newHexRColor + newHexGColor + newHexBColor;
}

/**
 * Converts RGB or RGBA color format to hex
 * @param {string} rgb - Color in rgb() or rgba() format, or already hex
 * @returns {string} - Hex color code
 */
function rgbToHex(rgb) {
    // Return as-is if already hex
    if (rgb.startsWith('#')) {
        return rgb;
    }
    
    // Extract numeric values from rgb()/rgba() string
    const result = rgb.match(/\d+/g);
    
    // Fallback to black if parsing fails
    if (!result || result.length < 3) {
        return '#000000';
    }
    
    const r = parseInt(result[0]);
    const g = parseInt(result[1]);
    const b = parseInt(result[2]);
    
    // Helper to convert decimal to hex with padding
    const toHex = (n) => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return '#' + toHex(r) + toHex(g) + toHex(b);
}


// ============================================
// INITIALIZATION
// ============================================
/**
 * Initialize the application
 * Sets up all UI controls and creates the initial grid
 */
function init() {
    manipulateGridBySlider();
    createDisplay(16);
    addClearButton();
    addPalette();
    addGoCrazy();
    addDarkenLighten();
}

// Start the application
init();
