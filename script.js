
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

function completed(e){
    const el = e.currentTarget;
    console.log(el);
    let key = el.getAttribute("data-key");
    console.log(key);
    if(el.classList.contains("home-item__icon--highlight")){
        el.classList.remove("home-item__icon--highlight");
    }else{
        el.classList.add("home-item__icon--highlight");
    }

    todoArray[key].isCompleted = !todoArray[key].isCompleted;
    console.log("hellow", todoArray);
}

function handleClick(e) {
    if (taskField.value) {
        const todoItem = {
            title: taskField.value,
            isCompleted: false,
        };

        todoArray.push(todoItem);
        console.log(todoArray);
        taskField.value = '';

        myList.innerHTML = '';

        todoArray.reverse().forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('home-item');

            listItem.innerHTML = `
                <p class="home-item__title">${item.title}</p>
                <div class="home-item__icon" data-key="${index}">
                    <i class="bi bi-check-circle-fill"></i>
                </div>
            `;

            listItem.querySelector('.home-item__icon').addEventListener('click', completed);
            myList.appendChild(listItem);
        });
    }
}


function handleNavBtnClick(e){
    headerItemArray.forEach(button => button.classList.remove("header-item--active"));
    
    sectionsArray.forEach(section => section.style.display = "none");

    const id = e.target.id;
    console.log(id);
    const activeEl = document.getElementsByClassName(`${id}-section`);
    const activeArr = Array.from(activeEl);
    activeArr[0].style.display = "block";
    e.target.classList.add("header-item--active");
    completedList.innerHTML = "";
    incompleteList.innerHTML = "";

    if(id === "completed"){
            const filteredItem = todoArray.filter(item => item.isCompleted);
            

            filteredItem.forEach((item) => {
                const listItem = document.createElement('li');
                listItem.classList.add('completed-item');
                listItem.innerHTML = `<p class="completed-item__title">${item.title}</p>
                                                     <div class="completed-item__icon">
                                                         <i class="bi bi-check-circle-fill"></i>
                                                     </div>`;
                completedList.appendChild(listItem);
            });                

    }
    if(id === "incomplete"){
        console.log("Aaa")
        const filteredItem = todoArray.filter(item => !item.isCompleted);
        console.log(filteredItem);
        filteredItem.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.classList.add('incomplete-item');
            listItem.innerHTML = `<p class="incomplete-item__title">${item.title}</p>
                                 <div class="incomplete-item__icon">
                                     <i class="bi bi-check-circle-fill"></i>
                                 </div>`;
            incompleteList.appendChild(listItem);
        });
    }

}

headerItemArray.forEach(item => item.addEventListener("click", handleNavBtnClick));

addBtn.addEventListener("click", handleClick);


//npx sass --watch styles/sass/styles.scss:styles/styles.css