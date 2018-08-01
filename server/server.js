
// var bodyParser = require('body-parser');
var express = require("express");
var path = require('path');

var app = express();

// app.all('*',function (req,res,next) {

//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     // res.header("Content-Type", "application/json;charset=utf-8");

//     next()
// });
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(express.static(__dirname + '/dist/'));
app.use(express.static(__dirname));
// app.get('*', function (req, res){
//     res.setHeader('Content-Type', 'text/html');
//     // res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
//     res.sendFile(path.resolve(__dirname, 'index.html'))
// });

app.get('/index',function(req,res){
    res.json({"state":1})
})

app.post('/upload',function(req,res){
    var file = req.body.file;
    console.log('file',file);
})

// app.post('/api/download',
//     function (req, res) {
//         var file = req.body.file_name;
//         console.log('file',file);

//         res.download('public/files/'+ file + '.pdf', function(err){
//             if (err) {
//                 console.log('err',err);
//                 res.json({state:'99999',info:err});
//                 // Handle error, but keep in mind the response may be partially-sent
//                 // so check res.headersSent
//             } else {
//                 console.log('download success');
//                 // res.json({state:'20000'});
//                 // decrement a download credit, etc.
//             }
//         })
// });


var server = app.listen(5050, '0.0.0.0',function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
})