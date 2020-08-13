const md5 = require('md5');
const moment = require('moment');
const nodeFns = require('./node_fns');

module.exports = async (app, db) => {
    app.put('/addNewUser', async (req, res, next) => {
        db.connect();
        let output = {
            status: 'NO',
            content: 'Unable to Create Account'
        };
        let params = ['username', 'password', 'phone', 'dob'];
        let object = {};
        //loop through params and validate all/correct headers are sent and have values
        params.forEach(element => {
            if(req.headers[element] && req.headers[element] != '') {
                //cleanInput when made
                object[element] = req.headers[element];
            } else {
                output.content = 'Missing parameter '+element+' --add new user';
                res.send(output);
                return;
            }
        });
        //md5 password
        object.password = md5(object.password);

        

        //create new token for user validation
        let token = md5(moment() + object.password + object.username);

        //check if username and password have been used before, if so return
        let resultUsersFound = await nodeFns.checkForUser(object.username, object.password, db);
        if(resultUsersFound[0].accounts > 0) {
            output.content = "Invalid Username/Password";
            res.send(output);
            return;
        }

        //get the values from headers object for prepared statement 
        let valuesArr = Object.values(object);
        
        //create mention for user based off username
        valuesArr.push(object.username.split(' ').join(''));

        let sql2 = "INSERT INTO `accounts` (`username`, `password`, `phone`, `dob`, `mention`) VALUES (?,?,?,?,?)";
        db.query(sql2, valuesArr, async (err, data2) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            } else {
                let id = data2.insertId;
                let session = await nodeFns.addSession(object.username, token, id, db);
                output.status = "OK";
                output.content = token
                res.send(output)
                return;
            }
        })
    })
}