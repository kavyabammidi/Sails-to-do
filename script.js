let tasks = []; // Array to hold all tasks

const taskInput = document.getElementById("task-in");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("tasks");

//  create task <li>
function createTaskElement(task) {
  let li = document.createElement("li");
  li.className = "d-flex justify-content-between p-2 bg-white border rounded mt-2";
  li.dataset.id = task.id;

  li.innerHTML = `
    <span class="task-text ${task.completed ? "text-decoration-line-through text-muted" : ""}">
      ${task.text}
      <div class="text-muted small">🕒 ${task.created}</div>
    </span>
    
    <div class="task-buttons d-inline ms-2">
      <button class="btn btn-success btn-sm done-btn me-2">✅</button>
      <button class="btn btn-warning btn-sm edit-btn me-2">✏️</button>
      <button class="btn btn-danger btn-sm delete-btn">❌</button>
    </div>
  `;

  // ✅ Done button
  li.querySelector(".done-btn").addEventListener("click", () => {
    task.completed = !task.completed;
    li.querySelector(".task-text").classList.toggle("text-decoration-line-through");
    li.querySelector(".task-text").classList.toggle("text-muted");
  });

  // ❌ Delete button
  li.querySelector(".delete-btn").addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    li.remove(); 
  });

  // ✏️ Edit button
  li.querySelector(".edit-btn").addEventListener("click", () => {
    let taskText = li.querySelector(".task-text");
    let input = document.createElement("input");
    input.type = "text";
    input.value = task.text;
    input.className = "form-control d-inline w-50";

    taskText.replaceWith(input);
    input.focus();

    let saveTask = () => {
      task.text = input.value;
      input.replaceWith(createTaskElement(task).querySelector(".task-text")); // replace only text
    };

    input.addEventListener("blur", saveTask);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveTask();
        input.blur();
      }
    });
  });

  return li;
}


function outputTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    if (filter === "completed" && !task.completed) return;
    if (filter === "pending" && task.completed) return;
    taskList.appendChild(createTaskElement(task));
  });
}

//  Add task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) {
    window.alert("Please add a task to do");
    return;
  }

  const newTask = { id: Date.now(), text, completed: false,created: new Date().toLocaleString() };
  tasks.push(newTask);

  // appending task to list
  taskList.appendChild(createTaskElement(newTask));

  taskInput.value = "";
});

// Filter buttons
document.getElementById("all-btn").addEventListener("click", () => outputTasks("all"));
document.getElementById("Compl-btn").addEventListener("click", () => outputTasks("completed"));
document.getElementById("pend-btn").addEventListener("click", () => outputTasks("pending"));
