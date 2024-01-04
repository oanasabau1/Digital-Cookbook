const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

const recipeController = require("../controllers/recipeController");

/**
 *  App Routes
 */
router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:_id", recipeController.exploreRecipe);
router.get("/categories/:_id", recipeController.exploreCategoriesById);
router.post("/search", recipeController.searchRecipe);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/random-recipe", recipeController.exploreRandom);
router.get("/add-recipe", recipeController.addRecipe);
router.post("/add-recipe", recipeController.addRecipeOnPost);
router.get("/about", recipeController.about);
router.delete('/recipe/recipe-delete/:_id', recipeController.deleteRecipe);
router.get('/recipe/:_id/edit', recipeController.editRecipe);
router.post('/recipe/:_id/update', recipeController.updateRecipe);

module.exports=router;
