const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const reset = document.getElementById("reset");


const cell_height = 50;
const cell_width = 50;
const cell_color = 'black';
const line_width = 1;

function draw_grid() {
    ctx.strokeStyle = cell_color;
    ctx.line_Width = line_width;

    for (let x = 0; x < canvas.width; x += cell_width) {
     ctx.beginPath();
     ctx.moveTo(x, 0);
     ctx.lineTo(x, canvas.height);
     ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += cell_height) {
     ctx.beginPath();
     ctx.moveTo(0, y);
     ctx.lineTo(canvas.width, y);
     ctx.stroke();
    }
}


function draw_rectangle(x, y, width, height) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}


canvas.addEventListener('click', function(event) {
    const mouseX = event.offsetX;
    const mouseY= event.offsetY;
    const gridX = Math.floor(mouseX / cell_height);
    const gridY = Math.floor(mouseY / cell_height);
    const x = gridX * cell_height;
    const y = gridY * cell_height;
    draw_rectangle(x, y, cell_width, cell_height); 
});

reset.addEventListener('click', clear_grid);


function clear_grid() {
    ctx.reset();
    draw_grid();
}

draw_grid();
// draw_rectangle(1, 2, cell_width, cell_height);

// function edit_grid() {
//     for (let x = 0; x < canvas.width; x++) {
//         for (let y = 0; y < canvas.height; y++) {

//         }
//     }
// }