from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

def bresenham(x1, y1, x2, y2):
    points = []
    dx = abs(x2 - x1)
    dy = abs(y2 - y1)
    sx = 1 if x1 < x2 else -1
    sy = 1 if y1 < y2 else -1
    err = dx - dy

    while True:
        points.append((x1, y1))
        if x1 == x2 and y1 == y2:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x1 += sx
        if e2 < dx:
            err += dx
            y1 += sy
    return points

@app.route('/')
def index():
    return render_template('dram_brese.html')

@app.route('/bresenham', methods=['POST'])
def calculate_bresenham():
    data = request.get_json()
    x1 = data['x1']
    y1 = data['y1']
    x2 = data['x2']
    y2 = data['y2']
    points = bresenham(x1, y1, x2, y2)
    return jsonify(points)

if __name__ == '__main__':
    app.run(debug=True)