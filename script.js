function addTask() {
    const taskInput = document.getElementById("newTask");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.className = "task";

    // Set task priority
    let priorityClass;
    switch (priorityInput.value) {
        case "high":
            priorityClass = "priority-high";
            break;
        case "medium":
            priorityClass = "priority-medium";
            break;
        default:
            priorityClass = "priority-low";
            break;
    }

    // Display task details with priority and due date
    taskItem.innerHTML = `<span class="${priorityClass}">${taskInput.value}</span>
        <div class="task-details">
            Due: ${dueDateInput.value || "No due date"} | Priority: ${priorityInput.value}
        </div>`;

    // Add click event to select/deselect the task
    taskItem.onclick = function() {
        this.classList.toggle("selected");
    };

    taskList.appendChild(taskItem);
    taskInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "low";
}

function removeTask() {
    const taskList = document.getElementById("taskList");
    const selectedTask = document.querySelector(".task.selected");

    if (selectedTask) {
        taskList.removeChild(selectedTask);
        document.getElementById("warningMessage").style.display = "none";
    } else {
        document.getElementById("warningMessage").style.display = "block";
    }
}

function markAsDone() {
    const selectedTask = document.querySelector(".task.selected");

    if (selectedTask) {
        selectedTask.classList.toggle("done");
        selectedTask.classList.remove("selected");
        document.getElementById("warningMessage").style.display = "none";
    } else {
        document.getElementById("warningMessage").style.display = "block";
    }
}

function editTask() {
    const selectedTask = document.querySelector(".task.selected");

    if (!selectedTask) {
        document.getElementById("warningMessage").style.display = "block";
        return;
    }

    document.getElementById("warningMessage").style.display = "none";

    // Populate the input fields with the current values of the selected task
    const taskName = selectedTask.querySelector("span").textContent;
    const dueDateText = selectedTask.querySelector(".task-details").textContent.match(/Due: ([^\|]+)/)[1].trim();
    const priorityText = selectedTask.querySelector(".task-details").textContent.match(/Priority: (\w+)/)[1].trim();

    document.getElementById("newTask").value = taskName;
    document.getElementById("dueDate").value = dueDateText === "No due date" ? "" : dueDateText;
    document.getElementById("priority").value = priorityText.toLowerCase();

    // Remove the selected task temporarily, so it can be replaced with the edited version
    selectedTask.remove();
}
