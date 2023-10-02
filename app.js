const express=require("express")
const Io=require("./utils/Io")
const Todo =require("./moduls/Todo")
const Todos=new Io("./databases/todos.json")

const app=express();

app.use(express.json())
const conifg=require("./config")

app.post("/todo",async(req,res)=>{
    const { title,describtion}=req.body;
    if(!title|| !describtion){
        return res.status(400).json({message: "title and describtion is require"});
    }
    const todos= await Todos.read();

    const id= (todos[todos.length-1]?.id || 0)+1;

    const newTodo= new Todo(id,title,describtion);

    console.log(newTodo);
    const data= todos.length? {...todos,newTodo} : [newTodo];
    await Todos.write(data)
    res.status(201).json({message: "sacsess"})

})
app.get("/todos",async(req,res)=>{
    const todos= await Todos.read();
    res.json({todos})
})

app.put("/todo/:id", async(req,res)=>{
    const {id}=req.params

    const {title,describtion}=req.body;

    const todos= await Todos.read();
    console.log(id);

    const findTodo = todos.find((todo) => todo.id==id);
 
    console.log(findTodo);

//     console.log(findTodo); 
})

app.listen(conifg.port,()=>{
    console.log(conifg.port,"server this in port");
})