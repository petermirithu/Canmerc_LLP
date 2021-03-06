var express = require('express');
var router = express.Router();
const Todo = require("../models").Todo;
const TodoItem = require('../models').TodoItem;

router.get("/single",function(req,res){    
    return Todo    
        .findByPk(1, {
        include: [{
            model: TodoItem,
            as: 'todoItems',
        }],
        })
        .then(todo => {
        if (!todo) {
            return res.status(404).send({
            message: 'Todo Not Found',
            });
        }
        return res.status(200).send(todo);
        })
        .catch(error => res.status(400).send(error));

})

router.put("/update",function(req,res){    
    return Todo
        .findById(req.params.todoId, {
        include: [{
            model: TodoItem,
            as: 'todoItems',
        }],
        })
        .then(todo => {
        if (!todo) {
            return res.status(404).send({
            message: 'Todo Not Found',
            });
        }
        return todo
            .update({
            title: req.body.title || todo.title,
            })
            .then(() => res.status(200).send(todo))  // Send back the updated todo.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));

})


router.delete("/delete",function(req,res){    
    return Todo
        .findById(req.params.todoId)
        .then(todo => {
        if (!todo) {
            return res.status(400).send({
            message: 'Todo Not Found',
            });
        }
        return todo
            .destroy()
            .then(() => res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
})

// ...
// update(req, res) {
//   return TodoItem
//     .find({
//         where: {
//           id: req.params.todoItemId,
//           todoId: req.params.todoId,
//         },
//       })
//     .then(todoItem => {
//       if (!todoItem) {
//         return res.status(404).send({
//           message: 'TodoItem Not Found',
//         });
//       }

//       return todoItem
//         .update({
//           content: req.body.content || todoItem.content,
//           complete: req.body.complete || todoItem.complete,
//         })
//         .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
//         .catch(error => res.status(400).send(error));
//     })
//     .catch(error => res.status(400).send(error));
// },

// destroy(req, res) {
//   return TodoItem
//     .find({
//         where: {
//           id: req.params.todoItemId,
//           todoId: req.params.todoId,
//         },
//       })
//     .then(todoItem => {
//       if (!todoItem) {
//         return res.status(404).send({
//           message: 'TodoItem Not Found',
//         });
//       }

//       return todoItem
//         .destroy()
//         .then(() => res.status(204).send())
//         .catch(error => res.status(400).send(error));
//     })
//     .catch(error => res.status(400).send(error));
// },
        
module.exports = router;
