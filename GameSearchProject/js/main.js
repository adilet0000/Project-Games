// HEADER-FOOTER
const $header = document.querySelector('.header');
const defaultOffset = 100;
let lastScroll = 0;

const scrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const scrollPosition_Y = () => window.scrollY;
const isHidden = () => $header.classList.contains('hide');

window.addEventListener('scroll', () => {

    if (scrollPosition() > lastScroll && !isHidden() && scrollPosition() > defaultOffset) {
        $header.classList.add('hide');
    } else if (scrollPosition() < lastScroll && isHidden()) {
        $header.classList.remove('hide')
    }
    lastScroll = scrollPosition();
});



// Чтобы не скроллилось ниже футера
function preventScrollBelow(blockSelector) {
    const block = document.querySelector(blockSelector);
    
    window.addEventListener('scroll', () => {
        const blockBottom = block.getBoundingClientRect().bottom;
        const windowBottom = window.innerHeight;
        
        if (blockBottom <= windowBottom) {
            window.scrollTo(0, block.offsetTop + block.offsetHeight - windowBottom);
        }
    });
}

preventScrollBelow('.footer');


// Чтобы не скроллилось правее-левее футера
function preventHorizontalScrollOutside(blockSelector) {
    const block = document.querySelector(blockSelector);

    const checkScroll = () => {
        const blockLeft = block.getBoundingClientRect().left;
        const blockRight = block.getBoundingClientRect().right;
        const windowWidth = window.innerWidth;
        
        // Если левая граница футера левее окна
        if (blockLeft > 0) {
            window.scrollTo(block.offsetLeft, window.scrollY);
        }

        // Если правая граница футера правее окна
        if (blockRight < windowWidth) {
            window.scrollTo(block.offsetLeft + block.offsetWidth - windowWidth, window.scrollY);
        }

        requestAnimationFrame(checkScroll);
    };

    requestAnimationFrame(checkScroll);
}

preventHorizontalScrollOutside('.footer');


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

            if (anySelected) {
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
    $thumbs[currentIndex].click();
}

function startAutoSwitch(intervalTime) {
    intervalId = setInterval(autoSwitch, intervalTime);
}

startAutoSwitch(6000);


// SWIPER
const $imgSlider = document.querySelector(".img-slider");
const $imgItems = document.querySelectorAll(".img-item");
const $itemsSwiper = document.querySelectorAll(".item-swiper");

const $infoItems = document.querySelectorAll(".info-item-swiper");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let colors = ['#505050', '#d4c600', '#dadada', '#0a0a0a'];

let indexSlider = 0;
let indexSwiper = 0;

const infoBox = document.querySelector('.info-box-swiper');

const fetchInfo = async () => {
    try {
        const response = await fetch('data/swiperCard.json');
        const data = await response.json();

        $infoItems.forEach((infoItem, i) => {
            if (data[i]) {
                const h2Elements = infoItem.querySelectorAll('h2');
                const spanElements = infoItem.querySelectorAll('.colors span.active p');
                const pElement = infoItem.querySelector('.bio');
                const aElement = infoItem.querySelector('.swiper-btn');

                if (h2Elements.length >= 2) {
                    h2Elements[0].innerHTML = data[i].name;
                    h2Elements[1].innerHTML = data[i].age;
                }

                if (spanElements.length > 0) {
                    spanElements[0].innerHTML = data[i].color;
                }

                if (pElement) {
                    pElement.innerHTML = data[i].bio;
                }

                if (aElement) {
                    aElement.href = data[i].link;
                }
            }
        });

    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
};
fetchInfo();

const slider = () => {
    $imgSlider.style.transform = `rotate(${indexSlider * 90}deg)`;

    $itemsSwiper.forEach(item => {
        item.style.transform = `rotate(${indexSlider * -90}deg)`;
    });

    document.querySelector('.img-item.active').classList.remove('active');
    $imgItems[indexSwiper].classList.add('active');

    document.querySelector('.info-item-swiper.active').classList.remove('active');
    $infoItems[indexSwiper].classList.add('active');

    document.body.style.background = colors[indexSwiper];
};

prevBtn.addEventListener('click', () => {
    indexSlider--;
    indexSwiper--;
    if (indexSwiper < 0) {
        indexSwiper = $imgItems.length - 1;
    }

    slider();
});

nextBtn.addEventListener('click', () => {
    indexSlider++;
    indexSwiper++;
    if (indexSwiper > $imgItems.length - 1) {
        indexSwiper = 0;
    }

    slider();
});

