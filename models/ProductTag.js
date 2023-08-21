const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
// DO I NEED THESE ?similar in product 
// const Product = require('./Product');
// const Tag = require('./Tag');

class ProductTag extends Model {}

ProductTag.init(
  {
    // columns defined
    id: {
        type: DataTypes.INTEGER,
        // Does it matter the order of these two primary and null 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    product_id: {
       type: DataTypes.INTEGER,
       references: {
        model: 'product',
        key: 'id'
       }
    },
    tag_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'tag',
          key: 'id'
        }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;