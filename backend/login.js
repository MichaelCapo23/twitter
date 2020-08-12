const md5 = require('md5');
const moment = require('moment');
const nodeFns = require('./node_fns');

module.exports = async (app, db) => {
    app.get('/loginUser', async (req, res) => {
        db.connect();
        let output = {
            status: 'NO',
            content: ''
        }
        let params = ['username', 'password'];
        let object = {};

        //loop through params and validate all/correct headers are sent and have values
        params.forEach(element => {
            if(req.headers[element] && req.headers[element] != '') {
                //cleanInput
                object[element] = req.headers[element];
            } else {
                output.content = 'Missing parameter '+element+' --login';
                res.send(output);
                return;
            }
        });

        //md5 decode password
        object.password = md5(object.password);

        //check if username and password have exactly one row 
        let resultUsersFound = await nodeFns.checkForUser(object.username, object.password, db);
        if(resultUsersFound[0].accounts != 1) {
            output.content = "Invalid Username/Password";
            res.send(output);
            return;
        }

        //break out values, add extra username to array for sub query
        let valuesArr = Object.values(object);
        valuesArr.splice(0, 0, object.username);

        //get account information, possibly the token if user has a row in session table        
        let sql2 = "SELECT `username`, `phone`, `dob`, `bio`, `mention`, IFNULL((SELECT `token` FROM `session` WHERE `username` = ?), 'NONE') AS `token` FROM `accounts` WHERE `username` = ? AND `password` = ?";
        db.query(sql2, valuesArr, async (err, data) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            } else {
                data[0].dob = moment(data[0].dob).format('YYYY-MM-DD');
                let content = data[0];
                //check if token is default value from query
                if(content.token === 'NONE') {
                    //create new token for user validation
                    let token = md5(moment() + object.password + object.username);
                    content.token = token;
                    //add new session of user
                    let session = await nodeFns.addSession(content.username, token, db)
                } else {
                    //update session of user
                    let session = await nodeFns.updateSession(content.token, db);
                }
                output.content = content;
                output.status = 'OK';
                res.send(output);
            }
        })
    })
}