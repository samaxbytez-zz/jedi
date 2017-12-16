const express = require('express');
const rp = require('request-promise')
const jedi = require('json2csv');
const fs = require('fs');
const app = express();

// Fields require for the CSV
var fields = ['car', 'price', 'color'];

// Get data from the transaction endpoint using request-promise


var options = {
    uri: 'https://api.github.com/user/repos',
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (repos) {
        console.log('User has %d repos', repos.length);
    })
    .catch(function (err) {
        // API call failed...
        console.log(err);
    });


var myCars = [
    {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
    }, {
        "car": "BMW",
        "price": 35000,
        "color": "black"
    }, {
        "car": "Porsche",
        "price": 60000,
        "color": "green"
    }
];


var csv = jedi({ data: myCars, fields: fields });

fs.writeFile('file.csv', csv, function (err) {
    if (err) throw err;
    console.log('file saved');
});

// Create server
const server = app.listen(3000, () => {
    console.log("Server is connected to PORT", server.address().port);
})