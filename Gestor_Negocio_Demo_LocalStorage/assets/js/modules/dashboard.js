(function(){
  const db = getDB();
  const invCount = db.productos.length;
  const comprasCount = db.compras.length;
  const ventasCount = db.ventas.length;
  const stockTotal = db.productos.reduce((a,p)=>a+(p.stock||0),0);
  const valorTotal = db.productos.reduce((a,p)=>a+(p.precio*(p.stock||0)),0);
  const ticketPromedio = db.ventas.length ?
    (db.ventas.reduce((a,v)=>a+v.total,0)/db.ventas.length) : 0;

  document.getElementById('invCount').textContent = invCount;
  document.getElementById('comprasCount').textContent = comprasCount;
  document.getElementById('ventasCount').textContent = ventasCount;
  document.getElementById('stockTotal').textContent = stockTotal.toString();
  document.getElementById('valorTotal').textContent = new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(valorTotal);
  document.getElementById('ticketPromedio').textContent = new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(ticketPromedio);
})();
