const express = require('express');
const router = express.Router();

// Importa TODAS las funciones del controlador que vamos a usar
const { 
  getProspectos, 
  renderNuevoForm, 
  createProspecto,
  renderEditarForm,
  updateProspecto,
  deleteProspecto
} = require('../controllers/prospectoController');

// --- RUTAS GET (para mostrar páginas) ---
// Ruta para mostrar la lista de prospectos
router.get('/', getProspectos);

// Ruta para mostrar el formulario de creación
router.get('/nuevo', renderNuevoForm);

// Ruta para mostrar el formulario de edición para un prospecto específico
router.get('/editar/:id', renderEditarForm);


// --- RUTAS POST (para procesar datos) ---
// Ruta para recibir los datos del formulario y crear el prospecto
router.post('/nuevo', createProspecto);

// Ruta para recibir los datos del formulario de edición y actualizar el prospecto
router.post('/editar/:id', updateProspecto);

// Ruta para recibir la petición de borrado y eliminar el prospecto
router.post('/eliminar/:id', deleteProspecto);


// Exporta el router para que la aplicación principal pueda usarlo
module.exports = router;
