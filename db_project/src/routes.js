
// we should make the routes here

const {Router}=require("express");
const controller=require("./controller")
const router=Router();


router.get("/clients",controller.getAllClients)


module.exports=router;