const app = require('express')();
let connection = require('../databaseHelper/mongodb.helper.js');
const _PORT = 3000;


/*
This endpoint returns the data with timestamp started from 'start' to 'finish
URL: /getManyFromTimestamp?start=.....&finish=.....
 */
app.get("/getManyFromTimestamp",async (req,res) => {
    const start = parseInt(req.query.start,10);
    const finish = parseInt(req.query.start,10);
    await connection.selectManyFromTimestamp(start, finish)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(200).send(error);
        });
});

/*
This endpoint returns the data with timestamp into the array value
URL: /getManyFromTimestamp?value=first,second,third,....
 */
app.get("/getManyFromTimestampValue", async (req,res) => {
    const value = req.query.value.split(',').map(function(item) {
        return parseInt(item, 10);
    });
    await connection.selectManyFromTimestampValues(value)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(200).send(error);
        });
});

/*
This endpoint returns the data with a certain id
URL: /getManyFromTimestamp?id=...
 */
app.get("/getFromId", async (req,res) => {
    const id = parseInt(req.query.id);
    await connection.selectFromID(id)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(200).send(error);
        });
});

/*
This endpoint returns the data with a certain timestamp
URL: /getManyFromTimestamp?timestamp=...
 */
app.get("/getTimestamp", async (req,res) => {
    const timestamp = parseInt(req.query.timestamp);
    await connection.selectFromTimestamp(timestamp)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(200).send(error);
        });
});
/*
This endpoint inserts data into the db
URL: /insert?data=....
 *//*
app.get("/insert",async (req,res) => {
    const json = req.query.data;
    await connection.insertAll(json)
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((error) => {
            return res.status(200).send(error);
        });
});*/

app.listen(3000, async () => {
    console.log("Server online...");
    await connection.connect()
        .then((result) => console.log(result))
        .catch((error) => console.log("Connection error -> " + error));
});

