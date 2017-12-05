const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    
    var respos = req.body.result.parameters.datas ? req.body.result.parameters.datas : "rest services uti"
    var speech = req.body.result.parameters.number_id ? req.body.result.parameters.number_id : "consume services"
    
    if(speech){
       callConsultAssociate(speech).then((resultado) => {
          var speech2 = ' ' + resultado;
             return res.json({
                speech: speech2,
                displayText: speech2,
                source: 'rest-for-googlehome'
             });
        });
     }else         
     if(respos){
        return res.json({
          speech: respos,
          displayText: respos,
          source: 'rest-for-googlehome'
        });
     }
});
    
 

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
