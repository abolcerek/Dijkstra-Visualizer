# Algorithm-Visualizer

This repository visualizes three of the most popular pathfinding algorithms, those being DFS (Depth-First Search), BFS (Breadth-First Search), and A* search.

The user has the option to control the animation speed with a slider. Additionally, they have the option to adjust the layout of the grid by using the draw button which creates walls in the grid which the algorithm must navigate around in order to get from the start to the end.

Nodes that are currently being visited are represented in pink, whereas newly visited nodes are represented in purple, and frontier nodes (nodes soon to be explored) are represented in crimson. Once the algorithm finds the end the final path is shown in yellow.

To run the code you must first clone the repository by running:

`git clone https://github.com/abolcerek/Algorithm-Visualizer`

Then install flask by running:

`pip install Flask`

Then 

`cd backend`

and run

`flask run`
