var request = require('request');
var cmd = require('node-cmd');
const geoip = (callback) => {
    request({
        url: 'https://ipinfo.io/ip',
        json: true
    }, (err, data) => {

        if (!err) {
            callback(undefined, {
                ip: data.body
            });
        } else {
            callback(err, undefined);
        }
    });


}

const geoloc = (ip, callback) => {

    const urlip = 'https://ipvigilante.com/' + ip;
    // console.log(urlip);
    request({
        url: urlip,
        json: true
    }, (err, res) => {

        if (!err) {
            callback(undefined, res.body.data);
        }

    });

}
module.exports=geoip;
geoip((err, res) => {
    console.log(res.ip);
    var ip = res.ip;

    geoloc(ip, (err, res) => {

        console.log(res.latitude);
        console.log(res.longitude);

    });

});