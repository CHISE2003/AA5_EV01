/**
 * server.js
 * Punto de entrada: levanta el servidor HTTP.
 */
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servicio escuchando en http://localhost:${PORT}`));
