const {DB} = require('../Config/Database')
const books = DB.books 

exports.get = async (req,res) => {
    res.json(books)
}