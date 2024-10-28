from circle import draw_circle
from ellipse import draw_ellipse
from grid import Grid

def main():
    choice = input("Você deseja desenhar um círculo ou uma elipse? (c/e): ").strip().lower()

    width = int(input("Digite a largura da grade: "))
    height = int(input("Digite a altura da grade: "))

    grid = Grid(width, height)

    if choice == 'c':
        center_x = int(input("Digite a coordenada x do centro do círculo: "))
        center_y = int(input("Digite a coordenada y do centro do círculo: "))
        radius = int(input("Digite o raio do círculo: "))
        filled_input = input("O círculo deve ser preenchido? (s/n): ").strip().lower()
        filled = filled_input == 's'

        draw_circle(grid, center_x, center_y, radius, filled)

    elif choice == 'e':
        center_x = int(input("Digite a coordenada x do centro da elipse: "))
        center_y = int(input("Digite a coordenada y do centro da elipse: "))
        radius_x = int(input("Digite o raio horizontal da elipse: "))
        radius_y = int(input("Digite o raio vertical da elipse: "))
        filled_input = input("A elipse deve ser preenchida? (s/n): ").strip().lower()
        filled = filled_input == 's'

        draw_ellipse(grid, center_x, center_y, radius_x, radius_y, filled)

    else:
        print("Opção inválida. Por favor, escolha 'c' para círculo ou 'e' para elipse.")
        return

    grid.display()

if __name__ == "__main__":
    main()
