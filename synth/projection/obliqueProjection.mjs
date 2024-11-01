// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

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
