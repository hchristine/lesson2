const loginPage = document.querySelector('#login');
const projectsListPage = document.querySelector('#projects-list');
const createProjectPage = document.querySelector('#create-project');
const singleProject = document.getElementById('single-project');

// --------------------------------------------------
const loginButton = document.getElementById('button');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const createProjectButton = document.querySelector('#new-project');
const saveProjectButton = document.querySelector('#save-project');

// --------------------------------------------------
if (location.search.includes("projectId")) {
    const projectId = location.search.substring(11);
    getById(projectId)
        .then((project) => {
            renderSingleProject(project);
        });
}
else {
    loginPage.classList.remove("hide");
}



loginButton.addEventListener('click', () => {
    const emailStr = email.value;
    const passwordStr = password.value;

    fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailStr,
            password: passwordStr
        })
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.token);

            showProjectsList();
        });
});

function showProjectsList() {
    loginPage.classList.add('hide');
    projectsListPage.classList.remove('hide');

    getProjects()
        .then((projects) => {
            renderProjects(projects);
        })
}

function showProjectCreatingPage() {
    projectsListPage.classList.add('hide');
    createProjectPage.classList.remove('hide');
};

createProjectButton.addEventListener('click', () => {
    showProjectCreatingPage();
});

saveProjectButton.addEventListener('click', () => {
    const files = document.getElementById('img').files;

    const promises = [];
    for (let i = 0; i < files.length; i++) {
        const photo = files[i];
        const formData = new FormData();
        formData.append('image', photo);

        const promise = fetch('/admin/upload', {
            headers: {
                Authorization: localStorage.getItem("token")
            },
            method: "POST",
            body: formData
        })
            .then((res) => res.json())

        promises.push(promise);
    }

    Promise.all(promises)
        .then((responses) => {
            const photos = responses.map((photo) => photo.path);
            const title = document.getElementById('title').value;
            createProject(photos, title);
        })
});

function createProject(photos, title) {
    fetch('/projects', {
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
            title,
            photos
        })
    })
}

function getProjects() {
    return fetch('/projects', {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then((res) => {
            return res.json();
        })
}

function getById(projectId) {
    return fetch(`/projects/${projectId}`, {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then((res) => {
            return res.json();
        })
}

function renderProjects(projects) {
    projects.forEach((project) => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('h3');

        title.innerHTML = project.title;
        image.src = project.photos[0];

        div.appendChild(image);
        div.appendChild(title);

        projectsListPage.appendChild(div);
    })
}

function renderSingleProject(project) {
    const div = document.createElement('div');
    for (let i = 0; i < project.photos.length; i++) {
        const image = document.createElement('img');
        image.src = project.photos[i];

        div.appendChild(image);
        singleProject.appendChild(div);
    }
}

