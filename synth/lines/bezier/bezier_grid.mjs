// bezier_grid.mjs
import { drawCartesianPlane } from '../../../src/grid.mjs';
import Bezier from './bezier.mjs'; // Importe a classe Bezier

let controlPoints = [];

// Função para desenhar os pontos de controle
function drawControlPoints(ctx) {
    ctx.fillStyle = 'red';
    controlPoints.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

// Função para desenhar a curva de Bézier
function drawBezierCurve(ctx, bezier, steps = 100) {
    const points = bezier.getCurvePoints(steps);
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.stroke();
}

export function drawBezierGrid(ctx, width, height) {
    drawCartesianPlane(ctx, width, height);
    if (controlPoints.length > 0) {
        const bezier = new Bezier(...controlPoints.flatMap(p => [p.x, p.y]));
        drawBezierCurve(ctx, bezier);
    }
    drawControlPoints(ctx); // Desenhar pontos de controle
}

export function setupBezierDrawing(canvas) {
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        controlPoints.push({ x, y });
        drawBezierGrid(ctx, canvas.width, canvas.height);
    });

    // Limpar pontos de controle ao clicar no botão
    document.getElementById('clearCanvas').addEventListener('click', () => {
        controlPoints = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBezierGrid(ctx, canvas.width, canvas.height);
    });
}