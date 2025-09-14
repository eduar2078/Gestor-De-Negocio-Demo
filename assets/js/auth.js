// Manejo de sesión (solo en memoria de pestaña)
const SESSION_KEY = 'gestorSession_v1';

function login(correo, password){
  const db = getDB();
  const user = db.usuarios.find(u => u.correo===correo && u.password===password);
  if(user){
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ correo: user.correo, nombre: user.nombre, rol: user.rol }));
    return true;
  }
  return false;
}

function currentUser(){
  const raw = sessionStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function requireAuth(){
  if(!currentUser()){
    window.location.href = '../index.html';
  }
}

function bindLogout(){
  const btn = document.getElementById('logoutBtn');
  if(btn){
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      sessionStorage.removeItem(SESSION_KEY);
      window.location.href = '../index.html';
    });
  }
}
