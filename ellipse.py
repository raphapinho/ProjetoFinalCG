from grid import Grid
import math

def draw_ellipse(grid, center_x, center_y, radius_x, radius_y, filled):
    for y in range(grid.height):
        for x in range(grid.width):
            if filled:
                if ((x - center_x) ** 2) / (radius_x ** 2) + ((y - center_y) ** 2) / (radius_y ** 2) <= 1:
                    grid.add_point(x, y)
            else:
                distance = ((x - center_x) ** 2) / (radius_x ** 2) + ((y - center_y) ** 2) / (radius_y ** 2)
                if 0.95 <= distance <= 1.05:
                    grid.add_point(x, y)

def main():
    width = int(input("Digite a largura da grade: "))
    height = int(input("Digite a altura da grade: "))

    grid = Grid(width, height)

    center_x = int(input("Digite a coordenada x do centro da elipse: "))
    center_y = int(input("Digite a coordenada y do centro da elipse: "))

    radius_x = int(input("Digite o raio horizontal da elipse: "))
    radius_y = int(input("Digite o raio vertical da elipse: "))

    filled_input = input("A elipse deve ser preenchida? (s/n): ").strip().lower()
    filled = filled_input == 's'

    draw_ellipse(grid, center_x, center_y, radius_x, radius_y, filled)

    grid.display()

if __name__ == "__main__":
    main()