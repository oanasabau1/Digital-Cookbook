const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * These were the routes before implementing Command pattern
 */

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




// const categoryInstance = new Category();
// const recipeInstance = new Recipe();


// const HomepageCommand = require("../controllers/HomepageCommand");
// const homepageCommandInstance = new HomepageCommand(categoryInstance, recipeInstance);
// router.get("/", async (req, res) => {
//   try {
//     await homepageCommandInstance.execute(req, res, categoryInstance, recipeInstance);
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// const ExploreCategoriesCommand = require("../controllers/exploreCategoriesCommand");
// const exploreCategoriesCommandInstance = new ExploreCategoriesCommand(categoryInstance);
// router.get("/categories", async (req, res) => {
//   try {
//     await exploreCategoriesCommandInstance.execute(req, res, categoryInstance);
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// });


// const ExploreCategoriesByIdCommand = require("../controllers/ExploreCategoriesByIdCommand");
// const exploreCategoriesByIdCommandInstance = new ExploreCategoriesByIdCommand(recipeInstance);
// router.get("/categories/:_id", async (req, res) => {
//   try {
//     await exploreCategoriesByIdCommandInstance.execute(req, res, recipeInstance);
//   } catch (error) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

module.exports=router;