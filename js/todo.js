const todoForm = document.querySelector("#js-todoForm"),
  todoInput = document.querySelector("#js-todoInput"),
  todoList = document.querySelector("#js-todoList");

let TODOS_ARRAY = [];
let TODOS_OBJECT;


const handleReset = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("toDo");
  location.reload();
  return false;
}


const handleTodoStatus = (event) => {
  const getId = event.target.id; 
  const id = parseInt(getId);
  const li = event.target.parentNode;

  TODOS_ARRAY.forEach(todo => {
    if (todo.id === id && (todo.status === "new")) {
      console.log('done')
      todo.status = "done";
      li.classList.add("todo__checkbox__done");
    } else if (todo.id === id && (todo.status === "done")) {
      console.log('new')
      todo.status = "new";
      li.classList.remove("todo__checkbox__done");
    }
  });

  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}


const handleTodoDelete = (event) => {
  const getId = event.target.parentNode.previousElementSibling.htmlFor; 
  const id = parseInt(getId) 
  const li = event.target.parentNode.parentNode;
  li.remove(); 

 
  const remainTodosArray = TODOS_ARRAY.filter(todo => {
    return todo.id !== id;
  });
 
  TODOS_ARRAY = remainTodosArray;
  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}

const printTodos = (todoValue) => {
  
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");

  
  label.innerText = todoValue;

  
  let number = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  
  li.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", number);
  checkbox.setAttribute("id", number);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.append(checkbox, label, delBtn);

  TODOS_OBJECT = { "id": number, "todo": todoValue, "status": "new" }
  TODOS_ARRAY.push(TODOS_OBJECT);

  setTodosLocalStorage();

  
  delBtn.addEventListener('click', handleTodoDelete);

  
  checkbox.addEventListener('click', handleTodoStatus);
}

const printSavedTodos = (savedTodo, savedStatus) => {
    
  const li = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const delBtn = document.createElement("span");

  
  label.innerText = savedTodo;

  
  let number = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;

  
  li.classList.add("todo__checkbox");
  delBtn.classList.add("todo__del-btn");
  delBtn.innerHTML = "<i class='fas fa-times'></i>";
  label.setAttribute("for", number);
  checkbox.setAttribute("id", number);
  checkbox.setAttribute("type", "checkbox");
  todoList.appendChild(li);
  li.append(checkbox, label, delBtn);

  TODOS_OBJECT = { "id": number, "todo": savedTodo, "status": savedStatus }
  if (savedStatus === "done") {
    li.classList.add("todo__checkbox__done");
    checkbox.checked = true;
  } else if (savedStatus === "new") {
    li.classList.remove("todo__checkbox__done");
    checkbox.checked = false;
  }
  TODOS_ARRAY.push(TODOS_OBJECT);

  setTodosLocalStorage();

 
  delBtn.addEventListener('click', handleTodoDelete);

  
  checkbox.addEventListener('click', handleTodoStatus);
}

const loadTodos = () => {
  const lsTodos = localStorage.getItem("toDo");  
  const parsedLsTodos = JSON.parse(lsTodos); 

  if (lsTodos !== null) {
    
    parsedLsTodos.forEach(lsTodo => {
      const savedTodo = lsTodo.todo; 
      const savedStatus = lsTodo.status;
      printSavedTodos(savedTodo, savedStatus);
    })
  } else {
    
   
    return;
  }
}

const setTodosLocalStorage = () => {
  localStorage.setItem("toDo", JSON.stringify(TODOS_ARRAY));
}

const handleTodoSubmit = (event) => {
  event.preventDefault();
  let todoValue = todoInput.value;

  if (todoValue) {
    printTodos(todoValue); 
    todoForm.reset(); 
  } else {
    
   
  }
}

const todoInit = () => {
  loadTodos();
  todoForm.addEventListener("submit", handleTodoSubmit);
  resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all data including your name and to-dos?")) {
      
      handleReset();
    } else {
      
    }
  });
}

todoInit();
