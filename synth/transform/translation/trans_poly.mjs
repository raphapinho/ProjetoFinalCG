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

function translatePoint(point, dx, dy) {
    return {
        x: point.x + dx,
        y: point.y + dy,
    };
}

export function translatePolygon(vertices, dx, dy) {
    return vertices.map(vertex => translatePoint(vertex, dx, dy));
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

    document.getElementById('translate-btn').addEventListener('click', () => {
        const startX = parseFloat(prompt("Digite a coordenada X inicial:"));
        const startY = parseFloat(prompt("Digite a coordenada Y inicial:"));
        const endX = parseFloat(prompt("Digite a coordenada X final:"));
        const endY = parseFloat(prompt("Digite a coordenada Y final:"));

        const dx = endX - startX;
        const dy = endY - startY;

        const translatedVertices = translatePolygon(vertices, dx, dy);
        drawPolygon(ctx, translatedVertices);
    });
}
