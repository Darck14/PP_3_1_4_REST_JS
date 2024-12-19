async function requestAuthorizedUser() {
    try {
        const response = await fetch(`/api/user/authorized`, {
        });
        if (!response.ok) {
            throw new Error(`Failed to request user: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function requestAllRoles() {
    try {
        const response = await fetch("/api/role");
        if(!response.ok) {
            throw new Error(`Failed to fetch roles: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error()
        return [];
    }
}

async function addUser(user) {
    try {
        const response = await fetch(`/api/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`Failed to add user: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

function renderNavbarText(user) {
    const navbarTextBody = document.getElementById("navbarText");
    navbarTextBody.innerHTML = `
    <span class="fw-bold">${user.name}</span> with roles : <span>${user.roles.map(role => role).join(",")}</span>
    `
}

async function renderRowRole() {
    const role = await requestAllRoles();
    const rowRole = document.getElementById("newUserRole");
    rowRole.innerHTML = role.map(role => `<option>${role.name}</option>`).join("");
}

async function handleAddUserSubmit() {
    const user = {
        id: 0,
        name: document.getElementById("newUserName").value,
        password: document.getElementById("newUserPassword").value,
        sername: document.getElementById("newUserSername").value,
        sex: document.getElementById("newUserSex").value,
        roles: document.getElementById("newUserRole").value.split(",").map(role => role)
    };
    await addUser(user);
    alert('Пользователь создан');
}

async function initNavbarText() {
    const user = await requestAuthorizedUser(name);
    renderNavbarText(user);
}

document.addEventListener("DOMContentLoaded", initNavbarText);
document.addEventListener("DOMContentLoaded", renderRowRole);
document.getElementById("submitAddUser").addEventListener("click", handleAddUserSubmit);