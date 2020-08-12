const moment = require('moment');
const { response } = require('express');

const auth = async  (token, db) => {
    return Promise((resolve, reject) => {
        let sql = "SELECT `expiration` FROM `session` WHERE `token` = ?";
        db.query(sql, token, (err, data) => {
            if(err) {
                reject(err);
                return;
            }

            let expiration = moment(data[0].expiration);
            let currentMoment = moment();
            if(expiration > currentMoment) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

const getAccountInfo = (username, password, db) => {
    return new Promise((resolve, reject) => {
        let sql2 = "SELECT `username`, `phone`, `dob`, `bio`, `mention`, IFNULL((SELECT `token` FROM `session` WHERE `username` = ?), 'NONE') AS `token` FROM `accounts` WHERE `username` = ? AND `password` = ?";
        let valuesArr = [username, username, password];
        db.query(sql2, valuesArr, async (err, data) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            } else {
                data[0].dob = moment(data[0].dob).format('YYYY-MM-DD');
                let content = data[0];
                //check if token is default value from query
                // if(content.token === 'NONE') {
                //     //create new token for user validation
                //     let token = md5(moment() + object.password + object.username);
                //     content.token = token;
                //     //add new session of user
                //     let session = await nodeFns.addSession(content.username, token, db)
                // } else {
                //     //update session of user
                //     let session = await nodeFns.updateSession(content.token, db);
                // }
                // output.content = content;
                // output.status = 'OK';
                // res.send(output);
            }
        })
    })
}
module.exports.getAccountInfo = getAccountInfo;

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

function validID(table,col,id,db){
    return new Promise((resolve, reject) => {
        let sql = "SELECT COUNT(*) as 'count' FROM `?` WHERE `?` = '?'";
        let valuesArr = [table, col, id];
        db.query(sql, valuesArr, (err, data) => {
            if(err) {
                reject(err)
            } 

            // let response = col+" Not found. Invalid "+table+" "+col;
            let response = false;
            if(data[0].count == 0) {
                resolve(response);
            } else {
                response = true;
                resolve(response);
            }
        })
    })
}
