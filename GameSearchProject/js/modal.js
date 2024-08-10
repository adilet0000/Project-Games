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