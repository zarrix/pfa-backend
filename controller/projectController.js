const ObjectId = require("mongoose").Types.ObjectId;

// Models
const Project = require('../models/project');
const Image = require('../models/image');

//Read projects from mongoDB
module.exports.getProjects = (req, res) => {
    let filter = {};
    const sort = req.query.orderby || "updatedAt";
    const asc = (req.query.asc === 'true') ? 1 : -1;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.search) filter.title = new RegExp(req.query.search, "i");
    Project
        .find(filter, (err, docs) => {
            if (err) console.log('Error while reading data : ' + err);
            else res.send(docs)
        })
        .sort( {[sort]: asc} )
        .limit(limit)
        .skip((page - 1) * limit);
}

//Read project by id
module.exports.getProjectById = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).send("Unkown Id : " + req.params.id);
    } else {
        Project
            .findById(req.params.id, (err, docs) => {
                if (err) console.log('Error while reading data : ' + err);
                else res.send(docs);
            })       
    }
}

//create a Project
module.exports.addProject = (req, res) => {
    if (req.file) {       
        if (
            req.file.mimetype != "image/jpg" &&
            req.file.mimetype != "image/png" &&
            req.file.mimetype != "image/jpeg"
        ) return res.status(400).send({"error": "invalid image format"});

        if (req.file.size > 800000) return res.status(400).send({"error": "the file size is bigger than 800Kb"});
        
        
        const image = new Image({
                img: {
                        data: req.file.buffer,
                        contentType: req.file.mimetype
                }
        })

        image.save()
                .then((img) => {
                        console.log('Image added successfully ...');
                        const project = new Project({
                            image: img._id,
                            title: req.body.title,
                            description: req.body.description,
                            goal: req.body.goal,
                            category: req.body.category
                        })
                        project.save()
                        .then(() => {
                            console.log('Project added successfully ...');
                            res.status(201).json(project);
                        })
                        .catch(err => console.log(err));
                });
    } else  {
        res.status(400).send({"error": "No image added"});
    }
        
}

//update a Project
module.exports.updateProject = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Project.findByIdAndUpdate(
            req.params.id,
            {   
                title: req.body.title,
                description: req.body.description,
                goal: req.body.goal,
                category: req.body.category
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Project updated.");
                    res.status(200).send(docs)
                }
            }
        );
    }
}

//delete a project
module.exports.deleteProject = (req,res)=>{
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : ' + req.params.id);
    } 
    else {
        Project.findByIdAndDelete(
            req.params.id, 
            (err, docs) => {
                if (err) res.status(500).send(err.message);
                else {
                    console.log("Project deleted.");
                    res.status(200).send(docs)
                }
            }
        );  
    }  
}

//add an update
module.exports.addUpdate = (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send('Unkown Id : '+req.params.id);
    } 
    else {
        Project.findByIdAndUpdate(
            req.params.id,
            {   
                updatedAt: Date.now(),
                $addToSet: { updates: req.body.update },
            },
            { new: true },
            (err, docs) => {
                if (err) console.log(err);
                else {
                    console.log("Update added to project.")
                    res.status(200).send(docs)
                }
            }
        );
    }
}