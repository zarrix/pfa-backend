const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Authentication middleware
const {checkUser, requireUserAuth} = require('./middleware/auth.middleware');

const images = require('./routes/api/images.routes');
const users = require('./routes/api/users.routes');
const trees = require('./routes/api/trees.routes');
const nurseries = require('./routes/api/nurseries.routes');
const requests = require('./routes/api/requests.routes');
const dashboard = require('./routes/api/dashboard.routes');

//initialize express
const app = express();

//Autorisation les requetes pour CLIENTS_URL
const corsOptions = {
    origin: ['http://hafdashboard.surge.sh', 'https://612e668e19393e00e21559da--hafdashboard.netlify.app'],  //request source permited
    credentials: true,  //to allow exposing code to javascript
    'allowedHeaders': ['sessionId', 'Content-Type'], 
    'exposedHeaders': ['sessionId'],  //
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
//autorisation des requetes
app.use(cors(corsOptions));

//bodyParser middleware
app.use(bodyParser.json());

//cookieParser middleware
app.use(cookieParser());

//Database config
const db = require('./config/keys').mongoURI;

//Connecting to mongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB Connected ...'))
        .catch(err => console.log(err));


// Use routes
// app.get('/*', checkUser);
app.get('/jwtid',requireUserAuth,(req,res)=>{
  res.status(200).send(res.locals.users); 
});

app.use('/api/images', images);
app.use('/api/users', users);
app.use('/api/trees', trees);
app.use('/api/nurseries', nurseries);
app.use('/api/requests', requests);
app.use('/api/dashboard', dashboard);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


module.exports=app;