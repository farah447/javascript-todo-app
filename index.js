const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("todo-button");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos =[];

const addTodo = (event) => {
    event.preventDefault();
    const newTodo = todoInput.value;
    todos.push({ description: newTodo, completed: false }); 
    listTodos();

    localStorage.setItem("todos", JSON.stringify(todos));

    todoInput.value = '';
};

const listTodos = () => {
    const todoList = document.getElementById("todo-list"); 

    if (!todoList) {
        // Handle the case where the todo-list element doesn't exist
        return;
    }

    todoList.innerHTML = ''; // Clear the innerHTML

    if (todos.length === 0) {
        // Handle the case when there are no todos
        counter.textContent = `Total number of todos: 0 | Completed Todos: 0`;
        return;
    }

    for (let index = 0; index < todos.length; index++) {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo");

        const todoCheckBox = document.createElement("input");
        todoCheckBox.type = 'checkbox';
        todoCheckBox.addEventListener('change', () => completeTodo(index));
        todoItem.appendChild(todoCheckBox);

        const description = document.createElement("p");
        description.textContent = todos[index].description; // Access the description property
        todoItem.appendChild(description);

        if (todos[index].completed) {
            todoItem.classList.add("completed");
            todoCheckBox.checked = true;
        }

        const editButton = document.createElement("button");
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTodo(index));
        todoItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(index));
        todoItem.appendChild(deleteButton);

        todoList.appendChild(todoItem);

        updateCounter();
    }
};



const completeTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    listTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
};


const editTodo = (index) => {
    const updatedTodo = prompt("Edit todo:", todos[index].description);
    if (updatedTodo !== null) {
        todos[index].description = updatedTodo;
        listTodos();
        localStorage.setItem('todos', JSON.stringify(todos));
    }
};


const deleteTodo = (index) =>{
    try{
        if (index >= 0 && index < todos.length) {
            todos.splice(index,1);
            listTodos();
            localStorage.setItem('todos', JSON.stringify(todos));
        }else{
            throw('invalied index number');
        }
    } catch(error){
        console.error(error);
    }
};

const updateCounter = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    counter.textContent = `Total number of todos: ${todos.length} | Completed Todos: ${completedCount}`;
};


todoForm?.addEventListener('submit', addTodo);
listTodos();

// Initialize the todos array with stored data if available
const allTodos = JSON.parse(localStorage.getItem('todos'));
if (allTodos) {
    todos = allTodos;
}

// Call listTodos to render initial todos
listTodos();