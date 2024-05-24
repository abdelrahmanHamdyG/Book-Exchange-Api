
// we should make the routes here

const {Router}=require("express");
const controller=require("./controller")
const router=Router();

// ghania
router.get("/clients",controller.getAllClients)
router.get("/requests/:uid",controller.getMyRequest)
router.get("/oneRequest/:rid",controller.getARequest)
router.get("/getBooksDecision/:cats",controller.getBooksDesicion)
router.post("/requests/addRequest",controller.postMyRequest)
//
// zeyad

// 
//sheeka
router.delete("/mybooks/:bid",controller.deleteBook);
router.post("/mybooks/:uid",controller.addBook);
router.put("/mybooks/:bid",controller.updateBook);
router.post("/favourite/:uid",controller.addFav) 
router.get("/mybooks/:uid",controller.getMyBooks);


// ahmed sayed
router.put("/decline/:rid",controller.acceptRequest);

// zeyad
router.get("/books/all/:uid", controller.getAllBooksU);
router.get("/favourite/:uid1", controller.getBooksOfFav);
router.get("/search/:uid&:Kword", controller.getBooksBySearch);
router.get("/books/:uid&:cats",controller.getBooksByFilter)
router.put("/clicked/:uid",controller.makeThemClicked);

router.post("/addUser",controller.addUser);


module.exports=router;