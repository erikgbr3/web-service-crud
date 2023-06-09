'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Customer.belongsTo(models.Locality,
        {
          as: 'localities',
          foreignKey: 'localityId',
        }
      );
      models.Customer.hasOne(models.Address,
        {
          as: 'addresses',
          foreignKey: 'customerId',
        }
      );
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    rfc: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};