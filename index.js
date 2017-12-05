const express = require('express');
const bodyParser = require('body-parser');

const serviceRest = express();

serviceRest.use(bodyParser.urlencoded({ extended: true }));
serviceRest.use(bodyParser.json());

serviceRest.post('/RestHome', function(req, res) {
    var data = 'Consume rest services'
    
    return res.json({
      speech: data,
      displayText: data,
      source: 'rest-for-googlehome'
    });
});

serviceRest.listen((process.env.PORT || 4040), function() {
console.log('server listen in port:' + this.address().port);
});
