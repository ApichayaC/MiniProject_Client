const { DB } = require('../Config/Database')

const { MongoClient } = require("mongodb");
const uri = "mongodb://myUser:myUser@localhost:27018/codemobile";
let cats = DB.cats

exports.get = async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const x = await client.db('codemobile').collection('courses').find({})
        .toArray()
        .then(items => {
            console.log(`Successfully found ${items.length} documents.`)
            items.forEach(console.log)
            return items
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
    console.log(x);
    await client.close();
    console.log(cats);
    res.json(cats)
}

exports.post = async (req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);
    const newCat = {}
    await client.connect();
    await client.db('codemobile').collection('courses').insertOne({
        //id: req.body.id,
        name: req.body.name,
        dob: req.body.dob,
        sex: req.body.sex
    });
    await client.close();
    newCat.id = (cats.length) ? cats[cats.length - 1].id + 1 : 1
    newCat.name = req.body.name
    newCat.dob = req.body.dob
    newCat.sex = req.body.sex
    cats.push(newCat)
    res.json(cats)
}

exports.update = async (req, res) => {
    const catID = req.params.catID
    console.log(req)
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('codemobile').collection('courses').updateOne({ id: +catID }, {
        $set: {
            "name": req.body.name,
            "dob": req.body.dob,
            "sex": req.body.sex
        },
        $currentDate: { lastModified: true }
    })
    await client.close();
    const id = cats.findIndex(item => +item.id === +catID)
    if (id >= 0) {
        cats[id].name = req.body.name;
        cats[id].dob = req.body.dob;
        cats[id].sex = req.body.sex;
        res.json(cats)
    }
    else {
        res.json('Error')
    }
}

exports.delete = async (req, res) => {
    const catID = req.params.catID
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('codemobile').collection('courses').deleteOne({ "id": +catID }).then(result => { console.log('results', result); })
    await client.close();
    const id = cats.findIndex(item => +item.id === +catID)
    if (id >= 0) {
        cats = cats.filter(item => +item.id !== +catID)

        res.json({ data: cats, message: "delete success", status: true })
    }
    else {
        res.json('Error')
    }
    //await client.close();
}