// exports.UsersDB = [
//     { id: 1, username: 'fofaye', password: '123456ff', email: 'f_ofaye@gmail.com' , name: 'Apichaya', surname:'Chuenjit' ,books:[]},
//     { id: 2, username: 'chanom', password: 'xchanomx', email: 'chanom8@gmail.com' ,name: 'xxxx', surname:'yyyy',books:[]},
// ] //export list

// exports.BooksDB = [

// ]

const db = {
    users: [
        { id: 1, username: 'fofaye', password: '$2b$10$y8NTJrZN6IieJ1ToRJASG.hhxxdjPQg4tPSyelfvSI0B2SSIyU05C', email: 'f_ofaye@gmail.com', name: 'Apichaya', surname: 'Chuenjit', cats: [] },
        { id: 2, username: 'chanom', password: '$2b$10$y8NTJrZN6IieJ1ToRJASG.hhxxdjPQg4tPSyelfvSI0B2SSIyU05C', email: 'chanom8@gmail.com', name: 'xxxx', surname: 'yyyy', cats: [] },
    ],
    cats: [
        { id: 1, name: 'Chanom', dob: '08-08-19', sex: 'female' },
        { id: 2, name: 'Lookchup', dob: '08-08-19', sex: 'male' },

    ]
}
// const MongoClient = require('mongodb').MongoClient;
// Connect to the db 
// MongoClient.connect("mongodb://{username}:{password}@{host}:{port}/{database}", { useUnifiedTopology: true, useNewUrlParser: true }, function (err, db) {
//     if (!err) {
//         console.log("You are connected!");
//     };
//     //db.close();
// });
exports.DB = db