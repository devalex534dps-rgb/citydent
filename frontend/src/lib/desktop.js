// Puente hacia las funciones nativas de la app de escritorio (Python + pywebview).
// Si la UI se abre en un navegador normal, cada función usa un respaldo HTML.

export function getDesktopApi() {
  return typeof window !== 'undefined' ? window.pywebview?.api ?? null : null;
}

export function isDesktop() {
  return getDesktopApi() !== null;
}

/** Abre el diálogo de impresión (nativo en escritorio, window.print en navegador). */
export function printPage() {
  const api = getDesktopApi();
  if (api?.print_page) {
    api.print_page();
  } else {
    window.print();
  }
}

/**
 * Abre el selector nativo de imágenes.
 * Devuelve { name, dataUrl } | { error } | null, o `undefined` si no hay
 * puente de escritorio (en ese caso usa el <input type="file"> HTML).
 */
export async function pickImage() {
  const api = getDesktopApi();
  if (!api?.pick_image) return undefined;
  return api.pick_image();
}

