
const {TodosModel } = require("../models/todoSchema.js");

const getAllTodos = async (req, res) => {
    try {
        const todosData = await TodosModel.find();
        res.status(200).json({ message: "Todos", data: todosData })

        
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "unable to get todos information"})
        
    }
};

const getTodos = async (req, res) => {
    try {
        const id = req.params.id
        const todo = await TodosModel.findById(id)
         res.status(200).json({ message: "Todos", data: todo })
    
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message: "update information failed"})
    
   }
};

const addTodos = async(req, res) => {
    try {
        const { title, body } = req.body
        const newTodo = new TodosModel({title:title ,body:body})
        const result = await newTodo.save()
        res.status(200).json({message:"todo added successfully", todo:result})
    } catch (error) {
         console.log(error.message)
        res.status(400).json({message: "add information failed"})
    
   }
};

const updateTodo = async(req, res) => {
    try {
        const id = req.params.id
    const { title, body } = req.body
        const updateTodo = await TodosModel.findByIdAndUpdate(id, { title: title, body: body }, { new: true }); 
 res.status(200).json({message:"todo updated successfully", todo:updateTodo})
    
    } catch (error) {
         console.log(error.message)
        res.status(400).json({message: "updated information failed"})
    
    
   }
};

const deleteTodo =  async(req, res) => {
    try {
        const id = req.params.todoId;
        const deleteTodo = await TodosModel.findByIdAndDelete(id);
return
        res.status(204).json({ message: "todo deleted successfully", todo: deleteTodo });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "deleted information failed" });
    
        }
    
    // res.send("deleted")
};

module.exports = {getAllTodos, getTodos, addTodos, updateTodo, deleteTodo}
