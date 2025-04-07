document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // create a new task
    function createTask(taskText) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        // Mark task 
        span.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

        // Remove task
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function () {
            taskList.removeChild(li);
        });

        li.appendChild(span);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    }

    // Add task when clicked
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = ''; // Clear input field
        }
    });

    // Add task when Enter
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                createTask(taskText);
                taskInput.value = ''; // Clear input field
            }
        }
    });
});
