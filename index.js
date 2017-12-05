const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    var speech3 = " ";
    switch(req.body.result.parameters.toLowerCase()){
        case "number_id":
            callConsultAssociate(speech).then((resultado) => {
               speech3 = ' ' + resultado;
            });
        break;
        case "datas":
            speech3 = "rest consume services";
        break;
    }
    
    return res.json({
        speech: speech3,
        displayText: speech3,
        source: 'rest-for-googlehome'
    });
}

function callConsultAssociate(speech){
    return new Promise((resolve, reject) => {
        var http = require('http');
        var host = 'ec2-184-73-133-117.compute-1.amazonaws.com';
        var port = '8080';
        var path = '/consultacedula/services/rest/' + speech;

        http.get({host: host, port: port, path: path}, (resp) =>{
            var body = '';
            resp.on('data', (d) => { 
                body += d.toString();
            });
            resp.on('end', () => {
                var respone = JSON.parse(body);
                var name = respone.nameClient;            
                let output = 'welcome \n' + name + ' \n Coomeva closer to you ';
                resolve(output);
            });
            resp.on('error', (error) => {
                reject(error);
            });
        });
    });
}

serviceRest.listen((process.env.PORT || 4040), function() {
console.log('server listen in port:' + this.address().port);
});
