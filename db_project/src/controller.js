const pool = require("../db"); // Import the database connection pool
const queries = require("./queries"); // Import the SQL queries
const { merge, param } = require("./routes"); // Import additional utility functions

// Function to get all clients
const getAllClients = (req, res) => {
    pool.query(queries.getAllClients, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to get requests made by a specific user
const getMyRequest = (req, res) => {
    const uid = req.params.uid;
    pool.query(queries.getMyRequest, [uid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to get a specific request by request ID
const getARequest = (req, res) => {
    const rid = parseInt(req.params.rid);
    pool.query(queries.getARequest, [rid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to create a new request
const postMyRequest = (req, res) => {
    const { rid, uid1, uid2, myBooks, hisBooks, state, clicked, rdate } = req.body;
    console.log("I am in the request");
    pool.query(queries.postMyRequest, [uid1, uid2, rdate], (error, results) => {
        if (error) {
            console.log(error);
            res.status(409).send(error);
            throw error;
        }

        const requestId = results.rows[0].rid;
        const mergedArr = myBooks.concat(hisBooks);
        console.log(mergedArr);

        mergedArr.forEach(element => {
            pool.query(queries.insertBookRequestQuery, [requestId, element], (error, results) => {
                if (error) {
                    res.status(410).send(error);
                    throw error;
                }
            });
        });

        res.status(200).send("done adding book request");
    });
};

// Function to get books by category filter for a specific user
const getBooksByFilter = (req, res) => {
    const cats = req.params.cats;
    const uid = req.params.uid;
    const catsArr = cats.split('*');
    let s = queries.getBooks;

    for (let i = 0; i < catsArr.length; i++) {
        s += ' category =\'';
        s += catsArr[i];
        s += '\'';
        if (i != catsArr.length - 1) s += ' or ';
        console.log(s);
    }
    s += ' ) ';
    s += ';';
    console.log(s);

    pool.query(s, [uid], (error, result) => {
        if (error) throw error;
        res.send(result.rows);
    });
};

// Function to get books by decision filter
const getBooksDecision = (req, res) => {
    const cats = req.params.cats;
    const catsArr = cats.split('*');
    let s = queries.getBooksDecision;

    for (let i = 0; i < catsArr.length; i++) {
        s += ' bid= ';
        s += parseInt(catsArr[i]);
        s += ' ';
        if (i != catsArr.length - 1) s += ' or ';
        console.log(s);
    }

    s += ';';
    console.log(s);

    pool.query(s, [uid], (error, result) => {
        if (error) throw error;
        res.send(result.rows);
    });
};

// Function to delete a book by book ID
const deleteBook = (req, res) => {
    const bid = parseInt(req.params.bid);
    pool.query(queries.deleteBook, [bid], (error, results) => {
        if (error) throw error;
        res.status(200).send("Book Deleted successfully");
    });
};

// Function to add a new book
const addBook = (req, res) => {
    const uid1 = req.params.uid;
    const { bid, title, description, image_link, category, bstate, uid } = req.body;

    pool.query(queries.addBook, [title, description, image_link, category, bstate, uid1], (error, results) => {
        if (error) {
            res.status(404).send(error);
            throw error;
        }
        res.status(201).send("Book Added Successfully");
    });
};

// Function to update book details
const updateBook = (req, res) => {
    const bid1 = parseInt(req.params.bid);
    const { bid, title, description, image_link, category, bstate, uid } = req.body;

    pool.query(queries.updateBook, [title, description, image_link, category, bstate, bid], (error, results) => {
        if (error) throw error;
        res.status(201).send("Book Updated Successfully");
    });
};

// Function to add a user to favorites
const addFav = (req, res) => {
    const uid1 = req.params.uid1;
    const uid2 = req.params.uid2;

    pool.query(queries.addFav, [uid1, uid2], (error, results) => {
        if (error) throw error;
        res.status(201).send("User Added to Favorites Successfully");
    });
};

// Function to get books owned by a specific user
const getMyBooks = (req, res) => {
    const uid = req.params.uid;
    pool.query(queries.getMyBooks, [uid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to get a specific client's details
const getAClient = (req, res) => {
    console.log("in the request");
    const uid = req.params.uid;

    pool.query(queries.getAClient, [uid], (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

// Function to accept a request
const acceptRequest = (req, res) => {
    const rid = parseInt(req.params.rid);
    pool.query(queries.updateAcceptAfterAcceptRequest, [rid], (error, result) => {
        if (error) throw error;
    });

    pool.query(queries.updateDeclinedAfterAcceptRequest, [rid], (error, result) => {
        if (error) throw error;
    });

    pool.query(queries.deleteBooksAfterAcceptRequest, [rid], (error, result) => {
        if (error) throw error;
    });

    res.status(200).send("done successfully");
};

// Function to get all books except those owned by a specific user
const getAllBooksU = (req, res) => {
    const uid = req.params.uid;
    pool.query(queries.getAllBooksU, [uid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to decline a request
const declineRequest = (req, res) => {
    const rid = parseInt(req.params.rid);
    console.log(`rid is `, rid);

    pool.query(queries.declineRequest, [rid], (error, result) => {
        if (error) throw error;
        res.status(200).send("done refused request");
    });
};

// Function to get books of a user's favorites
const getBooksOfFav = (req, res) => {
    const uid1 = req.params.uid1;
    pool.query(queries.getBooksOfFav, [uid1], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to check if a user is in another user's favorites
const checkFavourite = (req, res) => {
    const uid1 = req.params.uid1;
    console.log(uid1);
    const uid2 = req.params.uid2;
    console.log(uid2);
    console.log("got the request");

    pool.query(queries.checkFavourite, [uid1, uid2], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

// Function to remove a user from favorites
const removeFavourite = (req, res) => {
    const uid1 = req.params.uid1;
    const uid2 = req.params.uid2;

    pool.query(queries.removeFavourite, [uid1, uid2], (error, results) => {
        if (error) throw error;
        res.status(201).send("User removed from Favorites Successfully");
    });
};

// Function to get books by search keyword for a specific user
const getBooksBySearch = (req, res) => {
    const uid = req.params.uid;
    const Kword = req.params.Kword;
    pool.query(queries.getBooksBySearch, [uid, `%${Kword}%`], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to mark requests as clicked for a specific user
const makeThemClicked = (req, res) => {
    const uid = req.params.uid;

    pool.query(queries.makeThemClicked, [uid], (error, results) => {
        if (error) throw error;
        res.status(200).send("very good");
    });
};

// Function to add a new user
const addUser = (req, res) => {
    const { uid, fname, lname, email, pass, governorate, phone_num, detailed_address } = req.body;

    pool.query(queries.addUser, [uid, fname, lname, email, pass, governorate, phone_num, detailed_address], (error, results) => {
        if (error) throw error;
        res.status(201).send("Client Added Successfully");
    });
};

// Function to get request details for books owned by the user
const getRequestMybook = (req, res) => {
    const rid = parseInt(req.params.rid);
    const uid = req.params.uid;
    pool.query(queries.mybookRequest, [rid, uid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Function to get request details for books owned by others
const getRequestOtherbook = (req, res) => {
    const rid = parseInt(req.params.rid);
    const uid = req.params.uid;
    pool.query(queries.othersideBookRequest, [rid, uid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Exporting all the functions
module.exports = {
    getAllClients,
    getMyRequest,
    postMyRequest,
    getBooksByFilter,
    deleteBook,
    addBook,
    updateBook,
    addFav,
    getMyBooks,
    acceptRequest,
    getAllBooksU,
    getBooksOfFav,
    getBooksBySearch,
    makeThemClicked,
    addUser,
    getARequest,
    getBooksDecision,
    getRequestMybook,
    getRequestOtherbook,
    getAClient,
    checkFavourite,
    removeFavourite,
    declineRequest,
};
