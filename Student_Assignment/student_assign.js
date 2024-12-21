document.addEventListener('DOMContentLoaded', function () {
    const assignmentsContainer = document.getElementById('assignmentsContainer');

    function loadAssignments() {
        const assignments = localStorage.getItem('assignments');
        return assignments ? JSON.parse(assignments) : [];
    }

    function displayAssignments() {
        const assignments = loadAssignments();
        assignmentsContainer.innerHTML = '';

        assignments.forEach((assignment, index) => {
            const daysLeft = Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

            const assignmentElement = document.createElement('div');
            assignmentElement.classList.add('assignment-container', 'mb-3', 'p-3', 'border', 'rounded');
            assignmentElement.innerHTML = `
                <div class="assignment-header d-flex justify-content-between align-items-center">
                    <h5>${assignment.subject}</h5>
                </div>
                <div class="assignment-info mt-2">
                    <p>Task to do in brief: ${assignment.description}</p>
                    <p>Last day to submit: ${assignment.dueDate}</p>
                    <p>No. of days or hours left: ${daysLeft} days</p>
                    ${assignment.file ? `<a href="${assignment.file}" target="_blank" class="d-block mt-2">Attached File: ${assignment.fileName}</a>` : ''}
                </div>
                <div class="assignment-submit mt-2">
                    <label for="file-upload-${index}" class="upload-button btn btn-primary ml-2">Upload</label>
                    <input type="file" id="file-upload-${index}" style="display: none;" accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx">
                    <button class="submit-button btn btn-success">Submit</button>
                    <span class="tick-button ml-2 text-success font-weight-bold" style="display: none;">Done</span>
                </div>
            `;

            const submitButton = assignmentElement.querySelector('.submit-button');
            const uploadInput = assignmentElement.querySelector(`#file-upload-${index}`);
            submitButton.addEventListener('click', () => {
                if (uploadInput.files.length > 0) {
                    alert('Assignment submitted!');
                    assignments.splice(index, 1);
                    localStorage.setItem('assignments', JSON.stringify(assignments));
                    displayAssignments();
                } else {
                    alert('Please upload a file before submitting.');
                }
            });

            assignmentsContainer.appendChild(assignmentElement);
        });
    }

    displayAssignments();
});

function redirectToDashboard() {
    window.location.href = 'student_dash.html'; // Modify this to your actual dashboard URL
}
