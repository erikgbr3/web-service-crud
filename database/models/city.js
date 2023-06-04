'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.City.belongsTo(models.State,
        {
          as: 'state',
          foreignKey: 'stateId',
        }  
      );
      models.City.hasMany(models.Locality,
        {
          as: 'localities',
          foreignKey: 'cityId',
        }  
      );
    }
  }
  City.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};