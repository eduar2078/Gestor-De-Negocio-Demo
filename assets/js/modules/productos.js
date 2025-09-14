(function(){
  const tbody = document.querySelector('#tablaProductos tbody');
  function render(){
    const db = getDB();
    tbody.innerHTML = db.productos.map(p=>`<tr>
      <td>${p.sku}</td>
      <td>${p.nombre}</td>
      <td>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(p.precio)}</td>
    </tr>`).join('');
  }
  render();
})();