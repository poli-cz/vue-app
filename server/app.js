const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs')
const fetch = require('node-fetch');
const app = express();

// mostly logging
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


// endpoint for generating random user
// uses 3rd API
app.get('/get_rand_user', async(req, res) =>{
    let raw_data = await fetch('https://randomuser.me/api/').then(res => res.json())
    let user = raw_data['results'][0]['name']['first']
    res.json({
        rand_name: user
    });
})

// endpoint for registration
app.post('/register', (req, res) =>{

    let register_ok = register_users(req)
    let status = ""

    if(register_ok == true){
        status = "Registered"
    }else{
        status = "User with this username already registered, or some other error ocured"
    }
    res.json({
        status: status
    });
});

// just mock endopint to cover all functions
app.get('/register', (req, res) => {
    res.send("Yes, this is /register endpoint. But use POST next time.")
});

app.get('/get_users', (req, res) => {
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata)['users'];
    res.json({
        users: users
    });
});

app.get('/*', (req, res) => {
    res.send("Yes, this is my backend")
});


// register users, simple open and write JSON to file
function register_users(req){
    let rawdata = fs.readFileSync('users.json');
    let users = JSON.parse(rawdata)['users'];
    let ok_flag = true
    const {username=false} = req.body;

    if(!username){return false}

    users.forEach(user => {
        if(user == username){
            console.log("failed to register, already exists")
            ok_flag = false
        }
    });

    if(ok_flag){
        console.log(users)
        users.push(username)
        let updated_data = JSON.stringify({'users': users});
        fs.writeFileSync('users.json', updated_data);
    }

    return ok_flag
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
