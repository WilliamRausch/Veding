'use strict';
module.exports = function(sequelize, DataTypes) {
  var Purchase = sequelize.define('Purchase', {
    itemId: DataTypes.INTEGER,
    item: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // Purchase.belongsTo(models.Item, { as: 'Items', foreignKey: 'itemId'})
         Purchase.hasMany(models.Item, {foreignKey: 'itemId'})
      }
    }
  });
  return Purchase;
};