/**
 * GET /
 * Homepage
 */

require("../models/database");
const { raw } = require("express");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

class HomepageCommand {
    constructor(Category, Recipe) {
      this.Category = Category;
      this.Recipe = Recipe;
    }

 async execute(req, res, Category=this.Category, Recipe=this.Recipe) {
    try {
      const limitNumber = 15;
      const categories = await Category.find({}).limit(limitNumber);
      const latest=await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
  
      const american= await Recipe.find({'category':"American Food"}).limit(limitNumber);
      const asian= await Recipe.find({'category':"Asian Food"}).limit(limitNumber);
      const breakfast= await Recipe.find({'category':"Breakfast"}).limit(limitNumber);
      const dessert= await Recipe.find({'category':"Dessert"}).limit(limitNumber);
      const indian= await Recipe.find({'category':"Indian Food"}).limit(limitNumber);
      const italian= await Recipe.find({'category':"Italian Food"}).limit(limitNumber);
      const romanian= await Recipe.find({'category':"Romanian Food"}).limit(limitNumber);
  
      const food={latest, american, asian, breakfast, dessert, indian, italian, romanian};
  
  
      res.render("index", { title: "Digital Cookbook - Home", categories, food });
    } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }
}

module.exports = HomepageCommand; const homepageCommand=require("../controllers/HomepageCommand");
