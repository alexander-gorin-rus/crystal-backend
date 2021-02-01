const express = require('express');
const router = express.Router();

//import controllers
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

//middlewares
const { authCheck, adminCheck, managerCheck } = require('../middlewares/auth');

router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, adminCheck, currentUser);
router.post('/current-manager', authCheck, managerCheck, currentUser);

module.exports = router;