document.addEventListener("DOMContentLoaded", () => {
    
    let timerDisplay = document.getElementById("timer");
    let startBtn = document.getElementById("start-btn");
    let pauseBtn = document.getElementById("pause-btn");
    let resetBtn = document.getElementById("reset-btn");
    let breakBtn = document.getElementById("break-btn");
    let timeInput = document.getElementById("time-input");

    let timer;
    let isPaused = false;
    let secondsRemaining = localStorage.getItem("timer") ? parseInt(localStorage.getItem("timer")) : parseInt(timeInput.value) * 60;

    function updateDisplay() {
        let minutes = Math.floor(secondsRemaining / 60);
        let seconds = secondsRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function startTimer(duration) {
        clearInterval(timer);
        secondsRemaining = duration * 60;
        updateDisplay();
        timer = setInterval(() => {
            if (!isPaused) {
                if (secondsRemaining > 0) {
                    secondsRemaining--;
                    localStorage.setItem("timer", secondsRemaining);
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    localStorage.removeItem("timer");
                    alert("Time's up! Take a break.");
                }
            }
        }, 1000);
    }

    startBtn.addEventListener("click", () => {
        isPaused = false;
        startTimer(parseInt(timeInput.value));
    });

    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timer);
        secondsRemaining = parseInt(timeInput.value) * 60;
        localStorage.setItem("timer", secondsRemaining);
        updateDisplay();
    });

    breakBtn.addEventListener("click", () => {
        isPaused = false;
        startTimer(5);
    });

    updateDisplay();

    
    let todoInput = document.getElementById("todo-input");
    let todoList = document.getElementById("todo-list");
    let addTodoBtn = document.getElementById("add-todo");

    function saveTodos() {
        let todos = [];
        document.querySelectorAll("#todo-list li").forEach(li => {
            todos.push({
                text: li.querySelector("span").textContent,
                completed: li.classList.contains("completed")
            });
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        let savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        savedTodos.forEach(todo => {
            let li = document.createElement("li");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = todo.completed;
            checkbox.addEventListener("change", () => {
                li.classList.toggle("completed", checkbox.checked);
                saveTodos();
            });

            let span = document.createElement("span");
            span.textContent = todo.text;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                li.remove();
                saveTodos();
            });

            if (todo.completed) li.classList.add("completed");

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
    }

    addTodoBtn.addEventListener("click", () => {
        let taskText = todoInput.value.trim();
        if (taskText !== "") {
            let li = document.createElement("li");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", () => {
                li.classList.toggle("completed", checkbox.checked);
                saveTodos();
            });

            let span = document.createElement("span");
            span.textContent = taskText;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", () => {
                li.remove();
                saveTodos();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);

            saveTodos();
            todoInput.value = "";
        }
    });

    loadTodos();

    
    let quotes = [
        "Believe you can and you're halfway there.",
        "The secret of getting ahead is getting started.",
        "You are stronger than you think.",
        "Stay positive, work hard, make it happen.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts."
    ];
    let quoteDisplay = document.getElementById("quote");

    function setRandomQuote() {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
    }

    setRandomQuote();

    
    let countdownInterval;

    function setCountdown() {
        const inputDate = document.getElementById("countdown-date").value;
        const targetDate = new Date(inputDate).getTime();

        if (!inputDate) {
            alert("Please select a valid date!");
            return;
        }

        localStorage.setItem("countdown-date", inputDate);
        clearInterval(countdownInterval);

        countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                document.getElementById("countdown-timer").innerHTML = "Time's up!";
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("countdown-timer").innerHTML =
                `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }

    function loadCountdown() {
        let savedDate = localStorage.getItem("countdown-date");
        if (savedDate) {
            document.getElementById("countdown-date").value = savedDate;
            setCountdown();
        }
    }

    document.querySelector(".countdown-container button").addEventListener("click", setCountdown);

    loadCountdown();
});

