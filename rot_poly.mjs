// rot_poly.mjs

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

// Função para rotacionar um ponto
function rotatePoint(point, angle, origin) {
    const rad = angle * (Math.PI / 180); // Converte graus para radianos
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Translação do ponto para a origem
    const translatedX = point.x - origin.x;
    const translatedY = point.y - origin.y;

    // Rotação
    return {
        x: translatedX * cos - translatedY * sin + origin.x,
        y: translatedX * sin + translatedY * cos + origin.y,
    };
}

// Função para rotacionar o polígono
export function rotatePolygon(vertices, angle) {
    const centerX = vertices.reduce((sum, v) => sum + v.x, 0) / vertices.length;
    const centerY = vertices.reduce((sum, v) => sum + v.y, 0) / vertices.length;

    const origin = { x: centerX, y: centerY };
    return vertices.map(vertex => rotatePoint(vertex, angle, origin));
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

    // Pergunta para a rotação
    document.getElementById('rotate-btn').addEventListener('click', () => {
        const angle = parseFloat(prompt("Digite o ângulo de rotação em graus:"));
        if (!isNaN(angle)) {
            const rotatedVertices = rotatePolygon(vertices, angle);
            drawPolygon(ctx, rotatedVertices);
        }
    });
}
