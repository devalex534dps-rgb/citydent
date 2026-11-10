"""Puente Python <-> UI.

Los métodos públicos de ``DesktopApi`` quedan disponibles en la UI como
``window.pywebview.api.<metodo>()`` (devuelven una Promise en JavaScript).

Solo expone funciones nativas del sistema operativo (diálogos, ventana,
impresión). No hay backend, base de datos ni persistencia.
"""

from __future__ import annotations

import base64
import mimetypes
from pathlib import Path

import webview

from . import APP_NAME, APP_VERSION

IMAGE_FILTERS = ("Imágenes (*.png;*.jpg;*.jpeg;*.gif;*.webp)",)
MAX_IMAGE_BYTES = 5 * 1024 * 1024  # 5 MB


class DesktopApi:
    def __init__(self) -> None:
        # Prefijo "_" para que pywebview no intente exponer la ventana a JS.
        self._window: webview.Window | None = None

    def bind(self, window: webview.Window) -> None:
        self._window = window

    # ------------------------------------------------------------------ info
    def app_info(self) -> dict:
        return {"name": APP_NAME, "version": APP_VERSION}

    # -------------------------------------------------------------- diálogos
    def pick_image(self) -> dict | None:
        """Abre el diálogo nativo de archivos y devuelve la imagen como data URL."""
        if self._window is None:
            return None

        result = self._window.create_file_dialog(
            webview.FileDialog.OPEN,
            allow_multiple=False,
            file_types=IMAGE_FILTERS,
        )
        if not result:
            return None

        path = Path(result[0])
        if path.stat().st_size > MAX_IMAGE_BYTES:
            return {"error": "La imagen supera el tamaño máximo de 5 MB."}

        mime = mimetypes.guess_type(path.name)[0] or "image/png"
        data = base64.b64encode(path.read_bytes()).decode("ascii")
        return {"name": path.name, "dataUrl": f"data:{mime};base64,{data}"}

    # ---------------------------------------------------------------- ventana
    def print_page(self) -> None:
        """Abre el diálogo de impresión nativo del motor web."""
        if self._window is not None:
            self._window.evaluate_js("window.print()")

    def toggle_fullscreen(self) -> None:
        if self._window is not None:
            self._window.toggle_fullscreen()

    def minimize(self) -> None:
        if self._window is not None:
            self._window.minimize()

    def quit(self) -> None:
        if self._window is not None:
            self._window.destroy()

