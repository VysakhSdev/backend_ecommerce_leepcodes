// models/associations.js

import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';

// User-Cart Association
// A user can have many items in their cart
User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Product-Cart Association
// A product can be in many carts
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
