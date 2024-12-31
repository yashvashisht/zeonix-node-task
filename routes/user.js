const userController = require('../controllers/user');
const app = require('express');
const router = app.Router();
const schema = require('../middelware/validator');
const joi = require('joi');


router.get('/',userController.getAllUser);
router.get('/:id',userController.getUserDetailById);



module.exports = router;