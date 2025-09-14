(function(){
  showLimitValue();
  const form = document.getElementById('formVenta');
  const select = document.getElementById('productoVenta');
  const tbody = document.querySelector('#tablaVentas tbody');

  function loadProductos(){
    const db = getDB();
    select.innerHTML = db.productos.map(p=>`<option value="${p.id}">${p.nombre} (${p.sku}) - Stock ${p.stock}</option>`).join('');
  }

  function render(){
    const db = getDB();
    tbody.innerHTML = db.ventas.map(v=>{
      const p = db.productos.find(x=>x.id===v.productoId);
      return `<tr>
        <td>${new Date(v.fecha).toLocaleString()}</td>
        <td>${p ? p.nombre : 'Producto'}</td>
        <td>${v.cantidad}</td>
        <td>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(v.total)}</td>
      </tr>`;
    }).join('');
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!assertLimit('ventas')) return;
    const db = getDB();
    const productoId = parseInt(select.value,10);
    const cantidad = parseInt(document.getElementById('cantidadVenta').value,10);
    const p = db.productos.find(x=>x.id===productoId);
    if(!p) return alert('Producto no encontrado');
    if((p.stock||0) < cantidad) return alert('Stock insuficiente');
    const total = (p.precio||0) * cantidad;
    const venta = { id: uid(db.ventas), fecha: Date.now(), productoId, cantidad, total };
    db.ventas.push(venta);
    p.stock -= cantidad;
    setDB(db);
    form.reset();
    loadProductos();
    render();
  });

  loadProductos();
  render();
})();