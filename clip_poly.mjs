// Definindo os códigos de região
const INSIDE = 0; // 0000
const LEFT = 1; // 0001
const RIGHT = 2; // 0010
const BOTTOM = 4; // 0100
const TOP = 8; // 1000

// Definindo x_max, y_max e x_min, y_min para o retângulo de recorte
const x_max = 10;
const y_max = 8;
const x_min = 4;
const y_min = 4;

// Variável para armazenar os pontos do polígono
let poly_points = [];
let maxPoints = 5; // Padrão para 5 pontos

// Função para computar o código da região para um ponto (x, y)
function computeCode(x, y) {
    let code = INSIDE;
    if (x < x_min) code |= LEFT;
    else if (x > x_max) code |= RIGHT;
    if (y < y_min) code |= BOTTOM;
    else if (y > y_max) code |= TOP;
    return code;
}

// Função para verificar o estado do polígono em relação ao retângulo
function clipPolygon(points) {
    let allInside = true;
    let allOutside = true;

    for (let point of points) {
        const code = computeCode(point[0], point[1]);
        if (code === INSIDE) {
            allOutside = false; // Pelo menos um ponto está dentro
        } else {
            allInside = false; // Pelo menos um ponto está fora
        }
    }

    const resultDiv = document.getElementById("resultMessage");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(ctx);

    if (allInside) {
        resultDiv.innerText = "Polígono ACEITO!";
        drawPolygon(ctx, points, "green");
    } else if (allOutside) {
        resultDiv.innerText = "Polígono REJEITADO!";
        drawPolygon(ctx, points, "red");
    } else {
        resultDiv.innerText = "Polígono PARCIALMENTE ACEITO!";
        drawPolygon(ctx, points, "orange");
    }
}

// Função para desenhar o retângulo de recorte
function drawRectangle(ctx) {
    ctx.beginPath();
    ctx.rect(x_min * 20, y_min * 20, (x_max - x_min) * 20, (y_max - y_min) * 20);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// Função para desenhar o polígono
function drawPolygon(ctx, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0][0] * 20, points[0][1] * 20); // Move para o primeiro ponto
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0] * 20, points[i][1] * 20); // Conecta os pontos
    }
    ctx.closePath();
    ctx.fill();
}

// Adicionando um manipulador de eventos de clique ao canvas
document.getElementById("canvas").addEventListener("click", function(event) {
    const canvas = this;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / 20; // Converte para coordenadas do sistema
    const y = (event.clientY - rect.top) / 20; // Converte para coordenadas do sistema

    // Adiciona o ponto ao array
    poly_points.push([x, y]);

    // Limita a quantidade de pontos com base na seleção
    if (poly_points.length > maxPoints) {
        poly_points.shift(); // Remove o ponto mais antigo se houver mais que o permitido
    }

    // Desenha todos os pontos escolhidos
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(ctx);
    poly_points.forEach(point => {
        drawPoint(ctx, point[0], point[1]);
    });

    // Quando o polígono é fechado, chama a função de verificação
    if (poly_points.length === maxPoints) {
        clipPolygon(poly_points);
        poly_points = []; // Reseta os pontos do polígono após a verificação
    }
});

// Função para desenhar um ponto no canvas
function drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x * 20, y * 20, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}

// Função para mudar o número máximo de pontos baseado na seleção do usuário
function updateMaxPoints() {
    const selectElement = document.getElementById("pointsSelect");
    maxPoints = parseInt(selectElement.value); // Atualiza a variável maxPoints
}

// Adicionando um evento de mudança na seleção
document.getElementById("pointsSelect").addEventListener("change", updateMaxPoints);
