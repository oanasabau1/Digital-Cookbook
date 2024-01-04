/**
 * GET /categories/:_id
 * Categories By Id
 */

require("../models/database");
const { raw } = require("express");
const Recipe = require("../models/Recipe");

class ExploreCategoriesByIdCommand {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute(req, res, Recipe=this.Recipe) {
    try {
      let categoryId = req.params._id;
      const limitNumber = 15;
      const categoryById = await this.Recipe.find({ 'category': categoryId }).limit(limitNumber);
      res.render('categories', { title: 'Digital Cookbook - Categories', categoryById });
    } catch (error) {
      res.status(500).send({ message: error.message || "Error Occurred" });
    }
  }
}

module.exports = ExploreCategoriesByIdCommand;