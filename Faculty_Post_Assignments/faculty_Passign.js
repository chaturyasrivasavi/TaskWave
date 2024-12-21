document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todoForm');
    const taskSelect = document.getElementById('taskSelect');
    const taskDescription = document.getElementById('taskDescription');
    const taskFile = document.getElementById('taskFile');
    const dueDate = document.getElementById('dueDate');
    const responseMessage = document.getElementById('responseMessage');

    function saveAssignments(assignments) {
        localStorage.setItem('assignments', JSON.stringify(assignments));
    }

    function loadAssignments() {
        const assignments = localStorage.getItem('assignments');
        return assignments ? JSON.parse(assignments) : [];
    }

    function addTask(task) {
        const assignments = loadAssignments();
        assignments.push(task);
        saveAssignments(assignments);
    }

    function readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    todoForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const subject = taskSelect.value;
        const description = taskDescription.value.trim();
        const file = taskFile.files.length > 0 ? taskFile.files[0] : null;
        const date = dueDate.value;

        if (subject && description && date) {
            let fileData = '';
            if (file) {
                fileData = await readFile(file);
            }

            addTask({
                subject: subject,
                description: description,
                file: fileData,
                fileName: file ? file.name : '',
                dueDate: date
            });

            taskSelect.value = '';
            taskDescription.value = '';
            taskFile.value = '';
            dueDate.value = '';

            responseMessage.style.display = 'block';
            responseMessage.innerText = 'Your task is submitted.';
            setTimeout(() => {
                responseMessage.style.display = 'none';
            }, 3000);
        } else {
            alert('Please provide all details: subject, description, and due date.');
        }
    });
});

function redirectToDashboard() {
    window.location.href = 'student_dash.html'; // Modify this to your actual dashboard URL
}
