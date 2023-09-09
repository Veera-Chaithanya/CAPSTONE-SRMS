document.addEventListener("DOMContentLoaded", function () {
    const subjectInputs = document.querySelectorAll(".subject");
    const addResultButton = document.getElementById("addResult");
    const resultTableBody = document.querySelector("#resultTable tbody");

    // Initialize data from Local Storage
    const storedData = JSON.parse(localStorage.getItem("studentData")) || [];

    // Function to update the Local Storage
    function updateLocalStorage(data) {
        localStorage.setItem("studentData", JSON.stringify(data));
    }

    // Function to add a new result
    function addResultToLocalStorage(studentName, subjectMarks) {
        storedData.push({ studentName, subjectMarks });
        updateLocalStorage(storedData);
    }

    // Function to display results from Local Storage
    function displayResultsFromLocalStorage() {
        resultTableBody.innerHTML = "";
        storedData.forEach((data) => {
            const newRow = resultTableBody.insertRow();
            const cell1 = newRow.insertCell(0);
            cell1.textContent = data.studentName;

            for (let i = 0; i < 5; i++) {
                const cell = newRow.insertCell(i + 1);
                cell.textContent = data.subjectMarks[i];
            }

            const totalMarks = data.subjectMarks.reduce((acc, mark) => acc + mark, 0);
            const cell7 = newRow.insertCell(6);
            cell7.textContent = totalMarks;
        });
    }

    // Display results from Local Storage on page load
    displayResultsFromLocalStorage();

    addResultButton.addEventListener("click", function () {
        const studentName = document.getElementById("studentName").value;
        const subjectMarks = [];

        subjectInputs.forEach((subjectInput) => {
            subjectMarks.push(parseFloat(subjectInput.value) || 0);
        });

        // Add the result to Local Storage
        addResultToLocalStorage(studentName, subjectMarks);

        // Display results from Local Storage
        displayResultsFromLocalStorage();

        // Clear input fields
        document.getElementById("studentName").value = "";
        subjectInputs.forEach((subjectInput) => {
            subjectInput.value = "";
        });
    });
});
