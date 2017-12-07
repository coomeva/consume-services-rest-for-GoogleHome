const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    var speech2 = req.body.result.parameters ? req.body.result.parameters : "services datas"
    var speech3 = speech2.number_id;
    var speech4 = speech2.datas;
    
    if(speech3){
        callConsultAssociate(speech3).then((resultado) => {
             var  speech5 = ' ' + resultado;
                return res.json({
                    speech: speech5,
                    displayText: speech5,
                    source: 'rest-for-googlehome'
                });
        });
    }
    if(speech4){
        apinasa(speech4).then((resultado2) => {
            var speech6 = ' ' + resultado2;
         return res.json({
              speech: speech6,
              displayText: speech6,
              source: 'rest-for-googlehome'
          });
       });
    }
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


function apinasa(speech4){
    return new Promise((resol, reje) => {
        var https = require('https');
        var host2 = 'api.nasa.gov';
        var path2 = '/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo';

        https.get({host: host2, path: path2}, (respp) => {
            var body2 = '';
        respp.on('data', (chunk) => {
            body2 += chunk.toString();
        });
        respp.on('end', () => {
            var r = JSON.parse(body2);
            var name2 = r.copyright;            
            let output2 = speech4 + '\n the name of Copyright is: \n' + name2;
                resol(output2);
           });
            respp.on('error', (error) => {
                reje(error);
            });
        });
    });
}

serviceRest.listen((process.env.PORT || 4040), function() {
console.log('server listen in port:' + this.address().port);
});
