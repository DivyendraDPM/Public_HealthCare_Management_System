const {spawn} = require('child_process');

module.exports.getPrediction = async(req,res) =>{
  const python = spawn('python',["prediction.py"]);
python.stdout.on('data',(data)=>{
    console.log(`stdout: ${data}`)
  }
);
}
