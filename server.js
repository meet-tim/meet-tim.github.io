const toggler =  document.querySelector(".toggler")
const myform = document.getElementById("form-control")
const todoInput = document.getElementById("form-input")
const todoList = document.querySelector(".todo-list");
const filterElement = document.getElementsByClassName("filter")
const clearBtn = document.querySelector(".clearBtn")
const counter = document.querySelector(".counter")


//retrieve filter buttons

const filterUl = [...filterElement];
filterUl.forEach((ul) => {
    ul.childNodes.forEach((btn) => {
        btn.addEventListener("click",filterTodo);
    })
    
})




//assign event listeners to elements
document.addEventListener("DOMContentLoaded", getLocalTodos);
toggler.addEventListener("click",changeMode);
myform.addEventListener("submit",addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("dragover", dragOver);
clearBtn.addEventListener("click", clearTodos);



//function to filter todos
function filterTodo(e){
    
    const btn = e.target
    const todos = todoList.querySelectorAll(".todo");
   
    if(btn.innerHTML === "Active"){
        todos.forEach(function(todo) {
            if(!todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("selected")
            })
            btn.classList.add("selected")


    })}else if(btn.innerHTML === "Completed"){
        todos.forEach(function(todo) {
            if(todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("selected")
            })
            btn.classList.add("selected")
    })}else{
        todos.forEach(function(todo) {
            todo.style.display = "flex";

            //apply active styling
            const btns = btn.parentElement.querySelectorAll("li")
            btns.forEach(function(b) {
                b.classList.remove("selected")
            })
            btn.classList.add("selected")
            })
    }
   
}

//function to add todos
function addTodo(event) {
    event.preventDefault();
    
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo-item");
    const section = document.createElement("section")
    todoDiv.appendChild(section);
    //ADDING TO LOCAL STORAGE 
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement("button");
    completedButton.classList.add("checkmark")
    completedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
    section.appendChild(completedButton);
    section.appendChild(newTodo)

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
    trashButton.classList.add("close");
    todoDiv.appendChild(section);
    todoDiv.appendChild(trashButton);


    todoDiv.setAttribute("draggable",true)
    todoDiv.addEventListener("dragstart",()=>{todoDiv.classList.add("dragging")})
    todoDiv.addEventListener("dragend",dragEnd)
    todoDiv.addEventListener("mouseenter",()=>{
        trashButton.style.display = "block"
    })
    todoDiv.addEventListener("mouseleave",()=>{
        trashButton.style.display = "none"
    })

    todoList.prepend(todoDiv);
    todoInput.value = "";

    //update count
    remainingTodo();
}

//function to delete or check a todo
function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;
    if(item.classList[0] === "close") {
        
        removeLocalTodos(todo);     
        todo.remove();
        //update count
        remainingTodo();
    }
    if(item.classList[0] === "checkmark") {
        item.classList.toggle("checked");

        const svg = item.getElementsByTagName("svg")[0]
        svg.classList.toggle("checked");

        const todo_item = item.nextElementSibling;
        todo_item.classList.toggle("checked");
        todo.parentElement.classList.toggle("checked");

        //update local storage
        let todos;
        if(localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        
        todos.forEach(function(todo) {
            if (todo[0] == todo_item.innerText){
                if (todo[1] == "active"){
                    todo[1] ="completed"
                }else{
                    todo[1] = "active"
                }
            }
           
        })

        //switch to completed todos
        todoList.querySelectorAll(".todo").forEach(function(todo) {
            if(todo.classList.contains("checked")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }

            //apply active styling
            filterUl.forEach((ul) => {
                ul.children[0].classList.remove("selected");
                ul.children[1].classList.remove("selected");
                ul.children[2].classList.add("selected");
            })
           
        })
        localStorage.setItem("todos", JSON.stringify(todos));
        
        //update count
        remainingTodo();        
    }
}

