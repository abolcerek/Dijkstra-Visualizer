from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

 
@app.route('/')

def index():
    return render_template('index.html')


@app.route('/router', methods=['POST'])
def receive_grid_state():
    if request.is_json:
        data = request.get_json()

        return jsonify({"message": "Data received successfully", "the data": data}), 200
    
    else:
        return jsonify({"message": "error with the request"})
    

def parse_data(data):
    if data['algorithm'] == 'BFS':
        BFS(data['grid'], data['start'], data['end'] )
