var bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
var express = require('express')
const { spawn } = require('child_process');
var app = express()
const port = 3000

app.get('/:key/:coin', (req, res)=>{
    let preset = req.query.format ? req.query.format : null
    let include = req.query.include ? req.query.include : 'address,path'
    var cmd = ["-g", "--key=" + req.params.key, "--coin="+req.params.coin, "--numderive=1"]
    if (preset) {
        cmd.push('--preset=' + preset)
    }
    cmd.push("--cols="+include)
    executeCommand(cmd, (data)=>{
        let parsedData;
        try {parsedData = JSON.parse(data)} catch(err){
            return res.json({success: false, msg: data})
        }
        return res.json(JSON.parse(data));
    });
})

app.get('/formats', (req, res)=>{
    var cmd = ["--help-presets"]
    executeCommand(cmd, (data)=>{
        res.json(JSON.parse(data));
    });
})

app.listen(port, () => console.log(`listening on port ${port}!`))

function executeCommand(cmd, cb) {
    cmd.push("--format=jsonpretty")
    var _spawn = spawn("./hd-wallet-derive.php", cmd);
    let data = "";
    _spawn.stdout.on('data', function (msg) {
        data = data + msg.toString();
    });

    _spawn.stdout.on('end', function () {
        return cb(data)
    });
}
