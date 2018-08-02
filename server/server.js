
var bodyParser = require('body-parser');
var express = require("express");
var path = require('path');
var fs = require('fs');
var formidable = require("formidable");
var docxConverter = require('docx-pdf');

var app = express();

app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header('Access-Control-Allow-Credentials', true);
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
});
app.use(bodyParser.json());
app.use(express.static(__dirname));


app.post('/upload',function(req,res){
    
    var file = req.body.file;
    var filePath =path.resolve('./files');
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
    }
    var form = new formidable.IncomingForm();
    form.uploadDir = filePath; //设置上传目录
    form.parse(req, function(err, fields, files) {
        if (err) {
            return res.json(err);
        }
        var extName = ''; //后缀名
        var fileName = files.file.name;
        // console.log(files.file)
        switch (files.file.type) {
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                extName = 'docx';
                break;
            case 'application/msword':
                extName = 'doc';
                break;
        }
        if (extName!== 'docx') {
            return  res.sendStatus(500);
        } else {
            var newPath = form.uploadDir + '/' + fileName;
            var newName = fileName.split('.')[0]+'.pdf';
            console.log("new",newPath);
            fs.renameSync(files.file.path, newPath); //重命名
            //sleep(5000);
            docxConverter(newPath,'./files/'+newName,function(err,result){
                if(err){
                  console.log(err);
                  return  res.sendStatus(500);
                }
                console.log('result'+result);
                return res.json({status:'1',file:newName});
            });
        }
    });
})


app.get('/download',
    function (req, res) {
        var file = req.query.file;
        // console.log('file',file);
        res.download('files/'+ file, function(err){
            if (err) {
                console.log('err',err);
                res.json({state:'99999',info:err});
            } else {
                console.log('download success');
            }
        })
});
// function sleep(d){
//     for(var t = Date.now();Date.now() - t <= d;);
//   }
  

var server = app.listen(5050, '0.0.0.0',function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);
})