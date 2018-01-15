var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dogSchema = Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  filePath: { type: String }
});

var Dogs = mongoose.model("Dogs", dogSchema);

module.exports = Dogs;
