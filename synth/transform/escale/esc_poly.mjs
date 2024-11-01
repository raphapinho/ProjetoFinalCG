// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

export function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
}

export function drawPolygon(ctx, vertices) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (vertices.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    
    vertices.forEach(vertex => {
        ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function scalePoint(point, scaleFactor, origin) {
    return {
        x: origin.x + (point.x - origin.x) * scaleFactor,
        y: origin.y + (point.y - origin.y) * scaleFactor,
    };
}

export function scalePolygon(vertices, scaleFactor) {
    const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
    const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;

    const origin = { x: centerX, y: centerY };
    return vertices.map(vertex => scalePoint(vertex, scaleFactor, origin));
}

export function init() {
    const ctx = createCanvas();
    const vertices = [];

    ctx.canvas.addEventListener('click', (event) => {
        const rect = ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        vertices.push({ x, y });
        drawPolygon(ctx, vertices);
    });

    // Pergunta para escalar o polígono
    document.getElementById('scale-btn').addEventListener('click', () => {
        const action = prompt("Deseja aumentar ou diminuir o polígono? (a/d)");
        const scaleFactor = parseFloat(prompt("Digite o fator de escala:"));

        if (action.toLowerCase() === 'a') {
            const scaledVertices = scalePolygon(vertices, scaleFactor);
            drawPolygon(ctx, scaledVertices);
        } else if (action.toLowerCase() === 'd') {
            const scaledVertices = scalePolygon(vertices, 1 / scaleFactor);
            drawPolygon(ctx, scaledVertices);
        } else {
            alert("Ação inválida. Use 'a' para aumentar e 'd' para diminuir.");
        }
    });
}
