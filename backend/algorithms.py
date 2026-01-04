#each algorithm needs to return frames:
                    # frame: current cell, newly visited cells, newly added frontier cells
#                               final path
#                               found flag

from collections import deque

def BFS(grid, start, end): 
    visited = set(start)
    queue = deque(start)
    parent = {}
    while queue:
        current = queue.popleft()
        if current == end:
            print('we found the end')
        else:
            get_valid_neighbors(current, grid)


def get_valid_neighbors(node, grid): 
    val_rows = len(grid)
    val_cols = len(grid[0])
    val_neighbors = []
    