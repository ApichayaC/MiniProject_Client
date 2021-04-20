const express = require('express') ;
const app = express() ;
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');

// app.use('/api',express.json(),router);
// app.use('/api',express.urlencoded({extended: false}));
app.use()

router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

