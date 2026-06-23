
console.log("app.js loaded");
const API = "http://127.0.0.1:5001/students";
console.log("Using API endpoint", API);
// ADD STUDENT
document.getElementById("studentForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    enrollment_number: document.getElementById("enrollmentNumber").value,
    email: document.getElementById("email").value,
    mobile: document.getElementById("mobileNumber").value,
    branch: document.getElementById("branch").value
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    const msg = await res.text();
    if (!res.ok) {
      document.getElementById("statusMsg").innerHTML =
        `<span class="error">${msg || 'Failed to add student'}</span>`;
      return;
    }

    document.getElementById("statusMsg").innerHTML =
      `<span class="success">${msg}</span>`;

    document.getElementById("studentForm").reset();
    loadStudents();

  } catch (err) {
    console.error('Add student error:', err);
    document.getElementById("statusMsg").innerHTML =
      `<span class="error">Error connecting to server: ${err.message}</span>`;
  }
});

// LOAD STUDENTS
async function loadStudents() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const table = document.getElementById("studentTableBody");
    table.innerHTML = "";

    if (data.length === 0) {
      table.innerHTML =
        `<tr><td colspan="5" class="empty-row">No students found</td></tr>`;
      return;
    }

    data.forEach(s => {
      table.innerHTML += `
        <tr>
          <td>${s.name}</td>
          <td>${s.enrollment_number}</td>
          <td>${s.email}</td>
          <td>${s.mobile}</td>
          <td>${s.branch}</td>
        </tr>
      `;
    });

  } catch (err) {
    console.log(err);
  }
}

// refresh button
document.getElementById("refreshBtn").addEventListener("click", loadStudents);

// initial load
loadStudents();