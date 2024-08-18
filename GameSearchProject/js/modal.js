// MODAL
const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const modalCloseBtn = document.querySelector('.modal_close');


const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};


const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

modalTrigger.onclick = () => openModal();
modalCloseBtn.onclick = () => closeModal();
modal.onclick = (event) => {
    if(event.target === modal) {
        closeModal();
    };
};


// Прокрутка и модальное окно

const setLimit = (callback, limit) => { // функция из инета, чтобы не было миллиард ивентов при прокрутке
    let wait = true;
    return function() {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(() => {
                wait = false;
            }, limit);
        }
    };
};

let wasOpened = false;

const checkScrollPosition = () => {
    const sliderPosition = window.scrollY; // текущее вертикальное положение на странице
    const fullScrollHeight = document.documentElement.scrollHeight - window.innerHeight - 1; // максимальная прокрутка (-1 чтобы вдруг не сработает)

    if (sliderPosition >= fullScrollHeight && !wasOpened) {
        openModal();
        wasOpened = true;
        window.removeEventListener('scroll', onScroll);
    }
};

const onScroll = setLimit(checkScrollPosition, 10);

window.addEventListener('scroll', onScroll);

// CONVERTER
const $somInput = document.querySelector('#som');
const $kztInput = document.querySelector('#kzt');
const $rubInput = document.querySelector('#rub');
const $usdInput = document.querySelector('#usd');
const $eurInput = document.querySelector('#eur');
const $gbpInput = document.querySelector('#gbp');

const inputs = [$somInput, $kztInput, $rubInput, $usdInput, $eurInput, $gbpInput];


// юзаем API по уроку "Конвертер валют на JavaScript. Полный урок. Актуальные курсы"

// https://data.fx.kg/api/v1/central - курс по Центральному Банку
// 9fAIn2lklRcQOOUl8wBLrQ6NVFYbMyWAlhTh8Uqb868ed5c1 - KGS - токен

const rates = {};


const token = "9fAIn2lklRcQOOUl8wBLrQ6NVFYbMyWAlhTh8Uqb868ed5c1"

async function getCurrencies() {
    const response = await fetch('https://data.fx.kg/api/v1/central', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    const data = await response.json();
    const result = await data;

    rates.USD = result.usd;
    rates.EUR = result.eur;
    rates.GBP = result.gbp;
    rates.RUB = result.rub;
    rates.KZT = result.kzt;
    rates.SOM = 1;

    return rates;
};


getCurrencies().then(() => {
    function convertCurrency(inputElement, value) {
        const currency = inputElement.getAttribute('id').toUpperCase();

        if (inputElement.value === '') {
            inputs.forEach(input => {
                if (input !== inputElement) {
                    input.value = '';
                };
            });
            return;
        };

        const somValue = value * rates[currency];

        inputs.forEach(input => {
            const targetCurrency = input.getAttribute('id').toUpperCase();

            if (targetCurrency !== currency) {
                input.value = (somValue / rates[targetCurrency]).toFixed(2);
            };
        });
    };

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const value = parseFloat(event.target.value);
            if (!isNaN(value)) {
                convertCurrency(event.target, value);
            } else {
                inputs.forEach(input => {
                    input.value = '';
                });
            };
        });
    });
});

/*getCurrencies().then((data) => {
    console.log('Данные курсов валют:', data);
    console.log('Объект rates:', rates);
});проверка*/