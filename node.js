// let x=10;
// module.exports=x

// console.log(f)
// let r=f.readFile("txt.txt",{encoding:"utf8"},(err,data)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
//     console.log("arrived")
// })
// console.log("finished")
// console.log(process.argv)


// @ts-ignore


const fs = module.require('fs');
const express = module.require('express')
const app = express()
app.use(express.json())
app.get('/todo',(req,res)=>{
    let b=JSON.parse(fs.readFileSync("todo.json","utf-8"))
    res.send(b)

})

app.patch('/patch/todo/:id',(req,res)=>
    {
        let id = req.params.id;
       // console.log(req.body);
        console.log(id);
        let {title} = req.body;
        let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
        let todo= todos.find((todo)=> todo.id == id)
        if(todo)
        {
         todo.title = title;
         fs.writeFileSync("todo.json",JSON.stringify(todos));
         res.json({message:"Edited ", data :todo})
        }else{
            res.json({message : "SORRY there is no todo Found with this id"})
        }
    
    
    }
    )
app.post("/post/todo",(req,res)=>{
    let {title} = req.body;
    let{id}=req.body
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
    todos.push({id:id,title:title})
    fs.writeFileSync("todo.json",JSON.stringify(todos));
    res.json({message:"Added"})
})    

app.delete('/delete/todo/:id',(req,res)=>{
    let id=req.params.id;
    let todos= JSON.parse(fs.readFileSync("todo.json", "utf8"));
    for(var i=0;i<todos.length;i++){
        if(todos[i].id==id){
            let index=todos.indexOf(todos[i])
            todos.splice(index,1)
        }
    }
    fs.writeFileSync("todo.json",JSON.stringify(todos));
    res.json({message:"deleted"})
})
app.listen(3000,()=>{
    console.log("started")
})
// let [,,command]=process.argv;

// if(command=="create"){
//     let title=process.argv[3]
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     to.push({title:title})
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }else if(command=="list"){
//     let todos=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     console.log(todos)

// }else if(command=="update"){
//     let oldtitle=process.argv[3];
//     let newtitle=process.argv[4];
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     for (var i=0;i<to.length;i++){
//         if(to[i].title==oldtitle){
//             to[i].title=newtitle
//         }

//     }
//     fs.writeFileSync("todo.json",JSON.stringify(to))
    



// }else if(command=="delete"){

//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     while(to.length > 0) {
//         to.pop();
//     }
    
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }else if(command=="remove"){
//     let title=process.argv[3]
//     let to=JSON.parse(fs.readFileSync("todo.json","utf-8"))
//     for (var i=0;i<to.length;i++){
//         if(to[i].title==title){
//             let index=to.indexOf(to[i])
//             to.splice(index,1)

//         }

//     }
//     fs.writeFileSync("todo.json",JSON.stringify(to))
// }


