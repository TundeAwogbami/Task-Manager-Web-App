// Select elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    
    const newTask = {
        text: taskText,
        completed: false,
        dueDate,
        priority,
    };

    tasks.push(newTask);
    updateTasks();
    taskForm.reset();
});

// Update tasks list
function updateTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} - ${task.dueDate || 'No Due Date'} - ${task.priority.toUpperCase()}</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle complete/incomplete status
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTasks();
}

// Filter tasks
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        displayFilteredTasks(filter);
    });
});

function displayFilteredTasks(filter) {
    taskList.innerHTML = '';
    tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true; // 'all' filter
    }).forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} - ${task.dueDate || 'No Due Date'} - ${task.priority.toUpperCase()}</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Clear all completed tasks
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    updateTasks();
});

// Initialize tasks on page load
updateTasks();
