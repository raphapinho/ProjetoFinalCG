from grid import Grid

def draw_polyline(grid, points):
    for i in range(len(points) - 1):
        x0, y0 = points[i]
        x1, y1 = points[i + 1]
        dx = x1 - x0
        dy = y1 - y0
        steps = max(abs(dx), abs(dy))
        for step in range(steps + 1):
            t = step / steps
            x = int(x0 + dx * t)
            y = int(y0 + dy * t)
            try:
                grid.add_point(x, y)
            except ValueError:
                continue

def main():
    width = int(input("Digite a largura da grade: "))
    height = int(input("Digite a altura da grade: "))

    grid = Grid(width, height)

    num_points = int(input("Quantos pontos você deseja na polilinha? "))
    
    points = []
    for i in range(num_points):
        x = int(input(f"Digite a coordenada x do ponto {i + 1}: "))
        y = int(input(f"Digite a coordenada y do ponto {i + 1}: "))
        points.append((x, y))

    draw_polyline(grid, points)

    grid.display()

if __name__ == "__main__":
    main()