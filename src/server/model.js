const mongoose = require("mongoose");
const DB_URL = "mongodb://127.0.0.1:27017/imooc";
mongoose.connect(DB_URL, { useNewUrlParser: true });

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String, require: true },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {}
};
for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]));
}

module.exports = {
  getModels: function(name) {
    return mongoose.model(name);
  }
};
