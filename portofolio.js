document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("project-form");
  const tableBody = document.getElementById("table-body");
  const resetBtn = document.getElementById("reset-btn");

  loadStoredProjects();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateForm()) {
      const projectData = {
        name: document.getElementById("project-name").value.trim(),
        desc: document.getElementById("project-desc").value.trim(),
        url: document.getElementById("project-url").value.trim(),
        tech: document.getElementById("project-tech").value,
        date: document.getElementById("project-date").value,
      };

      addProjectToTable(projectData);
      saveProjectToStorage(projectData);

      form.reset();
      clearErrors();
    }
  });

  resetBtn.addEventListener("click", () => {
    clearErrors();
  });

  function validateForm() {
    let isValid = true;
    clearErrors();

    const nameInput = document.getElementById("project-name");
    const descInput = document.getElementById("project-desc");
    const urlInput = document.getElementById("project-url");
    const techSelect = document.getElementById("project-tech");
    const dateInput = document.getElementById("project-date");

    if (nameInput.value.trim() === "") {
      showError("name-error", "Numele proiectului este obligatoriu.");
      isValid = false;
    }

    if (descInput.value.trim().length < 10) {
      showError(
        "desc-error",
        "Descrierea trebuie să aibă cel puțin 10 caractere.",
      );
      isValid = false;
    }

    if (!urlInput.validity.valid || urlInput.value.trim() === "") {
      showError(
        "url-error",
        "Te rugăm să introduci un URL valid (ex: https://example.com).",
      );
      isValid = false;
    }

    if (techSelect.value === "") {
      showError("tech-error", "Selectează o tehnologie principală.");
      isValid = false;
    }

    if (dateInput.value === "") {
      showError("date-error", "Data finalizării este obligatorie.");
      isValid = false;
    }

    return isValid;
  }

  function showError(errorId, message) {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.textContent = message;
      const inputId = errorId.replace("-error", "");
      const targetInput = document.getElementById(`project-${inputId}`);
      if (targetInput) targetInput.setAttribute("aria-invalid", "true");
    }
  }

  function clearErrors() {
    document
      .querySelectorAll(".error-message")
      .forEach((span) => (span.textContent = ""));
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      input.removeAttribute("aria-invalid");
    });
  }

  function addProjectToTable(project) {
    const row = document.createElement("tr");
    row.classList.add("new-row");

    let localThumb = "images/bogdan.png";

    if (project.tech === "C++" || project.tech === "Python") {
      localThumb = "images/Login-AuthUI.png";
    } else if (project.tech === "HTML/CSS" || project.tech === "JavaScript") {
      localThumb = "images/github.png";
    }

    row.innerHTML = `
        <td><img src="${localThumb}" alt="Miniatură proiect ${escapeHTML(project.name)}" class="table-thumb" loading="lazy" width="50" height="50"></td>
        <td><strong>${escapeHTML(project.name)}</strong></td>
        <td>${escapeHTML(project.desc)}</td>
        <td><span class="badge">${escapeHTML(project.tech)}</span></td>
        <td>${project.date}</td>
        <td><a href="${escapeHTML(project.url)}" target="_blank" rel="noopener noreferrer">Vezi Proiect</a></td>
    `;

    tableBody.appendChild(row);
  }

  function escapeHTML(str) {
    return str.replace(
      /[&<>'"]/g,
      (tag) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[tag] || tag,
    );
  }

  function saveProjectToStorage(project) {
    let projects = JSON.parse(localStorage.getItem("hw3_projects")) || [];
    projects.push(project);
    localStorage.setItem("hw3_projects", JSON.stringify(projects));
  }

  function loadStoredProjects() {
    let projects = JSON.parse(localStorage.getItem("hw3_projects")) || [];
    projects.forEach((project) => addProjectToTable(project));
  }
});
