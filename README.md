# CityDent — App de Escritorio

Panel clínico y administrativo para consultorio dental, empaquetado como **aplicación de escritorio en Python** con [pywebview](https://pywebview.flowrl.com/).

La interfaz (React + Tailwind CSS v4 + **shadcn/ui** + iconos **lucide-react**) se compila a archivos estáticos y se muestra en una ventana nativa (WebView2 en Windows), así que el estilo y los iconos son idénticos al diseño de Stitch. No hay backend, base de datos ni `localStorage`.

## Estructura

```
citydent/
├── main.py                  # Punto de entrada de la app de escritorio
├── requirements.txt         # Dependencias de Python (pywebview)
├── citydent_desktop/
│   ├── app.py               # Ventana nativa, compilación de la UI, modo dev
│   └── api.py               # Puente Python ⇄ UI (diálogo de archivos, imprimir, ventana)
└── frontend/                # Interfaz (React + shadcn/ui + lucide)
    ├── src/
    │   └── lib/desktop.js   # Acceso desde la UI a las funciones nativas
    └── dist/                # UI compilada que carga la ventana
```

## Requisitos

- Python 3.10+
- Node.js (solo para compilar la interfaz)
- Windows 10/11 con Microsoft Edge WebView2 Runtime (ya viene instalado en Windows 11)

## Instalación

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

## Ejecución

```powershell
.\.venv\Scripts\python.exe main.py            # Abre la app (compila la UI si falta)
.\.venv\Scripts\python.exe main.py --rebuild  # Recompila la UI y abre la app
.\.venv\Scripts\python.exe main.py --debug    # Abre con DevTools
```

### Modo desarrollo (recarga en caliente)

```powershell
cd frontend ; npm.cmd run dev        # terminal 1
.\.venv\Scripts\python.exe main.py --dev   # terminal 2
```

## Funciones nativas (puente Python)

| Función UI                    | Implementación en Python                        |
| ----------------------------- | ----------------------------------------------- |
| Cambiar foto (Cuenta)         | Diálogo nativo de archivos → vista previa local |
| Exportar / imprimir reporte   | Diálogo de impresión nativo                     |
| Ventana                       | Tamaño 1440×900, mínimo 1100×700                |

Si `frontend/dist` se abre en un navegador normal, la UI usa automáticamente los respaldos HTML (`<input type="file">`, `window.print()`).
