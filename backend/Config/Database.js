// exports.UsersDB = [
//     { id: 1, username: 'fofaye', password: '123456ff', email: 'f_ofaye@gmail.com' , name: 'Apichaya', surname:'Chuenjit' ,books:[]},
//     { id: 2, username: 'chanom', password: 'xchanomx', email: 'chanom8@gmail.com' ,name: 'xxxx', surname:'yyyy',books:[]},
// ] //export list

// exports.BooksDB = [

// ]
const db = {
    users : [
        { id: 1, username: 'fofaye', password: '123456ff', email: 'f_ofaye@gmail.com' , name: 'Apichaya', surname:'Chuenjit' ,cats:[]},
        { id: 2, username: 'chanom', password: 'xchanomx', email: 'chanom8@gmail.com' ,name: 'xxxx', surname:'yyyy',cats:[]},
    ],
    cats : [
        { id: 1 ,name: 'Chanom', dob: '08-08-19',sex: 'female'}
    ]
}
exports.DB = db 