// Elements
const time = document.getElementById('time'),
      name = document.getElementById('name'),
      year = document.getElementById('year'),
      main = document.getElementById('main');

// Contents' variables
const greetings = document.createElement('h2');

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
            userName = name.value;
            localStorage.setItem('user', userName);
            name.blur();
            greetUser(userName);
        }
    });
}
function greetUser(user) {
    name.remove();
    greetings.innerHTML = `Good morning, <span id="name">${user}</span>`;
    main.appendChild(greetings);
    console.log(greetings.textContent);
}

// main()
if (localStorage.getItem('user')) {         // Check if 'user' is !null
    greetUser(localStorage.getItem('user'));
}
else {
    getName();
}
getTime();
getYear();

// Events
name.onfocus = function() {
    console.log("I'm clicked!");
    getName();
}