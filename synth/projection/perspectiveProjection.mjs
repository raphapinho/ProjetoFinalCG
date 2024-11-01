// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

export function perspectiveProjection(vertices, distance) {
    return vertices.map(vertex => ({
        x: (vertex.x * distance) / (distance + vertex.y),
        y: (vertex.y * distance) / (distance + vertex.y),
    }));
}
