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
