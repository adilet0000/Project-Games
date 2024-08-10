//MODAL

const modal = document.querySelector('.modal');
const modalTriggerBtn = document.getElementById('btn-get');
const modalCloseBtn = document.querySelector('.modal_close');

let isOpen = false;
let hasClickedModalTriggerBtn = false;
let hasScrolledToEnd = false;
let counter;

const  openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isOpen = true;
    window.removeEventListener('scroll', onScroll);
}


const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = ""
}

const onScrollFunction = () => {
    if (!isOpen && !hasClickedModalTriggerBtn && !hasScrolledToEnd) {
        if (window.pageYOffset > 1000) {
            setTimeout(() => {
                openModal()
            }, 1000);
        }    
    }
}

modalTriggerBtn.onclick = () => {
    hasClickedModalTriggerBtn = true;
    clearTimeout(counter);
    openModal();
}

modalCloseBtn.onclick = () => closeModal();

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}

window.addEventListener('scroll', onScrollFunction);

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !hasScrolledToEnd) {
        hasScrolledToEnd = true;
        clearTimeout(counter);
        if (!hasClickedModalTriggerBtn && !isOpen) {
            counter = setTimeout(() => {
                openModal();
            }, 10000);
        }
    } else if (!hasScrolledToEnd) {
        clearTimeout(counter); 
    }
});

counter = setTimeout(() => {
    if (!hasClickedModalTriggerBtn && !hasScrolledToEnd) {
        openModal();
    }
}, 10000);


//POST DATA

const formElement = document.querySelector('form');

const postData = (form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const  request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json");

        const formData = new FormData(form);
        const obj = {};
        formData.forEach((item, index) => {
            obj[index] = item
        })
        const json = JSON.stringify(obj);
        request.send(json)
    })
}

postData(formElement);

//SEARCH WEATHER

const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

    const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

    cityNameInput.oninput = async(event) => {
        try{
            const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
            const data = await response.json()
            city.innerHTML = data?.name ? data?.name : "Город не найден";
            temp.innerHTML = data?.main?.temp ?  Math.round(data?.main?.temp - 273) + '&deg;C' : "...";
        }
        catch(e){
            console.log('Fetch error:', error);
        } 
    }


    
// PHONE CHECKER && CHECK GMAIL

const phoneInput = document.querySelector('#number');
const validateButton = document.getElementById('validate-btn');

const gmailInput = document.querySelector('#gmail');

const regExpPhoneNumber = /^\+996[2579]\d{2}\d{2}\d{2}\d{2}$/;
const regExpGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

validateButton.addEventListener('click', () => {
    if(!regExpPhoneNumber.test(phoneInput.value)){ 
        phoneInput.classList.remove('_ok')
        phoneInput.classList.add('_error');
    } else{
        phoneInput.classList.remove('_error');
        phoneInput.classList.add('_ok')
    }
    if (!regExpGmail.test(gmailInput.value)) {
        gmailInput.classList.remove('_ok')
        gmailInput.classList.add('_error'); 
    }else{
        gmailInput.classList.remove('_error');
        gmailInput.classList.add('_ok')
    }
})




