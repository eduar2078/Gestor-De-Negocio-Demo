// ================== DATOS DEMO ==================
// Si no existen datos en localStorage, inicializamos unos de ejemplo
if (!localStorage.getItem("inventario")) {
  const inventarioDemo = [
    { id: 1, nombre: "Producto A", stock: 120, precio: 25 },
    { id: 2, nombre: "Producto B", stock: 80, precio: 40 },
    { id: 3, nombre: "Producto C", stock: 200, precio: 15 },
    { id: 4, nombre: "Producto D", stock: 60, precio: 60 }
  ];

  const comprasDemo = [
    { id: 1, producto: "Producto A", cantidad: 50, costo: 20 },
    { id: 2, producto: "Producto B", cantidad: 30, costo: 35 },
  ];

  const ventasDemo = [
    { id: 1, producto: "Producto C", cantidad: 10, precio: 15 },
    { id: 2, producto: "Producto A", cantidad: 20, precio: 25 },
    { id: 3, producto: "Producto D", cantidad: 5, precio: 60 }
  ];

  localStorage.setItem("inventario", JSON.stringify(inventarioDemo));
  localStorage.setItem("compras", JSON.stringify(comprasDemo));
  localStorage.setItem("ventas", JSON.stringify(ventasDemo));
}

// ================== FUNCIONES ==================
function actualizarDashboard() {
  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  const compras = JSON.parse(localStorage.getItem("compras")) || [];
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

  // Contadores simples
  document.getElementById("invCount").textContent = inventario.length;
  document.getElementById("comprasCount").textContent = compras.length;
  document.getElementById("ventasCount").textContent = ventas.length;

  // Stock total
  document.getElementById("stockTotal").textContent = inventario.length;

  // Valor total de inventario
  const valorTotal = inventario.reduce((sum, p) => sum + (p.stock * p.precio), 0);
  document.getElementById("valorTotal").textContent = "$" + valorTotal.toLocaleString();

  // Ticket promedio en ventas
  const totalVentas = ventas.reduce((sum, v) => sum + (v.cantidad * v.precio), 0);
  const ticketPromedio = ventas.length > 0 ? totalVentas / ventas.length : 0;
  document.getElementById("ticketPromedio").textContent = "$" + ticketPromedio.toFixed(2);
}

// ================== INICIO ==================
document.addEventListener("DOMContentLoaded", actualizarDashboard);
