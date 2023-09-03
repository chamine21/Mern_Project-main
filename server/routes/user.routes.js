const { Signup,Login, readAll  } = require("..//controllers/user.controller");
const Verification =require("../Middlewares/AuthMiddleware")
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.get('/getallusers', readAll)
router.post('/',Verification.userVerification)

module.exports = router;