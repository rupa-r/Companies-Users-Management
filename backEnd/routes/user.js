const dbObject = require('../database/db.js');
const ObjectID = dbObject.ObjectID;
const crypto = require('crypto');
const cors = require("cors"); 

module.exports = function(params) {
    var app = params.app;

    var corsOptions = {
        origin: ['http://localhost:4200']
    }
    app.use(cors(corsOptions));
    // app.options('*', cors());

    // POST
    app.post('/api/userinsert',async (req,res)=>{

        let database = await dbObject.getDatabase();
        let collection = database.collection('users');

        
        const usercompanyId = req.body.companyid;
        const userId = 'user_' + crypto.randomBytes(5).toString('hex');
        const userfristName = req.body.fristname;
        const userlastName = req.body.lastname;
        const userEmail = req.body.email;
        const userDesignation = req.body.designation;
        const userDob = req.body.dob;
        const userStatus = "Active";
        
        const user = {
            companyid : usercompanyId,
            userid : userId,
            fristname : userfristName,
            lastname : userlastName,
            email : userEmail,
            designation : userDesignation,
            dob : userDob,
            status : userStatus,
        };

        await collection.insertOne(user);

        const cursor = collection.find();
        let employees = await cursor.toArray();
                
        res.json({success : true , message : [employees]},201);
        
    });


    // gET all user
    app.get('/api/userget', async (req,res)=>{
        let database = await dbObject.getDatabase();
        const collection = database.collection('users');
        const cursor = collection.find();
        let employees = await cursor.toArray();

        let message = '';

        res.json({success : true , message : employees},201);

    });

    // get by company id
    app.get('/api/user/:companyid', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');
        const companyId = req.params.companyid;
        
        let cursor = collection.find({ companyid : companyId });
        let keys = await cursor.toArray();
        res.json({sucess : true, message : keys}, 200);
        
    });

    // get by user id
    app.get('/api/userid/:userid', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');
        const userId = req.params.userid;
    
        let cursor = collection.find({ userid : userId });
        let keys = await cursor.toArray();
        res.json({sucess : true, message : keys}, 200);
    
    });

    // get by user _id
    app.get('/api/useriid/:_id', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');
        const id = req.params._id;
        
        let cursor = collection.find({ _id: new ObjectID(id) });
        let keys = await cursor.toArray();
        res.json({sucess : true, message : keys}, 200);
        
    });

    // PUT
    app.put('/api/userupdate/:id', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');

        let id = req.params.id;

        const userfristName = req.body.fristname;
        const userlastName = req.body.lastname;
        const userEmail = req.body.email;
        const userDesignation = req.body.designation;
        const userDob = req.body.dob;

        let update_employee = {
            fristname : userfristName,
            lastname : userlastName,
            email : userEmail,
            designation : userDesignation,
            dob : userDob
        };

        await collection.updateOne({ _id: new ObjectID(id) }, { $set: update_employee });

        const cursors = collection.find();
        let employees = await cursors.toArray();

        res.json({success : true , message : employees},201);

    })

    // PUT
    app.put('/api/userdeactive/:id', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');
    
        let id = req.params.id;
    
        const userStatus = req.body.status;
    
        let update_employee = {
            status : userStatus
        };
    
        await collection.updateOne({ _id: new ObjectID(id) }, { $set: update_employee });
    
        const cursors = collection.find();
        let employees = await cursors.toArray();
    
        res.json({success : true , message : employees},201);
    
    })

    // DELETE
    app.delete('/api/userdelete/:id', async(req, res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('users');
        
        const id = req.params.id;
        
        await collection.deleteOne({_id: new ObjectID(id)});
        
        const cursor = collection.find();
        let employees = await cursor.toArray();
        
        res.json({success : true, message : employees}, 200);
    });

};