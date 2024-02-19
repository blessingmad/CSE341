const express = require('express');

const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
const dotentv = require(('dotenv'));
dotentv.config();


app.use((req, res, next) =>{
    res.setHeader('Access-Control-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-with, Content-Type, Accept, Z-Key'
    );
    res.setHeader('access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
    
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes/index.js'));
    app.use('/', require('./routes/index.js'));

    passport.use(
        new GitHubStrategy,
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refeshToken, profile, done) {
            //User.findOrCreate({githubId: profile.id}, function(err, user) {
            return done(null, profile);
            // });
          }
    
        );
      
       
      passport.serializeUser((user, done) => {
        done(null, user);
      });
      passport.deserializeUser((user, done) => {
        done(null, user);
      });
       
      app.get("/", (req, res) => {
        res.send(
          req.session.user !== undefined
            ? `Logged in as ${req.session.user.displayName || req.session.user.username}`
            : "Logged Out"
        );
      });
       
      app.get(
        "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

    

mongodb.initDb((err)=> {
    if(err){
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and running on port  ${port} `)});
    }
}); 