// obliqueProjection.mjs
export function obliqueProjection(vertices, angle) {
    const projectedVertices = [];
    const sinAngle = Math.sin(angle);
    
    vertices.forEach(vertex => {
        const x = vertex.x - (vertex.y * sinAngle);
        const y = vertex.y;
        projectedVertices.push({ x, y });
    });
    return projectedVertices;
}
