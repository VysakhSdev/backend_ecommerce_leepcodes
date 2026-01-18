import Product from "../models/Product.js";

// CREATE  PRODUCT - Admin & Superadmin
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required" });
    }

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : req.body.imageUrl;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ - Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Admin & Superadmin
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    const [updatedRows] = await Product.update(
      { ...req.body, imageUrl },
      { where: { id } },
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByPk(id);
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Superadmin ONLY
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Product.destroy({ where: { id } });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
