const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    var speech2 = req.body.result.parameters ? req.body.result.parameters : "services datas"
    var speech3 = speech2.number_id;
    var speech4 = speech2.datas;
    
        callConsultAssociate(speech3).then((resultado) => {
             var  speech5 = ' ' + resultado;
                return res.json({
                    speech: speech5,
                    displayText: speech5,
                    source: 'rest-for-googlehome'
                });
        });
    
     return res.json({
          speech: speech4,
          displayText: speech4,
          source: 'rest-for-googlehome'
      });
});

function callConsultAssociate(speech5){
    return new Promise((resolve, reject) => {
        var http = require('http');
        var host = 'ec2-184-73-133-117.compute-1.amazonaws.com';
        var port = '8080';
        var path = '/consultacedula/services/rest/' + speech5;

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
