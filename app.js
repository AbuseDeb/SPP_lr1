//json и прочее
//const bodyParser = require("body-parser");

const express = require("express");
const hbs = require("hbs");
const app = express();


hbs.registerHelper("getTime", function(){
     
    var myDate = new Date();
    var hour = myDate.getHours();
    var minute = myDate.getMinutes();
    var second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return "Текущее время: " + hour + ":" + minute + ":" + second;
});

app.set("view options", {layout: "/layouts/layout"});//layout
app.set("view engine", "hbs");//enjine
hbs.registerPartials(__dirname + "/views/partials");//parts
 

 
app.get("/", function(request, response){
      
    response.render("index.hbs");
});


app.listen(3000);