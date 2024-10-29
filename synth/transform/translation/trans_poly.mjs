// trans_poly.mjs

// Função para criar o canvas
export function createCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);
    return canvas.getContext('2d');
}

// Função para desenhar um polígono
export function drawPolygon(ctx, vertices) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa o canvas

    if (vertices.length < 3) return; // Verifica se há vértices suficientes para desenhar um polígono

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    
    vertices.forEach(vertex => {
        ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// Função para transladar um ponto
function translatePoint(point, dx, dy) {
    return {
        x: point.x + dx,
        y: point.y + dy,
    };
}

// Função para transladar o polígono
export function translatePolygon(vertices, dx, dy) {
    return vertices.map(vertex => translatePoint(vertex, dx, dy));
}

// Função para inicializar o programa
export function init() {
    const ctx = createCanvas();
    const vertices = [];

    // Evento de clique para adicionar vértices
    ctx.canvas.addEventListener('click', (event) => {
        const rect = ctx.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        vertices.push({ x, y });
        drawPolygon(ctx, vertices);
    });

    // Pergunta para a translação
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
