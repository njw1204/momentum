const GOODS = [
  "Believe in yourself.",
  "Love yourself.",
  "Follow your heart.",
  "You only live once.",
  "Past is just past.",
  "Life is a journey.",
  "Don't dream, Be it.",
  "No pain, No gain.",
  "Be brave.",
  "Time is gold.",
];

let mUsername;

function showPage(type) {
  document.getElementById("login_page").classList.add("hidden");
  document.getElementById("main_page").classList.add("hidden");

  switch (type) {
    case "login":
      document.getElementById("login_page").classList.remove("hidden");
      initLoginPage();
      break;
    case "main":
      document.getElementById("main_page").classList.remove("hidden");
      initMainPage();
      break;
  }
}

function initLoginPage() {
  saveObj("todos", null);
  document.getElementById("login_form_name_input").value = "";
}

function initMainPage() {
  document.getElementById("profile").innerText = mUsername;
  document.getElementById("todo_list").innerHTML = "";
  document.getElementById("todo_form_input").value = "";
  document
    .getElementById("todo_form_input")
    .setAttribute(
      "placeholder",
      GOODS[Math.floor(Math.random() * GOODS.length)]
    );

  const todos = loadObj("todos");

  if (Array.isArray(todos)) {
    todos.forEach((todoInfo) => {
      showTodoRecord(todoInfo.id, todoInfo.todo, todoInfo.finished);
    });
  }

  showWeather();
}

function showWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=de37c061619340c3c697ad65b13c4e72&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data?.cod !== 200 ||
          !data?.weather?.length ||
          typeof data?.main?.temp !== "number"
        ) {
          return;
        }

        document.getElementById("weather").innerText = `${
          data.weather[0].main
        } ${data.main.temp.toFixed(1)}℃, ${data.name || "Unknown"}`;
      });
  });
}

function showTodoRecord(id, todo, finished) {
  const li = document.createElement("li");
  const record = document.createElement("div");
  const removeButton = document.createElement("div");

  li.appendChild(record);
  li.appendChild(removeButton);
  document.getElementById("todo_list").appendChild(li);

  if (finished) {
    record.classList.add("finished");
  }

  record.id = id;
  record.classList.add("todo-record");
  record.innerHTML = `<span class="todo-record-message"></span>`;
  record.querySelector(".todo-record-message").innerText = todo;
  record.addEventListener("click", () => {
    const todos = loadObj("todos");

    if (Array.isArray(todos)) {
      const todoInfo = todos.find((todoInfo) => todoInfo.id === id);

      if (todoInfo) {
        todoInfo.finished = !todoInfo.finished;
      }

      saveObj("todos", todos);
    }

    record.classList.toggle("finished");
  });

  removeButton.classList.add("todo-remove-button");
  removeButton.innerText = "⨯";
  removeButton.addEventListener("click", () => {
    const todos = loadObj("todos");

    if (Array.isArray(todos)) {
      saveObj(
        "todos",
        todos.filter((todoInfo) => todoInfo.id !== id)
      );
    }

    li.remove();
  });
}

function init() {
  document.getElementById("login_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document
      .getElementById("login_form_name_input")
      .value.trim();

    if (username) {
      mUsername = username;
      login(username);
      showPage("main");
    }
  });

  document.getElementById("todo_form").addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = document.getElementById("todo_form_input").value.trim();

    if (todo) {
      document.getElementById("todo_form_input").value = "";

      let todos = loadObj("todos");

      if (!Array.isArray(todos)) {
        todos = [];
      }

      const todoInfo = {
        id: `todo${Math.random().toString(16).slice(2)}${Number(new Date())}`,
        todo,
        finished: false,
      };

      todos.push(todoInfo);
      saveObj("todos", todos);
      showTodoRecord(todoInfo.id, todoInfo.todo, todoInfo.finished);
    }
  });

  document.getElementById("theme_button").addEventListener("click", () => {
    document.querySelector("body").classList.toggle("global-dark");
  });

  document.getElementById("music_button").addEventListener("click", () => {
    toggleMusic();
  });

  document.getElementById("logout_button").addEventListener("click", () => {
    mUsername = undefined;
    logout();
    showPage("login");
  });

  const theme = Math.floor(Math.random() * 7);

  if (theme === 0) {
    document.querySelector("body").classList.add("global-dark");
  }

  subscribeClock((now) => {
    const text = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    if (document.getElementById("digital_clock").innerText !== text) {
      document.getElementById("digital_clock").innerText = text;
    }
  });

  mUsername = getLoggedInUsername();

  if (mUsername !== undefined) {
    showPage("main");
  } else {
    showPage("login");
  }
}

init();
