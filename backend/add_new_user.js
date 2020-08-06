const md5 = require('md5');
const checkForUser = require('./node_fns').checkForUser;

module.exports = async (app, db) => {
    app.put('/add_new_user', async (req, res, next) => {
        db.connect() 
        let output = {
            status: 'NO',
            content: 'Unable to Create Account'
        };

        let {username,phone,dob,password} = req.headers;
        password = md5(password);
        let resultUsersFound = await checkForUser(username, password, db);
        if(resultUsersFound[0].accounts > 0) {
            output.content = "Invalid Username/Password";
            res.send(output);
            return;
        }

        let sql2 = "INSERT INTO `accounts` (`username`, `phone`, `dob`, `password`) VALUES (?,?,?,?)";
        db.query(sql2, [username,phone,dob,password], (err, data2) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            } else {
                output.status = "OK";
                output.content = "Successfully Added Account!";
                res.send(output);
                return;
            }
        })
    })
}




