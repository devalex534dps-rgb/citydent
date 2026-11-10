"""CityDent - punto de entrada de la aplicación de escritorio.

Uso:
    python main.py            # abre la app (compila la UI si no existe)
    python main.py --rebuild  # recompila la UI antes de abrir
    python main.py --dev      # usa el servidor de Vite (cd frontend ; npm.cmd run dev)
    python main.py --debug    # habilita las DevTools del motor web
"""

import argparse

from citydent_desktop.app import run


def main() -> None:
    parser = argparse.ArgumentParser(description="CityDent - App de escritorio")
    parser.add_argument("--dev", action="store_true", help="Cargar el servidor de desarrollo de Vite")
    parser.add_argument("--rebuild", action="store_true", help="Recompilar la interfaz antes de iniciar")
    parser.add_argument("--debug", action="store_true", help="Habilitar herramientas de desarrollo")
    args = parser.parse_args()

    run(dev=args.dev, rebuild=args.rebuild, debug=args.debug)


if __name__ == "__main__":
    main()

