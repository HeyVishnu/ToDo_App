import Task from "../models/task.js";

export const addTask = async(req,res) =>{
    const {title, description} = req.body;

    await Task.create({title, description, user: req.user});

    res.status(200).json({
        success: true,
        message: "Task Added"
    })

}

export const myTask = async(req,res) =>{

 const id = req.user._id;
 
 const tasks = await Task.find({user:id});

 if(!tasks) return next(new Error("No tasks are there"));

 res.status(200).json({
    success: true,
    tasks,
 })

}

export const updateTask = async(req,res,next) =>{
    const {id} = req.params;
    const task =  await Task.findById(id);

   if(!task) return next(new Error("Invalid Id"));

   task.isCompleted = !task.isCompleted;
   
   await task.save();

   res.status(201).json({
    success: true,
    message: "Updated task"
   })
    
}

export const deleteTask = async(req,res) =>{
    const {id} = req.params;

    const task =  await Task.findById(id);

    if(!task) return next(new Error("Invalid Id "));

    await task.deleteOne();

    res.status(201).json({
        success: true,
        message: "Delete Successfully",
    })
}