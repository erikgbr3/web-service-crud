
import db from "database/models";

export default function handler(req, res) {
    switch(req.method){
        case 'GET':
            return getCustomer (req, res);

        case 'POST':
            return addCustomer (req, res);

        case 'PUT':
            return updateCustomer (req, res);

        case 'DELETE':
            return deleteCustomer (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const getCustomer = async (req, res) => {
    try {
        const customer = await db.Customer.findAll();
  
        return res.json(customer)
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
  
  const addCustomer = async (req, res) => {
      try {
          console.log(req.body);
          
          const customer = await db.Customer.create({...req.body});
          res.json({
              customer,
              message: 'El Cliente fue registrado correctamente'
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
  
  const updateCustomer = async (req, res) => {
      try {
          const { id } = req.body;
  
          await db.Customer.update({...req.body}, {
              where: {
                  id:id
              }
          })
          res.json({
              message: 'El Nombre de Cliente fue actualizado'
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
  
    const deleteCustomer = async (req, res) => {
      console.log('Delete customer method called');
      try {
          const { id } = req.query;
  
        const customer = await db.Customer.findOne({ where: { id: id } });
  
        if (!customer) {
          return res.status(404).json({
            error: true,
            message: 'No se encontró el cliente',
          });
        }
  
          await customer.destroy();
  
          res.json({
              message: 'El Cliente fue fue eliminado'
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