const moment = require('moment');

const checkForUser = async (username, password, db) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT COUNT(*) AS `accounts` FROM `accounts` WHERE `username` = ? AND `password` = ?";
        db.query(sql, [username, password], (err, data) => {
            if(err) {
                reject(err);
                return;
            } else {
                resolve(data);
            }
        })
    })
};
module.exports.checkForUser = checkForUser


const addSession = async (username, token, db) => {
    return new Promise((resolve, reject) => {
        let output = {
            status: 'NO',
            content: 'Error add users',
        }
        let currentMoment = moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        let valuesArr = [username, token, currentMoment]
        let sql = "INSERT INTO `session` (`username`, `token`, `expiration`) VALUES (?,?,?)";
        db.query(sql, valuesArr, (err, data) => {
            if(err) {
                reject(err)
            } else {
                output.status = 'NO';
                output.content = 'Error add users',
                resolve(output);
            }
        })
        output.content = currentMoment;
        return output;
    })
}
module.exports.addSession = addSession



const updateSession = async (token, db) => {
    return new Promise((resolve, reject) => {
        let currentMoment = moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        let sql = "UPDATE `session` SET `expiration` = ? WHERE `token` = ?";
        let valuesArr = [currentMoment, token];
        db.query(sql, valuesArr, (err, data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}
module.exports.updateSession = updateSession




// const cleanInput = () => {

// }












































// const md5 = require('md5');
// const nodeFns = require('./node_fns');

// module.exports = async (app, db) => {
//     app.put('/add_new_user', async (req, res, next) => {
//         db.connect() 
//         let output = {
//             status: 'NO',
//             content: 'Unable to Create Account'
//         };
//         let params = ['username', 'password', 'phone', 'dob'];
//         let object = {};
//         //loop through params and validate all/correct headers are sent and have values
//         params.forEach(element => {
//             if(req.headers[element] && req.headers[element] != '') {
//                 //cleanInput when made
//                 object[element] = req.headers[element];
//             } else {
//                 output.content = 'Missing parameter '+element+' --add new user';
//                 res.send(output);
//                 return;
//             }
//         });
//         //md5 password
//         object.password = md5(object.password);

//         //check if username and password have been used before, if so return
//         let resultUsersFound = await nodeFns.checkForUser(object.username, object.password, db);
//         if(resultUsersFound[0].accounts > 0) {
//             output.content = "Invalid Username/Password";
//             res.send(output);
//             return;
//         }

//         //get the values from headers object for prepared statement 
//         let valuesArr = Object.values(object)
//         let sql2 = "INSERT INTO `accounts` (`username`, `password`, `phone`, `dob`) VALUES (?,?,?,?)";
//         db.query(sql2, valuesArr, async (err, data2) => {
//             if(err) {
//                 console.log(err);
//                 res.send(err);
//                 return;
//             } else {
//                 //get insert id from insert query and send it to 
//                 // let insertID = data2.insertId

//                 //create new token for user validation
//                 let token = md5(moment() + object.password + object.username);

//                 //update session, check if successful send back response
//                 let session = await nodeFns.addSession(object.username, insertID, token);
//                 if(session.status == 'OK') {
//                     output.status = "OK";
//                     output.content = "Successfully Added Account!";
//                     res.send(output);
//                     return;
//                 } else {
//                     output.content = session.content;
//                     res.send(output);
//                     return;
//                 }
                
//             }
//         })
//     })
// }