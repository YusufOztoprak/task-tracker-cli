const {
    addTask,
    listTasks,
    deleteTask,
    updateTask,
    markDone,
    markInProgress
} = require('./taskManager');

const args = process.argv.slice(2);

const command = args[0];
const value = args[1];

switch (command) {
    case 'add':
        if (!value) {
            console.log('❌ Please enter a task description.');
        } else {
            addTask(value);
        }
        break;

    case 'list':
        listTasks(value);
        break;

    case 'delete':
        if (!value) {
            console.log('❌ Please enter a task ID to delete.');
        } else {
            deleteTask(value);
        }
        break;

    case 'update':
        const id = value;
        const newDescription = args.slice(2).join(' ');

        if (!id || !newDescription) {
            console.log('❌ Please enter task ID and new description.');
        } else {
            updateTask(id, newDescription);
        }
        break;

    case 'mark-done':
        if (!value) {
            console.log('❌ Please enter task ID to mark as done.');
        } else {
            markDone(value);
        }
        break;

    case 'mark-in-progress':
        if (!value) {
            console.log('❌ Please enter task ID to mark as in-progress.');
        } else {
            markInProgress(value);
        }
        break;

    default:
        console.log(`❓ Unknown command: ${command}
Available commands:
- add "task description"
- list [todo|done|in-progress]
- delete <task_id>
- update <task_id> "new description"
- mark-done <task_id>
- mark-in-progress <task_id>`);
}
