async function updateUser(user) {
    try {
        const response = await fetch(`/api/user/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

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

async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/user/${userId}`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}

async function requestAllUsers() {
    try {
        const response = await fetch("/api/user");
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        return await response.json(); // Возвращаем пользователей как JSON
    } catch (error) {
        console.error(error);
        return []; // Возвращаем пустой массив в случае ошибки
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
        console.error(error)
        return [];
    }
}

function renderNavbarText(user) {
    const navbarTextBody = document.getElementById("navbarText");
    navbarTextBody.innerHTML = `
    <span class="fw-bold">${user.name}</span> with roles : <span>${user.roles.map(role => role).join(",")}</span>
    `
}

function renderUsersTable(users) {
    const usersTableBody = document.getElementById("usersTableBody");
    usersTableBody.innerHTML = "";// Очищаем таблицу перед заполнением

    users.forEach(user => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.sername}</td>
            <td>${user.sex }</td>
            <td>${user.roles.map(role => role).join(",")}</td>
            <td><button class="btn btn-info btn-sm" onclick="openEditModal(${JSON.stringify(user).replace(/"/g, '&quot;')})">Edit</button></td>
            <td><button class="btn btn-danger btn-sm" onclick="openDeleteModal(${JSON.stringify(user).replace(/"/g, '&quot;')})">Delete</button></td>
        `;
        usersTableBody.appendChild(row);
    });
}

async function openEditModal(user) {
    const roles = await requestAllRoles();
    console.log(roles);
    document.getElementById("editUserId").value = user.id;
    document.getElementById("editUserName").value = user.name;
    document.getElementById("editUserPassword").value ="";
    document.getElementById("editUserSername").value = user.sername;
    document.getElementById("editUserSex").value = user.sex;
    document.getElementById("editUserRoles").innerHTML = roles.map(role =>
        `<option>${role.name}</option>`).join("");
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    editModal.show();
}

function openDeleteModal(user) {
    document.getElementById("deleteUserId").value = user.id;
    document.getElementById("deleteUserName").value = user.name;
    document.getElementById("deleteUserSername").value = user.sername;
    document.getElementById("deleteUserSex").value = user.sex;
    document.getElementById("deleteUserRoles").innerHTML = user.roles.map(role =>
        `<option value="${role}" >${role}</option>`).join("");
    const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
    deleteModal.show();
}

async function initNavbarText() {
    const user = await requestAuthorizedUser(name);
    renderNavbarText(user);
}

async function initUsersTable() {
    const users = await requestAllUsers(); // Получаем пользователей
    renderUsersTable(users); // Рендерим таблицу
}

async function handleEditSubmit() {
    const rolesSelect = document.getElementById("editUserRoles");
    const selectedRoles = Array.from(rolesSelect.selectedOptions).map(option => option.value);
    const user = {
        id: document.getElementById("editUserId").value,
        name: document.getElementById("editUserName").value,
        password: document.getElementById("editUserPassword").value,
        sername: document.getElementById("editUserSername").value,
        sex: document.getElementById("editUserSex").value,
        roles: selectedRoles
    };
    await updateUser(user);
    await initUsersTable();
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();

}

async function handleDeleteSubmit() {
    const userId = document.getElementById("deleteUserId").value;
    await deleteUser(userId);
    await initUsersTable();
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
}

document.addEventListener("DOMContentLoaded", initNavbarText);
document.addEventListener("DOMContentLoaded", initUsersTable);
document.getElementById("submitEdit").addEventListener("click", handleEditSubmit);
document.getElementById("submitDelete").addEventListener("click", handleDeleteSubmit);



