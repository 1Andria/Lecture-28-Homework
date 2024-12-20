let form = document.getElementById("form");
let input = document.getElementById("input");
let tasksUl = document.getElementById("tasksUl");
let clock = document.getElementById("clock");
let oclock = new Date();
let hours = oclock.getHours();
let minutes = oclock.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
clock.textContent = hours + ":" + minutes;
let day = document.getElementById("day");
let week = new Date();
let days = week.getDate();
let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let dayOfWeek = daysOfWeek[week.getDay()];
day.textContent = dayOfWeek.slice(0, 3) + " " + days;

let data = JSON.parse(localStorage.getItem("tasks")) || [];

function CreateTasks(task) {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let overall = document.createElement("div");
  let para = document.createElement("p");
  let inp = document.createElement("input");
  let trash = document.createElement("img");
  trash.src = "./images/trash.png";
  li.textContent = task.text;
  li.classList.add("tasksLi");
  tasksUl.appendChild(li);
  li.appendChild(div);
  div.classList.add("point");
  overall.classList.add("overall");
  li.appendChild(overall);
  para.classList.add("time");
  para.textContent = task.time;
  overall.appendChild(para);
  inp.type = "checkbox";
  inp.classList.add("radio");
  inp.checked = task.checked;
  div.appendChild(inp);
  trash.classList.add("trash");
  div.appendChild(trash);
  inp.addEventListener("click", () => {
    task.checked = inp.checked;
    if (task.checked === true) {
      li.classList.add("tasksLiline");
    } else {
      li.classList.remove("tasksLiline");
    }
    localStorage.setItem("tasks", JSON.stringify(data));
  });
  if (task.checked === true) {
    li.classList.add("tasksLiline");
  } else {
    li.classList.remove("tasksLiline");
  }
  trash.addEventListener("click", () => {
    li.remove();
    data = data.filter((tasqi) => {
      return tasqi.text != task.text;
    });
    localStorage.setItem("tasks", JSON.stringify(data));
  });
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!input.value) {
    alert("you should enter something");
  } else if (input.value.length > 15) {
    alert("The task is too long");
  } else {
    let newTask = {
      text: input.value,
      time: Date().slice(0, Date().length - 33),
      checked: false,
    };
    CreateTasks(newTask);
    data.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(data));
  }
  input.value = "";
});
data.forEach((todo) => {
  CreateTasks(todo);
});
