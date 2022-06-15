const loginPage = document.querySelector('#login');
const projectsListPage = document.querySelector('#projects-list');

// --------------------------------------------------
const button = document.getElementById('button');
const adminName = document.querySelector('#adminName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

// --------------------------------------------------

button.addEventListener('click', () => {
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
            console.log(data);
            localStorage.setItem("token", data.token)

            showProjectsList(); // ¯\_(ツ)_/¯ 
            /**
             * Inch arecinq
             * 1. Nor block stexcecinq id=projects-list
             * 2. JS um querySelector ov vekalecinq
             * 3. CSS um nor class stexcecinq .hide { display: none; } // aysinqn en element@ ov es class@ uni - diplay: none; a aysinqn chi erevalu tex chi gravelu
             * 4. Login ic heto then i mej kanchecinq showProjectsList() function@
             * 5. showProjectsList function@ - login i elementin (block) avelacnuma hide class@ - (point 3) u projets-list block i vraic el hanecinq
             * 6. That's all
             */
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

function getProjects() {
    return fetch('/projects', {
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
        .then((res) => {
            return res.json();
        })
    //? TODO fetch projects from the backend
    // convert it to JSON
}

function renderProjects(projects) {
    projects.forEach((project) => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('h3');

        title.innerHTML = project.title;
        image.src = project.photos[1];

        div.appendChild(image);
        div.appendChild(title);

        projectsListPage.appendChild(div);
    })


}

// fetch('/projects', {
//     headers: {
//         Authorization: localStorage.getItem("token")
//     }
// })
//     .then((admin) => {
//         console.log(admin);
//     });


