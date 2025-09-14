// LocalStorage 'base de datos' para la demo
const DB_KEY = 'gestorDB_v1';

const seedDB = {
  usuarios: [
    { id: 1, correo: 'admin@demo.com', password: '12345', nombre: 'Admin', rol: 'admin_negocio' }
  ],
  productos: [
    { id: 1, sku: 'VIN-001', nombre: 'Vino Tinto 750ml', precio: 35000, stock: 10 },
    { id: 2, sku: 'CRM-101', nombre: 'Crema de Whisky 700ml', precio: 42000, stock: 8 }
  ],
  compras: [],
  ventas: [],
  roles: ['admin_negocio'],
  negocios: [{ id:1, nombre: 'Licores EDJJ' }]
};

function getDB() {
  let db = null;
  try {
    db = JSON.parse(localStorage.getItem(DB_KEY));
  } catch (e) {}
  if (!db) {
    db = JSON.parse(JSON.stringify(seedDB));
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
  return db;
}

function setDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function resetDB() {
  localStorage.removeItem(DB_KEY);
}

function uid(arr) {
  return (arr.length ? Math.max(...arr.map(x=>x.id||0)) : 0) + 1;
}
