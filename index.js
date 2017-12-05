const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    
    var user2 = req.body.result.parameters.numberID ? req.body.result.parameters.numberID : "consume services"
    
    return res.json({
      speech: user2,
      displayText: user2,
      source: 'rest-for-googlehome'
    });
});

serviceRest.listen((process.env.PORT || 4040), function() {
console.log('server listen in port:' + this.address().port);
});
