var express = require("express");
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
var fs = require('fs');

var multer = require('multer');
mongoose.connect("mongodb://localhost/medapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
});




var bodyParser = require("body-parser");
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
        extended: true
}));


var medSchema = new mongoose.Schema({
        shopname: String,
        coordinates: [{type: Number}],
        medicines: [{
                type: String
        }],
        images:String,
        address:String,
        // img: 
        //   { data: Buffer, contentType: String },





});

var med = mongoose.model("med", medSchema);



med.create({
        shopname:'Himgiri medical store',
        address:"chehru",
    
        medicines:['avil','aciloc'],
    
        images:"https://static01.nyt.com/images/2019/03/05/opinion/05Fixes-1/05Fixes-1-articleLarge.jpg?quality=75&auto=webp&disable=upscale",
        coordinates:[22.98,67.7914],


});


app.get('/', (req, res) => {

        res.render('index.html');
}).listen(8080)


app.get('/maps', (req, res) => {
        res.render('map.html');
});

// app.get('/find',cors(), function (req, res) {
//     var medi = req.params.query;
//     console.log(medi.name);
//     med.find({
//         'medicines': medi
//     }, function (err, result) {
//         if (err) {
//             console.log(err)
//         };
//         if (result) {
//             console.log(res.medicines);
//         } else {
//             res.send(JSON.stringify({
//                 error: 'Error'
//             }))
//         }
//     })
// });


app.post('/find', cors(), function (req, res) {
        var medi = req.body.name.toLowerCase();
        // console.log(req.body);
        med.find({
                'medicines': medi
        }, function (err, shops) {
                if (err) {
                        console.log(err);
                };
                if (shops) {
                        // res.json(shops[0].shopname);
                        // console.log(result[0].shopname);
                        res.render('shop.html', {
                                shops: shops
                        });
                } else {
                        res.send(JSON.stringify({
                                error: 'Error'
                        }))
                }
        })
});