const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'tasks.json');

function readTasks() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]');
    }

    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
}

function writeTasks(tasks) {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
}

function addTask(description) {
    const tasks = readTasks();

    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);

    console.log(`✅ Task added! (ID: ${newTask.id})`);
}

function listTasks(filterStatus = null) {
    const tasks = readTasks();

    if (tasks.length === 0) {
        console.log(`📭 No tasks found.`);
        return;
    }

    const filteredTasks = filterStatus
        ? tasks.filter(task => task.status === filterStatus)
        : tasks;

    if (filteredTasks.length === 0) {
        console.log(`📭 No tasks with status "${filterStatus}".`);
        return;
    }

    console.log(`📝 Task List${filterStatus ? ` (${filterStatus})` : ''}:`);
    filteredTasks.forEach(task => {
        console.log(`- [${task.status.toUpperCase()}] (${task.id}) ${task.description}`);
    });
}

function updateTask(id, description) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        console.log(`❌ No task with ID ${id} found.`);
        return;
    }

    task.description = description;
    task.updatedAt = new Date().toISOString();

    writeTasks(tasks);

    console.log(`✏️ Task updated! (${task.id}) ${task.description}`);
}

function deleteTask(id) {
    const tasks = readTasks();
    const index = tasks.findIndex(task => task.id === parseInt(id));

    if (index === -1) {
        console.log(`❌ No task with ID ${id} found.`);
        return;
    }

    const removedTask = tasks.splice(index, 1)[0];
    writeTasks(tasks);

    console.log(`🗑️ Task deleted! (${removedTask.id})`);
}

function markDone(id) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        console.log(`❌ No task with ID ${id} found.`);
        return;
    }

    task.status = 'done';
    task.updatedAt = new Date().toISOString();

    writeTasks(tasks);

    console.log(`✅ Task marked as done: (${task.id})`);
}

function markInProgress(id) {
    const tasks = readTasks();
    const task = tasks.find(task => task.id === parseInt(id));

    if (!task) {
        console.log(`❌ No task with ID ${id} found.`);
        return;
    }

    task.status = 'in-progress';
    task.updatedAt = new Date().toISOString();

    writeTasks(tasks);

    console.log(`🚧 Task marked as in-progress: (${task.id})`);
}

module.exports = {
    addTask,
    listTasks,
    deleteTask,
    updateTask,
    markDone,
    markInProgress
};
