const express = require('express');

const port = 8001;

const app = express();

const path = require('path');

app.set('view engine','ejs');
app.set("views",path.join(__dirname,'views'));

app.use(express.urlencoded());

var emp = [];

app.get('/', function(req,res){
    return res.render('home',{
        title : "Home page",
        employee : emp
    });
})

app.post("/insertEmployee", function(req,res){
    console.log(req.body);
    req.body.id = Math.round(Math.random()*10000)
    emp.push(req.body);
    return res.redirect('/');
})

app.get("/deleteEmp",function(req,res){
    console.log(req.query.id);
    let pos = emp.findIndex((v,i)=>v.id==req.query.id);
    if(pos != -1){
        emp.splice(pos,1);
        return res.redirect('/');
    }
})

app.post("/updateEmployee", function(req,res){
    console.log(req.body)
    let pos = emp.findIndex((v,i)=>v.id==req.body.editEmp);
    if(pos != -1){
        req.body.id = req.body.editEmp;
        emp[pos] = req.body;
        return res.redirect('/');
    }
})

app.get("/editEmp", function(req,res){
    // console.log(req.query.id);
    let  pos = emp.findIndex((v,i)=>v.id==req.query.id);
    if(pos != -1){
        return res.render('update',{
            singleEmp : emp[pos],
            title : "Edit Page"
        })
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("server is running on port:",port);
})