'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var Tour = require('../tour/tour.model');


// exports.points = function(req, res){
  
//   var user = {
//     id: req.user.id,
//     level: req.user.level,
//     xp: req.user.xp
//   }
  
//   var xpGained = req.task.xp;

//   var levelTable = {
//     1: 0,
//     2: 100,
//     3: 200,
//     4: 300,
//     5: 400,
//     6: 500,
//     7: 600,
//     8: 700,
//     9: 800,
//     10: 900
//   }

//   var levelUp = function(user){
//     var level = user.level+1
//     var xp = user.xp - levelTable[level];
//     User.findByIdAndUpdate(user.id, {{level: level, xp: xp}}).exec()
//       .then(function(user){
//         res.json(user);
//       });
//   };
  
//   if(user.xp + xpGained >= levelTable[user.level + 1]){
//     levelUp(user);
//   }

// };




var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    console.log(user.profile)
    res.json(user.profile);
  });
};


/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Get the all the tours created by the current user
 */

exports.showTours = function(req, res, next) {

  if(!req.user._id.equals(req.params.id)) {return res.send(401);}

  Tour.find({author: req.params.id}, function(err, tours){
    if(err) return next(err);
    res.json(tours);
  });
};

//Calculate level and points



/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
