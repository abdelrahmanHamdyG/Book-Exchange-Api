const { Router } = require("express");
const controller = require("./controller");
const router = Router();

// Ghania's routes

// Route to get all clients
router.get("/clients", controller.getAllClients);

// Route to get a specific client by UID
router.get("/clients/:uid", controller.getAClient);

// Route to get all requests for a specific user by UID
router.get("/requests/:uid", controller.getMyRequest);

// Route to get a specific request by RID
router.get("/oneRequest/:rid", controller.getARequest);

// Route to get book decisions based on categories
router.get("/getBooksDecision/:cats", controller.getBooksDecision);

// Route to add a new request
router.post("/requests/addRequest", controller.postMyRequest);

// Zeyad's routes

// Route to get books in a request owned by the user
router.get("/requestMyBooks/:rid&:uid", controller.getRequestMybook);

// Route to get books in a request owned by others
router.get("/requestOtherBooks/:rid&:uid", controller.getRequestOtherbook);

// Sheeka's routes

// Route to delete a book by BID
router.delete("/mybooks/:bid", controller.deleteBook);

// Route to add a new book
router.post("/mybooks/:uid", controller.addBook);

// Route to update a book by BID
router.put("/mybooks/:bid", controller.updateBook);

// Route to add a user to favorites
router.post("/favourite/:uid1&:uid2", controller.addFav);

// Route to remove a user from favorites
router.delete("/favourite/:uid1&:uid2", controller.removeFavourite);

// Route to get all books owned by a specific user
router.get("/mybooks/:uid", controller.getMyBooks);

// Ahmed Sayed's routes

// Route to accept a request by RID
router.put("/decline/:rid", controller.acceptRequest);

// Zeyad's additional routes

// Route to check if a user is in another user's favorites
router.get("/checkFavourite/:uid1/:uid2", controller.checkFavourite);

// Route to get all books excluding those owned by a specific user
router.get("/books/all/:uid", controller.getAllBooksU);

// Route to get books of a user's favorites
router.get("/favourite/:uid1", controller.getBooksOfFav);

// Route to search books by keyword for a specific user
router.get("/search/:uid&:Kword", controller.getBooksBySearch);

// Route to filter books by categories for a specific user
router.get("/books/:uid&:cats", controller.getBooksByFilter);

// Route to mark requests as clicked for a specific user
router.put("/clicked/:uid", controller.makeThemClicked);

// Route to add a new user
router.post("/addUser", controller.addUser);

// Route to decline a request by RID
router.post("/declineRequest/:rid", controller.declineRequest);

module.exports = router;
