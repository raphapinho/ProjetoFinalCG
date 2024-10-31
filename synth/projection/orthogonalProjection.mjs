export function orthogonalProjection(vertices, type = 'XY', T = 0) {
    switch(type) {
        case 'XY':
            return vertices.map(vertex => ({ x: vertex.x, y: vertex.y }));
        case 'XZ':
            return vertices.map(vertex => ({ x: vertex.x, z: vertex.z || T }));
        case 'YZ':
            return vertices.map(vertex => ({ y: vertex.y, z: vertex.z || T }));
        default:
            throw new Error("Tipo de projeção ortográfica inválido");
    }
}

export function axonometricProjection(vertices, type = 'isometric') {
    let scaleFactors;
    switch(type) {
        case 'isometric':
            scaleFactors = { x: 0.82, y: 0.82, z: 0.82 };
            break;
        case 'dimetric':
            scaleFactors = { x: 0.94, y: 0.47, z: 0.82 };
            break;
        case 'trimetric':
            scaleFactors = { x: 0.7, y: 0.4, z: 0.9 };
            break;
        default:
            throw new Error("Tipo de projeção axonométrica inválido");
    }
    return vertices.map(vertex => ({
        x: vertex.x * scaleFactors.x,
        y: vertex.y * scaleFactors.y,
        z: vertex.z * scaleFactors.z
    }));
}

export function obliqueProjection(vertices, angle = 30, delta = 1) {
    const rad = (angle * Math.PI) / 180;
    const cos = delta * Math.cos(rad);
    const sin = delta * Math.sin(rad);

    return vertices.map(vertex => ({
        x: vertex.x + cos * vertex.z,
        y: vertex.y + sin * vertex.z
    }));
}