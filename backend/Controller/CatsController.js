const {DB} = require('../Config/Database')
let cats = DB.cats

exports.get = async (req,res) => {
    res.json(cats)
}

exports.post = async (req,res)=> {
    const newCat = {}
    newCat.id = (cats.length)?cats[cats.length-1].id+1 :1 
    newCat.name = req.body.name 
    newCat.dob = req.body.dob
    newCat.sex = req.body.sex
    cats.push(newCat)
    res.json(cats)
}

exports.update = async (req,res) => {
    const catID = req.params.catID
    //console.log(req)
    const id = cats.findIndex(item=> +item.id=== +catID)
    if(id>=0){
        cats[id].name = req.body.name ;
        cats[id].dob = req.body.dob ;
        cats[id].sex = req.body.sex ;
        res.json(cats)
    }
    else{
        res.json('Error')
    }
}

exports.delete =async(req,res)=> {
    const catID = req.params.catID
    const id = cats.findIndex(item=> +item.id=== +catID)
    if(id>=0){
        cats = cats.filter(item=>+item.id !== +catID)
        res.json(cats)
    }
    else{
        res.json('Error')
    }
}