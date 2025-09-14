(function(){
  showLimitValue();
  const tbody = document.querySelector('#tablaInventario tbody');
  const form = document.getElementById('formProducto');

  function render(){
    const db = getDB();
    tbody.innerHTML = '';
    db.productos.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.sku}</td>
        <td>${p.nombre}</td>
        <td>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP'}).format(p.precio)}</td>
        <td>${p.stock}</td>
        <td>
          <button data-id="${p.id}" class="btn-link edit">Editar</button>
          <button data-id="${p.id}" class="btn-link danger delete">Eliminar</button>
        </td>`;
      tbody.appendChild(tr);
    });
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!assertLimit('productos')) return;
    const db = getDB();
    const producto = {
      id: uid(db.productos),
      sku: document.getElementById('sku').value.trim(),
      nombre: document.getElementById('nombre').value.trim(),
      precio: parseFloat(document.getElementById('precio').value),
      stock: parseInt(document.getElementById('stock').value,10)
    };
    db.productos.push(producto);
    setDB(db);
    form.reset();
    render();
  });

  tbody.addEventListener('click', (e)=>{
    const target = e.target;
    if(target.classList.contains('delete')){
      const id = parseInt(target.getAttribute('data-id'),10);
      const db = getDB();
      const idx = db.productos.findIndex(p=>p.id===id);
      if(idx>=0){ db.productos.splice(idx,1); setDB(db); render(); }
    } else if(target.classList.contains('edit')){
      const id = parseInt(target.getAttribute('data-id'),10);
      const db = getDB();
      const p = db.productos.find(x=>x.id===id);
      const nombre = prompt('Nuevo nombre:', p.nombre);
      if(nombre!==null){
        p.nombre = nombre.trim();
        setDB(db);
        render();
      }
    }
  });

  render();
})();