// Carga las variables de entorno desde el archivo .env
require('dotenv').config();

// Importación de módulos necesarios
const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth'); // <-- AÑADIDO

// Importa nuestras rutas de prospectos
const prospectoRoutes = require('./routes/prospectoRoutes');

// Creación de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURACIÓN DEL MOTOR DE PLANTILLAS ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- MIDDLEWARES ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- MIDDLEWARE DE SEGURIDAD (AÑADIDO) ---
// Protege todas las rutas de la aplicación.
// Debe ir ANTES de la definición de las rutas.
app.use(basicAuth({
    users: { [process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASS },
    challenge: true,
    realm: 'ProspectadorDigital',
}));


// --- RUTAS DE LA APLICACIÓN ---
app.use('/', prospectoRoutes);

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor "Prospectador Digital" escuchando en http://localhost:${PORT}`);
});