//function to save todos to localstorage
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push([todo,"active"]);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//fetch todo values from the localStorage
function getLocalTodos() {
    if(localStorage.getItem("mode") === "dark") {
        changeMode()
    } 

    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos = todos.reverse()
    }
    
    
    todos.forEach(function(todo) {
        if (todo[1] === "active"){
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            const newTodo = document.createElement("li");
            newTodo.innerText = todo[0]; 
            newTodo.classList.add("todo-item");
            const section = document.createElement("section")

            const completedButton = document.createElement("button");
            completedButton.classList.add("checkmark")
            completedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
            section.appendChild(completedButton);
            section.appendChild(newTodo)
            todoDiv.appendChild(section);

            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
            trashButton.classList.add("close");
            todoDiv.appendChild(trashButton);


            todoDiv.setAttribute("draggable",true)
            todoDiv.addEventListener("dragstart",()=>{todoDiv.classList.add("dragging")})
            todoDiv.addEventListener("dragend",dragEnd)
            todoDiv.addEventListener("mouseenter",()=>{
                trashButton.style.display = "block"
            })
            todoDiv.addEventListener("mouseleave",()=>{
                trashButton.style.display = "none"
            })
        


            

            todoList.appendChild(todoDiv);
        }else{
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");
            const newTodo = document.createElement("li");
            newTodo.innerText = todo[0]; 
            newTodo.classList.add("todo-item");
            const section = document.createElement("section")
    
            const completedButton = document.createElement("button");
            completedButton.classList.add("checkmark")
            completedButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>'
            section.appendChild(completedButton);
            section.appendChild(newTodo)
            todoDiv.appendChild(section);
    
            const trashButton = document.createElement("button");
            trashButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>';
            trashButton.classList.add("close");
            todoDiv.appendChild(trashButton);
            

             //apply check styling
            todoDiv.classList.add("checked");

            const svg = completedButton.getElementsByTagName("svg")[0]
            svg.classList.add("checked");
    
            
            newTodo.classList.add("checked");
            completedButton.classList.add("checked");


            todoDiv.setAttribute("draggable",true)
            todoDiv.addEventListener("dragstart",()=>{todoDiv.classList.add("dragging")})
            todoDiv.addEventListener("dragend",dragEnd)
            todoDiv.addEventListener("mouseenter",()=>{
                trashButton.style.display = "block"
            })
            todoDiv.addEventListener("mouseleave",()=>{
                trashButton.style.display = "none"
            })
        

            todoList.appendChild(todoDiv);

           
        }
        //update count
        
    });
    remainingTodo();
}

//function to remove localstorage
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
        
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoId = todo.children[0].innerText;
    const index = todos.findIndex((i) => {
        if(i.includes(todoId)){
            return true
        }
    })    //find index of 2d array
   
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//darkmode toggle function
function changeMode(){
    document.documentElement.classList.toggle("dark-mode")
    toggler.classList.toggle("dark")
    if (toggler.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
    
}

//clear completed
function clearTodos(){
	let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

	const todo_items = todoList.querySelectorAll(".todo");
   
        todo_items.forEach(function(todo) {
            if(todo.classList.contains("checked")) {
                todo.remove();
                
                const todoId = todo.children[0].innerText;
                const index = todos.findIndex((i) => {
                    if(i.includes(todoId)){
                        return true
                    }
                })    //find index of 2d array
            
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                
            } 
        })
    //update count
    remainingTodo();
}

function remainingTodo(){
    const todos = todoList.querySelectorAll(".todo");
        var count = 0;
        todos.forEach(function(todo) {
            
            if(!todo.classList.contains("checked")) {
                count++;
            }
        })
    counter.innerHTML = `${count} items left`;
    
}



function dragOver(e){
    e.preventDefault()
    const draggable = document.querySelector(".dragging")
    const afterElement = getElementPosition(e.clientY)
    if (afterElement == null) {
        todoList.appendChild(draggable)
    }else{
        todoList.insertBefore(draggable,afterElement)
    }
}

function getElementPosition(yPos){
    const elements = [...todoList.querySelectorAll(".todo:not(.dragging)")]
    
    
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = yPos - box.top -box.height/2
        if(offset < 0 && offset >closest.offset){
            return{offset:offset,element:child}
        }
        else{
            return closest
        }
    },{offset:Number.NEGATIVE_INFINITY}).element
}

function dragEnd(e){
    //remove dragging effect
    e.target.classList.remove("dragging")

    //update localstorage with current arrangements
    let todos = [];
    const newlist = [...todoList.querySelectorAll(".todo")]
    newlist.forEach((item)=>{
        if (item.classList[1] == "checked"){
            todos.push([item.children[0].children[1].innerText,"completed"])
        }else{
            todos.push([item.children[0].children[1].innerText,"active"])
        }
    })
    todos = todos.reverse()
    localStorage.setItem("todos", JSON.stringify(todos));
   
}