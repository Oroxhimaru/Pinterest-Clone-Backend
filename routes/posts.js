const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,  // adding this now for id catching (6).
    ref: "User" //mongoose dont know about id so we have to give refernece. so give model name here from users.js file.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array, //make the number to array
    default: [], //0 to []
  },
});

module.exports = mongoose.model('Post', postSchema);


