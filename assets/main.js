// Element Queries
const $ = {
    time: document.getElementById('time'),
    year: document.getElementById('year'),
    main: document.getElementById('main'),
    jest: document.getElementById('jest'),
    name: document.getElementById('name'),
    wipe: document.getElementById('wipe'),
    power: document.getElementById('power'),
    prompt: document.getElementById('prompt'),
    moment: document.getElementById('moment'),
    
};

// FUNCTION HALL
function pre(n) {    // Functions for time
    return n < 10 ? '0' + n : n;
}

// Time Worker
function getTime() {
    // console.log("getTime() called. Working the time chores...")
    const now = new Date(),
          seconds = now.getSeconds(),
          minutes = now.getMinutes(),
          hours = now.getHours();

    $.time.innerText = `${hours}:${pre(minutes)}:${pre(seconds)}`;
    setInterval(getTime, 1000);
}
// Time of Day
function pleasantry() {
    // Perform some pleasantries...
    console.log("pleasantry() called. Checking time of day...");
    let hours = new Date().getHours(),
        now;
    if (hours > 18) {
        now = "evening";
    }
    else if (hours >= 12) {
        now = "afternoon";
    }
    else if (hours < 12) {
        now = "morning";
    }
    else {
        $.jest.innerHTML = "day";
        console.log("Look at this!")
    }
    console.log(`pleasantry() returns ${now}`);
    return now;
}
function greetUser() {
    console.log("greetUser() called. Checking localStorage...");
    let dataName = localStorage.getItem('name');
    console.log(`localStorage contains ${dataName}`);
    if (dataName.length < 2) {
        console.log(`Toggling jest/prompt. Hiding jest.`);
        $.prompt.classList.remove('hidden');
        $.jest.classList.add('hidden');
    }
    else {
        console.log(`Toggling jest/prompt. Hiding prompt.`);
        $.moment.innerText = `${pleasantry()}`;
        $.name.innerText = `${localStorage.getItem('name')}`;
        $.prompt.classList.add('hidden');
        $.jest.classList.remove('hidden');
    }
}
function promptToggle() {
    console.log("promptToggle() called. Toggling main's children...");
    console.log(`Toggling jest/prompt. Hiding jest.`);
    $.prompt.classList.toggle('hidden');
    $.jest.classList.toggle('hidden');
    console.log("Refreshing the window now.");
}

// MAIN()
getTime();
greetUser();

$.year.innerText = new Date().getFullYear();    // Update the copyright year.

// EVENT HANDLERS
document.addEventListener('click', (e) => {
    let target = e.target;
    console.log(`mouseEvent detected: ${target}`);
    console.log(`Target's innerHTML's ${target.innerText}.`);
    console.log(`Starting mouseEvent switch... Checking IDs.`);
    switch(target.id) {
        case 'power':
            console.log(`ID: ${target.id} clicked. Value: ${target.id.value}`);
            console.log(`Clearing the localStorage.`)
            localStorage.clear();
            break;
        case 'prompt':
            console.log(`ID: ${target.id} clicked. Value: ${localStorage.getItem('name')}`);
            target.onblur = function () {
                greetUser();
                console.log("onblur()");
            }
            break;
        case 'name':
            console.log(`ID: ${target.id} clicked. Value: ${target.id.textContent}`);
            promptToggle();
            break;
        default:
            console.log("Clicked an irrelevant part of the page...");
            greetUser();
            break;
    }
});

$.prompt.addEventListener('keyup', (e) => {
    console.log(`Keyboard event detected: ${e.key} pressed.`);
    if (e.key === 'Enter') {
        // Check if $.prompt.value is empty
        if ($.prompt.value.length < 2) {
            greetUser();
        }
        else {
            console.log(`"Enter" pressed. Saving data to localStorage.`)
            $.prompt.blur();
            localStorage.setItem('name', $.prompt.value);
            greetUser();
        }
    }
    else {
        console.log(`blur() happened. Saving data to localStorage.`)
        localStorage.setItem('name', $.prompt.value);
    }
})