const express = require("express");
const chat =require("../controllers/chat.controller") ;

const router = express.Router();

router.post("/chats",chat.chatCompletion);

module.exports = router;


