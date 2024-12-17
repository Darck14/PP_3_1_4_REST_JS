// Функция для обновления пользователя
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
        console.error("Error updating user:", error);
    }
}

// Функция для выполнения DELETE-запроса
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

// Функция для выполнения запроса всех пользователей на сервер
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
        console.error()
        return [];
    }
}

// Функция для рендеринга таблицы с пользователями
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

// Функция для открытия модального окна Edit
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

// Функция для открытия модального окна Delete
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

// Основная функция для инициализации загрузки данных и рендеринга таблицы
async function initUsersTable() {
    const users = await requestAllUsers(); // Получаем пользователей
    renderUsersTable(users); // Рендерим таблицу
}

// Обработка события для кнопки Submit в Edit Modal
async function handleEditSubmit() {
    const user = {
        id: document.getElementById("editUserId").value,
        name: document.getElementById("editUserName").value,
        password: document.getElementById("editUserPassword").value,
        sername: document.getElementById("editUserSername").value,
        sex: document.getElementById("editUserSex").value,
        roles: document.getElementById("editUserRoles").value.split(",").map(role => role)
    };
    await updateUser(user);
    await initUsersTable(); // Обновляем таблицу
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
}

// Обработка события для кнопки Submit в Delete Modal
async function handleDeleteSubmit() {
    const userId = document.getElementById("deleteUserId").textContent;
    await deleteUser(userId);
    await initUsersTable(); // Обновляем таблицу
    bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
}

//Запускаем основную функцию при загрузке страницы
document.addEventListener("DOMContentLoaded", initUsersTable);
document.getElementById("submitEdit").addEventListener("click", handleEditSubmit);
document.getElementById("submitDelete").addEventListener("click", handleDeleteSubmit);



