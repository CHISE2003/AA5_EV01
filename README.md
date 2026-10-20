# Servicio web de registro e inicio de sesión

Evidencia **GA7-220501096-AA5-EV01** – Diseño y desarrollo de servicios web (SENA – ADSO).

API REST hecha con Node.js + Express. Recibe un usuario y una contraseña:
- **Registro** (`POST /api/registro`): crea la cuenta (la contraseña se guarda con hash scrypt + sal).
- **Login** (`POST /api/login`): si las credenciales son correctas responde **"Autenticación satisfactoria"**; si no, **"Error en la autenticación"**.

## Requisitos
Node.js 18 o superior.

## Ejecución
```bash
npm install
npm start          # http://localhost:3000
npm test           # pruebas automáticas
```

## Endpoints
| Método | Ruta | Cuerpo JSON | Respuestas |
|---|---|---|---|
| POST | /api/registro | `{"usuario":"jose","contrasena":"Clave123"}` | 201 registrado · 400 datos inválidos · 409 usuario ya existe |
| POST | /api/login | `{"usuario":"jose","contrasena":"Clave123"}` | 200 Autenticación satisfactoria · 401 Error en la autenticación · 400 datos inválidos |

## Prueba con curl
```bash
curl -X POST http://localhost:3000/api/registro -H "Content-Type: application/json" -d '{"usuario":"jose","contrasena":"Clave123"}'
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d '{"usuario":"jose","contrasena":"Clave123"}'
```

## Estructura
```
src/app.js                      configuración de Express
src/server.js                   arranque del servidor
src/routes/auth.routes.js       rutas
src/controllers/auth.controller.js  lógica de registro/login
src/services/user.store.js      almacenamiento y hash de contraseñas
test/auth.test.js               pruebas
```
