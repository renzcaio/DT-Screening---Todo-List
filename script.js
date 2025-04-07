document.addEventListener('DOMContentLoaded', function () {
    let taskInput = document.getElementById('task-input');
    let addButton = document.getElementById('add-task-button');
    let themeToggleButton = document.getElementById('theme-toggle-button');
    let modeIndicator = document.getElementById('mode-indicator');
    let taskList = document.getElementById('task-list');
    
    /*
    update mode indicator
    */
    function updateModeIndicator() {
        if (document.body.classList.contains('dark-mode')) {
            modeIndicator.textContent = 'Dark Mode';
            modeIndicator.classList.remove('light');
            modeIndicator.classList.add('dark');
            themeToggleButton.textContent = 'Switch to Light Mode';
        } else {
            modeIndicator.textContent = 'Light Mode';
            modeIndicator.classList.remove('dark');
            modeIndicator.classList.add('light');
            themeToggleButton.textContent = 'Switch to Dark Mode';
        }
    }

   /*
    initial update
    */
    updateModeIndicator();

    // dark mode
    themeToggleButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        updateModeIndicator();
    });
    /*
    create a new task
    */
    function createTask(taskText) {
        const li = document.createElement('li');
        const dragHandle = document.createElement('div');
        dragHandle.classList.add('drag-handle'); // Drag icon
        const span = document.createElement('span');
        span.classList.add('task-text');
        span.textContent = taskText;

        /*
        mark as completed
        */
        span.addEventListener('click', function () {
            li.classList.toggle('completed');
        });

         /*
            remove task
        */
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', function () {
            li.classList.add('removing');
            setTimeout(() => taskList.removeChild(li), 500); 
        });

        li.classList.add('adding'); 
        li.appendChild(dragHandle); 
        li.appendChild(span); 
        li.appendChild(removeButton); 
        taskList.appendChild(li);

         /*
            remove adding
        */
   
        li.addEventListener('animationend', () => {
            li.classList.remove('adding');
        });

        /*
            drag and drop
        */
        dragHandle.setAttribute('draggable', true);

        dragHandle.addEventListener('dragstart', (e) => {
            draggedItem = li;
            setTimeout(() => {
                li.style.opacity = '0.5';
            }, 0);
        });

        dragHandle.addEventListener('dragend', (e) => {
            li.style.opacity = '1';
            draggedItem = null;
        });
    }

     /*
            add task when clicked
        */ 
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTask(taskText);
            taskInput.value = ''; 
        }
    });

     /*
            add task when enter
        */ 
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                createTask(taskText);
                taskInput.value = ''; 
            }
        }
    });

     /*
           drag and rop
        */ 
    let draggedItem = null;

    taskList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(taskList, e.clientY);
        if (afterElement == null) {
            taskList.appendChild(draggedItem);
        } else {
            taskList.insertBefore(draggedItem, afterElement);
        }
    });

    function getDragAfterElement(taskList, y) {
        const draggableElements = [...taskList.querySelectorAll('li:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
