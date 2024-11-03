class TodoList {
    constructor() {
        this.todoList = [];
    }
    add(todo) {
        this.todoList.push(todo);
        console.log(this.todoList)
    }
    remove(index) {
        this.todoList.splice(index, 1);
    }
}

class TodoApp {
    constructor() {
        this.addTodoBtn = document.querySelector('.add-todo-btn');
        this.todoList = new TodoList();
        this.input = document.querySelector(".todo-input");
        this.ul = document.querySelector(".todo-list");
        this.inputContainer = document.querySelector(".input-container");
        this.sortBtn = document.querySelector(".sort-btn");
        this.inputCollapseBtn = document.querySelector(".collapse-btn");

        // Initially hide the input container
        this.inputContainer.style.display = "none";
    }

    init() {
        this.ul.style.display = "none";
        this.addTodoBtn.addEventListener("click", () => {
            // Toggle the input container visibility
            this.inputContainer.style.display = 
                this.inputContainer.style.display === "block" ? "none" : "block";

            // Focus on input when shown
            if (this.inputContainer.style.display === "block") {
                this.input.focus();
            }
        });

        this.input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                this.addTodo();
            }
        });

        this.inputCollapseBtn.addEventListener("click", () => {
            this.input.value = "";
            this.inputContainer.style.display = "none";
        })

        //TODO=> Adding the sort method

        this.sortBtn.addEventListener("click", () => {
            if(this.todoList.todoList.length <= 1 ){
                alert("You must have at least 2 todos to sort");
            }else{
                this.sortBtn.children[0].src = './images/sort-arrow-up-black.svg';
                this.ul.innerHTML = '';
                this.todoList.todoList.sort().forEach((sortedTodo) => {
                    this.addTodo(sortedTodo);
                })
            }
        })


        this.addTodoBtn.addEventListener("click", () => this.addTodo());
    }

    addTodo(todoText) {
        if(!todoText) { 
            todoText = this.input.value.trim(); 
            this.sortBtn.children[0].src = './images/sort-arrow-down-black.svg';
        }

        if (todoText) {
            this.todoList.add(todoText); // Add to TodoList array
            
            // Create new list item elements
            let li = document.createElement("li");
            let deleteLi = document.createElement("button");
            let deleteBtnImg = document.createElement("img");

            // Add class and image for delete button
            deleteLi.classList.add("todo-delete");
            deleteBtnImg.src = 'images/cross.svg';
            deleteLi.appendChild(deleteBtnImg);

            li.textContent = todoText; // Set the text of the list item
            li.appendChild(deleteLi);

            // Append new li to the ul
            this.ul.appendChild(li);

            // Clear input field and hide input container
            this.input.value = "";

            //!=> Make the display of the ul block
            this.ul.style.display = "block";

            // Delete functionality for each item
            deleteLi.addEventListener("click", () => {
                const index = Array.from(this.ul.children).indexOf(li);
                this.todoList.remove(index); // Remove from TodoList array
                li.remove(); // Remove the element from the DOM
            });

            //!=> Adding event listener to the li after creating

            li.addEventListener("dblclick", (e) => {
                this.inputContainer.style.display = "block";
                this.input.value = e.target.textContent;
                const index = Array.from(this.ul.children).indexOf(li);
                this.todoList.remove(index); // Remove from TodoList array
                li.remove(); // Remove the element from the DOM
                
            });



        }else if(!todoText && this.inputContainer.style.display === "none"){
            alert("You have to write something!!");
        }
    }
}

const application = new TodoApp();
application.init();