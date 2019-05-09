const express = require("express");
const utils = require("utility");
const Router = express.Router();

const model = require("./model");
const User = model.getModels("user");
const Chat = model.getModels("chat");
const _filter = { pwd: 0, _v: 0 };
// User.remove({},function(err,doc){
//     console.log()
// })
Router.get("/msgList", function(req, res) {
  const { userid } = req.cookies;
  User.find({}, function(err, userDoc) {
    let users = {};
    userDoc.forEach(ele => {
      users[ele._id] = ele;
    });
    Chat.find({ $or: [{ from: userid }, { to: userid }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, data: { users, msgList: doc } });
      }
    });
  });
});
Router.post("/login", function(req, res) {
  const { pwd, user } = req.body;
  User.findOne({ user, pwd: mdsFunc(pwd) }, _filter, function(err, doc) {
    if (doc) {
      const { _id } = doc;
      res.cookie("userid", _id);
      res.json({ code: 0, data: doc });
    } else {
      res.json({ code: 1, msg: "用户不存在" });
    }
  });
});
Router.post("/register", function(req, res) {
  const { pwd, type, user } = req.body;
  User.findOne({ user }, _filter, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }
    const userModel = new User({ pwd: mdsFunc(pwd), type, user });
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: "创建失败" });
      } else if (doc) {
        const { user, type, _id } = doc;
        res.cookie("userid", _id);
        return res.json({ code: 0, data: { user, type, _id } });
      }
    });
  });
});
Router.post("/update", function(req, res) {
  const { userid } = req.cookies;
  const data = req.body;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOneAndUpdate({ _id: userid }, data, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "更新失败" });
    } else {
      const finalData = Object.assign(
        {},
        { user: doc.user, type: doc.type },
        data
      );
      return res.json({ code: 0, data: finalData });
    }
  });
});
Router.get("/list", function(req, res) {
  const { type } = req.query;
  User.find({ type }, function(err, doc) {
    return res.json({ code: 0, data: doc });
  });
});

Router.get("/info", function(req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错" });
    }
    if (!doc) {
      return res.json({ code: 1, msg: "后端出错" });
    } else {
      return res.json({ code: 0, data: doc });
    }
  });
});

function mdsFunc(pwd) {
  const randValue = "#$@*#&#&&#&";
  return utils.md5(utils.md5(pwd + randValue));
}
module.exports = Router;
