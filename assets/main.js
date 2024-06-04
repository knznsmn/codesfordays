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
    message: document.getElementById('message'),
    btnPower: document.querySelector('.power'),
    tools : document.querySelectorAll('.tools')
};

const text = {
    placeholder: 'Please enter your name',
    stranger   : 'You\'re a stranger. Let\'s change that.'
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
    // if ((hours === 18 || hours === 12 || hours === 0) && (minutes === 0 && seconds === 0)) {
    //     updateBg();
    // }
}
// Time of Day
function timePeriod() {
    // Determines time period...
    let hours = new Date().getHours(),
        now;

    if (hours >= 18) {
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
    return now;
}
function updateBg() {
    console.log(`updateBg() called. Updating the background according to time of day.`)
    const s = timePeriod();
    if (s === "morning") {
        document.querySelector('.one').style.background = "var(--matin1)";
        document.querySelector('.two').style.background = "var(--matin2)";
    }
    else if (s === "afternoon") {
        document.querySelector('.one').style.background = "var(--apres1)";
        document.querySelector('.two').style.background = "var(--apres2)";
    }
    else {
        document.querySelector('.one').style.background = "var(--soire1)";
        document.querySelector('.two').style.background = "var(--soire2)";
    }
}
function message(s) {
    switch (s) {
        case 'p':
            console.log(`asdasdasdasd`);
            break;
        default:
            const stranger = document.createElement('p');
            stranger.innerText = `You're a stranger. Let's change that.`;
            $.main.appendChild(stranger);
            break;
    }
}
function greetUser() {
    console.log(`greetUser() called. Updating the interface.`)
    let data = localStorage.getItem('name');
    if (data === undefined || data === null || data === '') {
        console.log(`Empty localStorage, Calling showGuestUI() now...`)
        showGuestUI();
    }
    else {
        showUserUI();
        console.log(`Data in localStorage, Calling showUserUI() now...`)
    }
}
function showGuestUI() {
    $.moment.innerText = `${timePeriod()}`;
    $.name.innerText = `... beautiful person!`;
    $.message.innerText = text.stranger;
    $.message.classList.remove('hidden');
    $.prompt.classList.remove('hidden');
    $.tools.forEach(function (element) {
        element.classList.add('hidden');
    })
}
function showUserUI() {
    $.moment.innerText = `${timePeriod()}`;
    $.name.innerText = `, ${localStorage.getItem('name')}`;
    $.prompt.classList.add('hidden');
    $.message.classList.add('hidden');
    $.jest.classList.remove('hidden');
    $.tools.forEach(function (element) {
        element.classList.remove('hidden');
    })
}

// MAIN()
updateBg();
setInterval(getTime, 1000);
greetUser();

$.year.innerText = `${new Date().getFullYear()}`;    // Update the copyright year.

// EVENT HANDLERS
document.addEventListener('click', (e) => {
    let target = e.target;
    console.log(`mouseEvent detected: ${target}`);
    console.log(`Starting mouseEvent switch... Checking IDs.`);
    switch(target.id) {
        case 'power':
            console.log(`Power button clicked. Clearing the localStorage...`);
            localStorage.clear();
            greetUser();
            break;
        case 'prompt':
            target.onblur = function () {
                if ($.prompt.value === '' || $.prompt.value === ' ') {
                    $.prompt.placeholder = text.placeholder;
                }
                else {
                    localStorage.setItem('name', $.prompt.value);
                    greetUser();
                }
                $.prompt.value = '';
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
