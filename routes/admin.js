const express = require("express");
const passport = require('passport');
const adminRoutes = express.Router();
const User = require("../models/User");

adminRoutes.get('/users', (req, res, next) => {
  User.find()
    .then(users => {
      res.render("admin/users", { users });
    })
    .catch(error => {
      console.log(error)
    })
});
adminRoutes.get('/user/:id', (req, res, next) => {
  let userId = req.params.id;
  User.findOne({'_id': userId})
    .then(user => {
      res.render("admin/user-detail", { user });
    })
    .catch(error => {
      console.log(error)
    });
});
adminRoutes.get('/users/edit', (req, res, next) => {
  User.findOne({_id: req.query.user_id})
  .then((user) => {
    res.render("admin/user-edit", {user});
  })
  .catch((error) => {
    console.log(error);
  });
});
adminRoutes.post('/users/edit', (req, res, next) => {
  const { username, email, role, status } = req.body;
  User.update({ _id: req.query.user_id}, { $set: { username, email, role, status } },
               { new: true })
  .then((user) => {
    res.redirect('/admin/users');
  })
  .catch((error) => {
    console.log(error);
  });
});
adminRoutes.get('/users/delete', (req, res, next) => {
  User.findByIdAndRemove({_id: req.query.user_id}, (err, user) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "User eliminado exitosamente",
      id: user._id
    };
    return res.redirect('/admin/users');
  });
});

module.exports = adminRoutes;
