const checkForUser = async function(username, password, db) {
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