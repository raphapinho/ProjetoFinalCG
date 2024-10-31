// perspectiveProjection.mjs
export function perspectiveProjection(vertices, distance) {
    return vertices.map(vertex => ({
        x: (vertex.x * distance) / (distance + vertex.y),
        y: (vertex.y * distance) / (distance + vertex.y),
    }));
}
