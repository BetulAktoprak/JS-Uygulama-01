const cardContainer = document.getElementById("cardContainer");
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.reverse().forEach(todo => addTodoToDom(todo, false));
}

function saveTodos() {
    const todos = Array.from(cardContainer.querySelectorAll(".card")).map(card => card.querySelector("p").textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToDom(todoText, save = true) {
    const cardElement = document.createElement("div");
    cardElement.className = "card border-success  text-center mb-3";
    cardElement.style.width = "18rem";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const p = document.createElement("p");
    p.className = "card-text fw-bolder text-uppercase";
    p.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Sil";
    deleteBtn.className = "btn btn-outline-danger";
    deleteBtn.addEventListener("click", () => {
        cardElement.remove();
        saveTodos();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Düzenle";
    editBtn.className = "btn btn-outline-warning m-1";

    editBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control mb-2";
        input.value = p.textContent;

        const saveEditBtn = document.createElement("button");
        saveEditBtn.textContent = "Kaydet";
        saveEditBtn.className = "btn btn-outline-success m-2";

        saveEditBtn.addEventListener("click", () => {
            const newValue = input.value.trim();
            if(newValue){
                p.textContent = newValue;
                saveTodos();
                saveEditBtn.remove();
                input.remove();
                cardBody.appendChild(editBtn);
                cardBody.appendChild(deleteBtn);
            }
        });

        editBtn.remove();
        deleteBtn.remove();
        cardBody.appendChild(input);
        cardBody.appendChild(saveEditBtn);
    })

    cardBody.appendChild(p);
    cardBody.appendChild(editBtn);
    cardBody.appendChild(deleteBtn);
    cardElement.appendChild(cardBody);
    cardContainer.prepend(cardElement);

    if(save){
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.unshift(todoText);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    
}

addBtn.addEventListener("click", () => {
    if(todoInput.value.trim() !== ""){
        addTodoToDom(todoInput.value);
        todoInput.value = "";
    }
});

clearBtn.addEventListener("click", () => {
    cardContainer.innerHTML = "";
    localStorage.removeItem("todos");
});

window.addEventListener("load", loadTodos());