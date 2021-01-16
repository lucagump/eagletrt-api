"use strict";
// var mongoose = require('mongoose');                     
// require('../models/database.ts');				
// const dbuser = process.env.DB_USER;
// const dbpassword = process.env.DB_PASSWORD;
// const address = process.env.DB_ADDRESS;
// const dbport = process.env.DB_PORT;
// const dbname = process.env.DB_NAME;
// // Documentation
// // https://mongoosejs.com/
// // URL on which the DB is stored
// const url = "mongodb://" + dbuser + ":" + dbpassword + "@" + address + ":" + dbport + "/" + dbname;
// // MongoDb and Express Config
// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// };
// // Set up mongoose connection
// mongoose.connect(url,options,
// 	function (err) {
// 		if (err)
// 			console.log("DB error: " + err);
// 		else
//             console.log('\n\n\x1b[33m%s\x1b[0m', url);
// 	});     
// var User = mongoose.model('Users');
// module.exports = {
//     getUsers: async function(req, res) {
//         User.find({},
//             function(err, users) {
//                 if (err){
//                     console.log(err)
//                     return res.status(500).send({
//                         status: 'fail',
//                         statusCode: 500,
//                         errorMessage: 'User couldn\'t not be found'
//                       })
//                 }
//                 if(users != null){
//                     return res.status(200).send({
//                         status: 'success',
//                         statusCode: 200,
//                         data: users
//                       })
//                 } else {
//                     return res.status(404).send({
//                         status: 'fail',
//                         statusCode: 404,
//                         errorMessage: 'Users couldn\'t be found, please try again later'
//                     })
//                 }
//             }
//         )
//     }
// }
