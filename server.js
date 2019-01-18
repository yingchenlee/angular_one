var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require("mongoose")
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
//app.set('views', path.join(__dirname, './views'));
app.use(express.static( __dirname + '/public/dist/public' ));

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const TaskSchema = new mongoose.Schema({
    title: {type: String},
    time: {type:String}
})
var Task = mongoose.model("Task", TaskSchema);

app.get('/', (req, res)=> {
    res.render("index.html")
})
app.post('/task', function(req, res) {
    var newtask = new Task(req.body);
    newtask.save(function(err, newtask) {
        if(err) {
            res.json({msg: "Error"})
        } else {
            res.json({msg: "Success", task:newtask})
        }
    })
})

app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks) { //tasks: query result
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
        res.json({message: "Success", data: tasks})
        }
    })
})

app.put('/task/:id', (req,res)=> {
    Task.findById(req.params.id, (err, task) => {  //new 
        if(err){

        } else {

        }
    })
})

app.put('/task/:id', (req,res)=> {
    console.log(req.body);
    Task.updateOne({_id: req.params.id}, {$set: {title: req.body}}, { new: true }, (err, feedback) => {
        if(err){
            console.log("Failed to update");
        } else {
            res.json({message: "working", info: feedback})
        }
    })
})

app.delete('/task/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id);
    res.json({message: "Successfully deleted."})
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})