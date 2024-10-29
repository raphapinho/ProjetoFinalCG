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

// Armazenar os pontos escolhidos
let points = [];

// Função para computar o código da região para um ponto (x, y)
function computeCode(x, y) {
    let code = INSIDE;
    if (x < x_min) code |= LEFT;
    else if (x > x_max) code |= RIGHT;
    if (y < y_min) code |= BOTTOM;
    else if (y > y_max) code |= TOP;
    return code;
}

// Implementando o algoritmo Cohen-Sutherland
function cohenSutherlandClip(x1, y1, x2, y2) {
    let code1 = computeCode(x1, y1);
    let code2 = computeCode(x2, y2);
    let accept = false;

    while (true) {
        if ((code1 == 0) && (code2 == 0)) {
            accept = true;
            break;
        } else if (code1 & code2) {
            break;
        } else {
            let code_out;
            let x, y;

            if (code1 !== 0) code_out = code1;
            else code_out = code2;

            if (code_out & TOP) {
                x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1);
                y = y_max;
            } else if (code_out & BOTTOM) {
                x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1);
                y = y_min;
            } else if (code_out & RIGHT) {
                y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1);
                x = x_max;
            } else if (code_out & LEFT) {
                y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1);
                x = x_min;
            }

            if (code_out == code1) {
                x1 = x;
                y1 = y;
                code1 = computeCode(x1, y1);
            } else {
                x2 = x;
                y2 = y;
                code2 = computeCode(x2, y2);
            }
        }
    }

    const resultDiv = document.getElementById("result");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(ctx);

    if (accept) {
        resultDiv.innerText = `Linha aceita de (${x1}, ${y1}) até (${x2}, ${y2})`;
        drawLine(ctx, x1, y1, x2, y2, "green");
    } else {
        resultDiv.innerText = "Linha rejeitada";
        drawLine(ctx, x1, y1, x2, y2, "red");
    }
}

// Função para desenhar o retângulo de recorte
function drawRectangle(ctx) {
    ctx.beginPath();
    ctx.rect(x_min * 20, y_min * 20, (x_max - x_min) * 20, (y_max - y_min) * 20);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

// Função para desenhar a linha
function drawLine(ctx, x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.moveTo(x1 * 20, y1 * 20);
    ctx.lineTo(x2 * 20, y2 * 20);
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Adicionando um manipulador de eventos de clique ao canvas
document.getElementById("canvas").addEventListener("click", function(event) {
    const canvas = this;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / 20; // Converte para coordenadas do sistema
    const y = (event.clientY - rect.top) / 20; // Converte para coordenadas do sistema

    // Adiciona o ponto ao array
    points.push({ x, y });

    // Limita a quantidade de pontos a 2
    if (points.length > 2) {
        points.shift(); // Remove o ponto mais antigo se houver mais de 2
    }

    // Desenha todos os pontos escolhidos
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(ctx);
    points.forEach(point => {
        drawPoint(ctx, point.x, point.y);
    });

    // Quando houver 2 pontos, chama a função de recorte
    if (points.length === 2) {
        cohenSutherlandClip(points[0].x, points[0].y, points[1].x, points[1].y);
        points = []; // Limpa os pontos após o recorte
    }
});

// Função para desenhar um ponto no canvas
function drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x * 20, y * 20, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}
