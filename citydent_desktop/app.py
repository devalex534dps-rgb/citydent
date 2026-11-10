"""Creación de la ventana de escritorio de CityDent."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

import webview

from . import APP_NAME
from .api import DesktopApi

ROOT_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = ROOT_DIR / "frontend"
DIST_INDEX = FRONTEND_DIR / "dist" / "index.html"
DEV_SERVER_URL = "http://localhost:5173"


def _npm() -> str:
    npm = shutil.which("npm.cmd") or shutil.which("npm")
    if npm is None:
        sys.exit("No se encontró npm. Instala Node.js para compilar la interfaz.")
    return npm


def build_frontend() -> None:
    """Compila la interfaz (React + shadcn/ui + lucide) en frontend/dist."""
    npm = _npm()
    if not (FRONTEND_DIR / "node_modules").exists():
        print("Instalando dependencias de la interfaz...")
        subprocess.run([npm, "install"], cwd=FRONTEND_DIR, check=True)
    print("Compilando la interfaz...")
    subprocess.run([npm, "run", "build"], cwd=FRONTEND_DIR, check=True)


def run(dev: bool = False, rebuild: bool = False, debug: bool = False) -> None:
    if dev:
        # Modo desarrollo: carga el servidor de Vite (recarga en caliente).
        # Ejecuta antes:  cd frontend ; npm.cmd run dev
        url = DEV_SERVER_URL
    else:
        if rebuild or not DIST_INDEX.exists():
            build_frontend()
        url = str(DIST_INDEX)

    api = DesktopApi()
    window = webview.create_window(
        title=f"{APP_NAME} - Panel de Control",
        url=url,
        js_api=api,
        width=1440,
        height=900,
        min_size=(1100, 700),
        background_color="#F8FAFC",
        text_select=False,
    )
    api.bind(window)

    # http_server=True sirve frontend/dist con un servidor local interno,
    # así las rutas absolutas de imágenes (/elena-avatar.png) funcionan igual.
    webview.start(
        http_server=not dev,
        debug=debug,
        private_mode=True,
    )

