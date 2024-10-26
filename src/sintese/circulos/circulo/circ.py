import numpy as np
import matplotlib.pyplot as plt

def bresenham_circle(xc, yc, r, filled=False):
    points = []
    x = 0
    y = r
    d = 1 - r
    
    while x <= y:
        octants = [(xc + x, yc + y), (xc - x, yc + y), (xc + x, yc - y), (xc - x, yc - y), (xc + y, yc + x), (xc - y, yc + x), (xc + y, yc - x), (xc - y, yc - x)]
        if filled:
            for i in range(-y, y + 1):
                points.append((xc + i, yc + x))
                points.append((xc + i, yc - x))
            for i in range(-x, x + 1):
                points.append((xc + i, yc + y))
                points.append((xc + i, yc - y))
        else:
            points.extend(octants)
        
        x += 1
        if d < 0:
            d += 2 * x + 1
        else:
            y -= 1
            d += 2 * (x - y) + 1
    return points

def bresenham_ellipse(xc, yc, a, b, filled=False):
    points = []
    x = 0
    y = b
    a2 = a * a
    b2 = b * b
    d1 = b2 - (a2 * b) + (0.25 * a2)
    dx = 2 * b2 * x
    dy = 2 * a2 * y
    
    while dx < dy:
        if filled:
            for i in range(-x, x + 1):
                points.append((xc + i, yc + y))
                points.append((xc + i, yc - y))
        else:
            points.extend([(xc + x, yc + y), (xc - x, yc + y), (xc + x, yc - y), (xc - x, yc - y)])
        if d1 < 0:
            x += 1
            dx += 2 * b2
            d1 += dx + b2
        else:
            x += 1
            y -= 1
            dx += 2 * b2
            dy -= 2 * a2
            d1 += dx - dy + b2
    
    d2 = (b2 * ((x + 0.5) ** 2)) + (a2 * ((y - 1) ** 2)) - (a2 * b2)
    while y >= 0:
        if filled:
            for i in range(-x, x + 1):
                points.append((xc + i, yc + y))
                points.append((xc + i, yc - y))
        else:
            points.extend([(xc + x, yc + y), (xc - x, yc + y), (xc + x, yc - y), (xc - x, yc - y)])
        if d2 > 0:
            y -= 1
            dy -= 2 * a2
            d2 += a2 - dy
        else:
            y -= 1
            x += 1
            dx += 2 * b2
            dy -= 2 * a2
            d2 += dx - dy + a2
    return points

def draw_grid(grid_size, points):
    plt.figure(figsize=(6, 6))
    plt.xlim(0, grid_size)
    plt.ylim(0, grid_size)
    plt.gca().set_aspect('equal', adjustable='box')
    plt.grid(True, which='both', color='gray', linestyle='--', linewidth=0.5)
    plt.xticks(range(0, grid_size + 1, 1))
    plt.yticks(range(0, grid_size + 1, 1))
    
    x_vals, y_vals = zip(*points)
    plt.scatter(x_vals, y_vals, color="black", s=10)
    plt.show()

if __name__ == "__main__":
    shape_type = input("Deseja criar um círculo ou uma elipse? (círculo/elipse): ").strip().lower()
    filled = input("Deseja que a forma seja preenchida? (s/n): ").strip().lower() == 's'
    grid_size = int(input("Digite o tamanho da grade: "))

    if shape_type == 'círculo':
        radius = int(input("Digite o tamanho do raio do círculo: "))
        xc, yc = grid_size // 2, grid_size // 2  # Centro do círculo no meio da grade
        points = bresenham_circle(xc, yc, radius, filled)
    elif shape_type == 'elipse':
        a = int(input("Digite o semi-eixo horizontal (a) da elipse: "))
        b = int(input("Digite o semi-eixo vertical (b) da elipse: "))
        xc, yc = grid_size // 2, grid_size // 2  # Centro da elipse no meio da grade
        points = bresenham_ellipse(xc, yc, a, b, filled)
    else:
        print("Tipo de forma inválido.")
        exit()

    draw_grid(grid_size, points)
