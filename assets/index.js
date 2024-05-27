// Globals


// Elements
const time = document.getElementById('time'),
      name = document.getElementById('name'),
      year = document.getElementById('year'),
      main = document.getElementById('main');

// Contents' variables
const greetings = document.createElement('h2'),
      user = localStorage.getItem('user');

// Contents factory
greetings.innerHTML = `Good morning, <span id="name">${user}</span>`;

// Function hall
function prePad(n) {
    return n < 10 ? '0' + n : n;
}
function getTime() {
    const now = new Date(),
          seconds = now.getSeconds(),
          minutes = now.getMinutes(),
          hours = now.getHours();

    time.innerText = `${hours}:${prePad(minutes)}:${prePad(seconds)}`;
    setInterval(getTime, 1000);
}
function getYear() {
    const date = new Date(),
        right = date.getFullYear();
    console.log(right);
    console.log(year);
    year.innerText = `${right}`;
}

function getName() {
    let userName;
    name.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            userName = e.target.value;
            localStorage.setItem('user', userName);
            name.blur();
            greetUser();
        }
    });
}
function greetUser() {
    name.remove();
    main.appendChild(greetings);
    console.log(greetings.textContent);
}

// Events
name.onfocus = function() {
    console.log("I'm clicked!");
    getName();
}

// main()
console.log(greetings);
if (user === undefined || user === null) {
    getName();
}
else {
    greetUser();
}
getTime();
getYear();

