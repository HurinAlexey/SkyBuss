const express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const projectRoutes = require('./routes/project');
const mailRoutes = require('./routes/mail');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => {console.log('Data Base connected!')})
    .catch(err => {console.log(err)});

app.use(passport.initialize());
require('./middleware/passport')(passport);


app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());
app.use(compression());
//app.use(require('express-http-to-https').redirectToHTTPS());

app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/mail', mailRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'));

    app.get('*', (req, res) => {
        console.log(req);
        res.sendFile(
            path.resolve(
                __dirname, 'client', 'dist', 'client', 'index.html'
            )
        );
    })
}


module.exports = app;