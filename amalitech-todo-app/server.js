const toggler =  document.querySelector(".toggler")
const myform = document.getElementById("form-control")
const todoInput = document.getElementById("form-input")
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getLocalTodos);
toggler.addEventListener("click",changeMode);
myform.addEventListener("submit",addTodo);
todoList.addEventListener("click", deleteCheck);


function addTodo(event) {
    event.preventDefault();
    console.log("Heyy");
    const todoDiv = document.createElement("div");
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
    
    todoList.prepend(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "close") {
        const todo = item.parentElement;
        removeLocalTodos(todo);     
        todo.remove();
    }
    if(item.classList[0] === "checkmark") {
        item.classList.toggle("checked");

        const svg = item.getElementsByTagName("svg")[0]
        svg.classList.toggle("checked");

        const todo_item = item.nextElementSibling;
        todo_item.classList.toggle("checked");

    }
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//fetch todo values from the localStorage
function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos = todos.reverse()
    }
    
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo; 
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
        
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function changeMode(){
    document.documentElement.classList.toggle("dark-mode")
    toggler.classList.toggle("dark")
}