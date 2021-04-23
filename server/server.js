require('dotenv').config({path: "./configs/.env"});
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const app = express();
const port = process.env.PORT || 4000;

app.set('views', './views')
app.set('view engine', 'pug');


app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

// cookieSession before passport init
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // milisec
    keys: [process.env.COOKIE_SESSION_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log(`Server connected to database`))
const homeRoute = require('./routes/home.route');

app.use("/", homeRoute);

app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
});