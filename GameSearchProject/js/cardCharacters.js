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