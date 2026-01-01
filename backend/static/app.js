const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const generate = document.getElementById("generate");
const draw = document.getElementById("draw");
const reset = document.getElementById("reset");
const start = document.getElementById("start");
const end = document.getElementById("end");
const BFS = document.getElementById("BFS");
const DFS = document.getElementById("DFS");
const Astar = document.getElementById("A*");
const Run = document.getElementById("Run");

if_started = false;
if_ended = false;
color = 'none';
current_algorithm = 'none';

var stack = [];
let grid = [];

const cell_height = 50;
const cell_width = 50;
const cell_color = 'black';
const line_width = 1;

for (row = 0; row < 25; row += 1) {
    grid[row] = [];
    for (column = 0; column < 15; column += 1) {
        grid[row][column] = 'empty';
    }
}

function reset_grid() {
    for (row = 0; row < 25; row += 1) {
        grid[row] = [];
        for (column = 0; column < 15; column += 1) {
            grid[row][column] = 'empty';
        }
    }
}

function draw_grid() {
    ctx.strokeStyle = cell_color;
    ctx.line_width = line_width;

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


function draw_rectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}

function clear_grid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if_started = false;
    if_ended = false;
    color = 'none';
    current_algorithm = 'none';
    startRow = 'none';
    startColumn = 'none';
    endRow = 'none';
    endColumn = 'none';
    stack = [];
    reset_grid();
    start.style.backgroundColor = "";
    end.style.backgroundColor = "";
    draw.style.backgroundColor = "";
    BFS.style.backgroundColor = "";
    DFS.style.backgroundColor = "";
    Astar.style.backgroundColor = "";
    Run.style.backgroundColor = "";
}

generate.addEventListener('click', draw_grid);

start.addEventListener('click', function() {
    color = 'green';
    start.style.backgroundColor = 'green';
});

draw.addEventListener('click', function() {
    color = 'orange';
    draw.style.backgroundColor = 'orange'
})

end.addEventListener('click', function() {
    draw.style.backgroundColor = "";
    color = 'red';
    end.style.backgroundColor = 'red';
});

canvas.addEventListener('click', function(event) {
    if (color == 'none') {
        return;
    }
    if (color == 'green' && if_started == true) {
        return;
    }
    if (color == 'red' && if_ended == true) {
        return;
    }
    const mouseX = event.offsetX;
    const mouseY= event.offsetY;
    const gridX = Math.floor(mouseX / cell_height);
    const gridY = Math.floor(mouseY / cell_height);
    const x = gridX * cell_height;
    const y = gridY * cell_height;
    const node = [x, y, cell_width, cell_height];
    if (color == 'green') {
        if_started = true;
        start.style.backgroundColor = "";
        stack.push(node);
        draw_rectangle(x, y, cell_width, cell_height, color);
        startRow = gridX;
        startColumn = gridY;
        grid[gridY][gridX] = 'start';
        return;
    }
    if (color == 'red') {
        if_ended = true;
        end.style.backgroundColor = "";
        stack.push(node);
        draw_rectangle(x, y, cell_width, cell_height, color);
        endRow = gridX;
        endColumn = gridY;
        grid[gridY][gridX] = 'end';
        return;
    }
    if (color == 'orange') {
        if (if_started == false) {
            draw.style.backgroundColor = "";
            return;
        }
        if (if_started == true) {
            if (gridX == startRow && gridY == startColumn) {
                return;
            }
        }
        if (if_ended == true) {
            if (gridX == endRow && gridY == endColumn) {
                return;
            }
        }
        stack.push(node);
        draw_rectangle(x, y, cell_width, cell_height, color);
        grid[gridY][gridX] = 'wall';
        return;
    }
});

reset.addEventListener('click', clear_grid);

BFS.addEventListener('click', function() {
    Astar.style.backgroundColor = "";
    BFS.style.backgroundColor = 'grey';
    DFS.style.backgroundColor = "";
    current_algorithm = 'BFS';
});

DFS.addEventListener('click', function() {
    Astar.style.backgroundColor = "";
    BFS.style.backgroundColor = "";
    DFS.style.backgroundColor = 'grey';
    current_algorithm = 'DFS';
});

Astar.addEventListener('click', function() {
    Astar.style.backgroundColor = 'grey';
    BFS.style.backgroundColor = "";
    DFS.style.backgroundColor = "";
    current_algorithm = 'Astar';
});

Run.addEventListener('click', function() {
    if (if_ended == false) {
        return;
    }
    if (current_algorithm == 'none') {
        return;
    }
    Run.style.backgroundColor = 'plum';
    const json = {
        "algorithm": current_algorithm,
        "grid": grid,
        "start": {startRow, startColumn},
        "end": {endRow, endColumn}
    };
   const jsonString = JSON.stringify(json);
   fetch('/router', {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json'
    },
        body: jsonString,
   })
   .then(response => response.json())
   .then(data => { 
        console.log('Success', data);
   })
    console.log("Running  from...", startRow, startColumn);
});

