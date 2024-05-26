
// we should make the routes here

const {Router}=require("express");
const controller=require("./controller")
const router=Router();

// ghania
router.get("/clients",controller.getAllClients)
router.get("/clients/:uid",controller.getAClient)
router.get("/requests/:uid",controller.getMyRequest)
router.get("/oneRequest/:rid",controller.getARequest)
router.get("/getBooksDecision/:cats",controller.getBooksDecision)
router.post("/requests/addRequest",controller.postMyRequest)
//
// zeyad

router.get("/requestMyBooks/:rid&:uid",controller.getRequestMybook)
router.get("/requestOtherBooks/:rid&:uid",controller.getRequestOtherbook)


// 
//sheeka
router.delete("/mybooks/:bid",controller.deleteBook);
router.post("/mybooks/:uid",controller.addBook);
router.put("/mybooks/:bid",controller.updateBook);
router.post("/favourite/:uid1&:uid2",controller.addFav) 
router.get("/mybooks/:uid",controller.getMyBooks);


// ahmed sayed
router.put("/decline/:rid",controller.acceptRequest);

// zeyad

router.get("/checkFavourite/:uid1/:uid2",controller.checkFavourite)
router.get("/books/all/:uid", controller.getAllBooksU);
router.get("/favourite/:uid1", controller.getBooksOfFav);
router.get("/search/:uid&:Kword", controller.getBooksBySearch);
router.get("/books/:uid&:cats",controller.getBooksByFilter)
router.put("/clicked/:uid",controller.makeThemClicked);

router.post("/addUser",controller.addUser);


module.exports=router;