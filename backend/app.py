from flask import Flask, request, jsonify, render_template
from algorithms import BFS

app = Flask(__name__)

 
@app.route('/')

def index():
    return render_template('index.html')


@app.route('/router', methods=['POST'])
def receive_grid_state():
    if request.is_json:
        data = request.get_json()
        if data['algorithm'] == 'BFS':
            start_row = data['startRow']
            start_column = data['startColumn']
            end_row = data['endRow']
            end_column = data['endColumn']            
            frames, found, final_path = BFS(data['grid'], start_row, start_column, end_row, end_column)
            if found == True:           
                return jsonify({
                    "frames": frames, 
                    "found": found, 
                    "final_path": final_path}), 200
            else:
                return jsonify({
                    "frames": frames,
                    "found": found
                })
    
    else:
        return jsonify({"message": "error with the request"})
    

