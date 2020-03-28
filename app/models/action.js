const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const actionSchema = new Schema({
  name: {
    type: String,
    default: "new action",
    trim: true
  },
  type: {
    type: String,
    trim: true
  },
  values: {
    type: Array
  },
  controll: {
    type: Number,
  },
  listen: {
    type: Number,
  },
  typeValue: {
    type: String,
  }
});

const Action = mongooes.model("actions", actionSchema);
module.exports = Action;
