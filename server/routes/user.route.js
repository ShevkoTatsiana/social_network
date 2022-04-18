// const express = require("express");

// const recordRoutes = express.Router();

// const dbo = require('../db/conn');


 const userController = require('../controllers/user.controller');


// recordRoutes.route('/users').get(UserController.getUsers);



// recordRoutes.route('/users').get(async function (req, res) {
//     const dbConnect = dbo.getDb();
  
//     dbConnect
//       .collection("users")
//       .find({}).limit(50)
//       .toArray(function (err, result) {
//         if (err) {
//           res.status(400).send("Error fetching listings!");
//        } else {
//           res.json(result);
//         }
//       });
//   });

  // This section will help you create a new record.
// recordRoutes.route('/users/create').post(function (req, res) {
//     const dbConnect = dbo.getDb();
//     const matchDocument = {
//       name: req.body.name,
//       last_modified: new Date(),
//       email: req.body.email,
//       password: req.body.password,
//     };
  
  //   dbConnect
  //     .collection('users')
  //     .insertOne(matchDocument, function (err, result) {
  //       if (err) {
  //         res.status(400).send('Error inserting matches!');
  //       } else {
  //         console.log(`Added a new user with name ${result.name}`);
  //         res.status(204).send();
  //       }
  //     });
  // });

  // module.exports = recordRoutes;

  const router = require('express').Router();
  let User = require('../models/user.model');

  router.route('/').get(userController.getAll);
  router.route('/create').post(userController.createUser);
  router.route('/:id').get(userController.getUser);
  router.route('/:id').delete(userController.deleteUser);
  router.route('/edit/:id').post(userController.editUser);

//   router.route('/').get((req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/create').post((req, res) => {
//   const userData = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   const newUser = new User(userData);

//   newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;