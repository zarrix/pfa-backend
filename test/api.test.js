//importation de mongoose
const mongoose = require('mongoose');
//importation de app
const app = require("../server");
const db = require("../config/keys").mongoURI;
const fs = require("fs");

//import usermodel
Project = require("../models/project")
mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})


var request = require('supertest');

describe("App test",()=>{
    let server;
    //start server;
    before(()=>{
        server = app.listen(5002);
    })
    
    after(function(done) {
        mongoose.disconnect();
        done();
      });
    
    //test Get All projects
    it("can get all projects",async()=>{
        await request(server).get("/api/projects").expect(200)
    })

    //test Get a project by id
    it("can get post by id",async()=>{
        const id="60d5e5cfe8840a0015d70e4b";
        await request(server).get("/api/projects/"+id).expect(200)
    })

    //test Get All donations
    it("can get all projects",async()=>{
        await request(server).get("/api/donations").expect(200)
    })

    //test Get a donation by id
    it("can get post by id",async()=>{
        const id="60e470521e3ce1001577e391";
        await request(server).get("/api/donations/"+id).expect(200)
    })

    //test Get All donors
    it("can get all projects",async()=>{
        await request(server).get("/api/donors").expect(200)
    })

    //test Get a donor by id
    it("can get post by id",async()=>{
        const id="60c67458a479b204c41e52c2";
        await request(server).get("/api/donors/"+id).expect(200)
    })

    //test Get All nurseries
    it("can get all projects",async()=>{
        await request(server).get("/api/nurseries").expect(200)
    })

    //test Get a nursery by id
    it("can get post by id",async()=>{
        const id="60d1f123fb91b42bbcb4ca62";
        await request(server).get("/api/nurseries/"+id).expect(200)
    })

    //test Get All trees
    it("can get all projects",async()=>{
        await request(server).get("/api/trees").expect(200)
    })

    //test Get a tree by id
    it("can get post by id",async()=>{
        const id="60cba321ebc9722110c5e377";
        await request(server).get("/api/trees/"+id).expect(200)
    })
})
