const { Router } = require('express');
// import all routers;
const user =require("./user.js")
const emailRouter = require('../controllers/email');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', user);
router.use('/email', emailRouter);

module.exports = router;