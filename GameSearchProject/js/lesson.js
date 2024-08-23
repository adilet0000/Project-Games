// HEADER
const $header = document.querySelector('.header');
const defaultOffset = 100;
let lastScroll = 0;

const scrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const isHidden = () => $header.classList.contains('hide');

window.addEventListener('scroll', () => {

    if(scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        $header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && isHidden()){
        $header.classList.remove('hide')
    }
    lastScroll = scrollPosition();
});

// PHONE BLOCK
const $phoneInput = document.querySelector('#phone_input');
const $phoneButton = document.querySelector('#phone_button');
const $phoneSpan = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/ // {2} \d в количестве 2шт. $ - ограничение

$phoneButton.onclick = () => {
    if (regExp.test($phoneInput.value)) {
        $phoneSpan.innerHTML = "OK";
        $phoneSpan.style.color = "green";
    } else {
        $phoneSpan.innerHTML = "NOT OK";
        $phoneSpan.style.color = "red";
    };
};





// HW

// CARD-SWITCHER
const $cardBlock = document.querySelector('.card');
const $btn_next = document.querySelector('#btn-next');
const $btn_prev = document.querySelector('#btn-prev');
let cardId = 1;

const getInfo = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`);
        const data = await response.json();
        $cardBlock.innerHTML = `
        <p>${data.title}</p>
        <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
        <span>${data.id}</span>
        `;
    } catch (error) {
        console.log(error);
    };
};

getInfo();


$btn_next.onclick = () => {
    // cardId = (cardId >= 1 && cardId < 200) ? cardId + 1 : 1;
    if (cardId >= 1 && cardId < 200) {
        cardId++;
    } else if (cardId >= 200) {
        cardId = 1;
    };

    getInfo();
};

$btn_prev.onclick = () => {
    // cardId = (cardId > 1 && cardId <= 200) ? cardId - 1 : 200;
    if (cardId > 1 && cardId <= 200) {
        cardId--;
    } else if (cardId <= 1) {
        cardId = 200;
    };

    getInfo();
};


// WEATHER
const $citySearchInput = document.querySelector('.cityName');
const $searchBtn = document.querySelector('#search');
const $cityName = document.querySelector('.city');
const $cityTemp = document.querySelector('.temp');
const $cityCoords = document.querySelector('.coords');

const API_KEY = 'e417df62e04d3b1b111abeab19cea714';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

$searchBtn.onclick = async () => {
    try {
        const response = await fetch(`${API_URL}?q=${$citySearchInput.value}&appid=${API_KEY}`) // Через интерполяцию с разными переменными грамотней чем вставлять фулл ссылку
        const data = await response.json();
        $cityName.innerHTML = data.name || 'City is not defined!';
        $cityTemp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '℃' : '(☞ﾟヮﾟ)☞'  /* + '&deg;' спецсимвол*/
        $cityCoords.innerHTML = `Lattitude: ${data.coord?.lat}N | Longitude: ${data.coord?.lon}E` || '';
        console.log(data);
        
    } catch (error) {
        console.log(error);
    };
};