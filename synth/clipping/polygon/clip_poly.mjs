// Discentes 
//    Raphael Freitas Drago Pinho - 202004940023
//    Thiago Correa de Castro - 202004940005

const INSIDE = 0; // 0000
const LEFT = 1; // 0001
const RIGHT = 2; // 0010
const BOTTOM = 4; // 0100
const TOP = 8; // 1000

const x_max = 10;
const y_max = 8;
const x_min = 4;
const y_min = 4;

let poly_points = [];
let maxPoints = 5;

function computeCode(x, y) {
    let code = INSIDE;
    if (x < x_min) code |= LEFT;
    else if (x > x_max) code |= RIGHT;
    if (y < y_min) code |= BOTTOM;
    else if (y > y_max) code |= TOP;
    return code;
}

function clipPolygon(points) {
    let allInside = true;
    let allOutside = true;

    for (let point of points) {
        const code = computeCode(point[0], point[1]);
        if (code === INSIDE) {
            allOutside = false;
        } else {
            allInside = false;
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

function drawRectangle(ctx) {
    ctx.beginPath();
    ctx.rect(x_min * 20, y_min * 20, (x_max - x_min) * 20, (y_max - y_min) * 20);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawPolygon(ctx, points, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0][0] * 20, points[0][1] * 20);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0] * 20, points[i][1] * 20);
    }
    ctx.closePath();
    ctx.fill();
}

document.getElementById("canvas").addEventListener("click", function(event) {
    const canvas = this;
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / 20;
    const y = (event.clientY - rect.top) / 20;

    poly_points.push([x, y]);

    if (poly_points.length > maxPoints) {
        poly_points.shift();
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(ctx);
    poly_points.forEach(point => {
        drawPoint(ctx, point[0], point[1]);
    });

    if (poly_points.length === maxPoints) {
        clipPolygon(poly_points);
        poly_points = [];
    }
});

function drawPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x * 20, y * 20, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}

function updateMaxPoints() {
    const selectElement = document.getElementById("pointsSelect");
    maxPoints = parseInt(selectElement.value); // Atualiza a variável maxPoints
}

document.getElementById("pointsSelect").addEventListener("change", updateMaxPoints);
