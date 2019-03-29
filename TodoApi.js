// server.js
// where your node app starts

// init project
const express = require('express');
const fs = require('fs');
const { readJsonFile, writeJsonFile, getDate } = require('./utils');
const app = express();
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const date = getDate()

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// Jab list-all comand aaye
app.get("/list-all",(request,response,next) => {
  let res = readJsonFile("data/commands.json")
  return response.send(res)
});

// set agenda 
app.post ("/:emailId/set-agenda", (request,response)=>{
  var agendasDict = readJsonFile("data/masterdata.json");
  var newAgenda = {
          agenda: request.body.agenda,
          complete:false
          };
  if (!agendasDict.hasOwnProperty(request.params.emailId)){
      agendasDict[request.params.emailId] = {};
      agendasDict[request.params.emailId][date] = [];
      writeJsonFile("data/masterdata.json",agendasDict);
      };
  var agendasDict = readJsonFile("data/masterdata.json");
  if (agendasDict[request.params.emailId].hasOwnProperty(date)){
    newAgenda.id = agendasDict[request.params.emailId][date].length + 1;
    agendasDict[request.params.emailId][date].push(newAgenda);
    writeJsonFile("data/masterdata.json",agendasDict);
    return response.json(newAgenda);}
  else{
  agendasDict[request.params.emailId][date] = [];
  newAgenda.id = agendasDict[request.params.emailId][date].length + 1 ;
  agendasDict[request.params.emailId][date].push(newAgenda);
  writeJsonFile("data/masterdata.json",agendasDict);
  return response.json(newAgenda);}
  });


// get all agendas
app.get('/:emailId/get-all',(req,res)=>{
    let task = readJsonFile("data/masterdata.json");
    var list = [];
    for(var i of task[req.params.emailId][date]){
      list.push(i.agenda);
      }
  return res.send(list)
})

// change agend by id
app.put("/:emailId/change-agenda/:id",(req,res)=>{
  var change = readJsonFile("data/masterdata.json")
  var changeAgenda=change[req.params.emailId][date][req.params.id-1];
  if(changeAgenda.hasOwnProperty('agenda')){
    changeAgenda["agenda"]=req.body.agenda
    // return res.json(change)
  }else{return res.send("This id does not exist in your agenda")};
  writeJsonFile("data/masterdata.json",change);
  return res.json(change)
  
})

// post complete agenda
app.put("/:emailId/complete-agenda/:id", (req , res) => {
  let agenda = readJsonFile("data/masterdata.json");
  let id = req.params.id;
  agenda[req.params.emailId][date][id-1]['complete'] = true;
  writeJsonFile("data/masterdata.json", agenda)
  return res.json("ok ! your this agenda has marked as completed")
})

// get all completed agendas
app.get('/:emailId/get-all-completed',(req,res)=>{
    let task = readJsonFile("data/masterdata.json");
    let list = [];
    for(var i of task[req.params.emailId][date]){
      if (i.complete == true){
        list.push(i.agenda);
        }
      }if(list.length>0){return res.send(list)}
      else{return res.send(["! You have not completed any agendas"])}
})

// get all pending agendas 
app.get('/:emailId/get-all-pending',(req,res)=>{
    let task = readJsonFile("data/masterdata.json");
    var list = [];
    for(var i of task[req.params.emailId][date]){
      if (i.complete == false){
        list.push(i.agenda);
        }
      }if(list.length>0){return res.send(list)}
      else{return res.send(["! Your all agendas has been completed"])}
})

// get all agendas using date 
app.get('/:emailID/get-all-date/',(request,response) => {
 let userDate = request.body.date;
  var agendasDict = readJsonFile('data/masterdata.json');
  var tempList = [];
  if(agendasDict[request.params.emailID].hasOwnProperty(userDate)){
      for (let x of agendasDict[request.params.emailID][userDate]){
        tempList.push(x.agenda);
      }
      return response.send(tempList);
  }else{return response.send("we have no data related to this date")};
})

// listen for requests :)
app.listen(2040,()=>{
    console.log('server is listening')
});
