const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const transactionModel = require("../models/transaction.model");
const userModels = require("../models/user.models");
const bcrypt = require("bcrypt");
class UserController {
  //  GET user/products
  async getProducts(req, res, next) {
    try {
      const products = await productModel.find();
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }
  // GET /user.product/:id
  async getProduct(req, res, next) {
    try {
      const product = await productModel.findById(req.params.id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }
  // GET user/profile/:id
  async getProfile(req, res, next) {
    try {
      const user = await userModels.findById(req.params.id).select('-password')
      return res.json({user});
    } catch (error) {
      next(error);
    }
  }
  // GET /user/orders
  async getOrders(req, res, next) {
    try {
      const userId = "683515e2bd5686b8615834d3";
      const orders = await orderModel.find({ user: userId });
      return res.json(orders);
    } catch (error) {
      next(error);
    }
  }
  // GET /user/trasnactions
  async getTransactions(req, res, next) {
    try {
      const userId = "683515e2bd5686b8615834d3";
      const transactions = await transactionModel.find({
        user: userId,
        statud: "completed",
      });
      return res.json(transactions);
    } catch (error) {
      next(error);
    }
  }
  // GET /user/favorite
  async getFavorites(req, res, next) {
    try {
      const userId = "683515e2bd5686b8615834d3";
      const user = await userModels.findById(userId).populate("favorite");
      return res.json(user.favorites);
    } catch (error) {
      next(error);
    }
  }
  // GET user/statistics
  async getFavorites(req, res, next) {
    try {
      const userId = "683515e2bd5686b8615834d3";
      const user = await userModels.findById(userId);

      const totalOrders = await orderModel.countDocuments({ user: user._id });
      const totalTransactions = await transactionModel.countDocuments({
        user: user._id,
      });
      const totalFavorites = user.favorites.length;

      return res.json({ totalOrders, totalTransactions, totalFavorites });
    } catch (error) {
      next(error);
    }
  }
  //   POST /user/add-favorite
  async addFavorite(req, res, next) {
    try {
      const { productId } = req.body;
      const userId = "683515e2bd5686b8615834d3";
      const user = await userModels.findById(userId);
      user.favorites.push(productId);
      await user.save();
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  //   PUT /user/update-profile
  async updateProfile(req, res, next) {
    try {
      const userId = "683515e2bd5686b8615834d3";
      const user = await userModels.findById(userId);
      user.set(req.body);
      await user.save();
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  // PUT /user/update-prifle

  async updatePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = "683515e2bd5686b8615834d3";
      const user = await userModels.findById(userId);
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (isPasswordMatch)
        return res.json({ failure: "Old password is incorreact" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await userModels.findByIdAndUpdate(userId, { password: hashedPassword });
      re.json({ success: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  }
  //   DELETE /user/delete-favorite

  async deleteFavorite(req, res, next) {
    try {
        const {id} = req.params
        const userId = "683515e2bd5686b8615834d3";
          const user = await userModels.findById(userId)
          user.favorites.pull(id)
          await user.save()
          return res.json({success : "Product removed from favorites"})
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
