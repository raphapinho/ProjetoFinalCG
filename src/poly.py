import matplotlib.pyplot as plt

def draw_grid(grid_size, points):
    plt.figure(figsize=(6, 6))
    plt.xlim(0, grid_size)
    plt.ylim(0, grid_size)
    plt.gca().set_aspect('equal', adjustable='box')
    plt.grid(True, which='both', color='gray', linestyle='--', linewidth=0.5)
    plt.xticks(range(0, grid_size + 1, 1))
    plt.yticks(range(0, grid_size + 1, 1))
    
    x_vals, y_vals = zip(*points)
    plt.plot(x_vals, y_vals, marker='o', color='black')
    plt.show()

def get_polyline_points(num_lines):
    points = []
    for i in range(num_lines + 1):  # Precisamos de um ponto adicional para a última linha
        x, y = map(int, input(f"Digite as coordenadas do ponto {i + 1} (x y): ").split())
        points.append((x, y))
    return points

if __name__ == "__main__":
    grid_size = int(input("Digite o tamanho da grade: "))
    num_lines = int(input("Quantas linhas compõem sua polilinha? "))
    
    points = get_polyline_points(num_lines)
    
    draw_grid(grid_size, points)