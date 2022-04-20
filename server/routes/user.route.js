const router = require('express').Router();
const userController = require('../controllers/user.controller');
const validator = require('../middlewares/validation.middleware')
const schema = require('../validationSchemas/createUser.schema');

router
  .get('/', userController.getAll)
  .get('/:id', userController.getUser)
  .delete('/:id', userController.deleteUser)
  .post('/create', validator(schema), userController.createUser)
  .put('/:id', userController.editUser);

module.exports = router;