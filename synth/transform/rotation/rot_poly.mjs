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


function rotatePoint(point, angle, origin) {
    const rad = angle * (Math.PI / 180);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const translatedX = point.x - origin.x;
    const translatedY = point.y - origin.y;

    return {
        x: translatedX * cos - translatedY * sin + origin.x,
        y: translatedX * sin + translatedY * cos + origin.y,
    };
}

export function rotatePolygon(vertices, angle) {
    const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
    const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;

    const origin = { x: centerX, y: centerY };
    return vertices.map(vertex => rotatePoint(vertex, angle, origin));
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

    document.getElementById('rotate-btn').addEventListener('click', () => {
        const angle = parseFloat(prompt("Digite o ângulo de rotação em graus:"));
        if (!isNaN(angle)) {
            const rotatedVertices = rotatePolygon(vertices, angle);
            drawPolygon(ctx, rotatedVertices);
        }
    });
}
