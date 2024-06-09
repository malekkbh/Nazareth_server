const { Router } = require("express");
const { createNewUser, login, updateUser } = require("../Controllers/user.controller");

const userRouter = Router();

userRouter.post('/createNewUser' , createNewUser)
userRouter.post('/login' , login)
userRouter.post('/updateUser' , updateUser)
//userRouter.post('/createNewUser' ,
    // (req , res) =>createNewUser(req , res)  )

module.exports = userRouter;
