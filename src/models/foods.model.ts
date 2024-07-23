import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  imgId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  menuId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
