import db from "database/models";

export default function handler(req, res) {
    switch(req.method){
        case 'GET':
            return getAddress (req, res);

        case 'POST':
            return addAddress (req, res);

        case 'PUT':
            return updateAddress (req, res);

        case 'DELETE':
            return deleteAddress (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const getAddress = async (req, res) => {
    try {
        const address = await db.Address.findAll();
  
        return res.json(address)
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
  
  const addAddress = async (req, res) => {
      try {
          console.log(req.body);
          
          const address = await db.Address.create({...req.body});
          res.json({
              address,
              message: 'La dirección fue registrada correctamente'
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
  
  const updateAddress = async (req, res) => {
      try {
          const { id } = req.body;
  
          await db.Address.update({...req.body}, {
              where: {
                  id:id
              }
          })
          res.json({
              message: 'La dirección fue actualizada'
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
  
    const deleteAddress = async (req, res) => {
      console.log('Delete address method called');
      try {
          const { id } = req.query;
  
        const address = await db.Address.findOne({ where: { id: id } });
  
        if (!address) {
          return res.status(404).json({
            error: true,
            message: 'No se encontró la dirección',
          });
        }
  
          await address.destroy();
  
          res.json({
              message: 'La dirección fue eliminada'
          })
  
      } catch(error){
          console.log('Error in delete address', error);
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
