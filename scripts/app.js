const init = () => {

    const inputAddTodo = document.querySelector("#addTodo"),
        list = document.querySelector(".todo-list");

    let tasks = [];


    const createTask = () => {

        let new_task = {
            title: "",
            time: new Date().toLocaleString(),
            checked: false,
            subTasks: {}
        }

        // Основной список - элемент списка
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");

        new_task.title = inputAddTodo.value;
        listItem.innerHTML = `
            <div class="todo-item-header">
                <span class="todo-item__content">${new_task.title} Время: ${new_task.time}</span>
                <div class="todo-item-buttons">
                    <a href="#" class="button button--round button--plus todo-item-add-subItem">+</a>
                    <a href="#" class="button button--round button--trash">Удалить</a>
                </div>
            </div>
        `;

        tasks.push(new_task);
        saveTasks(tasks);
        list.appendChild(listItem);
        inputAddTodo.value = "";
        console.log("Создание задачи");
    }

    const createSubTask = (event) => {
        event.preventDefault();
    }


    const deleteTask = (event) => {
        console.log(event.parentElement);
        console.log("Удаление задачи");
    }

    const renderTask = () => {
        if (localStorage.getItem("todos") != null) {
            tasks = JSON.parse(localStorage.getItem('todos'));
            let currentTodo = "";
            for (let todo of tasks) {
                currentTodo += `
                <li class="todo-item">
                    <div class="todo-item-header">
                        <span class="todo-item__content ${todo.checked ? "item--checked" : ""}">${todo.title} Время: ${todo.time}</span>
                            <div class="todo-item-buttons">
                                <a href="#" class="button button--round button--plus todo-item-add-subItem">+</a>
                                <a href="#" class="button button--round button--trash">Удалить</a>
                            </div>
                    </div>
                </li>`;
            }
            list.innerHTML += currentTodo;
            let deleteButtons = document.querySelectorAll(".button--trash");

            deleteButtons.forEach((trashButton) => {
                console.log(trashButton);
                trashButton.addEventListener("click", deleteTask);
            })
        } else {
            tasks = [];
            console.log("localStorage пустой!");
        }
        console.log("Вывод задач");
    }



    const saveTasks = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const changeState = (event) => {
        console.log("Изменение состояния");
    }

    inputAddTodo.addEventListener("keypress", (key) => {
        const enterKey = 13;
        if (key.charCode == enterKey) {
            createTask();
        }
    })

    renderTask();


};

window.addEventListener("DOMContentLoaded", init);