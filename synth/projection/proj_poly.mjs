// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

import { createCanvas, drawPolygon } from './canvasUtils.mjs'; 
import { orthogonalProjection, axonometricProjection } from './orthogonalProjection.mjs';
import { obliqueProjection } from './obliqueProjection.mjs';
import { perspectiveProjection } from './perspectiveProjection.mjs';

export function init() {
    const ctx = createCanvas();
    const vertices = [];

    const numPoints = parseInt(prompt("Quantos pontos terá o polígono?"));

    ctx.canvas.addEventListener('click', (event) => {
        if (vertices.length < numPoints) {
            const rect = ctx.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            vertices.push({ x, y, z: 0 });
            drawPolygon(ctx, vertices);
        }

        if (vertices.length === numPoints) {
            const projectionType = prompt("Escolha o número do tipo de projeção: 1. (ortogonal), 2. (oblíqua) ou 3. (perspectiva)").toLowerCase();

            let projectedVertices;

            if (projectionType === '1') {
                const orthoType = prompt("Escolha o tipo de projeção ortográfica: XY, XZ ou YZ").toUpperCase();
                projectedVertices = orthogonalProjection(vertices, orthoType);
                
                if (orthoType === 'XZ') {
                    projectedVertices = projectedVertices.map(vertex => ({ x: vertex.x, y: 0 })); // Manter y = 0
                } else if (orthoType === 'YZ') {
                    projectedVertices = projectedVertices.map(vertex => ({ x: 0, y: vertex.y })); // Manter x = 0
                }
            } else if (projectionType === '2') {
                const angle = parseFloat(prompt("Digite o ângulo da projeção oblíqua em graus:"));
                const delta = parseFloat(prompt("Digite o delta da projeção oblíqua:"));
                projectedVertices = obliqueProjection(vertices, angle, delta);
            } else if (projectionType === '3') {
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
