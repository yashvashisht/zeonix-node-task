const roleController = require('../controllers/role');
const app = require('express');
const router = app.Router();
const schema = require('../middelware/validator');
const joi = require('joi');


const roleSchema = {
    label: joi.string().required(),
    role: joi.string().required(),
}
router.post('/',schema.validator(roleSchema),roleController.createRole);


const putRoleSchema ={
    id:joi.string().required(),
    label: joi.string().required(),
    role: joi.string().required(),
} 
router.put('/:id',roleController.updateRole);

router.delete('/:id',roleController.deleteRole);

router.get('/', roleController.getAllRoles);

module.exports = router;