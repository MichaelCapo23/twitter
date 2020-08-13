const moment = require('moment');
const { response } = require('express');

const auth = async (token, db) => {
    return new Promise(async (resolve, reject)  => {
        let sessionRows = await validIDSession(token, db);
        if(!sessionRows) {
            resolve(false);
        }
        let sql = "SELECT `account_id`, `expiration` FROM `session` WHERE `token` = ?";
        db.query(sql, token, (err, data) => {
            if(err) {
                reject(err);
                return;
            }

            let expiration = moment(data[0].expiration);
            let currentMoment = moment();

            if(currentMoment > expiration) {
                resolve(false);
            } else {
                resolve(data[0].account_id);
            }
        })
    })
}
module.exports.auth = auth;


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


const addSession = async (username, token, id, db) => {
    return new Promise((resolve, reject) => {
        let output = {
            status: 'NO',
            content: 'Error add users',
        }
        let currentMoment = moment().add(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        let valuesArr = [username, token, currentMoment, id]
        let sql = "INSERT INTO `session` (`username`, `token`, `expiration`, `account_id`) VALUES (?,?,?,?)";
        db.query(sql, valuesArr, (err, data) => {
            if(err) {
                reject(err)
            } else {
                output.status = 'NO';
                output.content = 'Error add users',
                resolve(output);
            }
        })
        output.content = currentMoment
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

const validIDSession = async (token,db) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT COUNT(*) AS `count` FROM `session` WHERE `token` = ?";
        let valuesArr = [token];
        db.query(sql, valuesArr, (err, countData) => {
            if(err) {
                console.log(err)
                reject(err);
            } else {
                let response = false;
                if(countData[0].count == 1) {
                    response = true;
                }
                resolve(response);
            }
           
        })
    })
}
module.exports.validIDSession = validIDSession