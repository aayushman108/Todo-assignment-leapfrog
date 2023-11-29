
const taskField = document.getElementById('task');

let myList = document.getElementById('my-list');
let completedList = document.getElementById('completed-list');
let incompleteList = document.getElementById('incomplete-list');


const addBtn = document.getElementById('add-todo');

const homeBtn = document.getElementById('home');
const completedBtn = document.getElementById('completed');
const incompleteBtn = document.getElementById('incomplete');

let headerItemBtns = document.getElementsByClassName("header-item");
let headerItemArray = Array.from(headerItemBtns);

let sections = document.getElementsByTagName('section');
let sectionsArray = Array.from(sections);

const todoArray = [];

function completed(k){
    let key = k.getAttribute("key");
    todoArray[key].isCompleted = !todoArray[key].isCompleted;
}

function handleClick(e){
    if(taskField.value){
        myList.innerHTML = "";
        const todoItem = {
            title : taskField.value,
            isCompleted : false,
        }
        todoArray.push(todoItem);
        console.log(todoArray);
        taskField.value = '';
        todoArray.reverse().map((item, index) => 
        myList.innerHTML += `<li class="home-item">
                                <p class="home-item__title">${item.title}</p>
                                <div class="home-item__icon">
                                    <i class="bi bi-check-circle-fill" key=${index} onclick="completed(this)"></i>
                                </div>
                            </li>`)

    }
}


function handleNavBtnClick(e){
    headerItemArray.forEach(button => button.classList.remove("header-item--active"));
    
    sectionsArray.forEach(section => section.style.display = "none");

    const id = e.target.id;
    const activeEl = document.getElementsByClassName(`${id}-section`);
    const activeArr = Array.from(activeEl);
    activeArr[0].style.display = "block";
    e.target.classList.add("header-item--active");
    completedList.innerHTML = "";
    incompleteList.innerHTML = "";

    if(id === "completed-btn"){
            const filteredItem = todoArray.filter(item => item.isCompleted);
            filteredItem.map((item, index) => 
            completedList.innerHTML += `<li class="completed-item">
                                <p class="completed-item__title">${item.title}</p>
                                <div class="completed-item__icon">
                                    <i class="bi bi-check-circle-fill" key=${item.title}></i>
                                </div>
                            </li>`)

    }
    if(id === "incomplete-btn"){
        const filteredItem = todoArray.filter(item => !item.isCompleted);
        filteredItem.map((item, index) => 
         incompleteList.innerHTML += `<li class="incomplete-item">
                                 <p class="incomplete-item__title">${item.title}</p>
                                <div class="incomplete-item__icon">
                                     <i class="bi bi-check-circle-fill" key=${item.title}></i>
                                 </div>
                             </li>`)
    }

}

headerItemArray.forEach(item => item.addEventListener("click", handleNavBtnClick));

addBtn.addEventListener("click", handleClick);


//npx sass --watch styles/sass/styles.scss:styles/styles.css