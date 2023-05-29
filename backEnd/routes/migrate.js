const dbObject = require('../database/db.js');
const cors = require("cors"); 
const ObjectID = dbObject.ObjectID;
const axios = require('axios');

module.exports = function(params) {
    var app = params.app;

    var corsOptions = {
        origin: ['http://localhost:4200']
    }
    app.use(cors(corsOptions));
    // app.options('*', cors());

    // PUT
    app.put('/api/migrateuser/:id', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');

        let id = req.params.id;

        const companyId = req.body.companyid;

        let update_employee = {
            companyid : companyId
        };

        await collection.updateOne({ _id: new ObjectID(id) }, { $set: update_employee });

        const cursors = collection.find();
        let employees = await cursors.toArray();

        res.json({success : true , message : employees},201);

    })

    app.get('/geocode', (req, res) => {
        const address = req.query.address;
        const apiKey = 'AIzaSyAwJdLJZbDzYjFgms4kyFejPnPGfIAHYOU'; // Replace with your actual API key
      
        app.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`,(req,res)=>{
            res.json({success : true , message : res},201);
        })

    });
      
};