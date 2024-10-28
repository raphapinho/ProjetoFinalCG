// poly.mjs
import { drawCartesianPlane, drawPolyline } from './poly_grid.mjs';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const points = [];

// Função para lidar com cliques no canvas
function handleCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Adiciona o ponto clicado à lista de pontos
  points.push([x, y]);
  
  // Atualiza o canvas
  drawCartesianPlane(ctx, canvas.width, canvas.height);
  drawPolyline(ctx, points);
}

// Adiciona o evento de clique no canvas
canvas.addEventListener('click', handleCanvasClick);

// Função para limpar os pontos
function clearPoints() {
  points.length = 0; // Limpa a lista de pontos
  drawCartesianPlane(ctx, canvas.width, canvas.height); // Redesenha o plano
}

// Adiciona o botão de limpar
document.getElementById('clearButton').addEventListener('click', clearPoints);

// Função para inicializar o desenho
function init() {
  drawCartesianPlane(ctx, canvas.width, canvas.height);
}

// Chama a função de inicialização ao carregar a página
window.onload = init;
