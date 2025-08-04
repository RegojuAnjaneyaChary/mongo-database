const express = require('express');
const router = express.Router()
const {getAllTodos, getTodos, addTodos, updateTodo,deleteTodo}= require("../Controller/todocontroller")

router.get("/getAllTodos", getAllTodos);

router.post("/addTodo", addTodos);


router.put("/updateTodo/:id", updateTodo);


router.get("/getTodobyid/:id", getTodos);


router.delete("/deleteTodo/:todoId", deleteTodo);


module.exports = router;

