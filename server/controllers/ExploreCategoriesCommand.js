/** GET /categories
* Categories
*/

require("../models/database");
const { raw } = require("express");
const Category = require("../models/Category");

class ExploreCategoriesCommand {
    constructor(Category) {
      this.Category = Category;
    }
  
    async execute(req, res, Category=this.Category) {
      try {
        const limitNumber = 15;
        const categories = await this.Category.find({}).limit(limitNumber);
        res.render("categories", {
          title: "Digital Cookbook - Categories",
          categories,
        });
      } catch (error) {
        res.status(500).send({ message: error.message || "Error occurred" });
      }
    }
  }
  
  module.exports = ExploreCategoriesCommand;
  