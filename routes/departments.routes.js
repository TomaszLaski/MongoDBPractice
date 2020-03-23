const express = require('express');
const router = express.Router();
// const ObjectId = require('mongodb').ObjectId;
const Department = require('../models/department.model');
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.addNew);
router.put('/departments/:id', DepartmentController.modify);
router.delete('/departments/:id' ,DepartmentController.delete);

module.exports = router;