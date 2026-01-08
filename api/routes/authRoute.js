const { Router } = require('express');
const { post } = require('./usuariosRoute');


const router = Router();

router.post('/auth/login');


module.exports = router;