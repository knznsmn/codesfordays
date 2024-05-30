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

const text = {
    placeholder: 'Please enter your name',
}

// FUNCTION HALL
function pre(n) {    // Functions for time
    return n < 10 ? '0' + n : n;
}

// Time Worker
function getTime() {
    console.log("getTime() called. Working the time chores...")
    const now = new Date(),
          seconds = now.getSeconds(),
          minutes = now.getMinutes(),
          hours = now.getHours();
    
    $.time.innerText = `${hours}:${pre(minutes)}:${pre(seconds)}`;
}
// Time of Day
function timePeriod() {
    // Determines time period...
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
    }

    // Update the background
    if (now === "morning") {
        document.querySelector('.one').style.background = "var(--matin1)";
        document.querySelector('.two').style.background = "var(--matin2)";
    }
    else if (now === "afternoon") {
        document.querySelector('.one').style.background = "var(--apres1)";
        document.querySelector('.one').style.background = "var(--apres2)";
    }
    else {
        document.querySelector('.one').style.background = "var(--soire1)";
        document.querySelector('.two').style.background = "var(--soire2)";
    }
    return now;
}
function greetUser() {
    let data = localStorage.getItem('name');
    if (data === undefined || data === null || data === '') {
        showGuestUI();
    }
    else {
        $.moment.innerText = `${timePeriod()}`;
        $.name.innerText = `, ${localStorage.getItem('name')}`;
        $.prompt.classList.add('hidden');
        $.jest.classList.remove('hidden');
    }
}
function showGuestUI() {
    $.prompt.classList.remove('hidden');
    $.jest.classList.add('hidden');
}

// MAIN()
showGuestUI();
setInterval(getTime, 1000);

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
            console.log(`Clearing the localStorage.`);
            localStorage.clear();
            break;
        case 'prompt':
            target.onblur = function () {
                if ($.prompt.value === '' || $.prompt.value === ' ') {
                    $.prompt.value = '';
                    $.prompt.placeholder = text.placeholder;
                }
                else {
                    localStorage.setItem('name', $.prompt.value);
                    greetUser();
                }
            }
            break;
        case 'name':
            console.log(`ID: ${target.id} clicked. Value: ${target.id.textContent}`);
            showGuestUI();
            break;
        default:
            console.log("Clicked an irrelevant part of the page...");
            greetUser();
            break;
    }
});

$.prompt.addEventListener('keyup', (e) => {
    console.log(`Keyboard event detected: ${e.key}`);
    console.log(e);
    if (e.key === 'Enter') {
        console.log(`Target.value.length is ${e.target.value.length}`);
        if (e.target.value.length > 2) {
            localStorage.setItem('name', $.prompt.value);
            $.prompt.blur();
            $.prompt.value = '';
            greetUser();
        }
        else {
            $.prompt.value = '';
            $.prompt.placeholder = text.placeholder;
        }
    }
});