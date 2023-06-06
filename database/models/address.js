'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Address.belongsTo(models.Customer,
        {
          as: 'customer',
          foreignKey: 'customerId',
        }
      );
    }
  }
  Address.init({
    street: DataTypes.STRING,
    outNumber: DataTypes.STRING,
    intoNumber: DataTypes.STRING,
    cp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};