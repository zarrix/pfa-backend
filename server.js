const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require("fs");
const cookieParser = require('cookie-parser');

//Authentication middleware
const {checkUser,requireAuth} = require('./middleware/auth.middleware');

const projects = require('./routes/api/projects.routes');
const donations = require('./routes/api/donations.routes');
const donors = require('./routes/api/donors.routes');
const images = require('./routes/api/images.routes');
const users = require('./routes/api/users.routes');
const trees = require('./routes/api/trees.routes');
const nurseries = require('./routes/api/nurseries.routes');
const requests = require('./routes/api/requests.routes');

//initialize express
const app = express();

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
app.get('/jwtid',requireAuth,(req,res)=>{
    res.status(200).send(res.locals.donor);
});
app.use('/api/projects', projects);
app.use('/api/donations', donations);
app.use('/api/donors', donors);
app.use('/api/images', images);
app.use('/api/users', users);
app.use('/api/trees', trees);
app.use('/api/nurseries', nurseries);
app.use('/api/requests', requests);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


//uploading images
// const Image = require('./models/image');
// const image = new Image({
//         img: {
//                 data: fs.readFileSync('./uploads/13833407.jpg'),
//                 contentType: 'image/jpg'
//         }
// })

// image.save()
//         .then((res) => {
//                 console.log('Image added successfully ...');
//                 const Project = require('./models/project');
//                 const project = new Project({
//                         image: '/api/images/' + res._id,
//                         title: "Health",
//                         description: "Clean drinking water and waste management.",
//                         goal: 50000
//                 })
//                 project.save()
//                 .then(() => console.log('Project added successfully ...'))
//                 .catch(err => console.log(err));
//                         })
//                         .catch(err => console.log(err));



//Creating a Project


//Adding a Donation to mongoDB
// const Donator = require('./models/donator');
// const Donation = require('./models/donation');
// const donation = new Donation({
//     projectId: "60b80655d637b237a42d6826",
//     projectTitle: 'Trees',
//     donatorId: "60b80655d637b237a42d6826",
//     donatorName: "Zarrouki Soufiane",
//     amount: 500
// });
// donation.save()
//        .then(() => console.log('Donation added successfully ...'))
//        .catch(err => console.log(err));
// Project.findByIdAndUpdate(
//     "60b8a11b43fa9926609fb8f0",
//     {   
//         updatedAt: Date.now(),
//         $inc: {totalDons: 500},
//         $addToSet: { donations: {
//             donatorId: "60b80655d637b237a42d6826",
//             donatorName: 'Zarrouki Soufiane',
//             amount: 500
//         } },
//     },
//     { new: true },
//     (err, docs) => {
//     if (err) console.log(err);
//     else console.log("Donation added to project information : ", docs);
//     }
// );

// const Donor = require('./models/donor');
// const donor = new Donor({
//     name: "Zarrouki Soufiane",
//     email: 'Trees',
// });
// donor.save()
//        .then(() => console.log('Donor added successfully ...'))
//        .catch(err => console.log(err));



