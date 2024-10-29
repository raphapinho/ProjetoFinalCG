// proj_poly.mjs

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

// Função para fazer a projeção ortogonal
function orthogonalProjection(vertices) {
    return vertices.map(vertex => ({ x: vertex.x, y: vertex.y }));
}

// Função para fazer a projeção oblíqua
function obliqueProjection(vertices, angle) {
    const projectedVertices = [];
    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);

    vertices.forEach(vertex => {
        const x = vertex.x - (vertex.y * sinAngle);
        const y = vertex.y;
        projectedVertices.push({ x, y });
    });
    return projectedVertices;
}

// Função para fazer a projeção em perspectiva
function perspectiveProjection(vertices, distance) {
    return vertices.map(vertex => ({
        x: (vertex.x * distance) / (distance + vertex.y),
        y: (vertex.y * distance) / (distance + vertex.y),
    }));
}

// Função para inicializar o programa
export function init() {
    const ctx = createCanvas();
    const vertices = [];

    // Pergunta ao usuário qual tipo de projeção deseja
    const projectionType = prompt("Escolha o tipo de projeção: ortogonal, oblíqua ou perspectiva").toLowerCase();
    const numPoints = parseInt(prompt("Quantos pontos terá o polígono?"));

    // Evento de clique para adicionar vértices
    ctx.canvas.addEventListener('click', (event) => {
        if (vertices.length < numPoints) {
            const rect = ctx.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            vertices.push({ x, y });
            drawPolygon(ctx, vertices);
        }

        if (vertices.length === numPoints) {
            // Executa a projeção escolhida
            let projectedVertices;

            if (projectionType === 'ortogonal') {
                projectedVertices = orthogonalProjection(vertices);
            } else if (projectionType === 'oblíqua') {
                const angle = parseFloat(prompt("Digite o ângulo da projeção oblíqua em radianos:"));
                projectedVertices = obliqueProjection(vertices, angle);
            } else if (projectionType === 'perspectiva') {
                const distance = parseFloat(prompt("Digite a distância da projeção em relação ao plano:"));
                projectedVertices = perspectiveProjection(vertices, distance);
            } else {
                alert("Tipo de projeção inválido.");
                return;
            }

            drawPolygon(ctx, projectedVertices);
        }
    });
}
