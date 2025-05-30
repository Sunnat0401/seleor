const userModel = require("../models/user.models");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");
const transactionModel = require("../models/transaction.model");
// const updateOrder = require("../models/")
class AdminController {
  constructor() {
    this.userId = "683515e2bd5686b8615834d3";
    this.createProduct = this.createProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.getOrders = this.getOrders.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }
  // [GET] /admin/products
  async getProducts(req, res, next) {
    try {
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const products = await productModel.find();
      return res.json({ success: "Get products successfully", products });
    } catch (error) {
      next(error);
    }
  }
  // GET customer admin
  async getCustomer(req, res, next) {
    try {
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const customers = await userModel.find({ role: "user" });
      return res.json({ failure: "Get customers successfully", customers });
    } catch (error) {
      next(error);
    }
  }
  //   Get /admin/orders

  async getOrders(req, res, next) {
    try {
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: " User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const orders = await orderModel.find();
      return res.json({ success: "Get orders successfully", orders });
    } catch (error) {
      next(error);
    }
  }
  //   Get /admin/transactions
  async getTransactions(req, res, next) {
    try {
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin") return res.json({ failure: "User is not admin" });
      const transactions = await transactionModel.find();
      return res.json({ success: "Get transactions sucesfully", transactions });
    } catch (error) {
      next(error);
    }
  }

  // [POST] /admin/create-product
  async createProduct(req, res, next) {
    try {
      const data = req.body;
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const newProduct = await productModel.create(data);
      if (!newProduct)
        return res.json({ failure: "Failed while creating product" });
      return res.json({ success: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }

  // [PUT] /admin/update-product/:id
  async updateProduct(req, res, next) {
    try {
      const data = req.body;
      const { id } = req.params;
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const updatedProduct = await productModel.findByIdAndUpdate(id, data);
      if (!updatedProduct)
        return res.json({ failure: "Failed while updating product" });
      return res.json({ success: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  //   PUT /admin updateOrder
  async updateOrder(req, res, next) {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User is not defined" });
      if (user.role !== 'admin') return res.json({ failure: "User is not admin" });
      const updateOrder = await orderModel.findByIdAndUpdate(id, { status });
      if (!updateOrder)
        return res.json({ failure: "Failed while updating odred" });
      return res.json({ success: "Order updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  // [DELETE] /admin/delete-product/:id
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const userId = this.userId;
      const user = await userModel.findById(userId);
      if (!user) return res.json({ failure: "User not found" });
      if (user.role !== "admin")
        return res.json({ failure: "User is not admin" });
      const deletedProduct = await productModel.findByIdAndDelete(id);
      if (!deletedProduct)
        return res.json({ failure: "Failed while deleting product" });
      return res.json({ success: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
