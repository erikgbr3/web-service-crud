'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Locality.belongsTo(models.City,
        {
          as: 'City',
          foreignKey: 'cityId',
        }  
      );
      models.Locality.hasMany(models.Customer,
        {
          as: 'customer',
          foreignKey: 'localityId',
        }  
      );
    }
  }
  Locality.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Locality',
  });
  return Locality;
};