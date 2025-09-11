let btn = document.getElementById("add-btn"); // selects the Add task button

btn.addEventListener("click", () => {
  task = document.getElementById("task-in").value; // for input we have to use value not innerText or innerHTML
  // console.log(task)

  let task_list = document.createElement("li");

  task_list.textContent = task; //add task as list element to the list

  document.getElementById("tasks").appendChild(task_list);

  document.getElementById("task-in").value = "";

  task_list.className =
    " d-flex justify-content-between align-items-center p-2 bg-white border rounded mt-2";

  task_list.innerHTML = `
            <span class="task-text">${task}</span>
            <div class="task-buttons d-inline ms-2">
                <button class="btn btn-success btn-sm done-btn me-2">✅</button>
                <button class="btn btn-light btn-sm edit-btn me-2">✏️</button>
                <button class="btn btn-danger btn-sm delete-btn">❌</button>
            </div>
            `;

  task_list.querySelector(".done-btn").addEventListener("click", () => {
    let taskText = task_list.querySelector(".task-text");
    taskText.classList.toggle("text-decoration-line-through"); 
    taskText.classList.toggle("text-muted"); // optional faded effect
  });

  task_list.querySelector(".delete-btn").addEventListener("click", () => {
    task_list.remove();
  });

  // Edit functionality
  task_list.querySelector(".edit-btn").addEventListener("click", () => {
    let taskText = task_list.querySelector(".task-text");

    // Create an input field pre-filled with the current task
    let input = document.createElement("input");
    input.type = "text";
    input.value = taskText.textContent;
    input.className = "form-control d-inline w-50"; // bootstrap styles

    // Replace the span with the input
    taskText.replaceWith(input);
    input.focus();

    // Flag to prevent multiple replaces
    let saved = false;

    // Save updated text
    let saveTask = () => {
      if (saved) return; //avoid double execution
      saved = true;

      let newSpan = document.createElement("span");
      newSpan.className = "task-text";
      newSpan.textContent = input.value; 
      input.replaceWith(newSpan);
    };

    // Save on blur
    input.addEventListener("blur", saveTask);

    // Save on Enter
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        saveTask();
        input.blur(); 
      }
    });
  });
});
