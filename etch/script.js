const container = document.querySelector('#container');
const classicButton = document.querySelector('#classic');
const diffuseButton = document.querySelector('#diffuse');
const rainbowButton = document.querySelector('#rainbow');
let typeOfBrush = 'classic';

function createGrid(n, tileSize) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <n; j++) {
            const div = document.createElement('div');
            div.className = "cell";
            div.style.backgroundColor = 'rgba(0,0,0,0)';
            div.style.height = `${tileSize}px`;  
            div.style.width = `${tileSize}px`;          
            container.appendChild(div);
        }        
    }
    addEventToCells();       
}

function addEventToCells() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('mouseenter', () => {
            if (typeOfBrush == 'classic'){
                cell.style.backgroundColor = "black";
            } else if (typeOfBrush == 'diffuse'){
                cellAlpha = getAlpha(cell); 
                cell.style.backgroundColor = diffuseColor(cellAlpha);
            } else {
                cell.style.backgroundColor = randomizeColor();
            }
        });    
    }); 
}

function randomizeColor() {    
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function diffuseColor(cellAlpha) {
    if (cellAlpha !== undefined){
        return `rgba(0,0,0, ${cellAlpha + 0.1})`;
    } else {
        return 'rgb(0,0,0)'; 
    }    
}

function getAlpha(cell) {
    var colorStr = window.getComputedStyle(cell, null).getPropertyValue("background-color");
    const rgbaArray = colorStr.split(',');
    if (rgbaArray[3] === undefined){
        return undefined;
    }
    let alphaValue = rgbaArray[3];
    alphaValue = parseFloat(alphaValue.slice(0,-1));
    return alphaValue;    
}

function reset(){
    const tiles = prompt('¿Cuántas baldosas quieres que haya por fila y columna?');    
    const tileSize = 960 / tiles;
    while (container.firstChild) {
        container.removeChild(container.lastChild);
        container.style.gridTemplateColumns = `repeat(${tiles}, 1fr)`;
    }
    createGrid(tiles, tileSize);
}

classicButton.addEventListener('click', () => {
    typeOfBrush = 'classic';
    reset();
});

diffuseButton.addEventListener('click', () => {
    typeOfBrush = 'diffuse';
    reset();
});

rainbowButton.addEventListener('click', () => {
    typeOfBrush = 'rainbow';
    reset();
});

createGrid(16, 60);