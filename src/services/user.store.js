/**
 * user.store.js
 * Capa de persistencia sencilla: guarda los usuarios en un archivo JSON.
 * Las contraseñas NUNCA se guardan en texto plano: se almacena un hash
 * generado con scrypt (módulo nativo "crypto") y una sal aleatoria.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ruta del archivo de datos (se puede cambiar con la variable DATA_FILE)
const DATA_FILE =
  process.env.DATA_FILE || path.join(__dirname, '..', '..', 'data', 'users.json');

/** Lee la lista de usuarios; si el archivo no existe devuelve []. */
function readUsers() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

/** Guarda la lista de usuarios, creando la carpeta si hace falta. */
function writeUsers(users) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

/** Genera el hash de la contraseña con una sal aleatoria. */
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return { salt, hash };
}

/** Busca un usuario por nombre (sin distinguir mayúsculas). */
function findUser(username) {
  return readUsers().find((u) => u.username.toLowerCase() === username.toLowerCase());
}

/** Crea un usuario nuevo. Devuelve null si el nombre ya existe. */
function createUser(username, password) {
  if (findUser(username)) return null;
  const { salt, hash } = hashPassword(password);
  const users = readUsers();
  users.push({ username, salt, hash, createdAt: new Date().toISOString() });
  writeUsers(users);
  return { username };
}

/** Verifica usuario + contraseña con comparación de tiempo constante. */
function verifyCredentials(username, password) {
  const user = findUser(username);
  if (!user) return false;
  const { hash } = hashPassword(password, user.salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(user.hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

module.exports = { createUser, verifyCredentials };
