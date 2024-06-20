const { getRequestOtherbook } = require("./controller");

// SQL query to get all clients
const getAllClients = "SELECT * FROM client";

// SQL query to get all requests for a specific user
const getMyRequest = "SELECT * FROM request WHERE uid1=$1 OR uid2=$1";

// SQL query to insert a new request and return the request ID
const postMyRequest = `INSERT INTO request (uid1, uid2, rdate, clicked) VALUES ($1, $2, $3, false) RETURNING rid;`;

// SQL query to insert a book request
const insertBookRequestQuery = `INSERT INTO book_request (rid, bid) VALUES ($1, $2)`;

// SQL query to mark a book as deleted
const deleteBook = `UPDATE active_books SET bstate = 'deleted' WHERE active_books.bid=$1`;

// SQL query to get all books owned by a specific user
const getMyBooks = `SELECT * FROM active_books WHERE uid = $1;`;

// SQL query to add a new book
const addBook = "INSERT INTO active_books (title, description, image_link, category, bstate, uid) VALUES ($1, $2, $3, $4, $5, $6)";

// SQL query to update a book's details
const updateBook = "UPDATE active_books SET title=$1, description=$2, image_link=$3, category=$4, bstate=$5 WHERE active_books.bid = $6";

// SQL query to check if a book is referenced in any book requests before deleting
const checkBeforeDelete = "SELECT book FROM book_request WHERE book.uid = $1 AND book.bid = book_request.bid";

// SQL query to add a user to the favorites list
const addFav = "INSERT INTO favourites (uid1, uid2) VALUES ($1, $2)";

// SQL query to add a new user
const addUser = `INSERT INTO client (uid, fname, lname, email, pass, governorate, phone_num, detailed_address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

// SQL query to get a specific request by request ID
const getARequest = "SELECT * FROM request WHERE rid=$1";

// SQL query to decline a request
const declineRequest = "UPDATE request SET rstate='refused' WHERE rid=$1";

// SQL query to update request status to accepted
const updateAcceptAfterAcceptRequest = "UPDATE request SET rstate = 'accepted' WHERE rid =$1";

// SQL query to update other pending requests to declined after accepting a request
const updateDeclinedAfterAcceptRequest = `UPDATE request SET rstate = 'refused' WHERE rid IN (SELECT rid FROM book_request WHERE bid IN (SELECT bid FROM book_request WHERE rid= $1)) AND rstate='pending'`;

// SQL query to mark books as deleted after accepting a request
const deleteBooksAfterAcceptRequest = `UPDATE book SET bstate= 'deleted' WHERE book.bid IN (SELECT bid FROM book_request WHERE rid= $1)`;

// SQL query to check if a user is in another user's favorites
const checkFavourite = "SELECT * FROM favourites WHERE uid1 = $1 AND uid2= $2";

// SQL query to get a specific client's details
const getAClient = "SELECT * FROM client WHERE uid=$1";

// SQL query to get books by category filter for a specific user (excluding their own books and deleted books)
const getBooks = "SELECT * FROM book WHERE book.uid!=$1 AND book.bstate !='deleted' AND (";

// SQL query to get books by decision filter
const getBooksDecision = "SELECT * FROM book WHERE ";

// SQL query to get all books except those owned by a specific user (excluding deleted books)
const getAllBooksU = "SELECT * FROM book WHERE uid != $1 AND book.bstate!='deleted'";

// SQL query to get books of a user's favorites
const getBooksOfFav = "SELECT book.* FROM favourites LEFT JOIN book ON (favourites.uid2 = book.uid) WHERE uid1=$1 AND uid2=uid AND book.bstate!='deleted'";

// SQL query to get books by search keyword for a specific user (excluding deleted books)
const getBooksBySearch = "SELECT * FROM book WHERE title LIKE $2 AND uid != $1 AND book.bstate!='deleted'";

// SQL query to mark requests as clicked for a specific user
const makeThemClicked = "UPDATE request SET clicked=true WHERE uid2=$1";

// SQL query to remove a user from favorites
const removeFavourite = "DELETE FROM favourites WHERE uid1=$1 AND uid2=$2";

// SQL query to get request details for books owned by the user
const mybookRequest = `SELECT b.* 
FROM book b
JOIN book_request br ON b.bid = br.bid
JOIN request r ON br.rid = r.rid
WHERE r.rid = $1 AND b.uid = $2`;

// SQL query to get request details for books owned by others
const othersideBookRequest = `SELECT b.* 
FROM book b
JOIN book_request br ON b.bid = br.bid
JOIN request r ON br.rid = r.rid
WHERE r.rid=$1 AND b.uid <> $2`;

module.exports = {
    getAllClients,
    getMyRequest,
    postMyRequest,
    insertBookRequestQuery,
    getBooks,
    deleteBook,
    addBook,
    checkBeforeDelete,
    updateBook,
    addFav,
    getMyBooks,
    updateAcceptAfterAcceptRequest,
    updateDeclinedAfterAcceptRequest,
    deleteBooksAfterAcceptRequest,
    getAllBooksU,
    getBooksOfFav,
    getBooksBySearch,
    makeThemClicked,
    addUser,
    getARequest,
    getBooksDecision,
    mybookRequest,
    othersideBookRequest,
    getAClient,
    checkFavourite,
    removeFavourite,
    declineRequest,
};
