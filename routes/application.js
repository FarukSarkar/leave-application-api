const express = require('express');
const router = express.Router();

const applicationController = require('../controllers/application.controllers');

router.get('/', applicationController.getAll);
router.get('/:id', applicationController.getById);
router.post('/', applicationController.create);
router.patch('/:id', applicationController.updateById);
router.delete('/:id', applicationController.deleteById);

module.exports = router;
