'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
         Item.hasMany(models.Purchase, { as: 'Purchases', foreignKey: 'itemId'})
      }
    }
  });
  return Item;
};