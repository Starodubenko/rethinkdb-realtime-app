var http = require('http');

var interval = 1000;
var count = 10;

const options = {
    hostname: 'localhost',
    port: 8181,
    path: '/api/timeseries/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
};

function generateRandomValue() {
    return JSON.stringify({
        'value': Math.round(Math.random() * 100)
      });
}

for (var i = 0; i < count; i ++){
    setTimeout(function() {
        var req = http.request(options, (res) => {
            console.log('Data have been sent succesfully');
        });
        req.write(generateRandomValue());
        req.end();
    }, interval * i)
}