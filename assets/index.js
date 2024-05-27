// Elements
const time = document.getElementById('time'),
      name = document.getElementById('name'),
      year = document.getElementById('year');

// Events


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

// main()
getTime();

// Copyright year:
const date = new Date(),
      right = date.getFullYear();
console.log(right);
console.log(year);
year.innerText = `${right}`;
