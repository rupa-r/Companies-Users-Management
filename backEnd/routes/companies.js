const dbObject = require('../database/db.js');
const ObjectID = dbObject.ObjectID;
const crypto = require('crypto');
const cors = require("cors"); 
const { default: axios } = require('axios');

const googleMapsClient = require('@googlemaps/google-maps-services-js').Client;

module.exports = function(params) {
    var app = params.app;

    var corsOptions = {
        origin: ['http://localhost:4200']
    }
    app.use(cors(corsOptions));
    // app.options('*', cors());

    // API route for geocoding

    app.get('/api/geocode', (req, res) => {
        const address = req.body.address;
        const client = new googleMapsClient();
        client.geocode({
            params: {
            address: address,
            key: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with your own API key
            }
        });
    })

    // POST
        
    app.post('/api/companyinsert',async (req,res)=>{
        // const address = '1600 Amphitheatre Parkway, Mountain View, CA';
        
        let database = await dbObject.getDatabase();
        let collection = database.collection('companies');

        const companyId = 'company_' + crypto.randomBytes(5).toString('hex');
        const companyAddress = req.body.companyaddress;
        const companyName = req.body.companyname;

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(companyAddress)}&format=json`;

        const response = await axios.get(url);
        
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const companyCoordinates = [{ latitude: lat, longitude: lon }];
            
            const company = {
                companyid : companyId,
                companyname : companyName,
                companyaddress : companyAddress,
                companycoordinates : companyCoordinates,
            };
    
            await collection.insertOne(company);
    
            const cursor = collection.find();
            let companies = await cursor.toArray();
                    
            res.json({success : true , message : [companies]},201);
        } 
        
    });


    // gET all companies
    app.get('/api/companyget', async (req,res)=>{
        let database = await dbObject.getDatabase();
        const collection = database.collection('companies');
        const cursor = collection.find();
        let companies = await cursor.toArray();

        let message = '';

        res.json({success : true , message : companies},201);

    });

    // get by companies id
    app.get('/api/companyid/:companyid', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('companies');
        const companyId = req.params.companyid;
        
        let cursor = collection.find({ companyid : companyId });
        let keys = await cursor.toArray();
        res.json({sucess : true, message : keys}, 200);
        
    });


    // get by companies _id
    app.get('/api/company/:id', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('companies');
        let id = req.params.id;
        let cursor = collection.find({ _id: new ObjectID(id) });
        let keys = await cursor.toArray();
        res.json({sucess : true, message : keys}, 200);
    });

    // PUT
    app.put('/api/companyupdate/:_iid', async(req,res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('companies');

        let id = req.params._iid;

        const companyName = req.body.companyname;
        const companyAddress = req.body.companyaddress;

        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(companyAddress)}&format=json`;

        const response = await axios.get(url);

        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            const companyCoordinates = [{ latitude: lat, longitude: lon }];

            let update_employee = {
                companyname : companyName,
                companyaddress : companyAddress,
                companycoordinates : companyCoordinates,
            };

            await collection.updateOne({ _id: new ObjectID(id) }, { $set: update_employee });

            const cursors = collection.find();
            let employees = await cursors.toArray();

            res.json({success : true , message : employees},201);
        }
    })

    // DELETE
    app.delete('/api/companydelete/:id', async(req, res)=>{
        let database = await dbObject.getDatabase();
        let collection = database.collection('companies');
            
        const id = req.params.id;
        
        await collection.deleteOne({_id: new ObjectID(id)});
        
        const cursor = collection.find();
        let employees = await cursor.toArray();
            
        res.json({success : true, message : employees}, 200);
    });

};