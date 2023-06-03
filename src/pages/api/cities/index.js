import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getCity (req, res);

        case 'POST':
            return addCity (req, res);

        case 'PUT':
            return updateCity (req, res);

        case 'DELETE':
            return deleteCity (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getCity = async (req, res) => {
    try {
        const { stateId } = req.query;

        let cities = [];
        if (stateId) {
            cities = await db.City.findAll({
                where: {
                    stateId,  
                },
                include: ['state'],
            });
        } else {
            cities = await db.City.findAll({
                include: ['state'],
            });
        }

        return res.json(cities);
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

const addCity = async (req, res) => {
    try {
        console.log(req.body);
        
        const city = await db.City.create({...req.body});
        res.json({
            city,
            message: 'El Municipio fue registrado correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.parh,
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

const updateCity = async (req, res) => {
    try {
        const { id } = req.body;

        await db.City.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'El Nombre del Municipio fue actualizado'
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

  const deleteCity = async (req, res) => {
    console.log('Delete city method called');
    try {
        const { id } = req.query;

      const city = await db.City.findOne({ where: { id: id } });

      if (!city) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el Municipio',
        });
      }

        await city.destroy();

        res.json({
            message: 'El Municipio fue eliminado'
        })

    } catch(error){
        console.log('Error in delete city', error);
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