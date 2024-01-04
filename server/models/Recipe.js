const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required.",
  },
  description: {
    type: String,
    required: "This field is required.",
  },
  ingredients: {
    type: Array,
    required: "This field is required",
  },
  category: {
    type: String,
    enum: [
      "American Food",
      "Asian-Food",
      "Breakfast",
      "Dessert",
      "Indian Food",
      "Italian Food",
      "Romanian Food"
    ],
    required: "This field is required",
  },
  image: {
    type: String,
    required: "This field is required.",
  },
});

recipeSchema.index({name: 'text', description: 'text'});
//Wildcard indexing
recipeSchema.index({"$*" : 'text'});

module.exports = mongoose.model("Recipe", recipeSchema);
