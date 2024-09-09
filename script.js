document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('add-category-btn').addEventListener('click', addCategory);

let categories = ['All'];

function addCategory() {
    const categoryName = prompt('Enter category name:');
    if (categoryName && !categories.includes(categoryName)) {
        categories.push(categoryName);
        renderCategories();
    }
}

function renderCategories() {
    const categoriesContainer = document.getElementById('categories');
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'category';
        categoryElement.textContent = category;
        categoryElement.addEventListener('click', () => filterTasks(category));
        categoriesContainer.appendChild(categoryElement);
    });
    categoriesContainer.firstChild.classList.add('active');
}

function filterTasks(category) {
    document.querySelectorAll('.category').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    const tasks = document.querySelectorAll('#todo-list li');
    tasks.forEach(task => {
        if (task.dataset.category === category || category === 'All') {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('due-date').value;
    const activeCategory = document.querySelector('.category.active')?.textContent || 'Default';

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.dataset.category = activeCategory;
    
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `<span>${taskText}</span>`;
    if (dueDate) {
        taskInfo.innerHTML += `<span class="task-date">Due: ${dueDate}</span>`;
    }

    taskItem.appendChild(taskInfo);

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);

    document.getElementById('todo-list').appendChild(taskItem);

    taskInput.value = '';
    document.getElementById('due-date').value = '';
}

// Initial render of categories
renderCategories();

document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('add-category-btn').addEventListener('click', addCategory);
document.getElementById('theme-toggle').addEventListener('change', toggleTheme);

function toggleTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode', !isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-mode');
    document.getElementById('theme-toggle').checked = savedTheme === 'light';
}

loadTheme();

document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('add-category-btn').addEventListener('click', addCategory);
document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
document.getElementById('sort-date-btn').addEventListener('click', sortTasksByDate);
document.getElementById('sort-priority-btn').addEventListener('click', sortTasksByPriority);

function toggleTheme() {
    const isLightMode = document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode', !isLightMode);
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.add(savedTheme + '-mode');
    document.getElementById('theme-toggle').checked = savedTheme === 'light';
}

loadTheme();

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('due-date').value;
    const priority = prompt('Set priority: low, medium, high').toLowerCase();
    const activeCategory = document.querySelector('.category.active')?.textContent || 'Default';

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.dataset.category = activeCategory;
    taskItem.dataset.dueDate = dueDate || '';
    taskItem.dataset.priority = priority || 'low';

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `<span>${taskText}</span>`;
    if (dueDate) {
        taskInfo.innerHTML += `<span class="task-date">Due: ${dueDate}</span>`;
    }

    taskItem.classList.add(`priority-${priority}`);
    taskItem.appendChild(taskInfo);

    taskItem.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.addEventListener('click', () => {
        taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);

    document.getElementById('todo-list').appendChild(taskItem);

    taskInput.value = '';
    document.getElementById('due-date').value = '';
}

function sortTasksByDate() {
    const tasks = [...document.querySelectorAll('#todo-list li')];
    tasks.sort((a, b) => new Date(a.dataset.dueDate) - new Date(b.dataset.dueDate));
    tasks.forEach(task => document.getElementById('todo-list').appendChild(task));
}

function sortTasksByPriority() {
    const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
    const tasks = [...document.querySelectorAll('#todo-list li')];
    tasks.sort((a, b) => priorityOrder[b.dataset.priority] - priorityOrder[a.dataset.priority]);
    tasks.forEach(task => document.getElementById('todo-list').appendChild(task));
}


document.getElementById('toggle-view-btn').addEventListener('click', toggleView);

function toggleView() {
    const todoList = document.getElementById('todo-list');
    const isGridView = todoList.classList.toggle('grid-view');
    todoList.classList.toggle('list-view', !isGridView);
    localStorage.setItem('view', isGridView ? 'grid' : 'list');
}

function loadView() {
    const savedView = localStorage.getItem('view') || 'list';
    const todoList = document.getElementById('todo-list');
    todoList.classList.add(savedView + '-view');
}

loadView();


document.getElementById('add-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value.trim();
    const dueDate = document.getElementById('due-date').value;
    const priority = prompt('Set priority: low, medium, high').toLowerCase();
    const activeCategory = document.querySelector('.category.active')?.textContent || 'Default';

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.dataset.category = activeCategory;
    taskItem.dataset.dueDate = dueDate || '';
    taskItem.dataset.priority = priority || 'low';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => toggleTaskCompletion(taskItem, checkbox));

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `<span>${taskText}</span>`;
    if (dueDate) {
        taskInfo.innerHTML += `<span class="task-date">Due: ${dueDate}</span>`;
    }

    taskItem.classList.add(`priority-${priority}`);
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskInfo);

    document.getElementById('todo-list').appendChild(taskItem);

    taskInput.value = '';
    document.getElementById('due-date').value = '';
}

function toggleTaskCompletion(taskItem, checkbox) {
    const completedTasksList = document.getElementById('completed-tasks');
    const todoList = document.getElementById('todo-list');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
        completedTasksList.appendChild(taskItem);
    } else {
        taskItem.classList.remove('completed');
        todoList.appendChild(taskItem);
    }
}


document.getElementById('toggle-completed-btn').addEventListener('click', function() {
    const container = document.getElementById('completed-tasks-container');
    const isVisible = container.style.display !== 'none';

    container.style.display = isVisible ? 'none' : 'block';
    this.textContent = isVisible ? 'Show Completed Tasks' : 'Hide Completed Tasks';
});

function toggleTaskCompletion(taskItem, checkbox) {
    const completedTasksList = document.getElementById('completed-tasks');
    const todoList = document.getElementById('todo-list');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
        completedTasksList.appendChild(taskItem);
    } else {
        taskItem.classList.remove('completed');
        todoList.appendChild(taskItem);
    }
}
