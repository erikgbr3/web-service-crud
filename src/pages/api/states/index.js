import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'GET':
            return getState (req, res);

        case 'POST':
            return addState (req, res);

        case 'PUT':
            return updateState (req, res);

        case 'DELETE':
            return deleteState (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getState = async (req, res) => {
  try {
      const states = await db.State.findAll();

      return res.json(states)
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

const addState = async (req, res) => {
    try {
        console.log(req.body);
        
        const state = await db.State.create({...req.body});
        res.json({
            state,
            message: 'El Estado fue registrado correctamente'
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

const updateState = async (req, res) => {
    try {
        const { id } = req.body;

        await db.State.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'El Nombre de Estado fue actualizado'
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

  const deleteState = async (req, res) => {
    console.log('Delete state method called');
    try {
        const { id } = req.query;

      const state = await db.State.findOne({ where: { id: id } });

      if (!state) {
        return res.status(404).json({
          error: true,
          message: 'No se encontró el estado',
        });
      }

        await state.destroy();

        res.json({
            message: 'El Estado fue fue eliminado'
        })

    } catch(error){
        console.log('Error in delete state', error);
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