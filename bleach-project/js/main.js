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

// SLIDER BLOCK
const sliderBlock = document.querySelector('.slider_block');
const slides = document.querySelectorAll('.slide')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
let index = 0
let slideInterval;

const hideSlide = () => {
    slides.forEach((slide) => {
        slide.style.opacity = 0;
        slide.style.transform = 'translateX(100%)';
        slide.classList.remove('active_slide')
    })
}

const showSlide = (i = 0) => {
    hideSlide(); 
    slides[i].style.opacity = 1;
    slides[i].style.transform = 'translateX(0)';
    slides[i].classList.add('active_slide');
    const background = slides[i].getAttribute('data-background');
    sliderBlock.style.backgroundImage = `url(${background})`;

    const sliderTitle = document.querySelector('.slider-title span');
    const colors = ['#D479FF', '#E02A2A', '#30D0D3', '#D479FF', '#D37015']; 
    const color = colors[i]; 
    sliderTitle.style.color = color; 
    prev.style.backgroundColor = color;
    next.style.backgroundColor = color;
};

const startSlider = () => {
    slideInterval = setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 10000);
};

const stopSlider = () => {
    clearInterval(slideInterval);
};

hideSlide();
showSlide(index);

next.onclick = () => {
    index < slides.length - 1 ? index++ : index = 0;
    showSlide(index);
};

prev.onclick = () => {
    index > 0 ? index-- : index = slides.length - 1;
    showSlide(index);
};

startSlider();
