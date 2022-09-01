const deleteBtn = document.querySelectorAll('.del') // Grabs everything with '.del' class and associates it with 'deleteBtn'
const todoItem = document.querySelectorAll('span.not')// Grabs everything with 'span.not' class and associates it with 'todoItem'
const todoComplete = document.querySelectorAll('span.completed') // Grabs everything with 'span.not' class and associates it with 'todoComplete'

Array.from(deleteBtn).forEach((el)=>{ // Assigns event listener to everything with '.del' class and runs function deleteTodo
    el.addEventListener('click', deleteTodo) 
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete) // Assigns event listener to everything with 'span.not' class and runs function markComplete
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete) // Assigns event listener to everything with 'span.completed' class and runs function markIncomplete
})

async function deleteTodo(){ //
    const todoId = this.parentNode.dataset.id // Goes to parentNode and grabs id of item | Needs id of item to specifically delete, otherwise can delete todo item with same name
    try{
        const response = await fetch('todos/deleteTodo', { 
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({ // Stringify to JSON object
                'todoIdFromJSFile': todoId // passes back up to server
            })
        })
        const data = await response.json() // awaits response back from server
        console.log(data)
        location.reload() // reload page, rerender ejs. Rerenders page without item that we just deleted
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){ // Marking Complete, tells server to update item
    const todoId = this.parentNode.dataset.id // Grabbing id from parentNode
    try{
        const response = await fetch('todos/markComplete', { // Doing fetch
            method: 'put', // Update method 
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){ // Marking incomplete
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put', // update method
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}