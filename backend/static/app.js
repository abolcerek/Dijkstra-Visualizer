const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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

const num_columns = 15
const num_rows = 25 

frames_done = false;

for (row = 0; row < num_rows; row += 1) {
    grid[row] = [];
    for (column = 0; column < num_columns; column += 1) {
        grid[row][column] = 'empty';
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

draw_grid();

function reset_grid() {
    for (row = 0; row < num_rows; row += 1) {
        grid[row] = [];
        for (column = 0; column < num_columns; column += 1) {
            grid[row][column] = 'empty';
        }
    }
}



function draw_rectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);
}

function draw_frames(frame) {
    let formatted_frame = frame[0]
    let current = formatted_frame['current'];
    console.log(current);
    let current_row = current['r'];
    let current_col = current['c'];
    let x = current_col * cell_width;
    let y = current_row * cell_height;
    draw_rectangle(x, y, cell_width, cell_height, 'pink');
    let new_visited = formatted_frame['new_visited'];
    if (new_visited.length > 0) {
        for (let j = 0; j < new_visited.length; j++) {
            let node = new_visited[j];
            let node_row = node[0];
            let node_col = node[1];
            x = node_col * cell_width;
            y = node_row * cell_height;
            draw_rectangle(x, y, cell_width, cell_height, 'purple');
        }
    }
    let new_frontier = formatted_frame['new_frontier'];
    if (new_frontier.length > 1) {
        for (let j = 0; j < new_frontier.length; j++) {
            let node = new_frontier[j];
            let node_row = node[0];
            let node_col = node[1];
            x = node_col * cell_width;
            y = node_row * cell_height;
            draw_rectangle(x, y, cell_width, cell_height, 'crimson');
        }
    }
}

function draw_final_path(final_path) {
    for (let i = 0; i < final_path.length; i++) {
        let node = final_path[i];
        let node_row = node[0];
        let node_col = node[1];
        x = node_col * cell_width;
        y = node_row * cell_height;
        draw_rectangle(x, y, cell_width, cell_height, 'yellow');
    }
    draw_rectangle(startColumn * cell_width, startRow * cell_height, cell_width, cell_height, 'green');
    draw_rectangle(endColumn * cell_width, endRow * cell_height, cell_width, cell_height, 'red');
}

function animate_frames(frames, final_path) {
  let i = 0;

  function step() {
    if (i >= frames.length) {
        draw_final_path(final_path);
        return;
    }
    draw_frames([frames[i]]);   
    i++;
    setTimeout(step);
  }
  step();
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
    draw_grid();
    start.style.backgroundColor = "";
    end.style.backgroundColor = "";
    draw.style.backgroundColor = "";
    BFS.style.backgroundColor = "";
    DFS.style.backgroundColor = "";
    Astar.style.backgroundColor = "";
    Run.style.backgroundColor = "";
}


start.addEventListener('click', function() {
    color = 'green';
    start.style.backgroundColor = 'green';
    draw.style.backgroundColor = ""
    end.style.backgroundColor = "";
});

draw.addEventListener('click', function() {
    color = 'orange';
    draw.style.backgroundColor = 'orange'
    start.style.backgroundColor = "";
    end.style.backgroundColor = "";
})

end.addEventListener('click', function() {
    draw.style.backgroundColor = "";
    start.style.backgroundColor = "";
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
        startRow = gridY;
        startColumn = gridX;
        grid[gridY][gridX] = 'start';
        return;
    }
    if (color == 'red') {
        if_ended = true;
        end.style.backgroundColor = "";
        stack.push(node);
        draw_rectangle(x, y, cell_width, cell_height, color);
        endRow = gridY;
        endColumn = gridX;
        grid[gridY][gridX] = 'end';
        return;
    }
    if (color == 'orange') {
        if (if_started == false) {
            draw.style.backgroundColor = "";
            return;
        }
        if (if_started == true) {
            if (gridY == startRow && gridX == startColumn) {
                return;
            }
        }
        if (if_ended == true) {
            if (gridY == endRow && gridX == endColumn) {
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
        "startRow": startRow,
        "startColumn": startColumn,
        "endRow": endRow,
        "endColumn": endColumn,
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
        if (data['found'] == false) {
            console.log("No path from start to end")
        }
        animate_frames(data['frames'], data['final_path']);
    console.log("Running  from...", startRow, startColumn);
    });
});

