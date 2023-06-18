// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// Product model set up fields and rules 
Product.init(
  {
    //columns defined
    id:{
      typeL DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true, 
      autoIncrement: true,
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type: DataTypes.DECIMAL,
      validate: {isDecimal:true},
      allowNull: false,
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate:{isNumeric: true},
    },
    category_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references:{
        model: 'category',
        key: 'id',
        unique: false,
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;