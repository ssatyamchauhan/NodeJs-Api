var express= require('express');
var fs=require('fs');
var app = express();
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());



const courses=express.Router();
app.use('/courses', courses);


courses.get('/',(req,res)=>{
    fs.readFile(__dirname+"/courses.json",(err,data)=>{
        if(err){
            console.log("went wrong")
        }
        else{
            var courses = JSON.parse(data.toString());
            return res.json(courses);
        }
    })
});


courses.post('/',(req,res)=>{ 
    var course = {
        name: req.body.name,
        description: req.body.description
    }
    let fileData = fs.readFileSync(__dirname + "/courses.json");
    // console.log(fileData.constructor.name);
    fileData = fileData.toString();
    console.log(typeof fileData);
    let courses = JSON.parse(fileData);
    // console.log("-----")
    // console.log(courses);
    // console.log("------")
    course.id  = courses.length+1;
    courses.push(course);
    // console.log("*******")
    // console.log(courses);
    // console.log("*******")
    fs.writeFileSync(__dirname + "/courses.json", JSON.stringify(courses, null, 2));
    return res.json(course);
});

// courses.get('/:id',(req,res)=>{
//     fs.readFile(__dirname + '/courses.json',(err,data)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             var data = JSON.parse(data);
//             console.log(data);
//             var userDetails=data[req.params.id-1];
//             console.log(userDetails)
//             return res.json(userDetails);
//         }

//     })
// });

courses.put('/:id',(req,res)=>{
    fs.readFile(__dirname + '/courses.json',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            var data = JSON.parse(data);
            // console.log(data);
            var userDetails=data[req.params.id-1];
            if(userDetails.hasOwnProperty('name')){
                userDetails['name']=req.body.name;
            }
            if(userDetails.hasOwnProperty('description')){
                userDetails['description']=req.body.description;
            }
            else{
                return res.json("aapki json galat hai!");
            }
            fs.writeFileSync(__dirname + '/courses.json', JSON.stringify(data,null,2));
            return res.json(data);

        }
    });
});

courses.get('/:id/exercise',(req,res)=>{
    fs.readFile(__dirname + "/courses.json",(err,data)=>{
        var data=JSON.parse(data)
        var userDetails=data[req.params.id-1].exercise;
        return res.json(userDetails);
    })
});

courses.post('/:id/exercise',(req,res)=>{
    var exercises={
        courseId:req.params.id,
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint
    }
    var fieldData=fs.readFileSync(__dirname + '/courses.json');
    var fieldData=fieldData.toString();
    var courses=JSON.parse(fieldData);
    exercises.id=courses[req.params.id-1].exercise.length+1;
    courses[req.params.id-1].exercise.push(exercises)
    res.json(courses);
    fs.writeFileSync('courses.json',JSON.stringify(courses,null,2))
});


courses.get('/:id/exercise/:Id',(req,res)=>{
    fs.readFile(__dirname + "/courses.json",(err,data)=>{
        var data=JSON.parse(data);
        var userDetails=data[req.params.id-1].exercise[req.params.Id-1];
        return res.json(userDetails);
    })
});

courses.put('/:id/exercise/:Id',(req,res)=>{
    
    var data=fs.readFileSync(__dirname + "/courses.json");

    var courses=JSON.parse(data);
    var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
    console.log(userDetails);

    if(userDetails.hasOwnProperty('name')){
        userDetails['name']=req.body.name
    }
    if(userDetails.hasOwnProperty('content')){
        userDetails['content']=req.body.content
    }
    if(userDetails.hasOwnProperty('hint')){
        userDetails['hint']=req.body.hint
    }
    else{
        return res.send("there is no any changes happened yet!")
    }
    fs.writeFileSync(__dirname + "/courses.json",JSON.stringify(courses,null,2));
    return res.json(userDetails);

});

courses.get('/:id/exercise/:Id/submission',(req,res)=>{
    fs.readFile(__dirname + '/courses.json',(err,data)=>{
        var courses=JSON.parse(data);
        var userDetails=courses[req.params.id-1].exercise[req.params.Id-1];
        if(userDetails.hasOwnProperty('submission')){
            return res.json(userDetails)
        }
        else{
            userDetails.submission=[];
            courses[req.params.id].exercise.push(userDetails)
            // return res.json(courses)
            fs.writeFileSync('courses.json',JSON.stringify(courses,null,2))
        }
    });

});

courses.post('/:id/exercise/:Id/submission',(req,res)=>{
        
    var submissions={
        courseId:req.params.id,
        exerciseId:req.params.Id,
        content:req.body.content,
        userName:req.body.userName
    }
    console.log("akhil hituya")
    var data=fs.readFileSync(__dirname + "/courses.json");
    var data=data.toString();
    var courses=JSON.parse(data);
    res.json(courses)
    console.log(courses);
    submissions.id=courses[req.params.id-1].exercise[req.params.Id-1].submission.length+1;
    courses[req.params.id-1].exercise[req.params.Id-1].submission.push(submissions);
    // return res.json(courses)
    fs.writeFileSync('courses.json',JSON.stringify(courses,null,2));
    return res.json(courses)
});







app.listen(2030, ()=>{
    console.log("server is listening")
});