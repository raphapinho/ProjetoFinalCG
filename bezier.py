from grid import Grid

def linear_interpolation(p0, p1, t):
    return (1 - t) * p0 + t * p1

def draw_bezier(grid, start, end, control_points):
    points = []
    for t in range(101):
        t /= 100
        x = linear_interpolation(start[0], end[0], t)
        y = linear_interpolation(start[1], end[1], t)
        
        if control_points:
            for i in range(len(control_points)):
                x = linear_interpolation(start[0], control_points[i][0], t)
                y = linear_interpolation(start[1], control_points[i][1], t)
                points.append((int(x), int(y)))
        
        points.append((int(x), int(y)))

    for x, y in points:
        try:
            grid.add_point(x, y)
        except ValueError:
            continue

def main():
    width = int(input("Digite a largura da grade: "))
    height = int(input("Digite a altura da grade: "))

    grid = Grid(width, height)

    start_x = int(input("Digite a coordenada x do ponto inicial: "))
    start_y = int(input("Digite a coordenada y do ponto inicial: "))
    end_x = int(input("Digite a coordenada x do ponto final: "))
    end_y = int(input("Digite a coordenada y do ponto final: "))

    start = (start_x, start_y)
    end = (end_x, end_y)

    num_control_points = int(input("Quantos pontos intermediários você deseja? "))

    control_points = []
    for i in range(num_control_points):
        control_x = int(input(f"Digite a coordenada x do ponto de controle {i + 1}: "))
        control_y = int(input(f"Digite a coordenada y do ponto de controle {i + 1}: "))
        control_points.append((control_x, control_y))

    draw_bezier(grid, start, end, control_points)

    grid.display()

if __name__ == "__main__":
    main()
