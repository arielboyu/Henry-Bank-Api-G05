const { Router } = require('express');
// import all routers;
const user =require("./user.js")
const emailRouter = require('../controllers/email');
const account = require("./account")
const auth = require("./auth")
const  movement =require ("./movement.js")
const  contact = require ("./contact")
const validation = require ("./validation")

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/user', user);
router.use('/email', emailRouter);
router.use('/auth', auth);
router.use('/account', account)
router.use('/movement', movement)
router.use('/contact', contact)
router.use('/validation', validation)
module.exports = router;