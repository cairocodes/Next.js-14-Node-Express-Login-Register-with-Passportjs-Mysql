const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport'); //npm install passport https://www.npmjs.com/package/passport
const expressSession = require('express-session'); //npm install express-session  https://www.npmjs.com/package/express-session
const bycrypt = require('bcrypt'); //npm install bcrypt https://github.com/kelektiv/node.bcrypt.js
const cookieParser = require('cookie-parser'); //npm install cookie-parser https://www.npmjs.com/package/cookie-parser
const db = require('./db');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'cairocoders-ednalan', resave: false, saveUninitialized: false })); 

app.use(cors({
      origin: 'http://localhost:3000',
      credentials: true
}));

app.use(cookieParser('cairocoders-ednalan')); 

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport); 

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//routes
app.post('/register', (req, res) => {
  
    const query = "INSERT INTO users (username, password) VALUES (?,?)";
    const query2 = "SELECT * FROM users where username = ?";
  
    db.query(query2, [req.body.username] ,async (err, rows) => {
      if (err) {console.log(err);}
      if (rows.length > 0) {res.send("User already exists");}
      if (rows.length === 0) {
        const hashedPassword =  await bycrypt.hash(req.body.password, 10);
        db.query(query, [req.body.username, hashedPassword], (err, rows) => {
          if (err) {console.log(err);}
          res.send("User created");
        });
      }
    })
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => { 
    if (err) {console.log(err);}
    if (!user) {res.send("User not found");}
    if (user) {
      req.login(user, (err) => {
        if (err) {console.log(err);}
        res.send("success");
        console.log(user);
      })
    }
  })(req, res, next); 
})

app.get('/getUser', (req, res) => {
  res.send(req.user);
  console.log(req.user);
})

app.listen(3001, () => {console.log('Server started on port 3001')});