"use strict";

const mongoose = require("mongoose");

// this is our schema to represent a blog
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
});

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogSchema.methods.serialize = function() {
  return {
    title: this.title,
    content: this.content,
    author: `${this.author.firstName} ${this.author.lastName}`,
    created: this._id,
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog };
