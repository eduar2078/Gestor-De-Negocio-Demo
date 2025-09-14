# Gestor Negocio · Demo (LocalStorage)

Versión 100% estática (HTML/CSS/JS) lista para GitHub Pages. No requiere PHP ni base de datos.

## Cómo usar
- Abre `index.html` y entra con:
  - Usuario: `admin@demo.com`
  - Contraseña: `12345`
- Los datos se guardan en `localStorage` del navegador.
- La demo está limitada a 15 registros por módulo (puedes cambiarlo en `assets/js/limit.js`).

## Estructura
- `index.html`: login de la demo.
- `system/*.html`: páginas del sistema (dashboard, inventario, compras, ventas, productos).
- `assets/js/db.js`: "base de datos" en LocalStorage + datos de ejemplo.
- `assets/js/auth.js`: sesión en `sessionStorage` (protege rutas).
- `assets/js/limit.js`: restricción de registros.
- `assets/js/modules/*.js`: lógica de cada módulo.

## Publicar en GitHub Pages
1. Sube esta carpeta a un repositorio.
2. Activa GitHub Pages desde `Settings > Pages` con la rama principal (root).
3. Accede a la URL pública que te genere GitHub.

> Si quieres resetear los datos de la demo, abre la consola del navegador y ejecuta: `localStorage.removeItem('gestorDB_v1')`.
