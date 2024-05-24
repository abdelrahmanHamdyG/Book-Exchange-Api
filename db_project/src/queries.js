const getAllClients="SELECT * FROM client";
const getMyRequest="Select * FROM request where uid1=$1 or uid2=$1";
const postMyRequest=`INSERT INTO request (uid1, uid2, rstate, rdate, clicked) VALUES ($1, $2, 'pending', $3, false)         RETURNING rid;`
const insertBookRequestQuery = `INSERT INTO book_request (rid,bid) VALUES ($1, $2)`;



// sheeka
const checkBeforeDelete="SELECT book FROM book_request book  WHERE book.uid = 1$ and book.bid = book_request.bid" ;
const deleteBook=`UPDATE  book set bstate= 'deleted'  where book.bid=$1`; 
const getMyBooks=`SELECT * FROM book WHERE book.uid=$1 and book.bstate!='deleted'`;

//DELETE FROM book WHERE uid = $1 AND NOT EXISTS (SELECT $1 FROM book_request WHERE book_request.bid = book.bid);
const addBook="INSERT INTO book (title, description, image_link, category, bstate, uid) VALUES ($1, $2, $3, $4, $5, $6)";

const updateBook="UPDATE book SET title=$1, description=$2, image_link=$3, category=$4, bstate=$5 WHERE bid = $6"; 

const addFav="INSERT INTO favourites (uid1, uid2) VALUES ($1, $2)";

const addUser=`insert into client (uid,fname,lname,email,pass,governorate,phone_num,detailed_address) 
values ($1,$2,$3,$4,$5,$6,$7,$8)`;

const getARequest=`Select * FROM request where bid=$1`


// ahmed sayed

const updateAcceptAfterAcceptRequest=
`Update request set rstate = 'accepted' where rid =$1`; 
const updateDeclinedAfterAcceptRequest=
`Update request set rstate = 'refused' where rid in (select rid from book_request where bid in (select bid from book_request where rid= $1)) and rstate='pending' `
const deleteBooksAfterAcceptRequest=`UPDATE  book set bstate= 'deleted'  where book.bid in (select bid from book_request where rid= $1)`;




// zeyad ayman
const getBooks=`Select * from book where book.uid!=$1 and book.bstate !='deleted' and ( `;
const getAllBooksU=`SELECT * FROM book WHERE uid != $1 and book.bstate!='deleted' `;
const getBooksOfFav="SELECT * FROM favourites LEFT JOIN book on (favourites.uid2 = book.uid) WHERE uid1=$1 AND uid2=uid and book.bstate!='deleted' ";
const getBooksBySearch="SELECT * FROM book WHERE title LIKE $2 AND uid != $1 and book.bstate!='deleted' ";
const makeThemClicked=`Update request set clicked=true where uid2=$1 `


module.exports={

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
    
}