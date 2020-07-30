// const md5 = require('md5');

module.exports = async (app, db) => {
    app.put('/add_new_user', (req, res, next) => {
        db.connect(() => {
        let output = {
            status: 'NO',
            content: undefined
        };

        let {username,phone,dob,password} = req.body;
        // password = md5(password);

        let resultUsersFound = checkForUser(username, password);

        resultUsersFound.then(JSON.parse, err).then(result => {
            console.log(result);
        }, err)
        

        })
    })
};

const checkForUser = (username, password) => {
    return new Promise((resolve, reject) => {
        let sql = "SELECT COUNT(*) FROM `accounts` WHERE `username` = ? AND `password` = ?";
        db.query(sql, [username, password], (err, data) => {
            if(err) {
                console.log('err: '+err)
                reject(err)
            } else {
                console.log('body: '+body)
                resolve(body);
            }
        })
    })
};

// if(data.length > 0) {
//     output.content = "Invalid Username/Password Provided";
//     return output
// } else {
//     output.status = "OK";
//     output.content = true;
//     return output;
// }