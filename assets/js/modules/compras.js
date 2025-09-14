(function(){
  showLimitValue();
  const form = document.getElementById('formCompra');
  const select = document.getElementById('productoCompra');
  const tbody = document.querySelector('#tablaCompras tbody');

  function loadProductos(){
    const db = getDB();
    select.innerHTML = db.productos.map(p=>`<option value="${p.id}">${p.nombre} (${p.sku})</option>`).join('');
  }

  function render(){
    const db = getDB();
    tbody.innerHTML = db.compras.map(c=>{
      const p = db.productos.find(x=>x.id===c.productoId);
      return `<tr>
        <td>${new Date(c.fecha).toLocaleString()}</td>
        <td>${p ? p.nombre : 'Producto'}</td>
        <td>${c.cantidad}</td>
        <td>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(c.costoUnit*c.cantidad)}</td>
      </tr>`;
    }).join('');
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!assertLimit('compras')) return;
    const db = getDB();
    const productoId = parseInt(select.value,10);
    const cantidad = parseInt(document.getElementById('cantidadCompra').value,10);
    const costoUnit = parseFloat(document.getElementById('costoUnit').value);
    const compra = { id: uid(db.compras), fecha: Date.now(), productoId, cantidad, costoUnit };
    db.compras.push(compra);
    // actualizar stock
    const p = db.productos.find(x=>x.id===productoId);
    if(p){ p.stock = (p.stock||0) + cantidad; }
    setDB(db);
    form.reset();
    render();
  });

  loadProductos();
  render();
})();