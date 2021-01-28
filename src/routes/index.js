const { Router } = require('express');
// import all routers;
const user =require("./user.js")
<<<<<<< HEAD
const emailRouter = require('../controllers/email');

=======
const auth = require("./auth")
>>>>>>> master

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', user);
<<<<<<< HEAD
router.use('/email', emailRouter);
=======
router.use('/auth', auth);
>>>>>>> master

module.exports = router;