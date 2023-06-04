import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getLocality (req, res);

        case 'POST':
            return addLocality (req, res);

        case 'PUT':
            return updateLocality (req, res);

        case 'DELETE':
            return deleteLocality (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getLocality = async (req, res) => {
    try {
        const { cityId } = req.query;

        let localities = [];
        if (cityId) {
            localities = await db.Locality.findAll({
              where: {
                cityId,
              },
              include: [
                { model: db.City, as: 'City', include: { model: db.State, as: 'state' } },
              ],
            });
          } else {
            localities = await db.Locality.findAll({
              include: [
                { model: db.City, as: 'City', include: { model: db.State, as: 'state' } },
              ],
            });
          }

        return res.json(localities);
    } catch(error){
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const addLocality = async (req, res) => {
    try {
        console.log(req.body);
        
        const locality = await db.Locality.create({...req.body});
        res.json({
            locality,
            message: 'El Localidad fue registrada correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}

const updateLocality = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the user by ID
        await db.Locality.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'El Nombre de la Localidad fue actualizado'
        });

    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }
 
  const deleteLocality = async (req, res) => {
    console.log('Delete locality method called');
    try {
        const { id } = req.query;

      const locality = await db.Locality.findOne({ where: { id: id } });

      if (!locality) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró la localidad',
        });
      }

        await locality.destroy();

        res.json({
            message: 'La localidad fue eliminada'
        })

    } catch(error){
        console.log('Error in delete locality', error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
  }
