// include express server like php
let express = require('express');
let getFetch = require('./repo/dataFetch')
let app = express();

// Use the express Router object
let router = express.Router();

// configure middleware support JSON data parsin in req object
app.use(express.json());


// Create GET to return a list of all pies
router.get('/', (req, res, next) => {
   getFetch.get((data) => {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Bitch Entered",
            "data": data
        }); 
   }, (err) => {
       next(err);
   })
});

//search 
router.get('/search', (req, res, next) => {
    let query = {
        "id": req.query.id,
        "name": req.query.name
    };

    getFetch.search(query, (data) => {
         res.status(200).json({
             "status": 200,
             "statusText": "OK",
             "message": "Search Found",
             "data": data
         }); 
    }, (err) => {
        next(err);
    })
 });


// Get by ID
router.get('/:id', (req, res, next) => {
    getFetch.getById(req.params.id ,(data) => {
         if(data){
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Bitch Entered",
                "data": data
            }); 
         }
         else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not FOund",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                "error": {
                "code": "NOT_FOUD",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                }
            }); 
         }
    }, (err) => {
        next(err);
    })
 });

//  post || insert Item
router.post('/', (req, res, next) => {
    getFetch.insert(req.body, (data) => {
         res.status(201).json({
             "status": 201,
             "statusText": "Created",
             "message": "New Stufss Added",
             "data": data
         }); 
    }, (err) => {
        next(err);
    })
 });

//  PUT + id
router.put('/:id', (req, res, next) => {
    getFetch.getById(req.params.id ,(data) => {
        if(data){
            getFetch.update(req.body, req.params.id, (data) => {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "New Stufss Added",
                    "data": data
                }); 
           }, (err) => {
               next(err);
           })
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not FOund",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                "error": {
                "code": "NOT_FOUD",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                }
            });
        }
    });     
 });


//  delete shit
router.delete('/:id', (req, res, next) => {
    getFetch.getById(req.params.id ,(data) => {
        if(data){
            getFetch.delete( req.params.id, (data) => {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Deleted",
                    "message": "deleted",
                    "data": data
                }); 
           }, (err) => {
               next(err);
           })
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not FOund",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                "error": {
                "code": "NOT_FOUD",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                }
            });
        }
    });     
 });


//  patch
router.patch('/:id', (req, res, next) => {
    getFetch.getById(req.params.id ,(data) => {
        if(data){
            getFetch.update(req.body, req.params.id, (data) => {
                res.status(201).json({
                    "status": 201,
                    "statusText": "Created",
                    "message": "New Stufss Added",
                    "data": data
                }); 
           }, (err) => {
               next(err);
           })
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not FOund",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                "error": {
                "code": "NOT_FOUD",
                "message": "Cannot FInd id => ("+req.params.id+") bitch",
                }
            });
        }
    });     
 });



// Error Objects
const errorObjects = (err) => {
    return {
        "status": 500,
        "statusText": "Internal Server Error",
        "message": err.message,
        "error": {
            "errno": err.errno,
            "call": err.syscall,
            "code": "INTERNAL_SERVER_ERROR",
            "message": err.message
        }
    }
}


// configure router so all routes are prefixed with /api/v1
app.use('/api/', router);
app.use(express.json());

// configure exception logger
app.use((err, req, res, next) => {
    console.log(errorObjects(err));
    next(err)
});



//  custom error handler
// configure exception middleware last
app.use((err, req, res, next) => {
    res.status(500).json(errorObjects(err));
});

// create server to listen on port 5000
var server = app.listen(5000, () => {
    console.log('Node server is running on http://localhost:5000.....')
});