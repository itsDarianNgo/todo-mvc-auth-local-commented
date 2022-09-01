const Todo = require('../models/Todo')

// This is the logic


module.exports = { // exporting and routes can call as methods
    getTodos: async (req,res)=>{ // going to database 
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id}) // finding all the items
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) // counting all items that match the userId and counting the ones that are not completed (completed:false).
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) // rendering ejs and passing in items for todo list, remaining items for count, and information about the user so we can display name on page
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{ // going to database 
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id}) // (Todo) -- using database model and creating new database item with 3 key pair values; todo, completed, and userId.
            console.log('Todo has been added!') // console logging 
            res.redirect('/todos') // redirecting to todos page
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //Find specific item, update an existing item, and mark complete
                completed: true // change boolean to true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ // find an existing item and mark incomplete
                completed: false // change boolean to false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile}) // find an existing item and delete
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    

// Don't need to know what each line does. They're legos, just piece them together
// Need to know what each (mongoose)method is able to do and roughly how it's doing that