from collections import deque

def BFS(grid, start_row, start_column, end_row, end_column):
    start = (start_row, start_column)
    visited = set([start])
    queue = deque()
    queue.append(start)
    parent = {}
    frames = []
    found = False
    while queue:
        current = queue.popleft()
        if current[0] == end_row and current[1] == end_column:
            path = get_path(start, current, parent)
            final_path = path[::-1]
            found = True
            return frames, found, final_path
        else:
            neighbors = get_valid_neighbors(current, grid)
            new_visited = []
            new_frontier = []
            for neighbor in neighbors:
                if neighbor not in visited:
                    if grid[neighbor[0]][neighbor[1]] != "wall":
                        visited.add(neighbor)
                        new_visited.append(neighbor)
                        parent[neighbor] = current
                        queue.append(neighbor)
                        new_frontier.append(neighbor)
            frame = build_frame(current, new_visited, new_frontier)
            frames.append(frame)
    return frames, found, None

def DFS(grid, start_row, start_column, end_row, end_column):
    start = (start_row, start_column)
    visited = set([start])
    stack = []
    stack.append(start)
    parent = {}
    frames = []
    found = False
    while stack:
        current = stack.pop()
        if current[0] == end_row and current[1] == end_column:
            path = get_path(start, current, parent)
            final_path = path[::-1]
            found = True
            return frames, found, final_path
        else:
            neighbors = get_valid_neighbors(current, grid)
            new_visited = []
            new_frontier = []
            for neighbor in neighbors:
                if neighbor not in visited:
                    if grid[neighbor[0]][neighbor[1]] != "wall":
                        visited.add(neighbor)
                        new_visited.append(neighbor)
                        parent[neighbor] = current
                        stack.append(neighbor)
                        new_frontier.append(neighbor)
            frame = build_frame(current, new_visited, new_frontier)
            frames.append(frame)
    return frames, found, None

def Astar(grid, start_row, start_column, end_row, end_column):
    start = (start_row, start_column)
    OpenSet = set([start])
    ClosedSet = set()
    gScore = {}
    fScore = {}
    gScore[start] = 0
    fScore[start] = heuristic(start, end_row, end_column)
    parent = {}
    frames = []
    found = False
    while OpenSet:
        min_score = float('inf')
        best_node = None
        for i in OpenSet:
            if fScore[i] < min_score:
                best_node = i
                min_score = fScore[i]
        current = best_node
        if current[0] == end_row and current[1] == end_column:
            path = get_path(start, current, parent)
            final_path = path[::-1]
            found = True
            return frames, found, final_path
        else:
            OpenSet.remove(current)
            ClosedSet.add(current)
            neighbors = get_valid_neighbors(current, grid)
            for neighbor in neighbors:
                if grid[neighbor[0]][neighbor[1]] != "wall" and neighbor not in ClosedSet:
                    g = gScore[current] + 1
                    if neighbor not in gScore or g < gScore[neighbor]:                  
                        parent[neighbor] = current
                        gScore[neighbor] = g
                        fScore[neighbor] = g + heuristic(neighbor, end_row, end_column)
                        OpenSet.add(neighbor)
            frame = build_frame(current, [], [])
            frames.append(frame)
    return frames, found, None

def get_valid_neighbors(node, grid): 
    val_rows = len(grid) - 1
    val_cols = len(grid[0]) - 1
    val_neighbors = []
    
    top_neighbor = (node[0] - 1, node[1])
    bottom_neighbor = (node[0] + 1, node[1])
    right_neighbor = (node[0], node[1] + 1)
    left_neighbor = (node[0], node[1] - 1) 
    if top_neighbor[0] >= 0 and top_neighbor[0] <= val_rows:
        val_neighbors.append(top_neighbor)
    if bottom_neighbor[0] >= 0 and bottom_neighbor[0] <= val_rows:
        val_neighbors.append(bottom_neighbor)
    if left_neighbor[1] >= 0 and left_neighbor[1] <= val_cols:
        val_neighbors.append(left_neighbor)
    if right_neighbor[1] >= 0 and right_neighbor[1] <= val_cols:
        val_neighbors.append(right_neighbor)
    return val_neighbors

def heuristic(node, end_row, end_column):
    return abs(node[0] - end_row) + abs(node[1] - end_column)

def get_path(start, end, parent):
    path = [end]
    node = end
    while True:
        if node[0] == start[0] and node[1] == start[1]:
            return path
        else:    
            par = parent[node]
            path.append(par)
            node = par
            
            
def build_frame(current, new_visited, new_frontier):
    frame = {}
    frame['current'] = {"r": current[0], "c": current[1]}
    frame["new_visited"] = new_visited
    frame["new_frontier"] = new_frontier
    return frame
    