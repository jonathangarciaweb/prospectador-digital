const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;

// (Función getProspectos existente)
const getProspectos = async (req, res) => {
  try {
    const records = await base(TABLE_NAME).select().all();
    const prospectos = records.map((record) => ({
      id: record.id,
      ...record.fields,
    }));
    res.render('prospectos', { prospectos: prospectos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los prospectos de Airtable');
  }
};

// (Función renderNuevoForm existente)
const renderNuevoForm = (req, res) => {
  res.render('nuevo');
};

// (Función createProspecto existente)
const createProspecto = async (req, res) => {
  try {
    const { Nombre, Estado, Fuente, 'Datos de Contacto': DatosContacto, Notas } = req.body;
    await base(TABLE_NAME).create([
      {
        fields: {
          Nombre,
          Estado,
          Fuente,
          'Datos de Contacto': DatosContacto,
          Notas,
        },
      },
    ]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el prospecto en Airtable');
  }
};

// (Función renderEditarForm existente)
const renderEditarForm = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await base(TABLE_NAME).find(id);
    res.render('editar', { prospecto: record });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el prospecto para editar');
  }
};

// (Función updateProspecto existente)
const updateProspecto = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre, Estado, Fuente, 'Datos de Contacto': DatosContacto, Notas } = req.body;
        await base(TABLE_NAME).update([
            {
                id: id,
                fields: {
                    Nombre,
                    Estado,
                    Fuente,
                    'Datos de Contacto': DatosContacto,
                    Notas,
                },
            },
        ]);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el prospecto en Airtable');
    }
};

/**
 * Elimina un prospecto existente en Airtable.
 */
const deleteProspecto = async (req, res) => {
    try {
        const { id } = req.params; // El ID del registro a eliminar

        // Llama a la API de Airtable para eliminar el registro
        await base(TABLE_NAME).destroy(id);

        // Redirige al usuario a la página principal
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el prospecto en Airtable');
    }
};


module.exports = {
  getProspectos,
  renderNuevoForm,
  createProspecto,
  renderEditarForm,
  updateProspecto,
  deleteProspecto, // <-- AÑADIDO
};
