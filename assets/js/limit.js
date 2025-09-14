// Límite de registros por tabla para la demo
const DEMO_LIMIT = 15;

function canAdd(table){
  const db = getDB();
  const arr = db[table] || [];
  return arr.length < DEMO_LIMIT;
}

function assertLimit(table){
  if(!canAdd(table)){
    alert(`Demo limitada: máximo ${DEMO_LIMIT} registros en ${table}.`);
    return false;
  }
  return true;
}

function showLimitValue(){
  const el = document.getElementById('limitVal');
  if(el) el.textContent = DEMO_LIMIT;
}
