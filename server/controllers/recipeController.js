require("../models/database");
const { raw } = require("express");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 7;
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
};



/**
 * GET /categories
 * Categories
 */

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 15;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", {
      title: "Digital Cookbook - Categories",
      categories,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
};



/**
 * GET /categories/:_id
 * Categories By Id
 */
exports.exploreCategoriesById = async(req, res) => { 
  try {
    let categoryId = req.params._id;
    const limitNumber = 15;
    const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber);
    res.render('categories', { title: 'Digital Cookbook - Categories', categoryById } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /recipes/:_id
 * Recipe
 */

exports.exploreRecipe = async(req, res) => {
  try {
    let recipeId = req.params._id;
    const recipe = await Recipe.findById(recipeId);
    res.render('recipe', { title: 'Digital Cookbook - Recipe', recipe } );  // Read Operation
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 


/**
 * GET /explore-latest
 * Explore latest
 */
exports.exploreLatest= async(req, res) => { 
  try {
    const limitNumber = 15;
    const recipe = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
    res.render('explore-latest', { title: 'Digital Cookbook - Recipe', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /random-recipe
 */
exports.exploreRandom= async(req, res) => { 
  try {
    let count = await Recipe.find().countDocuments();
    let random=Math.floor(Math.random() * count);
    let recipe=await Recipe.findOne().skip(random).exec();
    res.render('random-recipe', { title: 'Digital Cookbook - Random Recipe', recipe } );
  } catch (error) {
    res.status(500).send({message: error.message || "Error Occured" });
  }
} 

/**
 * GET /add-recipe
 * Add Recipe
*/
exports.addRecipe = async(req, res) => {
  const infoErrorsObj = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');
  res.render('add-recipe', { title: 'Digital Cookbook - Add Recipe', infoErrorsObj, infoSubmitObj  } );
}

/**
 * POST /add-recipe
 * Add Recipe
*/
exports.addRecipeOnPost = async(req, res) => {
  try {

    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No Files where uploaded.');
    } else {

      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;

      imageUploadFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
      })

    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName
    });
    
    await newRecipe.save();

    req.flash('infoSubmit', 'Recipe has been added.')
    res.redirect('/add-recipe');
  } catch (error) {
    // res.json(error);
    req.flash('infoErrors', error);
    res.redirect('/add-recipe');
  }
}


/**
 * POST /search
 * Search
 */

exports.searchRecipe = async (req, res) => {
  try{
    let searchTerm=req.body.searchTerm;
    let recipe=await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive:true}});
    res.render('search', { title: 'Digital Cookbook - Search', recipe} );
  }catch(error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * DELETE /recipes/:_id
 * Delete Recipe
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params._id;
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }
    res.redirect('/'); // Redirect after successful deletion
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occurred while deleting recipe' });
  }
};



/**
 * GET /recipes/:_id/edit
 * Render form to edit Recipe
 */
exports.editRecipe = async (req, res) => {
  try {
    const recipeId = req.params._id;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }
    res.render('edit-recipe', { title: 'Digital Cookbook - Edit Recipe', recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occurred while fetching recipe' });
  }
};

/**
 * POST /recipes/:_id/update
 * Update Recipe
 */

exports.updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params._id;
    const { name, description, category } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { name, description, category },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).send({ message: 'Recipe not found' });
    }

    res.redirect(`/recipe/${recipeId}`); // Redirect to the updated recipe page
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error occurred while updating recipe' });
  }
};


/** GET /about
 * About
 */
exports.about = async (req, res) => {
  try{
    res.render('about', { title: 'Digital Cookbook - About'} );
  }catch(error) {
    res.status(500).send({ message: error.message || "Error occured" });
  }
}

/**
 * Insert Categories into Database
 */
async function insertCategories() {
  try {
    await Categories.insertMany([
    

    ]);
  } catch (error) {
    console.log('err', +error);
  }
}


/**
 * Insert Recipes into Database
 */
async function insertRecipes() {
  try {
    await Recipe.insertMany([
    

    ]);
  } catch (error) {
    console.log('err', +error);
  }
}


