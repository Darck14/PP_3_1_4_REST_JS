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

function renderNavbarText(user) {
    const navbarTextBody = document.getElementById("navbarText");
    navbarTextBody.innerHTML = `
    <span class="fw-bold">${user.name}</span> with roles : <span>${user.roles.map(role => role).join(",")}</span>
    `
}

function renderUserTable(user) {
    const usersTableBody = document.getElementById("usersTableBody");
    usersTableBody.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.sername}</td>
            <td>${user.sex }</td>
            <td>${user.roles.map(role => role).join(",")}</td>
        `;
        usersTableBody.appendChild(row);
}

async function initNavbarText() {
    const user = await requestAuthorizedUser(name);
    renderNavbarText(user);
}

async function initUserTable() {
    const user = await requestAuthorizedUser(name);
    renderUserTable(user);
}

document.addEventListener("DOMContentLoaded", initNavbarText);
document.addEventListener("DOMContentLoaded", initUserTable);