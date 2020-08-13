const md5 = require('md5');
const moment = require('moment');
const nodeFns = require('./node_fns');
const { user } = require('./mysql_creds');


module.exports = async (app, db) => {
    app.get('/getUserAccountData', async (req, res) => {
        db.connect();
        let params = ['token'];
        let object = {};
        let output = {
            status: 'NO',
            content: ''
        }

        //loop through params and validate all/correct headers are sent and have values
        params.forEach(element => {
            if(req.headers[element] && req.headers[element] != '') {
                //cleanInput
                object[element] = req.headers[element];
            } else {
                output.content = 'Missing parameter '+element+' --get user account info';
                res.send(output);
                return;
            }
        });

        //Validate token
        let isTokenValid = await nodeFns.auth(object.token, db);
        if(!isTokenValid) {
            output.content = 'Invalid Token';
            res.send(output);
            return;
        }

        let userID = isTokenValid;
        let sql = "SELECT `username`, `password` FROM `accounts` WHERE `id` = '?'";
        db.query(sql, [userID], (err, data) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            }

            //set username, password to variables to be user in next query
            let username = data[0].username;
            let password = data[0].password;

            //get the users information
            let sql = "SELECT `id`, `username`, `phone`, `dob`, `bio`, `mention`, IFNULL((SELECT `token` FROM `session` WHERE `username` = ?), 'NONE') AS `token` FROM `accounts` WHERE `username` = ? AND `password` = ?";
            let valuesArr = [username, username, password];
            db.query(sql, valuesArr, async (err, data) => {
                if(err) {
                    console.log(err)
                    res.send(err);
                    return;
                } 

                data[0].dob = moment(data[0].dob).format('YYYY-MM-DD');
                let content = data[0];
                //check if token is default value from query
                if(content.token === 'NONE') {
                    //create new token for user validation
                    let token = md5(moment() + object.password + object.username);
                    content.token = token;
                    //add new session of user
                    let session = await nodeFns.addSession(content.username, token, content.id, db)
                } else {
                    //update session of user
                    let session = await nodeFns.updateSession(content.token, db);
                }
                output.content = content;
                output.status = 'OK';
                res.send(output);
            })
        })
    })
}

