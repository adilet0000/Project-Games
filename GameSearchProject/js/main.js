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

// RANDOM COLOR GENERATOR
const buttonsColor = document.querySelectorAll('.btn-color')
const javaScript = document.querySelector('#js-color')

const generateRandomColor = () => {
    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

const setRandomColors = () => {
    buttonsColor.forEach((buttonColor) => {
        buttonColor.innerHTML = generateRandomColor()
        buttonColor.onclick = (event) => {
            javaScript.style.color = event.target.innerHTML
        }
    })
}

window.onload = () => setRandomColors()
window.onkeydown = (event) => {
    if (event.code.toLowerCase() === 'space') {
        event.preventDefault()
        setRandomColors()
    }
}


// TAB-SLIDER
const $thumbs = document.querySelectorAll('.thumb li');
const $infoSliders = document.querySelectorAll('.info-slider');
const $items = document.querySelectorAll('.item');

let currentIndex = 0;
let intervalId;

$thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', (event) => {
        // Остановка переключения при клике
        clearInterval(intervalId);

        setTimeout(() => {
            document.querySelector('.thumb .selected').classList.remove('selected');
            thumb.classList.add('selected');
        }, 100);

        $thumbs.forEach((thum) => {
            thum.classList.add('disabled');
            setTimeout(() => {
                thum.classList.remove('disabled');
            }, 450);
        });

        let anySelected = false;
        let currentSelected = event.target.parentElement.nextElementSibling;

        while (currentSelected !== null && !anySelected) {
            anySelected = anySelected || currentSelected.matches('.selected');
            currentSelected = currentSelected.nextElementSibling;

            if(anySelected) {
                $items[currentIndex].classList.add('previously-active');
                setTimeout(() => {
                    document.querySelector('.item.previously-active').classList.remove('previously-active');
                }, 100);

                currentIndex = index;
                $items[currentIndex].classList.add('back-active');

                setTimeout(() => {
                    document.querySelector('.item.back-active').classList.remove('back-active');
                }, 100);
            };
        };

        currentIndex = index;

        $infoSliders.forEach(slide => {
            slide.style.transform = `translateX(${currentIndex * -100}%)`;
        });

        document.querySelector('.item.active').classList.remove('active');
        $items[currentIndex].classList.add('active');

        document.querySelector('.thumb .selected').classList.remove('selected');
        thumb.classList.add('selected');

        // Перезапуск после клика
        startAutoSwitch(10000);
    });
});


function autoSwitch() {
    currentIndex = (currentIndex + 1) % $thumbs.length;
    $thumbs[currentIndex].click(); // Имитация клика на текущий слайд
}

function startAutoSwitch(intervalTime) {
    intervalId = setInterval(autoSwitch, intervalTime);
}

startAutoSwitch(3000);

