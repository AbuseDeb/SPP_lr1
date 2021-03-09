//json и прочее
const bodyParser = require("body-parser");
const fs = require("fs");
const express = require("express");
const hbs = require("hbs");
const multer  = require("multer");

const jsonParser = express.json();


const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});

const filePath = "tasks.json";

app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));

app.set("view options", {layout: "/layouts/layout"});//layout
app.set("view engine", "hbs");//enjine
hbs.registerPartials(__dirname + "/views/partials");//parts
 
app.post("/", urlencodedParser, function (request, response) {
    //console.log(request.body);
    if(!request.body) return response.sendStatus(400);

    

     
    let tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

    let newid = Math.max.apply(Math, tasks.map(function(o){return o.id;}))

    let Task = {
        id: newid + 1,
        name: request.body.nameTask,
        status: request.body.status,
        date: request.body.dateTask,
        files:[]
    }

    tasks.push(Task);

    
    let data = JSON.stringify(tasks);
    fs.writeFileSync(filePath, data);

    response.render("index.hbs", {tasks});
});

app.delete("/", function(request, response)
{
    let i = 1;
    console.log(i);
});

app.get("/", function(request, response){

    let tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));
    response.render("index.hbs", {tasks});
});

app.post("/upload:id", function (request, response) {
    let id = request.params.id;

    let filedata = request.file;

    let tasks = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if(filedata)
    {
        for(var i=0; i<tasks.length; i++){
            if(tasks[i].id == id){
                tasks[i].files.push(filedata.originalname);
                break;
            }
        }
    }    
    fs.writeFileSync(filePath, JSON.stringify(tasks));
    
    response.render("index.hbs", {tasks});
});


app.listen(3000);