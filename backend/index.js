const express = require('express') ;
const app = express() ;
//const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const PORT = 3001 ;


require('./Config/Passport')
const authRouter = require('./Route/AuthRoute')

// app.use('/api',express.json(),router);
// app.use('/api',express.urlencoded({extended: false}));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api',authRouter)


app.listen(PORT,()=>console.log('Server is running :',PORT))