import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

//ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cartItem = await Cart.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
      return res
        .status(200)
        .json({ message: "Quantity updated", data: cartItem });
    }

    cartItem = await Cart.create({
      userId,
      productId,
      quantity: quantity || 1,
    });
    res.status(201).json({ message: "Product added to cart", data: cartItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// VIEW CART OF A SPECIFIC USER
export const getCart = async (req, res) => {
  try {
    const targetUserId = req.params.id || req.user.id;

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const cart = await Cart.findAll({
      where: { userId: targetUserId },
      include: [
        { model: Product },
        { model: User, attributes: ["id", "email", "role"] }
      ],
    });

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
//GET ALL CARTS
export const getAllCarts = async (req, res) => {
  try {
    const allCarts = await Cart.findAll({
      include: [
        { model: User, attributes: ["role", "email"] },
        { model: Product, attributes: ["name", "price", "imageUrl"] },
      ],
    });
    res.status(200).json({ success: true, data: allCarts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching all carts", error: error.message });
  }
};

// UPDATE QUANTITY IN CART
export const updateQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({ where: { id, userId: req.user.id } });
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// REMOVE ITEM CART
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.destroy({ where: { id, userId: req.user.id } });

    if (!deleted)
      return res.status(404).json({ message: "Item not found in your cart" });
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
